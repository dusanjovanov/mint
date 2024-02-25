import { Computed, State } from "../reactive";
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
    this.index = new State(index, el.app.ctx);
    this.computedIndex = new Computed(() => this.index.value, el.app.ctx);
    this.el = el;
    const smllrNode = this.el._renderItem(this.item, this.computedIndex);
    this.els = this.el.app.createElements({
      node: smllrNode,
      parent: this.el,
      startIndex: index,
    });
  }
  item;
  index;
  computedIndex;
  el;
  els;
}
