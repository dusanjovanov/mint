import { SmlrElement } from "./types";

export const onInsert = (elements: SmlrElement[]) => {
  elements.forEach((el) => el.onInsert());
};
