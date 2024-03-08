import { ComponentApi } from "../component";

/** Simple helper for creating a context getter and setter. */
export const simpleCtx = <Value, Props = void>(
  fn: (props: Props) => Value,
  key: any = {}
) => {
  return [
    ($: ComponentApi) => $.getContext<Value>(key),
    ($: ComponentApi, props: Props) => $.setContext(key, fn(props)),
  ] as const;
};
