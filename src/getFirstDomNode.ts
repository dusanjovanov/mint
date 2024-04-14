import { SmlrElement } from "./types";

export const getFirstNode = (elements: SmlrElement[]) => {
  for (const el of elements) {
    const node = el.getFirstNode();
    if (node) return node;
  }
};
