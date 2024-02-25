import { App } from "./App";
import { SMLLR_EL_BRAND, SMLLR_EL_TYPES } from "./constants";
import { ValueEffect } from "./reactive";
import { DomNode, SmllrElement, SmllrNode } from "./types";

export class ShowElement implements SmllrElement {
  constructor({
    when,
    then,
    otherwise,
  }: {
    when: () => boolean;
    then: SmllrNode;
    otherwise: SmllrNode;
  }) {
    this.when = when;
    this.thenNodes = then;
    this.otherwiseNodes = otherwise;
  }
  _brand = SMLLR_EL_BRAND;
  _type = SMLLR_EL_TYPES.show;
  app!: App;
  when;
  thenNodes;
  otherwiseNodes;
  children: SmllrElement[] = [];
  prevCondition: boolean | undefined;
  thenEls: SmllrElement[] = [];
  otherwiseEls: SmllrElement[] = [];
  _parent!: SmllrElement;
  _index!: number;
  _isInserted = false;
  _eff: ValueEffect<any> | undefined;

  _getNodes() {
    return this.app.getNodes(this.children);
  }

  _getFirstNode() {
    return this.app.getFirstNode(this.children);
  }

  _create() {
    this.thenEls = this.app.createElements({
      parent: this,
      node: this.thenNodes,
    });
    this.otherwiseEls = this.app.createElements({
      parent: this,
      node: this.otherwiseNodes,
    });
  }

  _update(when: boolean): void {
    const newCondition = when;
    if (this.prevCondition !== newCondition) {
      this.prevCondition = newCondition;
      if (newCondition) {
        this.app.remove(this.otherwiseEls);
        this.app._toDom(this.thenEls);
        this.app.insert(this.thenEls);
      }
      //
      else {
        this.app.remove(this.thenEls);
        this.app._toDom(this.otherwiseEls);
        this.app.insert(this.otherwiseEls);
      }
    }
  }

  _toDom(): DomNode[] {
    this._create();

    let value;

    const eff = new ValueEffect(
      this.when,
      () => {
        this._update(eff.value);
      },
      this.app.ctx
    );
    this._eff = eff;
    value = eff.value;

    this.prevCondition = value;

    if (value) {
      this.children = this.thenEls;
    }
    //
    else {
      this.children = this.otherwiseEls;
    }
    return this.app._toDom(this.children);
  }

  _onInsert() {
    this._isInserted = true;
    this.app.onInsert(this.children);
  }

  _remove(): void {
    this._eff?._dispose();
    this._eff = undefined;
    this.app.remove(this.children);
    this.children.length = 0;
    this._isInserted = false;
  }

  _toHtml(): string {
    this._create();

    let value = this.when();

    return this.app._toString(value ? this.thenEls : this.otherwiseEls);
  }
}

export const show = (
  when: () => boolean,
  then: SmllrNode,
  otherwise?: SmllrNode
) => new ShowElement({ when, then, otherwise });
