import { component } from "./component";
import { Head } from "./head";
import { Router } from "./router";
import { SmlrNode } from "./types";
import { createContext } from "./utils";

type AppProviderProps = AppContextProps & {
  children: SmlrNode;
};

type AppContextProps = {
  router: Router;
  head: Head;
};

export const AppProvider = component<AppProviderProps>(
  ($, { router, head, children }) => {
    setApp($, { router, head });
    return children;
  }
);

export const APP_PROVIDER_KEY = {};

export const [getApp, setApp] = createContext(
  (props: AppContextProps) => props,
  APP_PROVIDER_KEY
);
