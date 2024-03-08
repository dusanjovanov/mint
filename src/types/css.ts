import * as CSS from "csstype";

type CSSPropertiesFallback = CSS.PropertiesFallback<number | string>;

type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject };

type CSSObjectBase = {
  [K in keyof CSSPropertiesFallback]: CSSPropertiesFallback[K];
};

type CSSArrayValue = ReadonlyArray<CSSValue>;

type CSSValue = string | number | CSSObject | undefined | CSSArrayValue;

type CSSOthersObject = {
  [name: string]: CSSValue;
};

export type CSSObject = CSSObjectBase & CSSPseudos & CSSOthersObject;
