import { component } from "../component";
import { htm } from "../html";
import { HTMLAnchorElementProps, ReactiveProp, SmllrNode } from "../types";
import { getPropValue } from "../utils";
import { getRouterContext } from "./RouterProvider";
import { NavigateOptions } from "./types";

export type LinkProps = {
  node: SmllrNode;
  path: ReactiveProp<string>;
} & NavigateOptions &
  HTMLAnchorElementProps;

export const Link = component<LinkProps>(
  ($, { node, path, replace, state, ...anchorProps }) => {
    const router = getRouterContext($);

    return htm(
      "a",
      {
        ...anchorProps,
        href: path,
        onClick: (e) => {
          e.preventDefault();
          router.navigate(getPropValue(path), { replace, state });
          anchorProps.onClick?.(e);
        },
      },
      node
    );
  }
);
