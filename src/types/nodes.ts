import { DomNode } from ".";
import { App } from "../App";

export type TextNode = string | number;

export type EmptyNode = boolean | null | undefined;

export type SmllrNode =
  | TextNode
  | EmptyNode
  | SmllrElement
  | (() => TextNode)
  | SmllrNode[];

export type SmllrElement = {
  brand: symbol;
  type: symbol;
  children?: SmllrElement[];
  parent: SmllrElement;
  index: number;
  app: App;
  getNodes(): DomNode[];
  getFirstNode(): DomNode | undefined;
  isInserted: boolean;
  onInsert(): void;
  remove(): void;
  toDom(): DomNode | DomNode[];
  toHtml(): string;
};
