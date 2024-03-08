import { show } from "../ShowElement";
import { cmp } from "../component";
import { SmllrNode } from "../types";
import { getRouterContext } from "./RouterProvider";

type RouteProps = {
  key: string;
  node: SmllrNode;
};

export const Route = cmp<RouteProps>(($, { key, node }) => {
  const router = getRouterContext($);

  return show(() => {
    const match = router.matches.value.get(key);
    return !!match;
  }, node);
});
