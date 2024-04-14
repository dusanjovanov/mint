import { createHtmlString } from "./createHtmlString";
import { resolveNode } from "./resolveNode";
import { Router, RouterProvider } from "./router";
import { SmllrElement, SmllrNode } from "./types";

export const ssr = (node: SmllrNode, options: SsrOptions) => {
  const elements = resolveNode(
    RouterProvider({ router: options.router, children: node }),
    {} as SmllrElement
  );
  return createHtmlString(elements);
};

type SsrOptions = {
  router: Router;
};
