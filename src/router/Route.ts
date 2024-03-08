import { show } from "../ShowElement";
import { cmp } from "../component";
import { SmllrNode } from "../types";
import { Router } from "./Router";
import { ROUTER_CTX } from "./constants";

type RouteProps = {
  key: string;
  node: SmllrNode;
};

export const Route = cmp<RouteProps>(($, { key, node }) => {
  const router = $.getContext<Router>(ROUTER_CTX);

  return show(() => {
    const match = router.matches.value.get(key);
    return !!match;
  }, node);
});
