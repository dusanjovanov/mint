import { App } from "../App";
import { SMLLR_EL_BRAND, SMLLR_EL_TYPES, SVG_MAP } from "../constants";
import { addPxIfNeeded } from "../css";
import { ValueEffect } from "../reactive";
import { DataSet, SmllrElement, SmllrNode, UseRemoveFn } from "../types";
import {
  camelToKebab,
  entries,
  getEventTypeFromPropKey,
  isEventProp,
  isFunction,
} from "../utils";
import { ATTRIBUTE_ALIASES, PROP_MAP } from "./constants";
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
    this.nodes = nodes;
    this.isSvg = tag in SVG_MAP;
  }
  brand = SMLLR_EL_BRAND;
  type = SMLLR_EL_TYPES.html;
  tag;
  props;
  nodes;
  children: SmllrElement[] = [];
  isSvg;
  domNode: HTMLElement | SVGElement | undefined;
  app!: App;
  cssClasses: string[] = [];
  parent!: SmllrElement;
  index!: number;
  effs = new Set<ValueEffect<any>>();
  prevData: DataSet | undefined;
  prevStyle: any;
  destroyUse: UseRemoveFn | undefined;

  getNodes() {
    return this.domNode ? [this.domNode] : [];
  }

  getFirstNode() {
    return this.domNode;
  }

  get isInserted() {
    return !!this.domNode?.isConnected;
  }

  create() {
    this.children = this.app.createElements({
      parent: this,
      node: this.nodes,
    });
  }

  onInsert() {
    if (this.props.use) {
      this.destroyUse = this.props.use(this.domNode);
    }
    this.app.onInsert(this.children);
  }

  setProp(key: string, value: any) {
    if (!this.domNode) return;

    if (key === "use") return;

    if (isEventProp(key)) {
      this.domNode.addEventListener(getEventTypeFromPropKey(key), value);
    }
    //
    else if (key === "style") {
      this.setStyle(value);
    }
    //
    else if (key === "css") {
      this.setCssClasses(value);
    }
    //
    else if (key === "data") {
      this.setDataAttr(value);
    }
    //
    else if (PROP_MAP[key]) {
      // @ts-expect-error
      this.domNode[key] = value;
    }
    //
    else {
      this.domNode.setAttribute(ATTRIBUTE_ALIASES[key] ?? key, value);
    }
  }

  setCssClasses(value: any) {
    const className = this.app.css.getScopedCssClass(value);

    this.domNode!.classList.add(className);
  }

  setDataAttr(dataSet: DataSet) {
    // remove no longer present keys
    if (this.prevData) {
      Object.keys(this.prevData).forEach((key) => {
        if (!(key in dataSet)) {
          delete this.domNode!.dataset[key];
        }
      });
    }
    this.prevData = dataSet;
    // current keys
    entries(dataSet).forEach(([key, value]) => {
      if (value != null) {
        this.domNode!.dataset[key] = value;
      } else {
        delete this.domNode!.dataset[key];
      }
    });
  }

  setStyle(styleObj: any) {
    // remove no longer present keys
    if (this.prevStyle) {
      Object.keys(this.prevStyle).forEach((key) => {
        if (!(key in styleObj)) {
          this.domNode!.style[key as any] = "";
        }
      });
    }
    this.prevStyle = styleObj;
    // current keys
    entries(styleObj).forEach(([key, value]) => {
      this.domNode!.style[key as any] = addPxIfNeeded(key, value);
    });
  }

  toDom() {
    this.create();

    const dom = this.isSvg
      ? document.createElementNS("http://www.w3.org/2000/svg", this.tag)
      : document.createElement(this.tag);
    this.domNode = dom;

    dom.append(...this.app.toDom(this.children));

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
        this.effs.add(eff);
        v = eff.value;
      }

      this.setProp(key, v);
    });

    return dom;
  }

  remove(): void {
    this.effs.forEach((eff) => eff._dispose());
    this.effs.clear();
    this.domNode?.remove();
    this.domNode = undefined;
    this.app.remove(this.children);
    this.children.length = 0;
    this.destroyUse?.();
  }

  _styleObjToString(obj: any) {
    const keys = Object.keys(obj);
    let s = "";

    for (const key of keys) {
      let v = obj[key];

      if (v == null) {
        continue;
      }

      s += `${camelToKebab(key)}:${addPxIfNeeded(key, v)};`;
    }
    return s;
  }

  toHtml(): string {
    this.create();

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
        const cls = this.app.css.getScopedCssClass(v);
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
      const childrenString = this.app.toHtml(this.children);
      s += `>${childrenString}</${this.tag}>`;
    }
    //
    else {
      s += "/>";
    }

    return s;
  }
}

export const htm = <Tag extends AllHtmlTags>(
  tag: Tag,
  props: AllHtmlPropMap[Tag] | null,
  ...nodes: SmllrNode[]
) => {
  return new HtmlElement({ tag, props, nodes });
};
