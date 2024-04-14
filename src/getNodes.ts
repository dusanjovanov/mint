import { SmllrElement } from "./types";

export const getNodes = (elements: SmllrElement[]) => {
  return elements.map((el) => el.getNodes()).flat(Infinity as 1);
};
