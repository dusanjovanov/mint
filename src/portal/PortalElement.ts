import { App } from "../App";
import { SMLLR_EL_BRAND, SMLLR_EL_TYPES } from "../constants";
import { SmllrElement, SmllrNode } from "../types";

export class PortalElement implements SmllrElement {
  constructor({ target, node }: PortalProps & { node: SmllrNode }) {
    this._target = target;
    this.node = node;
  }
  brand = SMLLR_EL_BRAND;
  type = SMLLR_EL_TYPES.portal;
  children: SmllrElement[] = [];
  parent!: SmllrElement;
  index!: number;
  app!: App;
  isInserted = false;
  _target;
  node;

  get target() {
    return this._target ?? document.body;
  }

  getNodes(): Node[] {
    return this.app.getNodes(this.children);
  }

  getFirstNode(): Node | undefined {
    return this.app.getFirstNode(this.children);
  }

  onInsert(): void {
    this.isInserted = true;
    this.app.onInsert(this.children);
  }

  remove(): void {
    this.app.remove(this.children);
    this.isInserted = false;
  }

  create() {
    this.children = this.app.createElements({ node: this.node, parent: this });
  }

  toDom(): Node | Node[] {
    this.create();
    this.target.append(...this.app.toDom(this.children));
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
