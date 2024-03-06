import { App } from "../App";
import { SMLLR_EL_BRAND, SMLLR_EL_TYPES, SVG_MAP } from "../constants";
import { ValueEffect } from "../reactive";
import { SmllrElement, SmllrNode } from "../types";
import {
  UPPERCASE_LETTER_G_REGX,
  getEventTypeFromPropKey,
  isEventProp,
  isFunction,
} from "../utils";
import { AllHtmlPropMap, AllHtmlTags } from "./types";

export class HtmlElement implements SmllrElement {
  constructor({
    tag,
    props,
    nodes,
  }: {
    tag: string;
    props: any;
    nodes: SmllrNode[];
  }) {
    this.tag = tag;
    this.props = props ?? {};
    this._nodes = nodes;
    this.isSvg = tag in SVG_MAP;
  }
  _brand = SMLLR_EL_BRAND;
  _type = SMLLR_EL_TYPES.html;
  tag;
  props;
  _nodes;
  children: SmllrElement[] = [];
  isSvg;
  _domNode: HTMLElement | SVGElement | undefined;
  app!: App;
  cssCls: string | undefined;
  _parent!: SmllrElement;
  _index!: number;
  _isInserted = false;
  _effs = new Set<ValueEffect<any>>();

  get node() {
    return this._domNode!;
  }

  _getNodes() {
    return this._domNode ? [this._domNode] : [];
  }

  _getFirstNode() {
    return this._domNode;
  }

  _create() {
    this.children = this.app.createElements({
      parent: this,
      node: this._nodes,
    });
  }

  _onInsert() {
    this._isInserted = true;
    if (this.props.use) {
      this.props.use(this);
    }
    this.app.onInsert(this.children);
  }

  setProp(key: string, value: any) {
    if (!this._domNode) return;

    if (key === "use") return;

    if (isEventProp(key)) {
      this._domNode.addEventListener(getEventTypeFromPropKey(key), value);
    }
    //
    else if (key === "style") {
      this.setStyle(value);
    }
    //
    else if (key === "css") {
      const cls = this.app.css.getCssClass(value);

      if (this.cssCls == null) {
        this.cssCls = cls;
      }
      if (this.cssCls !== cls) {
        this._domNode.classList.remove(this.cssCls);
        this.cssCls = cls;
      }
      this._domNode.classList.add(cls);
    }
    //
    else if (key === "data") {
      Object.keys(value).forEach((dataKey) => {
        this._domNode!.dataset[dataKey] = value[dataKey];
      });
    }
    //
    else if (PROP_MAP[key]) {
      // @ts-expect-error
      this._domNode[key] = value;
    }
    //
    else {
      this._domNode.setAttribute(ATTRIBUTE_ALIASES[key] ?? key, value);
    }
  }

  setStyle(styleObj: any) {
    if (!this._domNode) return;
    for (const key of Object.keys(styleObj)) {
      let v = styleObj[key];

      if (typeof v === "number") {
        v = `${v}px`;
      }

      this._domNode.style[key as any] = v;
    }
  }

  _toDom() {
    this._create();

    const dom = this.isSvg
      ? document.createElementNS("http://www.w3.org/2000/svg", this.tag)
      : document.createElement(this.tag);
    this._domNode = dom;

    dom.append(...this.app._toDom(this.children));

    Object.keys(this.props).forEach((key) => {
      let value = this.props[key];

      if (!isEventProp(key) && key !== "use" && isFunction(value)) {
        const eff = new ValueEffect(
          value,
          () => {
            this.setProp(key, eff.value);
          },
          this.app.ctx
        );
        this._effs.add(eff);
        value = eff.value;
      }

      this.setProp(key, value);
    });

    return dom;
  }

  _remove(): void {
    this._effs.forEach((eff) => eff._dispose());
    this._effs.clear();
    this._domNode?.remove();
    this._isInserted = false;
    this._domNode = undefined;
  }

  _styleObjToString(obj: any) {
    const keys = Object.keys(obj);
    let s = "";

    for (const key of keys) {
      let v = obj[key];

      const k = key.replace(
        UPPERCASE_LETTER_G_REGX,
        (match) => `-${match.toLowerCase()}`
      );

      if (typeof v === "number") {
        v = `${v}px`;
      }

      s += `${k}:${v};`;
    }
    return s;
  }

  _toHtml(): string {
    this._create();

    let s = `<${this.tag}`;

    const propsStrings: string[] = [];
    const keys = Object.keys(this.props);

    for (const key of keys) {
      if (isEventProp(key)) continue;
      const value = this.props[key];

      const keyAlias = ATTRIBUTE_ALIASES[key];

      let v = value;

      if (isFunction(v)) {
        v = v();
      }

      if (key === "css") {
        const cls = this.app.css.getCssClass(v);
        propsStrings.push(`class="${cls}"`);
      }
      //
      else {
        if (key === "style") {
          v = this._styleObjToString(v);
        }
        propsStrings.push(`${keyAlias ?? key}="${v}"`);
      }
    }

    if (propsStrings.length > 0) {
      s += ` ${propsStrings.join(" ")}`;
    }

    if (this.children.length > 0) {
      const childrenString = this.app._toString(this.children);
      s += `>${childrenString}</${this.tag}>`;
    }
    //
    else {
      s += "/>";
    }

    return s;
  }
}

// html props treated as element properties ( not attributes )
export const PROP_MAP: Record<string, true> = {
  checked: true,
  selected: true,
  type: true,
  value: true,
};

export const ATTRIBUTE_ALIASES: Record<string, string> = {
  className: "class",
  htmlFor: "for",
};

export const htm = <Tag extends AllHtmlTags>(
  tag: Tag,
  props: AllHtmlPropMap[Tag] | null,
  ...nodes: SmllrNode[]
) => {
  return new HtmlElement({ tag, props, nodes });
};
