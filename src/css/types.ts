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
  getTokenValue?: GetTokenValueFn;
};

export type GetTokenValueFn = (args: {
  property: string;
  value: string;
  tokenName: string;
}) => string | number;
