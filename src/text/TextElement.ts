import { ELEMENT_BRAND, ELEMENT_TYPES } from "../constants";
import { DisposeFn, effect } from "../reactive";
import { ReactiveProp, SmlrElement, TextNode } from "../types";
import { getPropValue, getReactiveValue } from "../utils";

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
    let value;

    this.dispose = effect(() => {
      value = getReactiveValue(this.text);
      if (!this.isInserted) return;
      this.domNode!.textContent = String(value);
    });

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
