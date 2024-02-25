import { ReactiveContext } from "./ReactiveContext";
import { Sub, Subs } from "./types";

export class Computed<Value> implements Sub {
  constructor(compute: () => Value, ctx: ReactiveContext) {
    this._compute = compute;
    this._ctx = ctx;
  }
  _value!: Value;
  _compute;
  _isDirty = true;
  _subs: Subs = new Set();
  _ctx;
  _deps: Subs[] = [];

  get value() {
    this._ctx.track(this);
    if (this._isDirty) {
      this._ctx.setCurrent(this);
      this._value = this._compute();
      this._isDirty = false;
      this._ctx.setCurrent(undefined);
    }
    return this._value;
  }

  _notify() {
    this._isDirty = true;
    this._subs.forEach((s) => s._notify());
  }

  _dispose() {
    this._deps.forEach((d) => d.delete(this));
  }

  _subscribe(sub: Sub) {
    this._subs.add(sub);
    return () => {
      this._subs.delete(sub);
    };
  }
}
