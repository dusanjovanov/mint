import { ELEMENT_BRAND, ELEMENT_TYPES } from "../constants";
import { DisposeFn, effectInternal } from "../reactive";
import { ReactiveProp, SmlrElement, TextNode } from "../types";
import { getPropValue, isFunction } from "../utils";

export class TextElement implements SmlrElement {
  constructor(text: ReactiveProp<TextNode>) {
    this.text = text;
  }
  brand = ELEMENT_BRAND;
  type = ELEMENT_TYPES.text;
  text;
  parent!: SmlrElement;
  index!: number;
  domNode: Text | undefined;
  dispose: DisposeFn | undefined;

  get isInserted() {
    return !!this.domNode?.isConnected;
  }

  getNodes() {
    return this.domNode ? [this.domNode] : [];
  }

  getFirstNode() {
    return this.domNode;
  }

  toDom() {
    let value = this.text;

    if (isFunction(this.text)) {
      this.dispose = effectInternal(() => {
        // @ts-expect-error
        value = this.text();
        if (!this.domNode) return;
        this.domNode.textContent = String(value);
      });
    }

    this.domNode = document.createTextNode(String(value));
    return this.domNode;
  }

  toHtml(): string {
    return String(getPropValue(this.text));
  }

  onInsert() {}

  remove() {
    this.dispose?.();
    this.dispose = undefined;
    this.domNode?.remove();
    this.domNode = undefined;
  }
}
