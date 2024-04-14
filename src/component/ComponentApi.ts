import { getApp } from "../AppProvider";
import { getContext } from "../getContext";
import { Computed, Dep, Effect, EffectOptions, State } from "../reactive";
import { ComponentElement, LifecycleCallback } from "./ComponentElement";

export class ComponentApi {
  constructor(el: ComponentElement<any>) {
    this.el = el;
  }
  el;

  state<Value>(initialValue: Value) {
    return new State(initialValue);
  }

  computed<Value>(deps: Dep[], compute: () => Value) {
    const c = new Computed(deps, compute);
    this.el.subReactives.add(c);
    return c;
  }

  effect(deps: Dep[], run: () => void, options?: EffectOptions) {
    const eff = new Effect(deps, run, { timing: "afterPaint", ...options });
    this.el.subReactives.add(eff);
  }

  setContext<Value>(key: any, value: Value) {
    this.el.context.set(key, value);
  }

  getContext<Value>(key: any) {
    if (this.el.context.has(key)) {
      return this.el.context.get(key) as Value;
    }
    return getContext<Value>(key, this.el);
  }

  /** Called when component is inserted into the DOM. */
  onInsert(cb: LifecycleCallback) {
    this.el.onInsertCbs.push(cb);
  }

  /** Called when component is removed from the DOM. */
  onRemove(cb: LifecycleCallback) {
    this.el.onRemoveCbs.push(cb);
  }

  get app() {
    return getApp(this);
  }
}
