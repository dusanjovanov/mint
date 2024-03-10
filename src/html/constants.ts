// html props treated as element properties ( not attributes )
export const PROP_MAP: Record<string, true> = {
  checked: true,
  selected: true,
  type: true,
  value: true,
};

export const ATTRIBUTE_ALIASES: Record<string, string> = {
  className: "class",
  htmlFor: "for",
};
