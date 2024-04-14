import { THEME_TOKEN_REGEX } from "../constants";
import { shouldAddPx } from "../utils";
import { CssOptions } from "./types";

export const getCssValue = (
  key: string,
  value: string | number,
  options: CssOptions
) => {
  if (shouldAddPx(key, value)) {
    return `${value}px`;
  }
  if (options.getTokenValue) {
    return String(value).replace(THEME_TOKEN_REGEX, (match) => {
      const v = options.getTokenValue!({
        property: key,
        value,
        tokenName: match.slice(1),
      });
      return shouldAddPx(key, v) ? `${v}px` : v;
    });
  }
  return value;
};
