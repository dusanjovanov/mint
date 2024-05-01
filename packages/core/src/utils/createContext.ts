import { getContext, setContext } from "../component";

export const createContext = <Value, Props = void>(
  fn: (props: Props) => Value,
  key: any = {}
) => {
  return [
    () => getContext<Value>(key),
    (props: Props) => setContext(key, fn(props)),
  ] as const;
};
