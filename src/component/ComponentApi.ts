import { Computed, Dep, Effect, State } from "../reactive";
import { findAncestorElement, isElementOfType } from "../utils";
import { ComponentElement } from "./ComponentElement";

export class ComponentApi<Props = any> {
  constructor(el: ComponentElement<Props>) {
    this._el = el;
  }
  _el;

  state<Value>(initialValue: Value) {
    return new State(initialValue, this._el.app.ctx);
  }

  computed<Value>(compute: () => Value) {
    const c = new Computed(compute, this._el.app.ctx);
    this._el._subs.add(c);
    return c;
  }

  effect(deps: Dep[], run: () => void) {
    const eff = new Effect(deps, run, { timing: "afterPaint" });
    this._el._subs.add(eff);
  }

  setContext<Value>(key: any, value: Value) {
    this._el._context.set(key, value);
  }

  getContext<Value>(key: any) {
    if (this._el._context.has(key)) {
      return this._el._context.get(key) as Value;
    }
    const compnentElWithContext = findAncestorElement(
      this._el,
      (current) => isElementOfType(current, "cmp") && current._context.has(key)
    ) as ComponentElement<any>;

    return compnentElWithContext._context.get(key) as Value;
  }
}
