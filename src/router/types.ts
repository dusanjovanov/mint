export type RouterLocation = {
  url: URL;
  state?: any;
};

export type RouterOptions = {
  routes: RouteConfig[];
};

export type RouteConfig = {
  key: string;
  path: string;
};

export type RouteMatch = {
  params: Record<string, any>;
};

export type RouterMatches = Map<string, RouteMatch | null>;

export type NavigateOptions = {
  replace?: boolean;
  state?: any;
};
