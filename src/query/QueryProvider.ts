import { QueryClient } from "@tanstack/query-core";
import { cp } from "../component";
import { SmlrNode } from "../types";
import { createContext } from "../utils";

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
