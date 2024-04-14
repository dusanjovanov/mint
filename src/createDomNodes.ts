import { SmlrElement } from "./types";

export const createDomNodes = (elements: SmlrElement[]) => {
  return elements.map((el) => el.toDom()).flat(Infinity) as any[];
};
