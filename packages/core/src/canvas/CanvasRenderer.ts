import { SmlrElement, SmlrRenderer } from "../types";
import { isCanvasElement } from "./isCanvasElement";

export class CanvasRenderer implements SmlrRenderer {
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }
  ctx;

  createElement(el: SmlrElement) {
    // @ts-expect-error
    el.renderer = this;
    if (isCanvasElement(el)) {
      el.draw();
    }
  }
  createElements(els: SmlrElement[]) {
    els.forEach((el) => this.createElement(el));
  }

  removeElements(els: SmlrElement[]): void {
    throw new Error("Method not implemented.");
  }
}
