import {
  ELEMENT_BRAND,
  ELEMENT_TYPES,
  SVG_TAGS_MAP,
  VOID_TAGS_MAP,
} from "../constants";
import { createHtmlString } from "../createHtmlString";
import { onInsert } from "../onInsert";
import { DisposeFn, effectInternal } from "../reactive";
import { resolveNode } from "../resolveNode";
import {
  CssProperties,
  DataSet,
  HtmlElementTagNameMap,
  HtmlProps,
  SmlrElement,
  SmlrRenderer,
} from "../types";
import {
  addPxIfNeeded,
  camelToKebab,
  entries,
  getPropValue,
  isFunction,
} from "../utils";

export class HtmlElement implements SmlrElement {
  constructor(tag: string, props: any) {
    this.tag = tag;
    this.props = props ?? {};
    this.isSvg = SVG_TAGS_MAP[tag];
  }
  tag;
  isSvg;
  props;
  brand = ELEMENT_BRAND;
  type = ELEMENT_TYPES.html;
  domNode: HTMLElement | SVGElement | undefined;
  parent!: SmlrElement;
  index!: number;
  children: SmlrElement[] = [];
  prevStyle: CssProperties | undefined;
  prevData: DataSet | undefined;
  disposeFns: DisposeFn[] = [];
  useCleanup: DisposeFn | undefined;
  renderer!: SmlrRenderer;

  get isInserted() {
    return !!this.domNode?.isConnected;
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

  setProp(key: string, value: any) {
    if (key === "style") {
      this.setStyle(value);
    }
    //
    else if (key === "innerHtml") {
      this.domNode!.innerHTML = value;
    }
    //
    else if (PROP_MAP[key]) {
      (this.domNode as any)![key] = value;
    }
    //
    else {
      this.domNode!.setAttribute(
        ATTRIBUTE_ALIASES[key] ? ATTRIBUTE_ALIASES[key] : key,
        value
      );
    }
  }

  create() {
    this.children = resolveNode(this.props.node, this);
  }

  toDom() {
    this.create();

    this.domNode = this.isSvg
      ? document.createElementNS("http://www.w3.org/2000/svg", this.tag)
      : document.createElement(this.tag);

    this.domNode.append(...this.renderer.createElements(this.children));

    entries(this.props).forEach(([key, value]) => {
      if (key === "ref" || key === "use" || key === "node") return;

      if (isEventProp(key)) {
        this.domNode!.addEventListener(getEventTypeFromProp(key), value);
      }
      //
      else {
        if (isFunction(value)) {
          this.disposeFns.push(
            effectInternal(() => this.setProp(key, value()))
          );
        }
        //
        else {
          this.setProp(key, value);
        }
      }
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
      if (key === "on" || key === "node") continue;

      const value = this.props[key];

      if (key === "style") {
        propsStrings.push(`style="${styleObjToString(getPropValue(value))}"`);
      }
      //
      else if (key === "props") {
        entries(value).forEach(([k, v]) => {
          const keyAlias = ATTRIBUTE_ALIASES[k];

          propsStrings.push(`${keyAlias ?? k}="${getPropValue(v)}"`);
        });
      }
      //
      else if (key === "innerHtml") {
        content = getPropValue(value);
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

  callRef(el: HTMLElement | SVGElement | null) {
    this.props.ref?.(el);
  }

  onInsert() {
    onInsert(this.children);
    this.callRef(this.domNode!);
    this.useCleanup = this.props.use?.(this.domNode);
  }

  remove() {
    this.disposeFns.forEach((u) => u());
    this.domNode?.remove();
    this.domNode = undefined;
    this.callRef(null);
    this.useCleanup?.();
    this.useCleanup = undefined;
  }
}

export const htm = <Tag extends keyof HtmlElementTagNameMap>(
  tag: Tag,
  props: HtmlProps<Tag>
) => new HtmlElement(tag, props);

// html props treated as element properties ( not attributes )
export const PROP_MAP: Record<string, true> = {
  checked: true,
  selected: true,
  type: true,
  value: true,
  disabled: true,
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

const isEventProp = (key: string) => {
  return key.startsWith("on");
};

const EVENT_ALIAS_MAP: Record<string, string> = {
  doubleclick: "dblclick",
};

const getEventTypeFromProp = (key: string) => {
  const type = key.slice(2).toLowerCase();
  return type in EVENT_ALIAS_MAP ? EVENT_ALIAS_MAP[type] : type;
};
