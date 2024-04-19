import { cp } from "./component";
import { Head } from "./head";
import { SmlrNode } from "./types";

type AppProviderProps = AppContextProps & {
  children: SmlrNode;
};

type AppContextProps = {
  head: Head;
};

export const AppProvider = cp<AppProviderProps>(({ head, children }) => {
  return children;
});

export const APP_PROVIDER_KEY = {};
