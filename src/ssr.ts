import { createHtmlString } from "./createHtmlString";
import { Head } from "./head";
import { resolveNode } from "./resolveNode";
import { SmlrElement, SmlrNode } from "./types";

export const ssr = (node: SmlrNode, options: SsrOptions) => {
  const head = new Head(true);

  const elements = resolveNode(node, {} as SmlrElement);

  let bodyHtml = createHtmlString(elements);

  if (options.clientBundlePath) {
    bodyHtml += `<script src=${options.clientBundlePath}></script>`;
  }

  return `<head>${head.html}</head><body><div id="root">${bodyHtml}</div></body>`;
};

export type SsrOptions = {
  pathname?: string;
  clientBundlePath?: string;
};
