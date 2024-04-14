import { SmlrElement } from "./types";

export const getNodes = (elements: SmlrElement[]) => {
  return elements.map((el) => el.getNodes()).flat(Infinity as 1);
};
