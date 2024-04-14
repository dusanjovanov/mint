import * as CSS from "csstype";
import { Reactive } from "../reactive";
import { CSSObject } from "./css";

export type CssProperties = CSS.Properties<string | number>;

export type TextNode = string | number;

export type EmptyNode = boolean | null | undefined;

export type SmlrNode =
  | EmptyNode
  | TextNode
  | Reactive
  | SmlrElement
  | SmlrNode[];

export type SmlrElement = {
  brand: symbol;
  type: symbol;
  parent: SmlrElement;
  index: number;
  children?: SmlrElement[];
  isInserted: boolean;
  getFirstNode(): DomNode | undefined;
  getNodes(): DomNode[];
  toDom(): Node | Node[];
  toHtml(): string;
  onInsert(): void;
  remove(): void;
};

export type DomNode = HTMLElement | Text;

export type HtmlProps<Tag extends keyof HTMLElementTagNameMap> = {
  /** Events */
  on?: {
    [Type in keyof HTMLElementEventMap]?: (
      e: HTMLElementEventMap[Type] & {
        currentTarget: HTMLElementTagNameMap[Tag];
      }
    ) => void;
  };
  /** Set via `el.setAttribute` */
  attrs?: Record<string, any>;
  /** Set directly on the element `el[key] = value` */
  props?: Record<string, any>;
  children?: SmlrNode;
  show?: Reactive<any>;
  style?: ReactiveProp<CssProperties>;
  css?: ReactiveProp<CssProp>;
  innerHtml?: ReactiveProp<string>;
};

export type ReactiveProps<T> = {
  [Key in keyof T]: ReactiveProp<T[Key]>;
};

export type ReactiveProp<T> = T | Reactive<T>;

export type DataSet = Record<string, any>;

export type CssProp = ReactiveProp<CSSObject | CSSObject[]>;

export type Ref<E extends Element> = (el: E | null) => void;
