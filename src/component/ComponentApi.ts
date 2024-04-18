import { getApp } from "../AppProvider";
import { getContext } from "../getContext";
import { ComponentElement, LifecycleCallback } from "./ComponentElement";

export class ComponentApi {
  constructor(el: ComponentElement<any>) {
    this.el = el;
  }
  el;

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
