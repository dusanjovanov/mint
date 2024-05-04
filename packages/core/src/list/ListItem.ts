import { computed, signal } from "../reactive";
import { resolveNode } from "../resolveNode";
import { ListElement } from "./ListElement";

export class ListItem<Item> {
  constructor({ index, el }: { index: number; el: ListElement<Item> }) {
    this.index = signal(index);
    this.item = computed(() => this.el.array()[this.index.value]);
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

  updateIndex(index: number) {
    this.index.value = index;
    this.els.forEach((el, i) => {
      el.index = index + i;
    });
  }
}
