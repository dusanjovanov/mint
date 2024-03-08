import { SmllrElement } from "../types";

export const findAncestorElement = (
  startEl: SmllrElement,
  condition: (current: SmllrElement) => boolean
): SmllrElement | undefined => {
  let current = startEl;

  while (current && !condition(current)) {
    current = current._parent;
  }

  return current as SmllrElement;
};
