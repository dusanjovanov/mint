import { createHtmlString } from "./createHtmlString";
import { Css, CssProvider } from "./css";
import { resolveNode } from "./resolveNode";
import { Router, RouterProvider } from "./router";
import { SmllrElement, SmllrNode } from "./types";

export const ssr = (node: SmllrNode, options: SsrOptions) => {
  let toRender = node;

  if (options.router) {
    toRender = RouterProvider({ router: options.router, children: toRender });
  }
  if (options.css) {
    toRender = CssProvider({ css: options.css, children: toRender });
  }

  const elements = resolveNode(toRender, {} as SmllrElement);
  return createHtmlString(elements);
};

export type SsrOptions = {
  router?: Router;
  css?: Css;
};
