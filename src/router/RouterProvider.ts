import { cmp } from "../component";
import { MintNode } from "../types";
import { Router } from "./Router";
import { ROUTER_CTX } from "./constants";

type RouterProviderProps = {
  router: Router;
  node: MintNode;
};

export const RouterProvider = cmp<RouterProviderProps>(($) => {
  const { router, node } = $.props;

  $.setContext(ROUTER_CTX, router);

  return node;
});
