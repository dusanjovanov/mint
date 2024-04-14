import { component } from "../component";
import { SmllrNode } from "../types";
import { createContext } from "../utils";
import { Router } from "./Router";

type RouterProviderProps = {
  router: Router;
  children: SmllrNode;
};

export const RouterProvider = component<RouterProviderProps>(
  ($, { router, children }) => {
    setRouterContext($, router);
    return children;
  }
);

export const [getRouter, setRouterContext] = createContext(
  (router: Router) => router
);
