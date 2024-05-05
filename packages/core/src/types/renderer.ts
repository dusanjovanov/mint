import { SmlrElement } from "./nodes";

export type SmlrRenderer = {
  createElements(els: SmlrElement[]): any;
  removeElements(els: SmlrElement[]): void;
};
