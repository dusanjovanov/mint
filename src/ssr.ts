import { AppProvider } from "./AppProvider";
import { createHtmlString } from "./createHtmlString";
import { Css } from "./css";
import { Head } from "./head";
import { resolveNode } from "./resolveNode";
import { Router, RouterOptions, createMemoryHistory } from "./router";
import { SmllrElement, SmllrNode } from "./types";

export const ssr = (node: SmllrNode, options: SsrOptions) => {
  const router = new Router({
    history: createMemoryHistory({
      initialEntries: options.pathname ? [options.pathname] : ["/"],
    }),
    routes: options.routes,
  });

  const head = new Head(true);

  const elements = resolveNode(
    AppProvider({
      css: new Css({ head, isSsr: true }),
      router,
      head,
      children: node,
    }),
    {} as SmllrElement
  );

  const bodyHtml = createHtmlString(elements);

  return `<head>${head.html}</head><body>${bodyHtml}</body>`;
};

export type SsrOptions = {
  routes: RouterOptions["routes"];
  pathname?: string;
};
