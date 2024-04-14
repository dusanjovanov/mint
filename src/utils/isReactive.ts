import { REACTIVE_BRAND, STATE_TYPE } from "../constants";
import { Reactive, State } from "../reactive";
import { isObject } from "./isObject";

export const isReactive = (v: any): v is Reactive => {
  return isObject(v) && v.brand === REACTIVE_BRAND;
};

export const isState = <Value>(v: any): v is State<Value> => {
  return isObject(v) && v.type === STATE_TYPE;
};
