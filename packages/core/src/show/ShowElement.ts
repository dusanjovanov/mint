import { ELEMENT_BRAND, ELEMENT_TYPES } from "../constants";
import { createHtmlString } from "../createHtmlString";
import { onInsert } from "../onInsert";
import { DisposeFn, effectInternal } from "../reactive";
import { resolveNode } from "../resolveNode";
import { SmlrElement, SmlrNode, SmlrRenderer } from "../types";

export class ShowElement implements SmlrElement {
  constructor(
    condition: () => boolean,
    positive: SmlrNode,
    negative?: SmlrNode
  ) {
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
  dispose: DisposeFn | undefined;
  renderer!: SmlrRenderer;

  create(condition: boolean) {
    this.positive = resolveNode(this.positiveNode, this);
    this.negative = resolveNode(this.negativeNode, this);

    this.prevCondition = condition;

    this.children = condition ? this.positive : this.negative;
  }

  subscribe(onUpdate: (condition: boolean) => void) {
    let condition: boolean;
    this.dispose = effectInternal(() => {
      condition = this.condition();
      if (!this.isInserted) return;
      onUpdate(condition);
    });
    return condition!;
  }

  toHtml(): string {
    this.create(this.condition());
    return createHtmlString(this.children);
  }

  onInsert() {
    this.isInserted = true;
    onInsert(this.children);
  }

  remove() {
    this.dispose?.();
    this.dispose = undefined;
    this.renderer.removeElements(this.children);
    this.children.length = 0;
    this.positive.length = 0;
    this.negative.length = 0;
    this.isInserted = false;
    this.prevCondition = undefined;
  }
}

export const show = (
  condition: () => boolean,
  positive: SmlrNode,
  negative?: SmlrNode
) => {
  return new ShowElement(condition, positive, negative);
};
