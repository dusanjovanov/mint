import { ELEMENT_BRAND, ELEMENT_TYPES } from "../constants";
import { createHtmlString } from "../createHtmlString";
import { findAncestorElement } from "../findAncestorElement";
import { onInsert } from "../onInsert";
import { DisposeFn } from "../reactive";
import { resolveNode } from "../resolveNode";
import { SmlrElement, SmlrNode, SmlrRenderer } from "../types";
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
  disposers: DisposeFn[] = [];
  renderer!: SmlrRenderer;

  create() {
    currentComponent.current = this;
    const node = this.render(this.props);
    currentComponent.current = null;
    this.children = resolveNode(node, this);
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
    this.disposers.forEach((d) => d());
    this.renderer.removeElements(this.children);
    this.children.length = 0;
    this.isInserted = false;
    this.onRemoveCbs.forEach((cb) => cb());
    this.onInsertCbs.length = 0;
    this.onRemoveCbs.length = 0;
  }
}

export const cp =
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

export const getCurrentCp = () => {
  return currentComponent.current;
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
