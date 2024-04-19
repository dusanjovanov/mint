export { Signal, computed, signal } from "@preact/signals-core";
export * from "./types";
import { effect as effectOriginal } from "@preact/signals-core";
import { getCurrentCp } from "../component";

export const effect = (...args: Parameters<typeof effectOriginal>) => {
  const dispose = effectOriginal(...args);

  const el = getCurrentCp();

  if (el) {
    el.disposers.push(dispose);
  }
};
