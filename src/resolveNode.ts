import { TextElement } from "./text";
import { SmllrElement, SmllrNode } from "./types";
import { isMintElement, isReactive, isTextNode } from "./utils";

export const resolveNode = (
  node: SmllrNode,
  parent: SmllrElement,
  startIndex = 0
) => {
  const flatNodes = Array.isArray(node) ? node.flat(Infinity as 1) : [node];

  const elements: SmllrElement[] = [];

  const len = flatNodes.length;

  for (let i = 0; i < len; i++) {
    const n = flatNodes[i];

    let el: SmllrElement;

    if (isTextNode(n)) {
      el = new TextElement(n);
    }
    //
    else if (isReactive(n)) {
      el = new TextElement(n);
    }
    //
    else if (isMintElement(n)) {
      el = n;
    }

    if (el!) {
      el.parent = parent;
      el.index = startIndex + i;
      elements.push(el);
    }
  }

  return elements;
};
