import { GetTokenValueFn } from "../css";
import { CSSObject } from "../types";
import { entries } from "./entries";

/**
 * Helper for creating theme variables with groups which certain CSS properties map to
 * in the fashion of Styled system, Themed UI, and Stiches.
 */
export const createThemeVariables = (theme: Theme) => {
  const themeCssObject = {} as CSSObject;
  const values = {} as any;

  entries(theme as any).forEach(([groupKey, group]) => {
    values[groupKey] = {};
    entries(group as any).forEach(([valueKey, value]) => {
      const varName = `--sm-${String(groupKey.toLowerCase())}-${valueKey}`;
      themeCssObject[varName] = value;
      values[groupKey][valueKey] = `var(${varName})`;
    });
  });

  const getTokenValue: GetTokenValueFn = ({ key, tokenName }) => {
    const groupName = TOKEN_MAP[key];
    return values[groupName]?.[tokenName];
  };

  return {
    themeCssObject,
    getTokenValue,
  };
};

const TOKEN_MAP: Record<string, string> = {
  border: "color",
  borderRight: "color",
  backgroundColor: "color",
  color: "color",
  padding: "space",
  gap: "space",
  fontSize: "fontSize",
  borderRadius: "borderRadius",
  borderColor: "color",
  accentColor: "color",
  outline: "color",
  marginBottom: "space",
  borderBottom: "color",
  borderTop: "color",
};

type ThemeGroup<Value = string | number> = Record<string, Value>;

export type Theme = {
  space?: ThemeGroup;
  color?: ThemeGroup<string>;
  fontSize?: ThemeGroup;
  borderRadius?: ThemeGroup;
};
