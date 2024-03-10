import { SMLLR_EL_BRAND } from "../constants";
import { SmllrElement } from "../types";
import { isObject } from "./isObject";

export const isSmllrElement = (v: any): v is SmllrElement => {
  return isObject(v) && v.brand === SMLLR_EL_BRAND;
};
