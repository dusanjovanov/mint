import { Reactive } from "../reactive";
import { isObject } from "./isObject";

export const isReactive = (v: any): v is Reactive => {
  return isObject(v) && v.brand === Symbol.for("preact-signals");
};
