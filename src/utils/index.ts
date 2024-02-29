import { SMLLR_EL_BRAND } from "../constants";
import { SmllrElement, TextNode } from "../types";

export const UPPERCASE_LETTER_REGX = /[A-Z]/;
export const UPPERCASE_LETTER_G_REGX = new RegExp(
  UPPERCASE_LETTER_REGX,
  UPPERCASE_LETTER_REGX.flags + "g"
);

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

export const findAncestorElement = (
  startEl: SmllrElement,
  condition: (current: SmllrElement) => boolean
): SmllrElement | undefined => {
  let current = startEl;

  while (current && !condition(current)) {
    current = current._parent;
  }

  return current as SmllrElement;
};

export * from "./getPropValue";
export * from "./isElementOfType";
export * from "./isFunction";
