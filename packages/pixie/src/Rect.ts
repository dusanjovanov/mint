import { ReactiveProps, cp, effect, getPropValue } from "@smlr/core";
import { Graphics } from "pixi.js";
import { getApp } from "./PixieApp";

type Props = ReactiveProps<{
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
}>;

export const Rect = cp<Props>(({ x, y, width, height, fill }) => {
  const g = new Graphics();

  const app = getApp();

  effect(() => {
    if (!app.value) return;
    app.value.stage.addChild(g);
  });

  effect(() => {
    g.clear();
    g.rect(
      getPropValue(x),
      getPropValue(y),
      getPropValue(width),
      getPropValue(height)
    );
    if (fill) {
      g.fill(getPropValue(fill));
    }
  });

  return null;
});
