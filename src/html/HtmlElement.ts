import { ELEMENT_BRAND, ELEMENT_TYPES, VOID_TAGS_MAP } from "../constants";
import { createDomNodes } from "../createDomNodes";
import { createHtmlString } from "../createHtmlString";
import { onInsert } from "../onInsert";
import { DisposeFn, effect } from "../reactive";
import { resolveNode } from "../resolveNode";
import { CssProperties, DataSet, HtmlProps, SmlrElement } from "../types";
import {
  addPxIfNeeded,
  camelToKebab,
  entries,
  getPropValue,
  getReactiveValue,
  isReactive,
} from "../utils";

export class HtmlElement implements SmlrElement {
  constructor(tag: string, props: any) {
    this.tag = tag;
    this.props = props ?? {};
  }
  tag;
  props;
  brand = ELEMENT_BRAND;
  type = ELEMENT_TYPES.html;
  domNode: HTMLElement | undefined;
  parent!: SmlrElement;
  index!: number;
  children: SmlrElement[] = [];
  prevStyle: CssProperties | undefined;
  prevData: DataSet | undefined;
  unsubs: DisposeFn[] = [];

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

  setSpecialProp(key: string, value: any) {
    if (!this.domNode) return;

    if (key === "style") {
      this.setStyle(value);
    }
    //
    else if (key === "cls") {
      this.domNode.className = value;
    }
    //
    else if (key === "innerHtml") {
      this.domNode.innerHTML = value;
    }
  }

  setProp(key: string, value: any) {
    if (PROP_MAP[key]) {
      (this.domNode as any)![key] = value;
    }
    //
    else {
      this.domNode!.setAttribute(key, value);
    }
  }

  create() {
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

      if (this.props.props) {
        entries(this.props.props).forEach(([key, value]) => {
          this.unsubs.push(
            effect(() => this.setProp(key, getReactiveValue(value)))
          );
        });
      }

      const v = getPropValue(value);

      if (isReactive(value)) {
        this.unsubs.push(effect(() => this.setSpecialProp(key, value.value)));
      }

      this.setSpecialProp(key, v);
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

      if (key === "style") {
        propsStrings.push(
          `style="${styleObjToString(getReactiveValue(value))}"`
        );
      }
      //
      else if (key === "props") {
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
