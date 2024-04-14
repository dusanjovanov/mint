import { SmllrElement } from "./types";

export const createDomNodes = (elements: SmllrElement[]) => {
  return elements.map((el) => el.toDom()).flat(Infinity) as any[];
};
