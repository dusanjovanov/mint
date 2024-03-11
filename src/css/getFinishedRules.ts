import { getSelector } from "./getSelector";
import { hash } from "./hash";
import { FinishedRule, Rule } from "./types";

export const getFinishedRules = (parentSelector: string, rules: Rule[]) => {
  const result: FinishedRule[] = [];

  for (const rule of rules) {
    const selector = getSelector(parentSelector, rule.key);

    result.push(
      {
        hash: hash(`${selector}{${rule.css}}`),
        selector,
        css: rule.css,
      },
      ...getFinishedRules(selector, rule.rules)
    );
  }

  return result;
};
