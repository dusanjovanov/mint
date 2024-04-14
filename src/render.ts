import { AppProvider } from "./AppProvider";
import { createDomNodes } from "./createDomNodes";
import { Css } from "./css";
import { Head } from "./head";
import { HtmlElement } from "./html";
import { onInsert } from "./onInsert";
import { resolveNode } from "./resolveNode";
import { Router, RouterOptions, createBrowserHistory } from "./router";
import { SmlrNode } from "./types";

export const render = (
  node: SmlrNode,
  container: HTMLElement,
  options: RenderOptions
) => {
  container.innerHTML = "";

  const containerEl = new HtmlElement(container.tagName, {});
  containerEl.domNode = container;
  containerEl.index = 0;

  const router = new Router({
    history: createBrowserHistory(),
    routes: options.routes,
  });

  const head = new Head();

  const elements = resolveNode(
    AppProvider({
      css: new Css({ head }),
      router,
      head,
      children: node,
    }),
    containerEl
  );
  const domNodes = createDomNodes(elements);
  container.append(...domNodes);
  onInsert(elements);
};

export type RenderOptions = {
  routes: RouterOptions["routes"];
};
