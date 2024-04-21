import { QueryObserver, QueryObserverOptions } from "@tanstack/query-core";
import { effect, signal } from "../reactive";
import { getQueryClient } from "./QueryProvider";

export const query = (options: QueryObserverOptions) => {
  const client = getQueryClient();
  const defaultedOptions = client.defaultQueryOptions(options);

  const observer = new QueryObserver(client, defaultedOptions);

  const result = observer.getOptimisticResult(defaultedOptions);

  const myResult = signal(result);

  effect(() => {
    return observer.subscribe(() => {
      observer.updateResult();
      myResult.value = observer.getCurrentResult();
    });
  });

  return myResult;
};
