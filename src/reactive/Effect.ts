import {
  Dep,
  EffectCleanupFn,
  EffectFn,
  EffectOptions,
  SubReactive,
  UnsubscribeFn,
} from "./types";

export class Effect implements SubReactive {
  constructor(deps: Dep[], fn: EffectFn, options?: EffectOptions) {
    this._fn = fn;
    this._timing = options?.timing ?? "sync";

    deps.forEach((d) =>
      d.subscribe(() => {
        this.scheduledRun();
      })
    );

    this.scheduledRun();
  }
  _fn;
  _cleanup: EffectCleanupFn | undefined;
  _timing;
  _unsubs: UnsubscribeFn[] = [];

  run() {
    if (this._cleanup) this._cleanup();
    this._cleanup = this._fn();
  }

  scheduledRun() {
    if (this._timing === "afterPaint") {
      requestAnimationFrame(() => this.run());
    }
    //
    else {
      this.run();
    }
  }

  dispose() {
    this._unsubs.forEach((u) => u());
  }
}
