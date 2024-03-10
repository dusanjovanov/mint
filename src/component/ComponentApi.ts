import { Computed, Dep, Effect, State } from "../reactive";
import { findAncestorElement, isElementOfType } from "../utils";
import { ComponentElement, LifecycleCallback } from "./ComponentElement";

export class ComponentApi<Props = any> {
  constructor(el: ComponentElement<Props>) {
    this.el = el;
  }
  el;

  state<Value>(initialValue: Value) {
    return new State(initialValue, this.el.app.ctx);
  }

  computed<Value>(compute: () => Value) {
    const c = new Computed(compute, this.el.app.ctx);
    this.el.subs.add(c);
    return c;
  }

  effect(deps: Dep[], run: () => void) {
    const eff = new Effect(deps, run, { timing: "afterPaint" });
    this.el.subs.add(eff);
  }

  setContext<Value>(key: any, value: Value) {
    this.el.contextMap.set(key, value);
  }

  getContext<Value>(key: any) {
    if (this.el.contextMap.has(key)) {
      return this.el.contextMap.get(key) as Value;
    }
    const compnentElWithContext = findAncestorElement(
      this.el,
      (current) =>
        isElementOfType(current, "cmp") && current.contextMap.has(key)
    ) as ComponentElement<any>;

    return compnentElWithContext.contextMap.get(key) as Value;
  }

  /** Called when component is inserted into the DOM. */
  onInsert(cb: LifecycleCallback) {
    this.el.insertCbs.push(cb);
  }

  /** Called when component is removed from the DOM. */
  onRemove(cb: LifecycleCallback) {
    this.el.removeCbs.push(cb);
  }
}
