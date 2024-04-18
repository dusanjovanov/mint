import { getApp } from "./AppProvider";
import { component } from "./component";
import { htm } from "./html";
import { computed } from "./reactive";
import { CssProp } from "./types";
import { isReactive } from "./utils";

export const globalStyle = component<{ css: CssProp }>(($, { css }) => {
  const { css: cssProvider } = getApp($);
  const getHtml = (css: CssProp) => cssProvider.getGlobalCssRules(css).join("");

  return htm("style", {
    innerHtml: isReactive(css)
      ? computed(() => getHtml(css.value))
      : getHtml(css),
  });
});
