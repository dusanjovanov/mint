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
  _brand: symbol;
  _type: symbol;
  children?: SmllrElement[];
  _parent: SmllrElement;
  _index: number;
  app: App;
  _getNodes(): DomNode[];
  _getFirstNode(): DomNode | undefined;
  _isInserted: boolean;
  _onInsert(): void;
  _remove(): void;
  _toDom(): DomNode | DomNode[];
  _toHtml(): string;
};
