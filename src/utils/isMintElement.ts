import { ELEMENT_BRAND } from "../constants";
import { isObject } from "./isObject";
import { SmlrElement } from "../types";

export const isMintElement = (v: any): v is SmlrElement => {
  return isObject(v) && v.brand === ELEMENT_BRAND;
};
