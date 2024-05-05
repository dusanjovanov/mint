import { ReactiveProps, cp, effect, getPropValue } from "@smlr/core";
import { Graphics } from "pixi.js";
import { getApp } from "./PixieApp";

type Props = ReactiveProps<{
  x: number;
  y: number;
  radius: number;
  fill?: string;
}>;

export const Circle = cp<Props>(({ x, y, radius, fill }) => {
  const g = new Graphics();

  const app = getApp();

  effect(() => {
    if (!app.value) return;
    app.value.stage.addChild(g);
  });

  effect(() => {
    g.clear();
    g.circle(getPropValue(x), getPropValue(y), getPropValue(radius));
    if (fill) {
      g.fill(getPropValue(fill));
    }
  });

  return null;
});
