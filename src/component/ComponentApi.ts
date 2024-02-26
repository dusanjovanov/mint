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

  setContext<Value>(key: string, value: Value) {
    this._el._context[key] = value;
  }

  getContext<Value>(key: string) {
    if (key in this._el._context) {
      return this._el._context[key] as Value;
    }
    const compnentElWithContext = findAncestorElement(
      this._el,
      (current) => isElementOfType(current, "cmp") && key in current._context
    ) as ComponentElement<any>;

    if (!compnentElWithContext) {
      throw new Error(`No context with key "${key}" has been set.`);
    }

    return compnentElWithContext._context[key] as Value;
  }

  get props() {
    return this._el._props;
  }
}
