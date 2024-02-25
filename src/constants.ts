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

export const MINT_EL_BRAND = Symbol.for("mint-el");

export const MINT_EL_TYPES = {
  html: Symbol.for("mint-html"),
  text: Symbol.for("mint-text"),
  show: Symbol.for("mint-show"),
  cmp: Symbol.for("mint-cmp"),
  list: Symbol.for("mint-list"),
};