import { ELEMENT_BRAND, ELEMENT_TYPES } from "../constants";
import { createDomNodes } from "../createDomNodes";
import { createHtmlString } from "../createHtmlString";
import { getFirstNode } from "../getFirstDomNode";
import { getNodes } from "../getNodes";
import { onInsert } from "../onInsert";
import { SubReactive } from "../reactive";
import { removeElements } from "../removeElements";
import { resolveNode } from "../resolveNode";
import { SmllrElement, SmllrNode } from "../types";
import { ComponentApi } from "./ComponentApi";

export class ComponentElement<Props> implements SmllrElement {
  constructor({
    render,
    props,
  }: {
    render: ComponentRenderFn<Props>;
    props: Props;
  }) {
    this.render = render;
    this.props = props;
  }
  brand = ELEMENT_BRAND;
  type = ELEMENT_TYPES.component;
  render;
  props;
  parent!: SmllrElement;
  index!: number;
  isInserted = false;
  children: SmllrElement[] = [];
  context = new Map();
  onInsertCbs: LifecycleCallback[] = [];
  onRemoveCbs: LifecycleCallback[] = [];
  subReactives = new Set<SubReactive>();

  getNodes() {
    return getNodes(this.children);
  }

  getFirstNode() {
    return getFirstNode(this.children);
  }

  create() {
    const node = this.render(new ComponentApi(this), this.props);
    this.children = resolveNode(node, this);
  }

  toDom() {
    this.create();
    return createDomNodes(this.children);
  }

  toHtml() {
    this.create();
    return createHtmlString(this.children);
  }

  onInsert() {
    this.isInserted = true;
    onInsert(this.children);
    this.onInsertCbs.forEach((cb) => cb());
  }

  remove() {
    this.subReactives.forEach((s) => s.dispose());
    removeElements(this.children);
    this.children.length = 0;
    this.isInserted = false;
    this.onRemoveCbs.forEach((cb) => cb());
    this.onInsertCbs.length = 0;
    this.onRemoveCbs.length = 0;
  }
}

export const component =
  <Props = void | null>(render: ComponentRenderFn<Props>) =>
  (props: Props) => {
    return new ComponentElement({
      render,
      props,
    });
  };

export type ComponentRenderFn<Props> = (
  api: ComponentApi,
  props: Props
) => SmllrNode;

export type LifecycleCallback = () => void;
