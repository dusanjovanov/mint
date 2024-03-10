import { THEME_TOKEN_REGEX } from "../constants";
import { CSSObject } from "../types";
import { camelToKebab } from "../utils";
import { createThemeVariables } from "./createThemeVariables";
import { shouldAddPx } from "./addPxIfNeeded";
import { hash } from "./hash";
import { CssOptions, FinishedRule, RawRule } from "./types";

export class Css {
  constructor(options?: CssOptions) {
    if (options?.theme) {
      this.theme = createThemeVariables(options.theme);
      const className = this.getCssClass(this.theme.cssObject);
      document.body.classList.add(className);
    }
  }
  total = 0;
  els: HTMLStyleElement[] = [];
  useStyleSheet = process.env.NODE_ENV === "production";
  cache: CssCache = {};
  theme;

  createStyleElement() {
    const el = document.createElement("style");
    el.dataset.smllr = "";
    return el;
  }

  insertStyleElement(el: HTMLStyleElement) {
    const nextNode = this.els.at(-1)?.nextSibling ?? null;
    document.head.insertBefore(el, nextNode ?? null);
    this.els.push(el);
  }

  insertRule(rule: string) {
    if (this.total % MAX_RULES_PER_STYLE_EL === 0) {
      this.insertStyleElement(this.createStyleElement());
    }

    const el = this.els.at(-1)!;

    if (this.useStyleSheet) {
      const sheet = el.sheet!;
      sheet.insertRule(rule, sheet.cssRules.length);
    }
    //
    else {
      el.appendChild(document.createTextNode(rule));
    }

    this.total++;
  }

  getCssClass(obj: any) {
    const rules = this.getScopedCssRules(obj);

    for (const rule of rules) {
      if (!this.cache[rule.hash]) {
        this.cache[rule.hash] = true;
        this.insertRule(`${rule.selector}{${rule.css}}`);
      }
    }

    return rules[0].selector.slice(1);
  }

  getScopedCssRules(cssObject: CSSObject): FinishedRule[] {
    const rawRule = this.handleCssObject(cssObject);

    const hashString = hash(rawRule.css);
    const className = `sm-${hashString}`;
    const selector = `.${className}`;

    return [
      {
        hash: hashString,
        css: rawRule.css,
        selector,
      },
      ...this.handleCssRules(selector, rawRule.rules),
    ];
  }

  handleCssRules(parentSelector: string, rules: RawRule[]) {
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
      else if (rule.key.indexOf("*") === 0) {
        selector = `${parentSelector} *`;
      }
      //
      else {
        selector = `${parentSelector} ${rule.key}`;
      }

      result.push(
        {
          hash: hash(`${selector}{${rule.css}}`),
          selector,
          css: rule.css,
        },
        ...this.handleCssRules(selector, rule.rules)
      );
    }

    return result;
  }

  handleCssObject(cssObject: CSSObject, key?: string) {
    const result: RawRule = {
      key: key!,
      css: "",
      rules: [],
    };

    const keys = Object.keys(cssObject);

    for (const key of keys) {
      let v = cssObject[key];

      if (v == null) {
        continue;
      }

      if (typeof v === "object") {
        result.rules.push(this.handleCssObject(v as any, key));
        continue;
      }

      result.css += `${camelToKebab(key)}:${this.getCssValue(key, v)};`;
    }

    return result;
  }

  getCssValue(key: string, value: string | number) {
    if (shouldAddPx(key, value)) {
      return `${value}px`;
    }
    if (this.theme) {
      return String(value).replace(THEME_TOKEN_REGEX, (match) => {
        const tokenName = match.slice(1);
        const themeGroup = TOKEN_MAP[key];
        if (!themeGroup || !this.theme!.values[themeGroup]) return match;
        return this.theme!.values[themeGroup][tokenName];
      });
    }
    return value;
  }
}

type CssCache = Record<string, true>;

export const MAX_RULES_PER_STYLE_EL = 65000;

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
};
