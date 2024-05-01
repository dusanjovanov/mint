import { findAncestorElement } from "./findAncestorElement";
import { findNextNode } from "./findNextNode";
import { HtmlElement } from "./html";
import { onInsert } from "./onInsert";
import { PortalElement } from "./portal";
import { SmlrElement } from "./types";
import { isElementOfType } from "./utils";

export const insertElements = (elements: SmlrElement[]) => {
  for (const el of elements) {
    const boundary = findAncestorElement(
      el,
      (current) =>
        isElementOfType(current, "html") || isElementOfType(current, "portal")
    ) as HtmlElement | PortalElement;

    const domParent = isElementOfType(boundary, "portal")
      ? boundary.target
      : boundary.domNode;

    if (!domParent) continue;

    const nextNode = findNextNode(el, boundary);

    const nodes = el.getNodes();

    for (const node of nodes) {
      domParent.insertBefore(node, nextNode ?? null);
    }
  }

  onInsert(elements);
};
