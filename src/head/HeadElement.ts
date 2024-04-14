import { ELEMENT_BRAND, ELEMENT_TYPES } from "../constants";
import { createDomNodes } from "../createDomNodes";
import { resolveNode } from "../resolveNode";
import { SmllrElement, SmllrNode } from "../types";

export class HeadElement implements SmllrElement {
  constructor(nodes: SmllrNode[]) {
    this.nodes = nodes;
  }
  brand = ELEMENT_BRAND;
  type = ELEMENT_TYPES.head;
  parent!: SmllrElement;
  index!: number;
  isInserted = false;
  nodes;
  children: SmllrElement[] = [];

  getNodes() {
    return [];
  }

  getFirstNode() {
    return undefined;
  }

  onInsert(): void {
    this.isInserted = true;
  }

  remove(): void {
    this.isInserted = false;
  }

  create() {
    this.children = resolveNode(this.nodes, this);
  }

  toDom(): Node | Node[] {
    this.create();
    createDomNodes(this.children);
    // this.app.head.insert(this.children);

    return [];
  }

  toHtml(): string {
    this.create();
    // this.app.head.insertHtml(this.children);
    return "";
  }
}

export const head = (...nodes: SmllrNode[]) => new HeadElement(nodes);
