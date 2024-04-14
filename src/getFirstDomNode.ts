import { SmllrElement } from "./types";

export const getFirstNode = (elements: SmllrElement[]) => {
  for (const el of elements) {
    const node = el.getFirstNode();
    if (node) return node;
  }
};
