import { Css, CssOptions } from "./css";
import { HtmlElement } from "./html";
import { ReactiveContext } from "./reactive";
import { Router, RouterOptions, RouterProvider } from "./router";
import { TextElement } from "./text";
import { DomNode, SmllrElement, SmllrNode } from "./types";
import {
  findAncestorElement,
  isElementOfType,
  isFunction,
  isSmllrElement,
  isTextNode,
} from "./utils";

type AppOptions = {
  router?: RouterOptions;
  css?: CssOptions;
};

export class App {
  constructor(options?: AppOptions) {
    this.router = new Router(options?.router ?? { routes: [] }, this);
    this.css = new Css(options?.css);
  }
  css;
  ctx = new ReactiveContext();
  router;

  createElements({
    node,
    parent,
    startIndex = 0,
  }: {
    node: SmllrNode;
    parent: SmllrElement;
    startIndex?: number;
  }) {
    const flatNodes = Array.isArray(node) ? node.flat(Infinity as 1) : [node];

    const els: SmllrElement[] = [];

    const len = flatNodes.length;

    for (let i = 0; i < len; i++) {
      const node = flatNodes[i];

      let el!: SmllrElement;

      if (isTextNode(node)) {
        el = new TextElement({ text: node });
      }
      //
      else if (isFunction(node)) {
        el = new TextElement({ text: node });
      }
      //
      else if (isSmllrElement(node)) {
        el = node;
      }

      if (el) {
        el.app = this;
        el.parent = parent;
        el.index = startIndex + i;
        els.push(el);
      }
    }

    return els;
  }

  getFirstNode(els: SmllrElement[]): DomNode | undefined {
    for (const el of els) {
      const node = el.getFirstNode();
      if (node) return node;
    }
  }

  findNextNode(el: SmllrElement, boundary: SmllrElement): DomNode | undefined {
    let nextEl = getNextEl(el);

    while (nextEl) {
      if (nextEl.isInserted) {
        const nextNode = nextEl.getFirstNode();
        if (nextNode) {
          return nextNode;
        }
      }
      nextEl = getNextEl(nextEl);
    }

    if (el.parent !== boundary) {
      return this.findNextNode(el.parent, boundary);
    }
  }

  getNodes(els: SmllrElement[]) {
    return els.map((el) => el.getNodes()).flat(Infinity) as DomNode[];
  }

  insert(els: SmllrElement[]) {
    for (const el of els) {
      const boundary = findAncestorElement(
        el.parent,
        (current) =>
          isElementOfType(current, "html") || isElementOfType(current, "portal")
      ) as HtmlElement;

      const domParent = isElementOfType(boundary, "portal")
        ? boundary.target
        : boundary.domNode;

      if (!domParent) continue;

      const nextNode = this.findNextNode(el, boundary);

      const nodes = el.getNodes();

      for (const node of nodes) {
        domParent.insertBefore(node, nextNode ?? null);
      }
    }
    this.onInsert(els);
  }

  onInsert(els: SmllrElement[]) {
    els.forEach((el) => el.onInsert());
  }

  remove(els: SmllrElement[]) {
    els.forEach((el) => el.remove());
  }

  toDom(els: SmllrElement[]) {
    const nodes: DomNode[] = [];

    for (const el of els) {
      const elNodes = el.toDom();

      if (elNodes == null) continue;

      if (Array.isArray(elNodes)) {
        nodes.push(...elNodes);
      }
      //
      else {
        nodes.push(elNodes);
      }
    }

    return nodes;
  }

  toHtml(els: SmllrElement[]) {
    return els.map((el) => el.toHtml()).join("");
  }

  /** Creates DOM elements from node and inserts them into the container. */
  render(node: SmllrNode, container: HTMLElement) {
    const containerEl = new HtmlElement({
      tag: container.tagName.toLowerCase(),
      props: {},
      nodes: [],
    });
    containerEl.domNode = container;

    const els = this.createElements({
      node: RouterProvider({ router: this.router, node }),
      parent: containerEl,
    });

    containerEl.children = els;

    container.append(...this.toDom(els));

    this.onInsert(els);
  }

  /** Creates an HTML string from node and returns it. */
  ssr(node: SmllrNode) {
    const els = this.createElements({ node, parent: {} as SmllrElement });

    return this.toHtml(els);
  }
}

const getNextEl = (el: SmllrElement) => el.parent?.children?.[el.index + 1];
