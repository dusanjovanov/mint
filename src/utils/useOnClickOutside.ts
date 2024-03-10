import { UseFn } from "../types";

export const useOnClickOutside =
  (cb: (e: MouseEvent) => void): UseFn<Element> =>
  (el) => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!el.contains(target)) {
        cb(e);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  };
