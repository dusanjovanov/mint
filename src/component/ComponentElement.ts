import { App } from "..";
import { MINT_EL_BRAND, MINT_EL_TYPES } from "../constants";
import { Sub } from "../reactive";
import { MintElement, MintNode } from "../types";
import { ComponentApi } from "./ComponentApi";

export class ComponentElement<Props> implements MintElement {
  constructor({
    render,
    props,
  }: {
    render: ComponentRenderFn<Props>;
    props: Props;
  }) {
    this._render = render;
    this._props = props;
  }

  _brand = MINT_EL_BRAND;
  _type = MINT_EL_TYPES.cmp;
  children: MintElement[] = [];
  _parent!: MintElement;
  _index!: number;
  app!: App;
  _isInserted = false;
  _render;
  _props;
  _subs = new Set<Sub>();
  _context: Record<string, any> = {};

  _getNodes(): Node[] {
    return this.app.getNodes(this.children);
  }

  _getFirstNode(): Node | undefined {
    return this.app.getFirstNode(this.children);
  }

  _onInsert(): void {
    this._isInserted = true;
    this.app.onInsert(this.children);
  }

  _remove(): void {
    this._subs.forEach((s) => s._dispose());
    this._subs.clear();
    this.app.remove(this.children);
    this.children.length = 0;
    this._isInserted = false;
  }

  _create() {
    const mintNode = this._render(new ComponentApi(this));
    this.children = this.app.createElements({ node: mintNode, parent: this });
  }

  _toDom(): Node | Node[] {
    this._create();
    return this.app._toDom(this.children);
  }

  _toHtml(): string {
    this._create();
    return this.app._toString(this.children);
  }
}

export const cmp =
  <Props = void>(render: ComponentRenderFn<Props>) =>
  (props: Props) => {
    return new ComponentElement({
      render,
      props,
    });
  };

type ComponentRenderFn<Props> = ($: ComponentApi<Props>) => MintNode;
