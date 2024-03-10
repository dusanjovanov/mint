import { createContext } from "..";
import { component } from "../component";
import { SmllrNode } from "../types";
import { Router } from "./Router";

type RouterProviderProps = {
  router: Router;
  node: SmllrNode;
};

export const RouterProvider = component<RouterProviderProps>(
  ($, { router, node }) => {
    setRouterContext($, router);

    return node;
  }
);

export const [getRouterContext, setRouterContext] = createContext(
  (router: Router) => router
);
