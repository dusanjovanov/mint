import { Computed, State } from "../reactive";
import { resolveNode } from "../resolveNode";
import { ListElement } from "./ListElement";

export class ListItem<Item> {
  constructor({
    item,
    index,
    el,
  }: {
    item: Item;
    index: number;
    el: ListElement<Item>;
  }) {
    this.item = item;
    this.index = new State(index);
    this.computedIndex = new Computed([this.index], () => this.index.value);
    this.el = el;
    const mintNode = this.el._renderItem(this.item, this.computedIndex);
    this.els = resolveNode(mintNode, this.el, index);
  }
  item;
  index;
  computedIndex;
  el;
  els;
}
