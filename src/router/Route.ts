import { component } from "../component";
import { show } from "../show";
import { SmllrNode } from "../types";
import { getRouter } from "./RouterProvider";

type RouteProps = {
  key: string;
  children: SmllrNode;
};

export const Route = component<RouteProps>(($, { key, children }) => {
  const router = getRouter($);

  return show(
    $.computed([router.matches], () => {
      const match = router.matches.value.get(key);
      return !!match;
    }),
    children
  );
});
