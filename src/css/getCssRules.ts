import { CSSObject } from "../types";
import { UPPERCASE_LETTER_REGX } from "../utils";
import { hash } from "./hash";

export const getCssRules = (cssObject: CSSObject): FinishedRule[] => {
  const rawRule = handleCssObject(cssObject);

  const hashString = hash(rawRule.css);
  const className = `lw-${hashString}`;
  const selector = `.${className}`;

  return [
    {
      hash: hashString,
      css: rawRule.css,
      selector,
    },
    ...handleCssRules(selector, rawRule.rules),
  ];
};

const handleCssObject = (cssObject: CSSObject, key?: string) => {
  const result: RawRule = {
    key: key!,
    css: "",
    hash: "",
    rules: [],
  };

  const keys = Object.keys(cssObject);

  for (const key of keys) {
    let v = cssObject[key];

    if (typeof v === "object") {
      result.rules.push(handleCssObject(v as any, key));
      continue;
    }

    const k = key.replace(
      UPPERCASE_LETTER_REGX,
      (match) => `-${match.toLowerCase()}`
    );

    if (typeof v === "number") {
      v = `${v}px`;
    }

    result.css += `${k}:${v};`;
  }
  result.hash = hash(result.css);

  return result;
};

const handleCssRules = (parentSelector: string, rules: RawRule[]) => {
  const result: FinishedRule[] = [];

  for (const rule of rules) {
    let selector;

    if (rule.key.indexOf("&") === 0) {
      selector = rule.key.replace(/&/g, parentSelector);
    }
    //
    else if (rule.key.indexOf(":") === 0) {
      selector = `${parentSelector}${rule.key}`;
    }
    //
    else {
      selector = `${parentSelector} ${rule.key}`;
    }

    result.push(
      {
        hash: rule.hash,
        selector,
        css: rule.css,
      },
      ...handleCssRules(selector, rule.rules)
    );
  }

  return result;
};

type RawRule = {
  key: string;
  hash: string;
  css: string;
  rules: RawRule[];
};

type FinishedRule = {
  hash: string;
  selector: string;
  css: string;
};
