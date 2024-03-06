import { HTMLElementPropMap, SVGElementPropMap } from "../types";

export type AllHtmlPropMap = HTMLElementPropMap & SVGElementPropMap;

export type AllHtmlTags = keyof AllHtmlPropMap;
