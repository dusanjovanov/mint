import { Reactive } from "../reactive";
import { isReactive } from "./isReactive";

export const getReactiveValue = <Value>(val: Value | Reactive<Value>) => {
  return isReactive(val) ? val.value : val;
};
