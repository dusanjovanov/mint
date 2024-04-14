import { ComponentElement } from "../component";
import { ELEMENT_TYPES } from "../constants";
import { HeadElement } from "../head";
import { HtmlElement } from "../html";
import { ListElement } from "../list";
import { PortalElement } from "../portal";
import { ShowElement } from "../show";
import { TextElement } from "../text";
import { SmlrElement } from "../types";

export const isElementOfType = <Key extends keyof TypeMap>(
  el: SmlrElement,
  type: Key
): el is TypeMap[Key] => {
  return el.type === ELEMENT_TYPES[type];
};

type TypeMap = {
  html: HtmlElement;
  text: TextElement;
  component: ComponentElement<any>;
  show: ShowElement;
  portal: PortalElement;
  list: ListElement<any>;
  head: HeadElement;
};
