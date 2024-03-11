import { cssPropToObject } from "./cssPropToObject";
import { getFinishedRules } from "./getFinishedRules";
import { getRuleFromCssObject } from "./getRuleFromCssObject";
import { hash } from "./hash";
import { CssOptions } from "./types";

export class Css {
  constructor(options?: CssOptions) {
    this.options = options ?? {};
  }
  total = 0;
  els: HTMLStyleElement[] = [];
  useStyleSheet = process.env.NODE_ENV === "production";
  cache: CssCache = {};
  options;

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

  getScopedCssClass(cssProp: any) {
    const mergedObj = cssPropToObject(cssProp);
    const rule = getRuleFromCssObject(mergedObj, "", this.options);
    const hashed = hash(rule.serialized);
    const className = `sm-${hashed}`;
    const selector = `.${className}`;

    const finishedRules = getFinishedRules(selector, rule.rules);

    if (!this.cache[hashed]) {
      this.insertRule(`${selector}{${rule.css}}`);
      this.cache[hashed] = true;
    }

    finishedRules.forEach((rule) => {
      if (!this.cache[rule.hash]) {
        this.insertRule(`${rule.selector}{${rule.css}}`);
        this.cache[rule.hash] = true;
      }
    });

    return className;
  }
}

type CssCache = Record<string, true>;

const MAX_RULES_PER_STYLE_EL = 65000;
