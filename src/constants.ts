import { SVGElementPropMap } from "./types";

const svgTags: (keyof SVGElementPropMap)[] = [
  "svg",
  "animate",
  "animateMotion",
  "animateTransform",
  "circle",
  "clipPath",
  "defs",
  "desc",
  "ellipse",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "filter",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "marker",
  "mask",
  "metadata",
  "mpath",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "switch",
  "symbol",
  "text",
  "textPath",
  "tspan",
  "use",
  "view",
];

export const SVG_MAP = svgTags.reduce((m, t) => {
  m[t] = true;
  return m;
}, {} as Record<keyof SVGElementTagNameMap, boolean>);

export const SMLLR_EL_BRAND = Symbol.for("smllr-el");

export const SMLLR_EL_TYPES = {
  html: Symbol.for("smllr-html"),
  text: Symbol.for("smllr-text"),
  show: Symbol.for("smllr-show"),
  cmp: Symbol.for("smllr-cmp"),
  list: Symbol.for("smllr-list"),
};

const UNITLESS_CSS_PROPS = [
  "animationIterationCount",
  "boxFlex",
  "boxFlexGroup",
  "boxOrdinalGroup",
  "columnCount",
  "fillOpacity",
  "flex",
  "flexGrow",
  "flexPositive",
  "flexShrink",
  "flexNegative",
  "flexOrder",
  "fontWeight",
  "lineClamp",
  "lineHeight",
  "opacity",
  "order",
  "orphans",
  "stopOpacity",
  "strokeDashoffset",
  "strokeOpacity",
  "strokeWidth",
  "tabSize",
  "widows",
  "zIndex",
  "zoom",
] as const;

export const UNITLESS_CSS_PROP_MAP = UNITLESS_CSS_PROPS.reduce((m, t) => {
  m[t] = true;
  return m;
}, {} as Record<string, boolean>);

export const UPPERCASE_LETTER_REGX = /[A-Z]/;
export const UPPERCASE_LETTER_G_REGX = new RegExp(
  UPPERCASE_LETTER_REGX,
  UPPERCASE_LETTER_REGX.flags + "g"
);
export const THEME_TOKEN_REGEX = /\$[A-Za-z0-9_]+/g;
