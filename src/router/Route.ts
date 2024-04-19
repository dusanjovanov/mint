import { cp } from "../component";
import { show } from "../show";
import { SmlrNode } from "../types";
import { getRouter } from "./Router";

type RouteProps = {
  key: string;
  children: SmlrNode;
};

export const Route = cp<RouteProps>(({ key, children }) => {
  const router = getRouter();

  console.log(router.getMatch(key));

  return show(router.getMatch(key), children);
});
