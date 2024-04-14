import { Computed } from "./Computed";
import { State } from "./State";

export type Dep = State<any> | Computed<any>;

export type Sub = () => void;

export type Reactive<Value = any> = State<Value> | Computed<Value>;

export type UnsubscribeFn = () => void;

export type SubReactive = {
  dispose: () => void;
};

export type EffectFn = () => any | EffectCleanupFn;

export type EffectCleanupFn = () => any;

export type EffectOptions = {
  timing?: "sync" | "afterPaint";
};
