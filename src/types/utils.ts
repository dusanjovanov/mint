export type ReactiveProps<T> = {
  [key in keyof T]: T[key] | (() => T[key]);
};

export type ReactiveProp<Value = any> = Value | (() => Value);

export type UnwrapReactiveProp<T extends ReactiveProp> = Exclude<T, Function>;
