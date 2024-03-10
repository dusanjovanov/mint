import { App } from "../App";
import { SMLLR_EL_BRAND, SMLLR_EL_TYPES } from "../constants";
import { ValueEffect } from "../reactive";
import { DomNode, SmllrElement, TextNode } from "../types";
import { isFunction } from "../utils";

export class TextElement implements SmllrElement {
  constructor({ text }: { text: TextNode | (() => TextNode) }) {
    this.text = text;
  }
  brand = SMLLR_EL_BRAND;
  type = SMLLR_EL_TYPES.text;
  text;
  app!: App;
  parent!: SmllrElement;
  index!: number;
  eff: ValueEffect<any> | undefined;
  domNode: Text | undefined;

  getNodes() {
    return this.domNode ? [this.domNode] : [];
  }

  getFirstNode(): DomNode | undefined {
    return this.domNode;
  }

  get isInserted() {
    return !!this.domNode?.isConnected;
  }

  onInsert() {}

  toDom() {
    let value = String(this.text);

    if (isFunction(this.text)) {
      const eff = new ValueEffect(
        this.text,
        () => {
          this.domNode!.textContent = String(eff.value);
        },
        this.app.ctx
      );
      this.eff = eff;
      value = String(eff.value);
    }

    this.domNode = document.createTextNode(value);
    return this.domNode;
  }

  remove(): void {
    this.eff?._dispose();
    this.eff = undefined;
    this.domNode?.remove();
    this.domNode = undefined;
  }

  toHtml(): string {
    if (isFunction(this.text)) {
      return String(this.text());
    }
    return String(this.text);
  }
}
