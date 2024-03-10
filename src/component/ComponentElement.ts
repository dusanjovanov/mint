import { App } from "..";
import { SMLLR_EL_BRAND, SMLLR_EL_TYPES } from "../constants";
import { Sub } from "../reactive";
import { SmllrElement, SmllrNode } from "../types";
import { ComponentApi } from "./ComponentApi";

export class ComponentElement<Props> implements SmllrElement {
  constructor({ render, props }: ComponentElementArgs<Props>) {
    this.render = render;
    this.props = props;
  }
  brand = SMLLR_EL_BRAND;
  type = SMLLR_EL_TYPES.cmp;
  children: SmllrElement[] = [];
  parent!: SmllrElement;
  index!: number;
  app!: App;
  isInserted = false;
  render;
  props;
  subs = new Set<Sub>();
  contextMap = new Map<any, any>();
  insertCbs: LifecycleCallback[] = [];
  removeCbs: LifecycleCallback[] = [];

  getNodes(): Node[] {
    return this.app.getNodes(this.children);
  }

  getFirstNode(): Node | undefined {
    return this.app.getFirstNode(this.children);
  }

  onInsert(): void {
    this.isInserted = true;
    this.app.onInsert(this.children);
    this.insertCbs.forEach((cb) => cb());
  }

  remove(): void {
    this.subs.forEach((s) => s._dispose());
    this.subs.clear();
    this.app.remove(this.children);
    this.children.length = 0;
    this.isInserted = false;
    this.removeCbs.forEach((cb) => cb());
  }

  create() {
    const smllrNode = this.render(new ComponentApi(this), this.props);
    this.children = this.app.createElements({ node: smllrNode, parent: this });
  }

  toDom(): Node | Node[] {
    this.create();
    return this.app.toDom(this.children);
  }

  toHtml(): string {
    this.create();
    return this.app.toHtml(this.children);
  }
}

export const component =
  <Props = void | null>(render: ComponentRenderFn<PropsWithNodes<Props>>) =>
  (props: Props, ...nodes: SmllrNode[]) => {
    return new ComponentElement({
      render,
      props: {
        ...props,
        nodes,
      },
    });
  };

type PropsWithNodes<Props> = Props & { nodes: SmllrNode[] };

type ComponentRenderFn<Props> = (
  $: ComponentApi<Props>,
  props: Props
) => SmllrNode;

type ComponentElementArgs<Props> = {
  render: ComponentRenderFn<Props>;
  props: Props;
};

export type LifecycleCallback = () => void;
