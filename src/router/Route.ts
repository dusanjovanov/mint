import { getApp } from "../AppProvider";
import { component } from "../component";
import { show } from "../show";
import { SmlrNode } from "../types";

type RouteProps = {
  key: string;
  children: SmlrNode;
};

export const Route = component<RouteProps>(($, { key, children }) => {
  const { router } = getApp($);

  return show(
    $.computed(() => {
      const match = router.matches.value.get(key);
      return !!match;
    }),
    children
  );
});
