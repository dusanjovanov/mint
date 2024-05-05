import { isObject } from "../utils";
import { CanvasElement } from "./CanvasElement";
import { CANVAS_EL_TYPE } from "./const";

export const isCanvasElement = (v: any): v is CanvasElement => {
  return isObject(v) && v.type === CANVAS_EL_TYPE;
};
