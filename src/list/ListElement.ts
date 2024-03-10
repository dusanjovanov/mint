import { App } from "../App";
import { SMLLR_EL_BRAND, SMLLR_EL_TYPES } from "../constants";
import { Computed, ValueEffect } from "../reactive";
import { SmllrElement, SmllrNode } from "../types";
import { ListItem } from "./ListItem";

export class ListElement<Item> implements SmllrElement {
  constructor({
    getArr,
    renderItem,
    getItemKey,
  }: {
    getArr: () => Item[];
    renderItem: RenderItemFn<Item>;
    getItemKey?: GetItemKeyFn<Item>;
  }) {
    this._getArr = getArr;
    this._renderItem = renderItem;
    this._getItemKey = getItemKey;
  }

  brand = SMLLR_EL_BRAND;
  type = SMLLR_EL_TYPES.list;
  children: SmllrElement[] = [];
  parent!: SmllrElement;
  index!: number;
  app!: App;
  isInserted = false;
  _getArr;
  _renderItem;
  _cache: Cache<Item> = new Map();
  _prevArr!: Item[];
  _getItemKey;

  _getKey(item: Item, index: number) {
    if (this._getItemKey) {
      return this._getItemKey(item, index);
    }
    return item;
  }

  getNodes(): Node[] {
    return this.app.getNodes(this.children);
  }

  getFirstNode(): Node | undefined {
    return this.app.getFirstNode(this.children);
  }

  onInsert(): void {
    this.isInserted = true;
    this.app.onInsert(this.children);
  }

  remove(): void {
    this.app.remove(this.children);
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

  patch() {
    const oldArr = this._prevArr;
    const newArr = this._getArr();
    const oldLen = oldArr.length;
    const newLen = newArr.length;
    this._prevArr = [...newArr];

    // fast path for prev empty
    if (oldLen === 0) {
      this.create(newArr);
      this.app.toDom(this.children);
      this.app.insert(this.children);
    }
    // fast path for new empty
    else if (newLen === 0) {
      const children = [...this.children];
      this.app.remove(children);
      this.children.length = 0;
      this._cache.clear();
    }
    // patch
    else {
      const newCache: Cache<Item> = new Map();

      const toInsert: SmllrElement[] = [];
      const toRemove: SmllrElement[] = [];
      const toMove: SmllrElement[] = [];

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

      this.app.remove(toRemove);
      this.app.insert(toMove);
      this.app.toDom(toInsert);
      this.app.insert(toInsert);
    }
  }

  toDom(): Node | Node[] {
    const eff = new ValueEffect(
      this._getArr,
      () => {
        this.patch();
      },
      this.app.ctx
    );

    this.create(eff.value);
    return this.app.toDom(this.children);
  }

  toHtml(): string {
    this.create(this._getArr());
    return this.app.toHtml(this.children);
  }
}

type Cache<Item> = Map<CacheKey<Item>, ListItem<Item>>;

type RenderItemFn<Item> = (item: Item, index: Computed<number>) => SmllrNode;

type CacheKey<Item> = string | number | Item;

type GetItemKeyFn<Item> = (item: Item, index: number) => CacheKey<Item>;

export const list = <Item>(
  getArr: () => Item[],
  renderItem: RenderItemFn<Item>,
  getItemKey?: GetItemKeyFn<Item>
) => {
  return new ListElement({ getArr, renderItem, getItemKey });
};
