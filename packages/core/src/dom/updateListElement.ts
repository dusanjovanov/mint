import { ListElement, ListElementCache, ListItem } from "../list";
import { SmlrElement } from "../types";
import { insertElements } from "./insertElements";

export const updateListElement = <Item>(el: ListElement<Item>, arr: Item[]) => {
  const oldArr = el._prevArr;
  const newArr = arr;
  const oldLen = oldArr.length;
  const newLen = newArr.length;
  el._prevArr = [...newArr];

  // fast path for prev empty
  if (oldLen === 0) {
    el.create(arr);
    el.renderer.createElements(el.children);
    insertElements(el.children);
  }
  // fast path for new empty
  else if (newLen === 0) {
    const children = [...el.children];
    el.renderer.removeElements(children);
    el.children.length = 0;
    el._cache.clear();
  }
  // patch
  else {
    const newCache: ListElementCache<Item> = new Map();

    const toInsert: SmlrElement[] = [];
    const toRemove: SmlrElement[] = [];
    const toMove: SmlrElement[] = [];

    el.children.length = 0;

    for (let i = 0; i < newLen; i++) {
      const item = newArr[i];
      const key = el._getKey(item, i);

      let listItem = el._cache.get(key);

      // exists
      if (listItem) {
        // index changed
        if (listItem.index.peek() !== i) {
          listItem.updateIndex(i);
          toMove.push(...listItem.els);
        }
      }
      // new item
      else {
        listItem = new ListItem({ index: i, el });
        toInsert.push(...listItem.els);
      }
      newCache.set(key, listItem);
      el.children.push(...listItem.els);
    }

    for (let i = 0; i < oldLen; i++) {
      const item = oldArr[i];
      const key = el._getKey(item, i);
      const listItem = newCache.get(key);

      // removed
      if (!listItem) {
        const oldListItem = el._cache.get(key);
        if (oldListItem) {
          toRemove.push(...oldListItem.els);
        }
      }
    }

    el._cache = newCache;

    el.renderer.removeElements(toRemove);
    insertElements(toMove);
    el.renderer.createElements(toInsert);
    insertElements(toInsert);
  }
};
