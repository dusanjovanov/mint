import { UPPERCASE_LETTER_REGX } from "../constants";

export const isEventProp = (propKey: string) =>
  propKey !== "on" &&
  propKey.indexOf("on") === 0 &&
  UPPERCASE_LETTER_REGX.test(propKey[2]);
