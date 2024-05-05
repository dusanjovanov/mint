import { ELEMENT_BRAND, ELEMENT_TYPES } from "../constants";
import { resolveNode } from "../resolveNode";
import { SmlrElement, SmlrNode, SmlrRenderer } from "../types";
import { Head } from "./Head";

export class HeadElement implements SmlrElement {
  constructor(nodes: SmlrNode[]) {
    this.nodes = nodes;
  }
  brand = ELEMENT_BRAND;
  type = ELEMENT_TYPES.head;
  parent!: SmlrElement;
  index!: number;
  isInserted = false;
  nodes;
  children: SmlrElement[] = [];
  head!: Head;
  renderer!: SmlrRenderer;

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
    this.renderer.createElements(this.children);
    this.head.insert(this.children);

    return [];
  }

  toHtml(): string {
    this.create();
    this.head.insert(this.children);
    return "";
  }
}

export const head = (...nodes: SmlrNode[]) => new HeadElement(nodes);
