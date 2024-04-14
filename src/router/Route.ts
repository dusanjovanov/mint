import { getApp } from "../AppProvider";
import { component } from "../component";
import { show } from "../show";
import { SmllrNode } from "../types";

type RouteProps = {
  key: string;
  children: SmllrNode;
};

export const Route = component<RouteProps>(($, { key, children }) => {
  const { router } = getApp($);

  return show(
    $.computed([router.matches], () => {
      const match = router.matches.value.get(key);
      return !!match;
    }),
    children
  );
});
