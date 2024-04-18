import { ELEMENT_BRAND, ELEMENT_TYPES } from "../constants";
import { createDomNodes } from "../createDomNodes";
import { createHtmlString } from "../createHtmlString";
import { getFirstNode } from "../getFirstDomNode";
import { getNodes } from "../getNodes";
import { insertElements } from "../insertElements";
import { onInsert } from "../onInsert";
import { Reactive, UnsubscribeFn, effect } from "../reactive";
import { removeElements } from "../removeElements";
import { resolveNode } from "../resolveNode";
import { DomNode, SmlrElement, SmlrNode } from "../types";

export class ShowElement implements SmlrElement {
  constructor(condition: Reactive, positive: SmlrNode, negative?: SmlrNode) {
    this.condition = condition;
    this.positiveNode = positive;
    this.negativeNode = negative;
  }
  brand = ELEMENT_BRAND;
  type = ELEMENT_TYPES.show;
  parent!: SmlrElement;
  index!: number;
  positive: SmlrElement[] = [];
  negative: SmlrElement[] = [];
  children: SmlrElement[] = [];
  isInserted = false;
  prevCondition: boolean | undefined;
  condition;
  positiveNode;
  negativeNode;
  dispose: UnsubscribeFn | undefined;

  getNodes() {
    return getNodes(this.children);
  }

  getFirstNode(): DomNode | undefined {
    return getFirstNode(this.children);
  }

  update() {
    const condition = this.condition.value;

    if (condition !== this.prevCondition) {
      this.prevCondition = condition;

      this.children = condition ? this.positive : this.negative;

      if (condition) {
        removeElements(this.negative);
      }
      //
      else {
        removeElements(this.positive);
      }

      createDomNodes(this.children);
      insertElements(this.children);
    }
  }

  create() {
    this.positive = resolveNode(this.positiveNode, this);
    this.negative = resolveNode(this.negativeNode, this);

    const condition = this.condition.value;

    this.children = condition ? this.positive : this.negative;
  }

  toDom() {
    this.create();
    this.prevCondition = this.condition.value;

    this.dispose = effect(() => this.update());

    return createDomNodes(this.children);
  }

  toHtml(): string {
    this.create();
    return createHtmlString(this.children);
  }

  onInsert() {
    this.isInserted = true;
    onInsert(this.children);
  }

  remove() {
    this.dispose?.();
    this.dispose = undefined;
    removeElements(this.children);
    this.children.length = 0;
    this.positive.length = 0;
    this.negative.length = 0;
    this.isInserted = false;
    this.prevCondition = undefined;
  }
}

export const show = (
  condition: Reactive,
  positive: SmlrNode,
  negative?: SmlrNode
) => {
  return new ShowElement(condition, positive, negative);
};
