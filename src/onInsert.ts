import { SmllrElement } from "./types";

export const onInsert = (elements: SmllrElement[]) => {
  elements.forEach((el) => el.onInsert());
};
