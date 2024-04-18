import { AppProvider } from "./AppProvider";
import { createHtmlString } from "./createHtmlString";
import { Head } from "./head";
import { resolveNode } from "./resolveNode";
import { Router, RouterOptions, createMemoryHistory } from "./router";
import { SmlrElement, SmlrNode } from "./types";

export const ssr = (node: SmlrNode, options: SsrOptions) => {
  const router = new Router({
    history: createMemoryHistory({
      initialEntries: options.pathname ? [options.pathname] : ["/"],
    }),
    routes: options.routes,
  });

  const head = new Head(true);

  const elements = resolveNode(
    AppProvider({
      router,
      head,
      children: node,
    }),
    {} as SmlrElement
  );

  let bodyHtml = createHtmlString(elements);

  if (options.clientBundlePath) {
    bodyHtml += `<script src=${options.clientBundlePath}></script>`;
  }

  return `<head>${head.html}</head><body><div id="root">${bodyHtml}</div></body>`;
};

export type SsrOptions = {
  routes: RouterOptions["routes"];
  pathname?: string;
  clientBundlePath?: string;
};
