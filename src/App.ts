import { TextElement } from "./TextElement";
import { Css } from "./css";
import { HtmlElement } from "./html";
import { ReactiveContext } from "./reactive";
import { Router, RouterOptions, RouterProvider } from "./router";
import { DomNode, MintElement, MintNode } from "./types";
import {
  findAncestorElement,
  isElementOfType,
  isFunction,
  isMintElement,
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
    node: MintNode;
    parent: MintElement;
    startIndex?: number;
  }) {
    const flatNodes = Array.isArray(node) ? node.flat(Infinity as 1) : [node];

    const els: MintElement[] = [];

    const len = flatNodes.length;

    for (let i = 0; i < len; i++) {
      const node = flatNodes[i];

      let el!: MintElement;

      if (isTextNode(node)) {
        el = new TextElement({ text: node });
      }
      //
      else if (isFunction(node)) {
        el = new TextElement({ text: node });
      }
      //
      else if (isMintElement(node)) {
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

  getFirstNode(els: MintElement[]): DomNode | undefined {
    for (const el of els) {
      const node = el._getFirstNode();
      if (node) return node;
    }
  }

  findNextNode(
    el: MintElement,
    htmlAncestor: MintElement
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

  getNodes(els: MintElement[]) {
    return els.map((el) => el._getNodes()).flat(Infinity) as DomNode[];
  }

  insert(els: MintElement[]) {
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

  onInsert(els: MintElement[]) {
    els.forEach((el) => el._onInsert());
  }

  remove(els: MintElement[]) {
    els.forEach((el) => el._remove());
  }

  _toDom(els: MintElement[]) {
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

  _toString(els: MintElement[]) {
    return els.map((el) => el._toHtml()).join("");
  }

  /** Creates DOM elements from node and inserts them into the container. */
  render(node: MintNode, container: HTMLElement) {
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
  ssr(node: MintNode) {
    const els = this.createElements({ node, parent: {} as MintElement });

    return this._toString(els);
  }
}

const getNextEl = (el: MintElement) => el._parent?.children?.[el._index + 1];
