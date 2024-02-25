import { Reactive, Sub } from "./types";

export class ReactiveContext {
  currentSub: Sub | undefined;

  track(reactive: Reactive<any>) {
    if (!this.currentSub) return;
    reactive._subs.add(this.currentSub);
    this.currentSub._deps.push(reactive._subs);
  }

  setCurrent(sub: Sub | undefined) {
    this.currentSub = sub;
  }
}
