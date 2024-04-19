import { Signal } from "@preact/signals-core";

export type Reactive<Value = any> = Signal<Value>;

export type DisposeFn = () => void;
