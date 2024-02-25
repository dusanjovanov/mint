import * as CSS from "csstype";
import { HtmlElement } from "../html";
import { CSSObject } from "./css";
import { DomEventProps } from "./events";
import { MintNode } from "./nodes";

export type CSSProperties = CSS.Properties<string | number>;

export type Booleanish = boolean | "true" | "false";

export type CrossOrigin = "anonymous" | "use-credentials" | "" | undefined;

export type MintDomProps<T extends HTMLElement | SVGElement> = {
  css?: CSSObject | (() => CSSObject);
  node?: MintNode;
  data?: Record<string, any>;
  use?: (el: HtmlElement) => (() => void) | void;
} & DomEventProps<T>;

export type ReactiveProps<T> = {
  [key in keyof T]: T[key] | (() => T[key]);
};