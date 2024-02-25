import * as CSS from "csstype";

type CSSPropertiesFallback = CSS.PropertiesFallback<number | string>;

type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject };

type CSSObjectBase = {
  [K in keyof CSSPropertiesFallback]: CSSPropertiesFallback[K];
};

type CSSArrayValue = ReadonlyArray<CSSValue>;

type CssValue = string | number | CSSObject | CSSArrayValue;

type CSSOthersObject = {
  [name: string]: CssValue;
};

export type CSSObject = CSSObjectBase & CSSPseudos & CSSOthersObject;
