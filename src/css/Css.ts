import { CssProp } from "../types";
import { entries } from "../utils";
import { cssPropToObject } from "./cssPropToObject";
import { getFinishedRules } from "./getFinishedRules";
import { getRuleFromCssObject } from "./getRuleFromCssObject";
import { hash } from "./hash";
import { CssOptions } from "./types";

export class Css {
  constructor(options: CssOptions) {
    this.options = options ?? {};
    this.head = options.head;
    this.isSsr = options.isSsr ?? false;
  }
  head;
  total = 0;
  els: HTMLStyleElement[] = [];
  useStyleSheet = process.env.NODE_ENV === "production";
  cache: CssCache = {};
  options;
  isSsr;

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

    const ruleString = `${selector}{${rule.css}}`;

    if (!this.cache[hashed]) {
      if (this.isSsr) {
        this.head.insertRule(ruleString);
      }
      //
      else {
        this.insertRule(ruleString);
      }

      this.cache[hashed] = true;
    }

    finishedRules.forEach((rule) => {
      const ruleString = `${rule.selector}{${rule.css}}`;

      if (!this.cache[rule.hash]) {
        if (this.isSsr) {
          this.head.insertRule(ruleString);
        }
        //
        else {
          this.insertRule(ruleString);
        }
        this.cache[rule.hash] = true;
      }
    });

    return className;
  }

  getGlobalCssRules(cssProp: CssProp) {
    const cssObject = cssPropToObject(cssProp);

    const rules = entries(cssObject).map(([key, value]) => {
      return getRuleFromCssObject(value, key, this.options);
    });

    const finishedRules = getFinishedRules("", rules);

    return finishedRules.map((rule) => {
      return `${rule.selector}{${rule.css}}`;
    });
  }
}

type CssCache = Record<string, true>;

const MAX_RULES_PER_STYLE_EL = 65000;
