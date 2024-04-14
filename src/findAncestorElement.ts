import { SmlrElement } from "./types";

export const findAncestorElement = (
  el: SmlrElement,
  condition: (current: SmlrElement) => boolean
) => {
  let current = el.parent;

  while (current) {
    if (condition(current)) return current;
    current = current.parent;
  }
};
