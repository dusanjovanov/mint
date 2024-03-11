import { getPropValue } from "..";
import { CssProp } from "../types";
import { mergeDeep } from "../utils";

export const cssPropToObject = (cssProp: CssProp) => {
  const value = getPropValue(cssProp);
  return Array.isArray(value) ? mergeDeep(...value) : value;
};
