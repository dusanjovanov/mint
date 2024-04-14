import { Head } from "../head";

export type Rule = {
  key: string;
  css: string;
  rules: Rule[];
  serialized: string;
};

export type FinishedRule = {
  selector: string;
  css: string;
  hash: string;
};

export type CssOptions = {
  head: Head;
  getTokenValue?: GetTokenValueFn;
  isSsr?: boolean;
};

export type GetTokenValueFn = (args: {
  property: string;
  value: string;
  tokenName: string;
}) => string | number;
