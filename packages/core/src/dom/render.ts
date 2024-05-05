import { DomRenderer } from "./DomRenderer";
import { HtmlElement } from "../html";
import { onInsert } from "../onInsert";
import { resolveNode } from "../resolveNode";
import { SmlrNode } from "../types";

export const render = (node: SmlrNode, container: HTMLElement) => {
  const renderer = new DomRenderer();

  container.innerHTML = "";

  const containerEl = new HtmlElement(container.tagName.toLowerCase(), {});
  containerEl.domNode = container;
  containerEl.index = 0;

  const elements = resolveNode(node, containerEl);
  const domNodes = renderer.createElements(elements);
  container.append(...domNodes);
  onInsert(elements);
};
