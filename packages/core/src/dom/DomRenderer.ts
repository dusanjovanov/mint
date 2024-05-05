import { SmlrElement, SmlrRenderer } from "../types";
import { isElementOfType } from "../utils";
import { updateListElement } from "./updateListElement";
import { updateShowElement } from "./updateShowElement";

export class DomRenderer implements SmlrRenderer {
  createElement(el: SmlrElement): Node | Node[] {
    // @ts-expect-error
    el.renderer = this;
    if (
      isElementOfType(el, "html") ||
      isElementOfType(el, "text") ||
      isElementOfType(el, "portal") ||
      isElementOfType(el, "head")
    ) {
      return el.toDom();
    }
    //
    else if (isElementOfType(el, "component")) {
      el.create();
      return this.createElements(el.children);
    }
    //
    else if (isElementOfType(el, "show")) {
      const condition = el.subscribe((condition) =>
        updateShowElement(el, condition)
      );
      el.create(condition);
      return this.createElements(el.children);
    }
    //
    else if (isElementOfType(el, "list")) {
      const arr = el.subscribe((arr) => updateListElement(el, arr));
      el.create(arr);
      return this.createElements(el.children);
    }

    return [];
  }

  createElements(els: SmlrElement[]) {
    return els.map((el) => this.createElement(el)).flat(Infinity) as Node[];
  }

  removeElements(els: SmlrElement[]): void {
    els.forEach((el) => el.remove());
  }
}
