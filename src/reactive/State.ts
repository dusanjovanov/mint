import { REACTIVE_BRAND, STATE_TYPE } from "../constants";
import { Sub } from "./types";

export class State<Value> {
  constructor(initialValue: Value) {
    this._value = initialValue;
  }
  brand = REACTIVE_BRAND;
  type = STATE_TYPE;
  _value;
  _subs = new Set<Sub>();

  get value() {
    return this._value;
  }

  set value(value: Value) {
    this._value = value;
    this._subs.forEach((s) => s());
  }

  subscribe(sub: Sub) {
    this._subs.add(sub);
    return () => {
      this._subs.delete(sub);
    };
  }
}
