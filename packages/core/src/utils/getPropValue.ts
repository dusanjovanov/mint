import { ReactiveProp } from "../types";
import { isFunction } from "./isFunction";

/** Safely get a reactive prop value. */
export const getPropValue = <Value>(value: ReactiveProp<Value>) => {
  return isFunction(value) ? value() : value;
};
