import { CSSObject } from "../types";
import { entries } from "./entries";

/** CSS-variant-authority. */
export const cva = <Variants extends GenericVariants>(
  variants: Variants,
  options?: Options<Variants>
) => {
  return (props?: VariantProps<Variants>) => {
    let css: CSSObject = {
      ...options?.base,
    };

    const fullProps = {};

    entries(variants).forEach(([variantKey, variantValues]) => {
      const selectedKey = props?.[variantKey];

      (fullProps as any)[variantKey] =
        selectedKey ?? options?.defaults?.[variantKey];

      const selected = (variantValues as any)[
        selectedKey ?? options?.defaults?.[variantKey]
      ];

      css = {
        ...css,
        ...selected,
      };
    });

    if (options?.override) {
      css = options.override(fullProps, css);
    }

    return css;
  };
};

type VariantProps<Variants> = Partial<{
  [key in keyof Variants]: keyof Variants[key];
}>;

type GenericVariants = Record<string, Record<string, CSSObject>>;

type Options<Variants> = Partial<{
  base: CSSObject;
  defaults: {
    [key in keyof Variants]: keyof Variants[key];
  };
  override: (props: VariantProps<Variants>, css: CSSObject) => CSSObject;
}>;
