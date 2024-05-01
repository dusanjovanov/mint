import { ELEMENT_BRAND, ELEMENT_TYPES } from "../constants";
import { createDomNodes } from "../createDomNodes";
import { createHtmlString } from "../createHtmlString";
import { getFirstNode } from "../getFirstDomNode";
import { getNodes } from "../getNodes";
import { insertElements } from "../insertElements";
import { onInsert } from "../onInsert";
import { DisposeFn, Signal, effectInternal } from "../reactive";
import { removeElements } from "../removeElements";
import { SmlrElement, SmlrNode } from "../types";
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
  _cache: Cache<Item> = new Map();
  _prevArr!: Item[];
  _getItemKey;
  dispose: DisposeFn | undefined;

  _getKey(item: Item, index: number) {
    if (this._getItemKey) {
      return this._getItemKey(item, index);
    }
    return item;
  }

  getNodes() {
    return getNodes(this.children);
  }

  getFirstNode() {
    return getFirstNode(this.children);
  }

  onInsert(): void {
    this.isInserted = true;
    onInsert(this.children);
  }

  remove(): void {
    removeElements(this.children);
    this.children.length = 0;
    this._cache.clear();
    this.isInserted = false;
  }

  create(arr: Item[]) {
    this._prevArr = [...arr];

    const len = arr.length;

    for (let i = 0; i < len; i++) {
      const item = arr[i];

      const listItem = new ListItem({ item, index: i, el: this });

      this._cache.set(this._getKey(item, i), listItem);
      this.children.push(...listItem.els);
    }
  }

  patch(arr: Item[]) {
    const oldArr = this._prevArr;
    const newArr = arr;
    const oldLen = oldArr.length;
    const newLen = newArr.length;
    this._prevArr = [...newArr];

    // fast path for prev empty
    if (oldLen === 0) {
      this.create(arr);
      createDomNodes(this.children);
      insertElements(this.children);
    }
    // fast path for new empty
    else if (newLen === 0) {
      const children = [...this.children];
      removeElements(children);
      this.children.length = 0;
      this._cache.clear();
    }
    // patch
    else {
      const newCache: Cache<Item> = new Map();

      const toInsert: SmlrElement[] = [];
      const toRemove: SmlrElement[] = [];
      const toMove: SmlrElement[] = [];

      this.children.length = 0;

      for (let i = 0; i < newLen; i++) {
        const item = newArr[i];
        const key = this._getKey(item, i);

        let listItem = this._cache.get(key);

        // exists
        if (listItem) {
          // index changed
          if (listItem.index.value !== i) {
            listItem.index.value = i;
            listItem.els.forEach((el, idx) => {
              el.index = i + idx;
            });
            toMove.push(...listItem.els);
          }
        }
        // new item
        else {
          listItem = new ListItem({ item, index: i, el: this });
          toInsert.push(...listItem.els);
        }
        newCache.set(key, listItem);
        this.children.push(...listItem.els);
      }

      for (let i = 0; i < oldLen; i++) {
        const item = oldArr[i];
        const key = this._getKey(item, i);
        const listItem = newCache.get(key);

        // removed
        if (!listItem) {
          const oldListItem = this._cache.get(key);
          if (oldListItem) {
            toRemove.push(...oldListItem.els);
          }
        }
      }

      this._cache = newCache;

      removeElements(toRemove);
      insertElements(toMove);
      createDomNodes(toInsert);
      insertElements(toInsert);
    }
  }

  toDom(): Node | Node[] {
    let arr: Item[] = [];

    this.dispose = effectInternal(() => {
      arr = this.array();
      if (!this.isInserted) return;
      this.patch(arr);
    });

    this.create(arr);
    return createDomNodes(this.children);
  }

  toHtml(): string {
    this.create(this.array());
    return createHtmlString(this.children);
  }
}

type Cache<Item> = Map<CacheKey<Item>, ListItem<Item>>;

type RenderItemFn<Item> = (item: Item, index: Signal<number>) => SmlrNode;

type CacheKey<Item> = string | number | Item;

type GetItemKeyFn<Item> = (item: Item, index: number) => CacheKey<Item>;

export const list = <Item>(
  array: () => Item[],
  renderItem: RenderItemFn<Item>,
  getItemKey?: GetItemKeyFn<Item>
) => {
  return new ListElement({ array, renderItem, getItemKey });
};
