import { show } from "../show/ShowElement";
import { component } from "../component";
import { SmllrNode } from "../types";
import { getRouterContext } from "./RouterProvider";

type RouteProps = {
  key: string;
  node: SmllrNode;
};

export const Route = component<RouteProps>(($, { key, node }) => {
  const router = getRouterContext($);

  return show(() => {
    const match = router.matches.value.get(key);
    return !!match;
  }, node);
});
