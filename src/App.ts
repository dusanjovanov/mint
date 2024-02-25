import { TextElement } from "./TextElement";
import { Css } from "./css";
import { HtmlElement } from "./html";
import { ReactiveContext } from "./reactive";
import { Router, RouterOptions, RouterProvider } from "./router";
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
};

export class App {
  constructor(options?: AppOptions) {
    this.router = new Router(options?.router ?? { routes: [] }, this);
  }
  css = new Css();
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
        el._parent = parent;
        el._index = startIndex + i;
        els.push(el);
      }
    }

    return els;
  }

  getFirstNode(els: SmllrElement[]): DomNode | undefined {
    for (const el of els) {
      const node = el._getFirstNode();
      if (node) return node;
    }
  }

  findNextNode(
    el: SmllrElement,
    htmlAncestor: SmllrElement
  ): DomNode | undefined {
    let nextEl = getNextEl(el);

    while (nextEl) {
      if (nextEl._isInserted) {
        const nextNode = nextEl._getFirstNode();
        if (nextNode) {
          return nextNode;
        }
      }
      nextEl = getNextEl(nextEl);
    }

    if (el._parent !== htmlAncestor) {
      return this.findNextNode(el._parent, htmlAncestor);
    }
  }

  getNodes(els: SmllrElement[]) {
    return els.map((el) => el._getNodes()).flat(Infinity) as DomNode[];
  }

  insert(els: SmllrElement[]) {
    for (const el of els) {
      const htmlAncestor = findAncestorElement(el._parent, (current) =>
        isElementOfType(current, "html")
      ) as HtmlElement;
      if (!htmlAncestor || !htmlAncestor._domNode) continue;

      const nextNode = this.findNextNode(el, htmlAncestor);

      const nodes = el._getNodes();

      for (const node of nodes) {
        htmlAncestor._domNode.insertBefore(node, nextNode ?? null);
      }
    }
    this.onInsert(els);
  }

  onInsert(els: SmllrElement[]) {
    els.forEach((el) => el._onInsert());
  }

  remove(els: SmllrElement[]) {
    els.forEach((el) => el._remove());
  }

  _toDom(els: SmllrElement[]) {
    const nodes: DomNode[] = [];

    for (const el of els) {
      const elNodes = el._toDom();

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

  _toString(els: SmllrElement[]) {
    return els.map((el) => el._toHtml()).join("");
  }

  /** Creates DOM elements from node and inserts them into the container. */
  render(node: SmllrNode, container: HTMLElement) {
    const containerEl = new HtmlElement({
      tag: container.tagName.toLowerCase(),
      props: {},
      nodes: [],
    });
    containerEl._domNode = container;
    containerEl._isInserted = true;

    const els = this.createElements({
      node: RouterProvider({ router: this.router, node }),
      parent: containerEl,
    });

    containerEl.children = els;

    container.append(...this._toDom(els));

    this.onInsert(els);
  }

  /** Creates an HTML string from node and returns it. */
  ssr(node: SmllrNode) {
    const els = this.createElements({ node, parent: {} as SmllrElement });

    return this._toString(els);
  }
}

const getNextEl = (el: SmllrElement) => el._parent?.children?.[el._index + 1];
