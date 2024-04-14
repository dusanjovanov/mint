import { APP_PROVIDER_KEY } from "../AppProvider";
import { ELEMENT_BRAND, ELEMENT_TYPES } from "../constants";
import { createDomNodes } from "../createDomNodes";
import { getContext } from "../getContext";
import { resolveNode } from "../resolveNode";
import { SmllrElement, SmllrNode } from "../types";
import { Head } from "./Head";

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
  head!: Head;

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
    this.head = getContext<any>(APP_PROVIDER_KEY, this).head;
    this.children = resolveNode(this.nodes, this);
  }

  toDom(): Node | Node[] {
    this.create();
    createDomNodes(this.children);
    this.head.insert(this.children);

    return [];
  }

  toHtml(): string {
    this.create();
    this.head.insert(this.children);
    return "";
  }
}

export const head = (...nodes: SmllrNode[]) => new HeadElement(nodes);
