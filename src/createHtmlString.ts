import { SmllrElement } from "./types";

export const createHtmlString = (elements: SmllrElement[]) => {
  return elements.map((el) => el.toHtml()).join("");
};
