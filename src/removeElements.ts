import { SmllrElement } from "./types";

export const removeElements = (elements: SmllrElement[]) => {
  elements.forEach((el) => el.remove());
};
