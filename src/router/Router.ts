import { App } from "../App";
import { Effect, State } from "../reactive";
import {
  NavigateOptions,
  RouteMatch,
  RouterLocation,
  RouterMatches,
  RouterOptions,
} from "./types";

export class Router {
  constructor(options: RouterOptions, app: App) {
    this.location = new State(this._getCurrentLocation(), app.ctx);
    this.routes = options.routes;

    this.matches = new State(new Map() as RouterMatches, app.ctx);

    new Effect([this.location], () => {
      this._matchRoutes();
    });

    window.addEventListener("popstate", () => {
      this.location.value = this._getCurrentLocation();
    });
  }
  location;
  matches;
  routes;

  _getCurrentLocation(): RouterLocation {
    return {
      url: new URL(window.location.href),
      state: window.history.state,
    };
  }

  _matchRoutes() {
    const newMatches: RouterMatches = new Map();

    this.routes.forEach((route) => {
      const match = this._matchRoute(
        this.location.value.url.pathname,
        route.path
      );
      newMatches.set(route.key, match);
    });
    this.matches.value = newMatches;
  }

  _matchRoute(urlPath: string, routePath: string): RouteMatch | null {
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
    const newUrl = new URL(this.location.value.url);
    newUrl.pathname = path;

    const newLocation: RouterLocation = {
      url: newUrl,
      state: options?.state ?? {},
    };

    if (options?.replace) {
      window.history.replaceState(options.state, "", newUrl);
    }
    //
    else {
      window.history.pushState(options?.state, "", newUrl);
    }
    this.location.value = newLocation;
  }
}
