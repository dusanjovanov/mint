import { ELEMENT_BRAND } from "../constants";
import { ReactiveProps, SmlrElement } from "../types";
import { getPropValue } from "../utils";
import { CanvasRenderer } from "./CanvasRenderer";
import { CANVAS_EL_TYPE } from "./const";

export class CanvasElement implements SmlrElement {
  constructor(tag: string, props: any) {
    this.tag = tag;
    this.props = props;
  }
  tag;
  props;
  brand = ELEMENT_BRAND;
  type = CANVAS_EL_TYPE;
  parent!: SmlrElement;
  index!: number;
  children?: SmlrElement[] | undefined;
  isInserted = false;
  renderer!: CanvasRenderer;

  toHtml(): string {
    throw new Error("Method not implemented.");
  }
  onInsert(): void {
    throw new Error("Method not implemented.");
  }
  remove(): void {
    throw new Error("Method not implemented.");
  }

  drawRect() {
    const { x, y, width, height, fill } = this.props;
    console.log(getPropValue(x));
    this.renderer.ctx.rect(
      getPropValue(x),
      getPropValue(y),
      getPropValue(width),
      getPropValue(height)
    );
    this.renderer.ctx.fillStyle = getPropValue(fill);
    this.renderer.ctx.fill();
  }

  draw() {
    if (this.tag === "rect") {
      this.drawRect();
    }
  }
}

export const cvs = <Tag extends keyof CanvasElementTagNameMap>(
  tag: Tag,
  props: CanvasElementTagNameMap[Tag]
) => {
  return new CanvasElement(tag, props);
};

type CanvasElementTagNameMap = {
  rect: ReactiveProps<RectProps>;
};

type RectProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
};
