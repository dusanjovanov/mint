import { component } from "../component";
import { htm } from "../html";
import { HtmlProps, ReactiveProp } from "../types";
import { getPropValue } from "../utils";
import { getRouter } from "./Router";
import { NavigateOptions } from "./types";

export type LinkProps = {
  path: ReactiveProp<string>;
} & NavigateOptions &
  HtmlProps<"a">;

export const Link = component<LinkProps>(
  ({ path, replace, state, children, ...anchorProps }) => {
    const router = getRouter();

    return htm("a", {
      ...anchorProps,
      props: {
        href: path,
      },
      on: {
        click: (e) => {
          e.preventDefault();
          router.navigate(getPropValue(path), { replace, state });
          anchorProps.on?.click?.(e);
        },
      },
      children,
    });
  }
);
