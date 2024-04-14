import { ELEMENT_BRAND, ELEMENT_TYPES } from "../constants";
import { createDomNodes } from "../createDomNodes";
import { getFirstNode } from "../getFirstDomNode";
import { getNodes } from "../getNodes";
import { onInsert } from "../onInsert";
import { removeElements } from "../removeElements";
import { resolveNode } from "../resolveNode";
import { SmllrElement, SmllrNode } from "../types";

export class PortalElement implements SmllrElement {
  constructor({ target, node }: PortalProps & { node: SmllrNode }) {
    this._target = target;
    this.node = node;
  }
  brand = ELEMENT_BRAND;
  type = ELEMENT_TYPES.portal;
  children: SmllrElement[] = [];
  parent!: SmllrElement;
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

export const portal = (props: PortalProps | null, ...nodes: SmllrNode[]) => {
  return new PortalElement({ node: nodes, ...props });
};
