import { SmlrElement } from "../types";
import { isElementOfType } from "../utils";

export const getFirstDomNodeFromElement = (
  el: SmlrElement
): Node | undefined => {
  if (isElementOfType(el, "html") || isElementOfType(el, "text")) {
    return el.domNode;
  } else if (
    isElementOfType(el, "list") ||
    isElementOfType(el, "show") ||
    isElementOfType(el, "component") ||
    isElementOfType(el, "portal") ||
    isElementOfType(el, "head")
  ) {
    return getFirstNodeFromElements(el.children);
  }

  return;
};

const getFirstNodeFromElements = (elements: SmlrElement[]) => {
  for (const el of elements) {
    const node = getFirstDomNodeFromElement(el);
    if (node) return node;
  }
};
