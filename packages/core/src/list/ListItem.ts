import { computed, signal } from "../reactive";
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
    this.index = signal(index);
    this.computedIndex = computed(() => this.index.value);
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
