import { ComponentElement } from "./component";
import { findAncestorElement } from "./findAncestorElement";
import { SmllrElement } from "./types";
import { isElementOfType } from "./utils";

export const getContext = <Value>(key: any, startElement: SmllrElement) => {
  const compnentElWithContext = findAncestorElement(
    startElement,
    (current) =>
      isElementOfType(current, "component") && current.context.has(key)
  ) as ComponentElement<any>;

  if (!compnentElWithContext) return undefined as Value;

  return compnentElWithContext.context.get(key) as Value;
};
