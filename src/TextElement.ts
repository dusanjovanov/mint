import { App } from "./App";
import { MINT_EL_BRAND, MINT_EL_TYPES } from "./constants";
import { ValueEffect } from "./reactive";
import { DomNode, MintElement, TextNode } from "./types";
import { isFunction } from "./utils";

export class TextElement implements MintElement {
  constructor({ text }: { text: TextNode | (() => TextNode) }) {
    this.text = text;
  }
  _brand = MINT_EL_BRAND;
  _type = MINT_EL_TYPES.text;
  text;
  app!: App;
  _parent!: MintElement;
  _index!: number;
  _isInserted = false;
  _eff: ValueEffect<any> | undefined;

  _domNode: Text | undefined;

  get node() {
    return this._domNode;
  }

  _getNodes() {
    return this._domNode ? [this._domNode] : [];
  }

  _getFirstNode(): DomNode | undefined {
    return this._domNode;
  }

  _onInsert() {
    this._isInserted = true;
  }

  _toDom() {
    let value = String(this.text);

    if (isFunction(this.text)) {
      const eff = new ValueEffect(
        this.text,
        () => {
          this._domNode!.textContent = String(eff.value);
        },
        this.app.ctx
      );
      this._eff = eff;
      value = String(eff.value);
    }

    this._domNode = document.createTextNode(value);
    return this._domNode;
  }

  setText(text: string | number) {
    if (this._domNode) this._domNode.textContent = String(text);
  }

  _remove(): void {
    this._eff?._dispose();
    this._eff = undefined;
    this._domNode?.remove();
    this._isInserted = false;
    this._domNode = undefined;
  }

  _toHtml(): string {
    if (isFunction(this.text)) {
      return String(this.text());
    }
    return String(this.text);
  }
}
