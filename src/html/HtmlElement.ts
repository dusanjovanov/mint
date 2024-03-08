import { App } from "../App";
import { SMLLR_EL_BRAND, SMLLR_EL_TYPES, SVG_MAP } from "../constants";
import { handleNumberCssValue } from "../css";
import { ValueEffect } from "../reactive";
import { DataSet, SmllrElement, SmllrNode } from "../types";
import {
  camelToKebab,
  entries,
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
  _prevData: DataSet | undefined;
  _prevStyle: any;

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
      this.setDataAttr(value);
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

  setDataAttr(dataSet: DataSet) {
    // remove no longer present keys
    if (this._prevData) {
      Object.keys(this._prevData).forEach((key) => {
        if (!(key in dataSet)) {
          delete this._domNode!.dataset[key];
        }
      });
    }
    this._prevData = dataSet;
    // current keys
    entries(dataSet).forEach(([key, value]) => {
      if (value != null) {
        this._domNode!.dataset[key] = value;
      } else {
        delete this._domNode!.dataset[key];
      }
    });
  }

  setStyle(styleObj: any) {
    // remove no longer present keys
    if (this._prevStyle) {
      Object.keys(this._prevStyle).forEach((key) => {
        if (!(key in styleObj)) {
          this._domNode!.style[key as any] = "";
        }
      });
    }
    this._prevStyle = styleObj;
    // current keys
    entries(styleObj).forEach(([key, value]) => {
      this._domNode!.style[key as any] = handleNumberCssValue(key, value);
    });
  }

  _toDom() {
    this._create();

    const dom = this.isSvg
      ? document.createElementNS("http://www.w3.org/2000/svg", this.tag)
      : document.createElement(this.tag);
    this._domNode = dom;

    dom.append(...this.app._toDom(this.children));

    entries(this.props).forEach(([key, value]) => {
      let v = this.props[key];

      if (!isEventProp(key) && key !== "use" && isFunction(value)) {
        const eff = new ValueEffect(
          value,
          () => {
            this.setProp(key, eff.value);
          },
          this.app.ctx
        );
        this._effs.add(eff);
        v = eff.value;
      }

      this.setProp(key, v);
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

      if (v == null) {
        continue;
      }

      s += `${camelToKebab(key)}:${handleNumberCssValue(key, v)};`;
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
