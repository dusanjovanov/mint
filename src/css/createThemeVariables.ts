import { CSSObject } from "../types";
import { entries } from "../utils";
import { Theme } from "./types";

export const createThemeVariables = (theme: Theme) => {
  const cssObject = {} as CSSObject;
  const values = {} as any;

  entries(theme as any).forEach(([groupKey, group]) => {
    values[groupKey] = {};
    entries(group as any).forEach(([valueKey, value]) => {
      const varName = `--sm-${String(groupKey.toLowerCase())}-${valueKey}`;
      cssObject[varName] = value;
      values[groupKey][valueKey] = `var(${varName})`;
    });
  });

  return {
    cssObject,
    values,
  };
};
