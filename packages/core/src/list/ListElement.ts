import { ELEMENT_BRAND, ELEMENT_TYPES } from "../constants";
import { createHtmlString } from "../createHtmlString";
import { onInsert } from "../onInsert";
import { DisposeFn, Signal, effectInternal } from "../reactive";
import { SmlrElement, SmlrNode, SmlrRenderer } from "../types";
import { ListItem } from "./ListItem";

export class ListElement<Item> implements SmlrElement {
  constructor({
    array,
    renderItem,
    getItemKey,
  }: {
    array: () => Item[];
    renderItem: RenderItemFn<Item>;
    getItemKey?: GetItemKeyFn<Item>;
  }) {
    this.array = array;
    this._renderItem = renderItem;
    this._getItemKey = getItemKey;
  }

  brand = ELEMENT_BRAND;
  type = ELEMENT_TYPES.list;
  children: SmlrElement[] = [];
  parent!: SmlrElement;
  index!: number;
  isInserted = false;
  array;
  _renderItem;
  _cache: ListElementCache<Item> = new Map();
  _prevArr!: Item[];
  _getItemKey;
  dispose: DisposeFn | undefined;
  renderer!: SmlrRenderer;

  _getKey(item: Item, index: number) {
    if (this._getItemKey) {
      return this._getItemKey(item, index);
    }
    return item;
  }

  onInsert(): void {
    this.isInserted = true;
    onInsert(this.children);
  }

  remove(): void {
    this.renderer.removeElements(this.children);
    this.children.length = 0;
    this._cache.clear();
    this.isInserted = false;
  }

  create(arr: Item[]) {
    this._prevArr = [...arr];

    const len = arr.length;

    for (let i = 0; i < len; i++) {
      const item = arr[i];

      const listItem = new ListItem({ index: i, el: this });

      this._cache.set(this._getKey(item, i), listItem);
      this.children.push(...listItem.els);
    }
  }

  subscribe(onUpdate: (arr: Item[]) => void) {
    let arr: Item[] = [];

    this.dispose = effectInternal(() => {
      arr = this.array();
      if (!this.isInserted) return;
      onUpdate(arr);
    });

    return arr;
  }

  toHtml(): string {
    this.create(this.array());
    return createHtmlString(this.children);
  }
}

export type ListElementCache<Item> = Map<CacheKey<Item>, ListItem<Item>>;

type RenderItemFn<Item> = (
  item: Signal<Item>,
  index: Signal<number>
) => SmlrNode;

type CacheKey<Item> = string | number | Item;

type GetItemKeyFn<Item> = (item: Item, index: number) => CacheKey<Item>;

export const list = <Item>(
  array: () => Item[],
  renderItem: RenderItemFn<Item>,
  getItemKey?: GetItemKeyFn<Item>
) => {
  return new ListElement({ array, renderItem, getItemKey });
};
