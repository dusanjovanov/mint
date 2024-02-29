import { isFunction } from "./isFunction";

export const getPropValue = <Value>(value: Value | (() => Value)) => {
  return isFunction(value) ? value() : value;
};
