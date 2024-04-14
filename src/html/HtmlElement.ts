import { APP_PROVIDER_KEY } from "../AppProvider";
import { ELEMENT_BRAND, ELEMENT_TYPES, VOID_TAGS_MAP } from "../constants";
import { createDomNodes } from "../createDomNodes";
import { createHtmlString } from "../createHtmlString";
import { Css } from "../css";
import { getContext } from "../getContext";
import { onInsert } from "../onInsert";
import { UnsubscribeFn } from "../reactive";
import { resolveNode } from "../resolveNode";
import { CssProperties, DataSet, HtmlProps, SmllrElement } from "../types";
import {
  addPxIfNeeded,
  camelToKebab,
  entries,
  getPropValue,
  getReactiveValue,
  isReactive,
} from "../utils";

export class HtmlElement implements SmllrElement {
  constructor(tag: string, props: any) {
    this.tag = tag;
    this.props = props ?? {};
  }
  tag;
  props;
  brand = ELEMENT_BRAND;
  type = ELEMENT_TYPES.html;
  domNode: HTMLElement | undefined;
  parent!: SmllrElement;
  index!: number;
  children: SmllrElement[] = [];
  cssClass?: string;
  prevStyle: CssProperties | undefined;
  prevData: DataSet | undefined;
  unsubs: UnsubscribeFn[] = [];
  css!: Css;

  get isInserted() {
    return !!this.domNode?.isConnected;
  }

  getNodes() {
    return this.domNode ? [this.domNode] : [];
  }

  getFirstNode() {
    return this.domNode;
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

  setCssClass(value: any) {
    const className = this.css.getScopedCssClass(value);

    if (this.cssClass != null && this.cssClass !== className) {
      this.domNode!.classList.remove(this.cssClass);
    }
    this.cssClass = className;

    this.domNode!.classList.add(className);
  }

  setProp(key: string, value: any) {
    if (!this.domNode) return;

    if (key === "style") {
      this.setStyle(value);
    }
    //
    else if (key === "css") {
      this.setCssClass(value);
    }
    //
    else if (key === "innerHtml") {
      this.domNode.innerHTML = value;
    }
  }

  create() {
    this.css = getContext<any>(APP_PROVIDER_KEY, this).css;
    this.children = resolveNode(this.props.children, this);
  }

  toDom() {
    this.create();

    this.domNode = document.createElement(this.tag);

    this.domNode.append(...createDomNodes(this.children));

    entries(this.props).forEach(([key, value]) => {
      if (key === "ref") return;

      if (this.props.on) {
        entries(this.props.on).forEach(([type, handler]) => {
          this.domNode!.addEventListener(type as any, handler as any);
        });
      }

      if (this.props.attrs) {
        entries(this.props.attrs).forEach(([key, value]) => {
          this.domNode!.setAttribute(key, getReactiveValue(value));
          if (isReactive(value)) {
            this.unsubs.push(
              value.subscribe(() => {
                this.domNode!.setAttribute(key, getReactiveValue(value));
              })
            );
          }
        });
      }

      if (this.props.props) {
        entries(this.props.attrs).forEach(([key, value]) => {
          (this.domNode as any)![key] = getReactiveValue(value);
          if (isReactive(value)) {
            this.unsubs.push(
              value.subscribe(() => {
                (this.domNode as any)![key] = getReactiveValue(value);
              })
            );
          }
        });
      }

      const v = getPropValue(value);

      if (isReactive(value)) {
        this.unsubs.push(
          value.subscribe(() => {
            this.setProp(key, value.value);
          })
        );
      }

      this.setProp(key, v);
    });

    return this.domNode;
  }

  toHtml(): string {
    this.create();
    let s = `<${this.tag}`;

    const propsStrings: string[] = [];
    const keys = Object.keys(this.props);

    let content = "";

    for (const key of keys) {
      if (key === "on" || key === "children") continue;

      const value = this.props[key];

      if (key === "css") {
        const cls = this.css.getScopedCssClass(getReactiveValue(value));
        propsStrings.push(`class="${cls}"`);
      }
      //
      else if (key === "style") {
        propsStrings.push(
          `style="${styleObjToString(getReactiveValue(value))}"`
        );
      }
      //
      else if (key === "attrs") {
        entries(value).forEach(([k, v]) => {
          const keyAlias = ATTRIBUTE_ALIASES[k];

          propsStrings.push(`${keyAlias ?? k}="${getReactiveValue(v)}"`);
        });
      }
      //
      else if (key === "innerHtml") {
        content = getReactiveValue(value);
      }
    }

    if (propsStrings.length > 0) {
      s += ` ${propsStrings.join(" ")}`;
    }

    if (VOID_TAGS_MAP[this.tag]) {
      s += ">";
    } else {
      if (content === "") {
        content = createHtmlString(this.children);
      }
      s += `>${content}</${this.tag}>`;
    }

    return s;
  }

  callRef(el: HTMLElement | null) {
    if (!this.props.ref) return;
    this.props.ref(el);
  }

  onInsert() {
    onInsert(this.children);
    this.callRef(this.domNode!);
  }

  remove() {
    this.unsubs.forEach((u) => u());
    this.domNode?.remove();
    this.domNode = undefined;
    this.callRef(null);
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

const styleObjToString = (obj: any) => {
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
};

export const htm = <Tag extends keyof HTMLElementTagNameMap>(
  tag: Tag,
  props: HtmlProps<Tag>
) => new HtmlElement(tag, props);
