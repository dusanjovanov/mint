export { Signal, batch, computed, signal } from "@preact/signals-core";
export * from "./types";
import { effect as effectOriginal } from "@preact/signals-core";
import { getCurrentCp } from "../component";

export const effect = (fn: () => any) => {
  const dispose = effectOriginal(fn);

  const el = getCurrentCp();

  if (el) {
    el.disposers.push(dispose);
  }

  return dispose;
};

export const effectInternal = effectOriginal;
