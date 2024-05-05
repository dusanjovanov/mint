import { SmlrElement } from "../types";
import { getFirstDomNodeFromElement } from "./getFirstDomNode";

export const findNextNode = (
  el: SmlrElement,
  boundary: SmlrElement
): Node | undefined => {
  let nextEl = getNextEl(el);

  while (nextEl) {
    if (nextEl.isInserted) {
      const nextNode = getFirstDomNodeFromElement(nextEl);
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
