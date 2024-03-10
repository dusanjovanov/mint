import * as CSS from "csstype";
import { CSSObject } from "./css";
import { DomEventProps } from "./events";
import { SmllrNode } from "./nodes";
import { ReactiveProp } from "./utils";

export type CSSProperties = CSS.Properties<string | number>;

export type Booleanish = boolean | "true" | "false";

export type CrossOrigin = "anonymous" | "use-credentials" | "" | undefined;

export type DataSet = Record<string, any>;

export type SmllrDomProps<T extends HTMLElement | SVGElement> = {
  css?: ReactiveProp<CSSObject>;
  node?: SmllrNode;
  data?: DataSet;
  use?: UseFn<T>;
} & DomEventProps<T>;

export type UseFn<T extends Element> = (el: T) => UseRemoveFn | void;

export type UseRemoveFn = () => void;
