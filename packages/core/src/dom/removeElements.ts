import { SmlrElement } from "../types";

export const removeElements = (elements: SmlrElement[]) => {
  elements.forEach((el) => el.remove());
};
