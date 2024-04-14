import { SmlrElement } from "./types";

export const createHtmlString = (elements: SmlrElement[]) => {
  return elements.map((el) => el.toHtml()).join("");
};
