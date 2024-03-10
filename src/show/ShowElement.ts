import { App } from "../App";
import { SMLLR_EL_BRAND, SMLLR_EL_TYPES } from "../constants";
import { ValueEffect } from "../reactive";
import { DomNode, SmllrElement, SmllrNode } from "../types";

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
  brand = SMLLR_EL_BRAND;
  type = SMLLR_EL_TYPES.show;
  app!: App;
  when;
  thenNodes;
  otherwiseNodes;
  children: SmllrElement[] = [];
  prevCondition: boolean | undefined;
  thenEls: SmllrElement[] = [];
  otherwiseEls: SmllrElement[] = [];
  parent!: SmllrElement;
  index!: number;
  isInserted = false;
  eff: ValueEffect<any> | undefined;

  getNodes() {
    return this.app.getNodes(this.children);
  }

  getFirstNode() {
    return this.app.getFirstNode(this.children);
  }

  create() {
    this.thenEls = this.app.createElements({
      parent: this,
      node: this.thenNodes,
    });
    this.otherwiseEls = this.app.createElements({
      parent: this,
      node: this.otherwiseNodes,
    });
  }

  update(when: boolean): void {
    const newCondition = when;
    if (this.prevCondition !== newCondition) {
      this.prevCondition = newCondition;
      if (newCondition) {
        this.app.remove(this.otherwiseEls);
        this.app.toDom(this.thenEls);
        this.app.insert(this.thenEls);
      }
      //
      else {
        this.app.remove(this.thenEls);
        this.app.toDom(this.otherwiseEls);
        this.app.insert(this.otherwiseEls);
      }
    }
  }

  toDom(): DomNode[] {
    this.create();

    let value;

    const eff = new ValueEffect(
      this.when,
      () => {
        this.update(eff.value);
      },
      this.app.ctx
    );
    this.eff = eff;
    value = eff.value;

    this.prevCondition = value;

    if (value) {
      this.children = this.thenEls;
    }
    //
    else {
      this.children = this.otherwiseEls;
    }
    return this.app.toDom(this.children);
  }

  onInsert() {
    this.isInserted = true;
    this.app.onInsert(this.children);
  }

  remove(): void {
    this.eff?._dispose();
    this.eff = undefined;
    this.app.remove(this.children);
    this.children.length = 0;
    this.thenEls.length = 0;
    this.otherwiseEls.length = 0;
    this.isInserted = false;
  }

  toHtml(): string {
    this.create();

    let value = this.when();

    return this.app.toHtml(value ? this.thenEls : this.otherwiseEls);
  }
}

export const show = (
  when: () => boolean,
  then: SmllrNode,
  otherwise?: SmllrNode
) => new ShowElement({ when, then, otherwise });
