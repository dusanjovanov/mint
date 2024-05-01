import { UPPERCASE_LETTER_G_REGX } from "../constants";

export const camelToKebab = (s: string) => {
  return s.replace(
    UPPERCASE_LETTER_G_REGX,
    (match) => `-${match.toLowerCase()}`
  );
};
