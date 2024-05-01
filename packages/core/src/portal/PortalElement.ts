import { ELEMENT_BRAND, ELEMENT_TYPES } from "../constants";
import { createDomNodes } from "../createDomNodes";
import { getFirstNode } from "../getFirstDomNode";
import { getNodes } from "../getNodes";
import { onInsert } from "../onInsert";
import { removeElements } from "../removeElements";
import { resolveNode } from "../resolveNode";
import { SmlrElement, SmlrNode } from "../types";

export class PortalElement implements SmlrElement {
  constructor({ target, node }: PortalProps & { node: SmlrNode }) {
    this._target = target;
    this.node = node;
  }
  brand = ELEMENT_BRAND;
  type = ELEMENT_TYPES.portal;
  children: SmlrElement[] = [];
  parent!: SmlrElement;
  index!: number;
  isInserted = false;
  _target;
  node;

  get target() {
    return this._target ?? document.body;
  }

  getNodes() {
    return getNodes(this.children);
  }

  getFirstNode() {
    return getFirstNode(this.children);
  }

  onInsert(): void {
    this.isInserted = true;
    onInsert(this.children);
  }

  remove(): void {
    removeElements(this.children);
    this.isInserted = false;
  }

  create() {
    this.children = resolveNode(this.node, this);
  }

  toDom(): Node | Node[] {
    this.create();
    this.target.append(...createDomNodes(this.children));
    return [];
  }

  toHtml(): string {
    throw new Error("Method not implemented.");
  }
}

type PortalProps = {
  /** @default document.body */
  target?: Element;
};

export const portal = (props: PortalProps | null, ...nodes: SmlrNode[]) => {
  return new PortalElement({ node: nodes, ...props });
};
