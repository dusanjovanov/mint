import { ELEMENT_BRAND, ELEMENT_TYPES } from "../constants";
import { Reactive, UnsubscribeFn } from "../reactive";
import { SmllrElement, ReactiveProp, TextNode } from "../types";
import { getPropValue, isReactive } from "../utils";

export class TextElement implements SmllrElement {
  constructor(text: ReactiveProp<TextNode>) {
    this.text = text;
  }
  brand = ELEMENT_BRAND;
  type = ELEMENT_TYPES.text;
  text;
  parent!: SmllrElement;
  index!: number;
  domNode: Text | undefined;
  unsub: UnsubscribeFn | undefined;

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

    if (isReactive(this.text)) {
      value = this.text.value;

      this.unsub = this.text.subscribe(() => {
        const value = (this.text as Reactive).value;
        this.domNode!.textContent = String(value);
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
    this.unsub?.();
    this.unsub = undefined;
    this.domNode?.remove();
    this.domNode = undefined;
  }
}
