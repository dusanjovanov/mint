import { createDomNodes } from "./createDomNodes";
import { Css, CssProvider } from "./css";
import { HtmlElement } from "./html";
import { onInsert } from "./onInsert";
import { resolveNode } from "./resolveNode";
import { Router, RouterProvider } from "./router";
import { SmllrNode } from "./types";

export const render = (
  node: SmllrNode,
  container: HTMLElement,
  options: RenderOptions
) => {
  const containerEl = new HtmlElement(container.tagName, {});
  containerEl.domNode = container;
  containerEl.index = 0;

  let toRender = node;

  if (options.router) {
    toRender = RouterProvider({ router: options.router, children: toRender });
  }
  if (options.css) {
    toRender = CssProvider({ css: options.css, children: toRender });
  }

  const elements = resolveNode(toRender, containerEl);
  const domNodes = createDomNodes(elements);
  container.append(...domNodes);
  onInsert(elements);
};

export type RenderOptions = {
  router?: Router;
  css?: Css;
};
