import { CSSObject } from "../types";
import { camelToKebab } from "../utils";
import { getCssValue } from "./getCssValue";
import { CssOptions, Rule } from "./types";

export const getRuleFromCssObject = (
  cssObject: CSSObject,
  key: string,
  options: CssOptions
): Rule => {
  const rules: Rule[] = [];
  let css = "";
  let serializedNested = "";

  const keys = Object.keys(cssObject);

  for (const k of keys) {
    let v = cssObject[k];

    if (v == null) {
      continue;
    }

    if (typeof v === "object") {
      const rule = getRuleFromCssObject(v as any, k, options);
      serializedNested += rule.serialized;
      rules.push(rule);
      continue;
    }

    css += `${camelToKebab(k)}:${getCssValue(k, v, options)};`;
  }

  return {
    key,
    css,
    rules,
    serialized: `${key}{${css}}${serializedNested}`,
  };
};
