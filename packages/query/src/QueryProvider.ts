import { QueryClient } from "@tanstack/query-core";
import { cp } from "../../core/src/component";
import { SmlrNode } from "../../core/src/types";
import { createContext } from "../../core/src/utils";

export type QueryProviderProps = {
  queryClient: QueryClient;
  node: SmlrNode;
};

export const QueryProvider = cp<QueryProviderProps>(({ queryClient, node }) => {
  setQueryClient(queryClient);
  return node;
});

export const [getQueryClient, setQueryClient] = createContext(
  (queryClient: QueryClient) => queryClient
);
