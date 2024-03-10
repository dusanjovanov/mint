import { ComponentApi } from "../component";

/** Helper for creating a context getter and setter. */
export const createContext = <Value, Props = void>(
  fn: (props: Props) => Value,
  key: any = {}
) => {
  return [
    ($: ComponentApi) => $.getContext<Value>(key),
    ($: ComponentApi, props: Props) => $.setContext(key, fn(props)),
  ] as const;
};
