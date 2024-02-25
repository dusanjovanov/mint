import { ReactiveContext } from "./ReactiveContext";
import { Sub, Subs } from "./types";

export class State<Value> {
  constructor(initialValue: Value, ctx: ReactiveContext) {
    this._value = initialValue;
    this._ctx = ctx;
  }
  _value;
  _ctx;
  _subs: Subs = new Set();

  get value() {
    this._ctx.track(this);
    return this._value;
  }

  set value(newValue: Value) {
    const prevValue = this._value;
    this._value = newValue;
    if (prevValue !== this._value) {
      this._subs.forEach((s) => s._notify());
    }
  }

  _subscribe(sub: Sub) {
    this._subs.add(sub);
    return () => {
      this._subs.delete(sub);
    };
  }
}
