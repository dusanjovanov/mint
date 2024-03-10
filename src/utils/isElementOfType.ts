import { ComponentElement } from "../component";
import { SMLLR_EL_TYPES } from "../constants";
import { HtmlElement } from "../html";
import { ListElement } from "../list";
import { PortalElement } from "../portal";
import { ShowElement } from "../show";
import { TextElement } from "../text";
import { SmllrElement } from "../types";

export const isElementOfType = <Type extends keyof TypeMap>(
  el: SmllrElement,
  type: Type
): el is TypeMap[Type] => {
  return el.type === SMLLR_EL_TYPES[type];
};

type TypeMap = {
  html: HtmlElement;
  text: TextElement;
  show: ShowElement;
  cmp: ComponentElement<any>;
  list: ListElement<any>;
  portal: PortalElement;
};
