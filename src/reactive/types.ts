import { Signal } from "@preact/signals-core";

export type Dep = any;

export type Sub = () => void;

export type Reactive<Value = any> = Signal<Value>;

export type UnsubscribeFn = () => void;

export type SubReactive = {
  dispose: () => void;
};

export type EffectFn = () => any | EffectCleanupFn;

export type EffectCleanupFn = () => any;

export type EffectOptions = {
  timing?: "sync" | "afterPaint";
};

export { Signal };
