import * as CSS from "csstype";

export type CssProperties = CSS.Properties<string | number>;

export type TextNode = string | number;

export type EmptyNode = boolean | null | undefined;

export type SmlrNode =
  | EmptyNode
  | TextNode
  | Function
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

export type DomNode = HTMLElement | SVGElement | Text;

type A = HTMLElementEventMap;

export type HtmlProps<Tag extends keyof HtmlElementTagNameMap> = {
  node?: SmlrNode;
  ref?: Ref<HtmlElementTagNameMap[Tag]>;
  use?: UseFn<HtmlElementTagNameMap[Tag]>;
} & ReactiveProps<HtmlAttributes> &
  HtmlEvents<HtmlElementTagNameMap[Tag]>;

type HtmlEvents<E extends Element> = {
  onClick?: (e: MouseEvent & { currentTarget: E }) => void;
  onMouseDown?: (e: MouseEvent & { currentTarget: E }) => void;
  onKeyDown?: (e: KeyboardEvent & { currentTarget: E }) => void;
  onSubmit?: (e: SubmitEvent & { currentTarget: E }) => void;
  onInput?: (e: Event & { currentTarget: E }) => void;
  onChange?: (e: Event & { currentTarget: E }) => void;
};

type HtmlAttributes = {
  style?: CssProperties;
  innerHtml?: string;
  className?: string;
  id?: string | number;
  name?: string;
  htmlFor?: string;
  href?: string;
  type?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  value?: string | number;
  popover?: boolean | string;
  popovertarget?: string;
  checked?: boolean;
  width?: string | number;
  height?: string | number;
  viewBox?: string;
  ["clip-rule"]?: string;
  ["fill-rule"]?: string;
  ["stroke-linejoin"]?: string;
  ["stroke-miterlimit"]?: string;
  d?: string;
};

export type ReactiveProps<T> = {
  [Key in keyof T]: ReactiveProp<T[Key]>;
};

export type ReactiveProp<T> = T | (() => T);

export type DataSet = Record<string, any>;

export type Ref<E extends Element> = (el: E | null) => void;

export type UseFn<E extends Element> = (el: E) => void;

export type HtmlElementTagNameMap = HTMLElementTagNameMap &
  SVGElementTagNameMap;
