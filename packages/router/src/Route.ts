import { cp } from "../../core/src/component";
import { show } from "../../core/src/show";
import { SmlrNode } from "../../core/src/types";
import { getRouter } from "./Router";

type RouteProps = {
  key: string;
  node: SmlrNode;
};

export const Route = cp<RouteProps>(({ key, node }) => {
  const router = getRouter();

  return show(() => !!router.getMatch(key).value, node);
});
