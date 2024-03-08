import { cmp } from "../component";
import { SmllrNode } from "../types";
import { Router } from "./Router";
import { ROUTER_CTX } from "./constants";

type RouterProviderProps = {
  router: Router;
  node: SmllrNode;
};

export const RouterProvider = cmp<RouterProviderProps>(
  ($, { router, node }) => {
    $.setContext(ROUTER_CTX, router);

    return node;
  }
);
