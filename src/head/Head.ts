import { createHtmlString } from "../createHtmlString";
import { getNodes } from "../getNodes";
import { SmlrElement } from "../types";

export class Head {
  constructor(isSsr = false) {
    this.isSsr = isSsr;
  }
  isSsr;
  html = "";
  css = "";

  insert(elements: SmlrElement[]) {
    if (this.isSsr) {
      this.html += createHtmlString(elements);
    }
    //
    else {
      const domNodes = getNodes(elements);

      domNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          switch (node.tagName) {
            case "TITLE": {
              const existingTitle = document.querySelector("title");
              if (existingTitle) {
                existingTitle.remove();
              }
              document.head.append(node);
              break;
            }
            case "STYLE": {
              document.head.append(node);
              break;
            }
            case "META": {
              document.head.append(node);
              break;
            }
          }
        }
      });
    }
  }

  insertRule(rule: string) {
    this.css += rule;
  }
}
