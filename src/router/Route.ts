import { show } from "../ShowElement";
import { cmp } from "../component";
import { MintNode } from "../types";
import { Router } from "./Router";
import { ROUTER_CTX } from "./constants";

type RouteProps = {
  key: string;
  node: MintNode;
};

export const Route = cmp<RouteProps>(($) => {
  const { key, node } = $.props;

  const router = $.getContext<Router>(ROUTER_CTX);

  return show(() => {
    const match = router.matches.value.get(key);
    return !!match;
  }, node);
});
