import { Computed } from "./Computed";
import { State } from "./State";

export type Sub = {
  _notify(): void;
  _dispose(): void;
  _deps: Subs[];
};

export type Reactive<Value> = State<Value> | Computed<Value>;

export type Subs = Set<Sub>;

export type EffectFn = () => any | EffectCleanupFn;

export type EffectCleanupFn = () => any;

export type EffectOptions = {
  timing?: "sync" | "afterPaint";
};

export type Dep = State<any> | Computed<any>;
