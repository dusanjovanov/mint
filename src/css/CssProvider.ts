import { component } from "../component";
import { SmllrNode } from "../types";
import { createContext } from "../utils";
import { Css } from "./Css";

type CssProviderProps = {
  css: Css;
  children: SmllrNode;
};

export const CssProvider = component<CssProviderProps>(
  ($, { css, children }) => {
    setCss($, css);
    return children;
  }
);

export const CSS_PROVIDER_KEY = {};

export const [getCss, setCss] = createContext(
  (css: Css) => css,
  CSS_PROVIDER_KEY
);
