import { getNodes } from "../getNodes";
import { SmllrElement } from "../types";

export class Head {
  constructor() {}
  html = "";

  insert(els: SmllrElement[]) {
    const domNodes = getNodes(els);

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

  insertHtml(elements: SmllrElement[]) {
    elements;
  }
}
