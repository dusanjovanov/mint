import { resolveNode } from "../resolveNode";
import { SmlrNode } from "../types";
import { CanvasRenderer } from "./CanvasRenderer";

export const draw = (node: SmlrNode, canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d")!;

  const renderer = new CanvasRenderer(ctx);

  const els = resolveNode(node, {} as any);

  const loop = () => {
    requestAnimationFrame(() => {
      ctx.resetTransform();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.rect(10, 0, 100, 100);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();
      ctx.resetTransform();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.rect(50, 0, 100, 100);
      ctx.fillStyle = "black";
      ctx.fill();
      // renderer.createElements(els);
      loop();
    });
  };
  loop();
};
