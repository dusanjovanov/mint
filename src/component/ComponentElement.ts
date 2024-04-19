import { ELEMENT_BRAND, ELEMENT_TYPES } from "../constants";
import { createDomNodes } from "../createDomNodes";
import { createHtmlString } from "../createHtmlString";
import { findAncestorElement } from "../findAncestorElement";
import { getFirstNode } from "../getFirstDomNode";
import { getNodes } from "../getNodes";
import { onInsert } from "../onInsert";
import { SubReactive } from "../reactive";
import { removeElements } from "../removeElements";
import { resolveNode } from "../resolveNode";
import { SmlrElement, SmlrNode } from "../types";
import { isElementOfType } from "../utils";

export class ComponentElement<Props> implements SmlrElement {
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
  parent!: SmlrElement;
  index!: number;
  isInserted = false;
  children: SmlrElement[] = [];
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
    currentComponent.current = this;
    const node = this.render(this.props);
    currentComponent.current = null;
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
  <Props = void>(render: ComponentRenderFn<Props>) =>
  (props: Props) => {
    return new ComponentElement({
      render,
      props,
    });
  };

export type ComponentRenderFn<Props> = (props: Props) => SmlrNode;

export type LifecycleCallback = () => void;

export const setContext = <Value>(key: any, value: Value) => {
  currentComponent.current!.context.set(key, value);
};

export const getContext = <Value>(key: any) => {
  const compnentElWithContext = findAncestorElement(
    currentComponent.current!,
    (current) =>
      isElementOfType(current, "component") && current.context.has(key)
  ) as ComponentElement<any>;

  if (!compnentElWithContext) return undefined as Value;

  return compnentElWithContext.context.get(key) as Value;
};

const currentComponent = (() => {
  let current: ComponentElement<any> | null;

  return {
    get current() {
      return current;
    },
    set current(curr: ComponentElement<any> | null) {
      current = curr;
    },
  };
})();
