import { REACTIVE_BRAND } from "../constants";
import { Dep, Sub, SubReactive, UnsubscribeFn } from "./types";

export class Computed<Value> implements SubReactive {
  constructor(deps: Dep[], compute: () => Value) {
    this._value = compute();

    deps.forEach((d) => {
      this._unsubs.push(
        d.subscribe(() => {
          this._value = compute();
          this._subs.forEach((s) => s());
        })
      );
    });
  }
  brand = REACTIVE_BRAND;
  _value;
  _subs = new Set<Sub>();
  _unsubs: UnsubscribeFn[] = [];

  get value() {
    return this._value;
  }

  subscribe(sub: Sub) {
    this._subs.add(sub);
    return () => {
      this._subs.delete(sub);
    };
  }

  dispose() {
    this._unsubs.forEach((u) => u());
  }
}
