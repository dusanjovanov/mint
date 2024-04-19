import { AppProvider } from "./AppProvider";
import { createDomNodes } from "./createDomNodes";
import { Head } from "./head";
import { HtmlElement } from "./html";
import { onInsert } from "./onInsert";
import { resolveNode } from "./resolveNode";
import { SmlrNode } from "./types";

export const render = (node: SmlrNode, container: HTMLElement) => {
  container.innerHTML = "";

  const containerEl = new HtmlElement(container.tagName, {});
  containerEl.domNode = container;
  containerEl.index = 0;

  const head = new Head();

  const elements = resolveNode(
    AppProvider({
      head,
      children: node,
    }),
    containerEl
  );
  const domNodes = createDomNodes(elements);
  container.append(...domNodes);
  onInsert(elements);
};
