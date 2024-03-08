import { SMLLR_EL_BRAND, UPPERCASE_LETTER_REGX } from "../constants";
import { CSSObject, SmllrElement, TextNode } from "../types";

export const isEventProp = (propKey: string) =>
  propKey !== "on" &&
  propKey.indexOf("on") === 0 &&
  UPPERCASE_LETTER_REGX.test(propKey[2]);

export const getEventTypeFromPropKey = (propKey: string) =>
  propKey.slice(2).toLowerCase();

export const isObject = (v: any): v is Record<string, any> =>
  v != null && typeof v === "object";

export const isSmllrElement = (v: any): v is SmllrElement => {
  return isObject(v) && v._brand === SMLLR_EL_BRAND;
};

export const isTextNode = (v: any): v is TextNode =>
  typeof v === "string" || typeof v === "number";

export const css = (css: CSSObject) => css;

export * from "./camelToKebab";
export * from "./cva";
export * from "./entries";
export * from "./findAncestorElement";
export * from "./getPropValue";
export * from "./isElementOfType";
export * from "./isFunction";
export * from "./simpleCtx";
