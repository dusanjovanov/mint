export type RawRule = {
  key: string;
  css: string;
  rules: RawRule[];
};

export type FinishedRule = {
  hash: string;
  selector: string;
  css: string;
};

type ThemeGroup<Value = string | number> = Record<string, Value>;

export type Theme = {
  space?: ThemeGroup;
  color?: ThemeGroup<string>;
  fontSize?: ThemeGroup;
  borderRadius?: ThemeGroup;
};

export type CssOptions = {
  theme: Theme;
};
