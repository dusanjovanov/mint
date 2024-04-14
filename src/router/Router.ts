import { State } from "../reactive";
import {
  NavigateOptions,
  RouteMatch,
  RouterMatches,
  RouterOptions,
} from "./types";

export class Router {
  constructor({ history, routes }: RouterOptions) {
    this.history = history;
    this.routes = routes;
    this.history.listen(() => {
      this.matchRoutes();
    });
    this.matches = new State(new Map() as RouterMatches);
    this.matchRoutes();
  }
  matches;
  routes;
  history;

  matchRoutes() {
    const newMatches: RouterMatches = new Map();

    this.routes.forEach((route) => {
      const match = this.matchPath(this.history.location.pathname, route.path);
      newMatches.set(route.key, match);
    });
    this.matches.value = newMatches;
  }

  matchPath(urlPath: string = "", routePath: string): RouteMatch | null {
    if (routePath === "/") {
      if (urlPath === "/") return { params: {} };
      else return null;
    }

    const urlParts = urlPath.split("/").filter(Boolean);
    const routeParts = routePath.split("/").filter(Boolean);

    const urlPartsLen = urlParts.length;
    const routePartsLen = routeParts.length;

    if (routePartsLen > urlPartsLen) return null;

    const minLen = Math.min(urlPartsLen, routePartsLen);

    const params: any = {};

    for (let i = 0; i < minLen; i++) {
      const urlPart = urlParts[i];
      const routePart = routeParts[i];

      const isParam = routePart.startsWith(":");

      if (isParam) {
        params[routePart.slice(1)] = urlPart;
      }
      //
      else {
        if (routePart !== urlPart) return null;
      }
    }

    return {
      params,
    };
  }

  navigate(path: string, options?: NavigateOptions) {
    if (options?.replace) {
      this.history.replace(path, options.state);
    }
    //
    else {
      this.history.push(path, options?.state);
    }
  }
}
