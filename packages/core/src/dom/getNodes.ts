import { SmlrElement } from "../types";
import { isElementOfType } from "../utils";

export const getNodesFromElement = (el: SmlrElement): Node[] => {
  if (isElementOfType(el, "html") || isElementOfType(el, "text")) {
    return el.domNode ? [el.domNode] : [];
  } else if (
    isElementOfType(el, "list") ||
    isElementOfType(el, "show") ||
    isElementOfType(el, "component") ||
    isElementOfType(el, "portal") ||
    isElementOfType(el, "head")
  ) {
    return getNodesFromElements(el.children);
  }
  return [];
};

export const getNodesFromElements = (elements: SmlrElement[]): Node[] => {
  return elements.map((el) => getNodesFromElement(el)).flat(Infinity as 1);
};
