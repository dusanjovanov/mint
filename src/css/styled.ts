import { cmp } from "../component";
import { AllHtmlPropMap, AllHtmlTags, htm } from "../html";
import { CSSObject } from "../types";
import { isFunction } from "../utils";

type Props<Tag extends AllHtmlTags> = AllHtmlPropMap[Tag];

type CssArg<Props> = CSSObject | ((props: Props) => CSSObject);

export const styled = <Tag extends AllHtmlTags>(
  tag: Tag,
  css: Omit<CssArg<Props<Tag>>, "nodes">
) => {
  return cmp<Props<Tag> | null>(($) => {
    const { nodes, ...rest } = $.props;

    return htm(
      tag,
      {
        ...(rest as any),
        css: () => {
          if (isFunction(css)) {
            return css(rest);
          }
          //
          else {
            return css;
          }
        },
      },
      nodes
    );
  });
};
