import { ShowElement } from "../show";
import { insertElements } from "./insertElements";
import { removeElements } from "./removeElements";

export const updateShowElement = (el: ShowElement, condition: boolean) => {
  if (condition !== el.prevCondition) {
    el.prevCondition = condition;

    el.children = condition ? el.positive : el.negative;

    if (condition) {
      removeElements(el.negative);
    }
    //
    else {
      removeElements(el.positive);
    }

    el.renderer.createElements(el.children);
    insertElements(el.children);
  }
};
