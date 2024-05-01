import { cp } from "../../core/src/component";
import { htm } from "../../core/src/html";
import { HtmlProps, ReactiveProp } from "../../core/src/types";
import { getPropValue } from "../../core/src/utils";
import { getRouter } from "./Router";
import { NavigateOptions } from "./types";

export type LinkProps = {
  path: ReactiveProp<string>;
} & NavigateOptions &
  HtmlProps<"a">;

export const Link = cp<LinkProps>(
  ({ path, replace, state, ...anchorProps }) => {
    const router = getRouter();

    return htm("a", {
      ...anchorProps,
      href: path,
      onClick: (e) => {
        e.preventDefault();
        router.navigate(getPropValue(path), { replace, state });
        anchorProps.onClick?.(e);
      },
    });
  }
);
