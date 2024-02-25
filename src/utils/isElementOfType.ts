import { ShowElement } from "../ShowElement";
import { TextElement } from "../TextElement";
import { ComponentElement } from "../component";
import { MINT_EL_TYPES } from "../constants";
import { HtmlElement } from "../html";
import { ListElement } from "../list";
import { MintElement } from "../types";

export const isElementOfType = <Type extends keyof TypeMap>(
  el: MintElement,
  type: Type
): el is TypeMap[Type] => {
  return el._type === MINT_EL_TYPES[type];
};

type TypeMap = {
  html: HtmlElement;
  text: TextElement;
  show: ShowElement;
  cmp: ComponentElement<any>;
  list: ListElement<any>;
};
