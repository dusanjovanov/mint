import { ReactiveProp } from "../types";
import { isReactive } from "./isReactive";

/** Safely get a reactive prop value. */
export const getPropValue = <Value>(value: ReactiveProp<Value>) => {
  return isReactive(value) ? value.value : value;
};
