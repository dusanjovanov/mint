import { ShowElement } from "../ShowElement";
import { TextElement } from "../TextElement";
import { ComponentElement } from "../component";
import { SMLLR_EL_TYPES } from "../constants";
import { HtmlElement } from "../html";
import { ListElement } from "../list";
import { SmllrElement } from "../types";

export const isElementOfType = <Type extends keyof TypeMap>(
  el: SmllrElement,
  type: Type
): el is TypeMap[Type] => {
  return el._type === SMLLR_EL_TYPES[type];
};

type TypeMap = {
  html: HtmlElement;
  text: TextElement;
  show: ShowElement;
  cmp: ComponentElement<any>;
  list: ListElement<any>;
};
