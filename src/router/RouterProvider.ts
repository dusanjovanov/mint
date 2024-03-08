import { simpleCtx } from "..";
import { cmp } from "../component";
import { SmllrNode } from "../types";
import { Router } from "./Router";

type RouterProviderProps = {
  router: Router;
  node: SmllrNode;
};

export const RouterProvider = cmp<RouterProviderProps>(
  ($, { router, node }) => {
    setRouterContext($, router);

    return node;
  }
);

export const [getRouterContext, setRouterContext] = simpleCtx(
  (router: Router) => router
);
