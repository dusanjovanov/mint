import { ELEMENT_BRAND, ELEMENT_TYPES } from "../constants";
import { onInsert } from "../onInsert";
import { resolveNode } from "../resolveNode";
import { SmlrElement, SmlrNode, SmlrRenderer } from "../types";

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
  renderer!: SmlrRenderer;

  get target() {
    return this._target ?? document.body;
  }

  onInsert(): void {
    this.isInserted = true;
    onInsert(this.children);
  }

  remove(): void {
    this.renderer.removeElements(this.children);
    this.isInserted = false;
  }

  create() {
    this.children = resolveNode(this.node, this);
  }

  toDom(): Node | Node[] {
    this.create();
    this.target.append(...this.renderer.createElements(this.children));
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
