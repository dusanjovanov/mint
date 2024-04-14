export const ELEMENT_BRAND = Symbol.for("smllr-el");
export const REACTIVE_BRAND = Symbol.for("smllr-reactive");
export const STATE_TYPE = Symbol.for("smllr-state");

export const ELEMENT_TYPES = {
  html: Symbol.for("smllr-html"),
  text: Symbol.for("smllr-text"),
  component: Symbol.for("smllr-component"),
  show: Symbol.for("smllr-show"),
  portal: Symbol.for("smllr-portal"),
  list: Symbol.for("smllr-list"),
  head: Symbol.for("smllr-head"),
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
