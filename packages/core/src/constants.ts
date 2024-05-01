export const ELEMENT_BRAND = Symbol.for("smlr-el");
export const REACTIVE_BRAND = Symbol.for("smlr-reactive");
export const STATE_TYPE = Symbol.for("smlr-state");

export const ELEMENT_TYPES = {
  html: Symbol.for("smlr-html"),
  text: Symbol.for("smlr-text"),
  component: Symbol.for("smlr-component"),
  show: Symbol.for("smlr-show"),
  portal: Symbol.for("smlr-portal"),
  list: Symbol.for("smlr-list"),
  head: Symbol.for("smlr-head"),
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

// regex
export const UPPERCASE_LETTER_REGX = /[A-Z]/;
export const UPPERCASE_LETTER_G_REGX = new RegExp(
  UPPERCASE_LETTER_REGX,
  UPPERCASE_LETTER_REGX.flags + "g"
);
export const THEME_TOKEN_REGEX = /\$[A-Za-z0-9_]+/g;

const VOID_TAGS = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
];

export const VOID_TAGS_MAP = VOID_TAGS.reduce((m, t) => {
  m[t] = true;
  return m;
}, {} as Record<string, boolean>);
