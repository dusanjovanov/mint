import { TextNode } from "../types";

export const isTextNode = (v: any): v is TextNode =>
  typeof v === "string" || typeof v === "number";
