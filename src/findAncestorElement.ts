import { SmllrElement } from "./types";

export const findAncestorElement = (
  el: SmllrElement,
  condition: (current: SmllrElement) => boolean
) => {
  let current = el.parent;

  while (current) {
    if (condition(current)) return current;
    current = current.parent;
  }
};
