import { cp } from "../component";
import { htm } from "../html";
import { HtmlProps, ReactiveProp } from "../types";
import { getPropValue } from "../utils";
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
