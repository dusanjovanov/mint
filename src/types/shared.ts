import * as CSS from "csstype";
import { HtmlElement } from "../html";
import { CSSObject } from "./css";
import { DomEventProps } from "./events";
import { SmllrNode } from "./nodes";

export type CSSProperties = CSS.Properties<string | number>;

export type Booleanish = boolean | "true" | "false";

export type CrossOrigin = "anonymous" | "use-credentials" | "" | undefined;

export type SmllrDomProps<T extends HTMLElement | SVGElement> = {
  css?: CSSObject | (() => CSSObject);
  node?: SmllrNode;
  data?: DataSet;
  use?: (el: HtmlElement) => (() => void) | void;
} & DomEventProps<T>;

export type ReactiveProps<T> = {
  [key in keyof T]: T[key] | (() => T[key]);
};

export type DataSet = Record<string, any>;
