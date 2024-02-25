import {
  Dep,
  EffectCleanupFn,
  EffectFn,
  EffectOptions,
  Sub,
  Subs,
} from "./types";

export class Effect implements Sub {
  constructor(deps: Dep[], fn: EffectFn, options?: EffectOptions) {
    this._deps = deps.map((d) => d._subs);
    this._fn = fn;
    this._timing = options?.timing ?? "sync";

    deps.forEach((d) => d._subscribe(this));

    this._scheduledRun();
  }
  _deps: Subs[] = [];
  _fn;
  _cleanup: EffectCleanupFn | undefined;
  _timing;

  _run() {
    if (this._cleanup) this._cleanup();
    this._cleanup = this._fn();
  }

  _scheduledRun() {
    if (this._timing === "afterPaint") {
      requestAnimationFrame(() => this._run());
    }
    //
    else {
      this._run();
    }
  }

  _notify() {
    this._scheduledRun();
  }

  _dispose() {
    this._cleanup?.();
    for (const subs of this._deps) {
      subs.delete(this);
    }
    this._deps.length = 0;
  }
}
