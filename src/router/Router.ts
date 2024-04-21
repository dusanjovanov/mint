import { cp } from "../component";
import { computed, signal } from "../reactive";
import { SmlrNode } from "../types";
import { createContext } from "../utils";
import { matchPath } from "./matchPath";
import { NavigateOptions, RouterMatches, RouterOptions } from "./types";

export type RouterProps = {
  config: RouterOptions;
  node: SmlrNode;
};

const createRouter = ({ history, routes }: RouterOptions) => {
  const matches = signal(new Map() as RouterMatches);

  const matchRoutes = () => {
    const newMatches: RouterMatches = new Map();

    routes.forEach((route) => {
      const match = matchPath(history.location.pathname, {
        path: route.path,
        exact: true,
      });
      newMatches.set(route.key, match);
    });
    matches.value = newMatches;
  };

  history.listen(() => {
    matchRoutes();
  });

  matchRoutes();

  return {
    navigate(path: string, options?: NavigateOptions) {
      if (options?.replace) {
        history.replace(path, options.state);
      }
      //
      else {
        history.push(path, options?.state);
      }
    },
    getMatch(key: string) {
      return computed(() => matches.value.get(key));
    },
    getParams<Params = Record<string, string>>(key: string) {
      return computed(() => matches.value.get(key)?.params! as Params);
    },
  };
};

export const Router = cp<RouterProps>(
  ({ config: { history, routes }, node }) => {
    const router = createRouter({ history, routes });
    setRouter(router);
    return node;
  }
);

export type SmlrRouter = ReturnType<typeof createRouter>;

export const [getRouter, setRouter] = createContext(
  (router: SmlrRouter) => router
);
