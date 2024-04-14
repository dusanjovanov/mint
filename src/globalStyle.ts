import { component } from "./component";
import { getCss } from "./css";
import { htm } from "./html";
import { CssProp } from "./types";
import { isReactive } from "./utils";

export const globalStyle = component<{ css: CssProp }>(($, { css }) => {
  const cssThing = getCss($);
  const getHtml = (css: CssProp) => cssThing.getGlobalCssRules(css).join("");

  return htm("style", {
    innerHtml: isReactive(css)
      ? $.computed([css], () => getHtml(css.value))
      : getHtml(css),
  });
});
