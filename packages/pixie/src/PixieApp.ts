import {
  Signal,
  SmlrNode,
  cp,
  createContext,
  effect,
  htm,
  signal,
} from "@smlr/core";
import { Application, Graphics } from "pixi.js";

type Props = {
  node: SmlrNode;
};

export const PixieApp = cp<Props>(({ node }) => {
  const root = signal<HTMLDivElement | null>(null);
  const app = signal<Application | null>(null);

  effect(() => {
    if (!root.value || !app.value) return;
    app.value.init({ width: 800, height: 600 }).then(() => {
      root.value!.append(app.value!.canvas);
    });
  });

  setApp(app);

  const graphics = new Graphics();
  setGraphics(graphics);

  return htm("div", {
    ref: (el) => {
      root.value = el;
      app.value = new Application();
    },
    node,
  });
});

export const [getGraphics, setGraphics] = createContext(
  (graphics: Graphics) => graphics
);

export const [getApp, setApp] = createContext(
  (app: Signal<Application | null>) => app
);
