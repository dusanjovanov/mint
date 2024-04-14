import { ELEMENT_BRAND } from "../constants";
import { isObject } from "./isObject";
import { SmllrElement } from "../types";

export const isMintElement = (v: any): v is SmllrElement => {
  return isObject(v) && v.brand === ELEMENT_BRAND;
};
