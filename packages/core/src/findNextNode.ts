import { DomNode, SmlrElement } from "./types";

export const findNextNode = (
  el: SmlrElement,
  boundary: SmlrElement
): DomNode | undefined => {
  let nextEl = getNextEl(el);

  while (nextEl) {
    if (nextEl.isInserted) {
      const nextNode = nextEl.getFirstNode();
      if (nextNode) {
        return nextNode;
      }
    }
    nextEl = getNextEl(nextEl);
  }

  if (el.parent !== boundary) {
    return findNextNode(el.parent, boundary);
  }
};

const getNextEl = (el: SmlrElement) => el.parent.children?.[el.index + 1];
