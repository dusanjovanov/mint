import { cmp } from "../component";
import { htm } from "../html";
import { HTMLAnchorElementProps, SmllrNode } from "../types";
import { isFunction } from "../utils";
import { Router } from "./Router";
import { ROUTER_CTX } from "./constants";
import { NavigateOptions } from "./types";

export type LinkProps = {
  node: SmllrNode;
  path: string | (() => string);
} & NavigateOptions &
  HTMLAnchorElementProps;

export const Link = cmp<LinkProps>(($) => {
  const { node, path, replace, state, ...anchorProps } = $.props;

  const router = $.getContext<Router>(ROUTER_CTX);

  return htm(
    "a",
    {
      ...anchorProps,
      href: path,
      onClick: (e) => {
        e.preventDefault();
        router.navigate(isFunction(path) ? path() : path, { replace, state });
        anchorProps.onClick?.(e);
      },
    },
    node
  );
});
