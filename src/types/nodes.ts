import { DomNode } from ".";
import { App } from "../App";

export type TextNode = string | number;

export type EmptyNode = boolean | null | undefined;

export type MintNode =
  | TextNode
  | EmptyNode
  | MintElement
  | (() => TextNode)
  | MintNode[];

export type MintElement = {
  _brand: symbol;
  _type: symbol;
  children?: MintElement[];
  _parent: MintElement;
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
