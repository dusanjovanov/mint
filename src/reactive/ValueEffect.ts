import { ReactiveContext } from "./ReactiveContext";
import { Sub, Subs } from "./types";

export class ValueEffect<Value> implements Sub {
  constructor(
    compute: () => Value,
    eff: (value: Value) => void,
    ctx: ReactiveContext
  ) {
    this._compute = compute;
    this._eff = eff;
    this._ctx = ctx;
  }
  _compute;
  _eff;
  _ctx;
  _value!: Value;
  _isDirty = true;
  _deps: Subs[] = [];

  get value() {
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
    this._eff(this._value);
  }

  _dispose() {
    this._deps.forEach((d) => d.delete(this));
  }
}
