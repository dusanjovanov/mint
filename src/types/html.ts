import { AriaRole } from "./aria";
import { DomEventHandler } from "./events";
import {
  Booleanish,
  CSSProperties,
  CrossOrigin,
  ReactiveProps,
  SmllrDomProps,
} from "./shared";

export type SmllrHTMLElementProps<T extends HTMLElement> =
  ReactiveProps<HTMLAttributes> & SmllrDomProps<T>;

export type HTMLElementPropMap = {
  a: HTMLAnchorElementProps;
  abbr: HTMLElementProps;
  address: HTMLElementProps;
  area: HTMLAreaElementProps;
  article: HTMLElementProps;
  aside: HTMLElementProps;
  audio: HTMLAudioElementProps;
  b: HTMLElementProps;
  base: HTMLBaseElementProps;
  bdi: HTMLElementProps;
  bdo: HTMLElementProps;
  big: HTMLElementProps;
  blockquote: HTMLQuoteElementProps;
  body: HTMLBodyElementProps;
  br: HTMLBRElementProps;
  button: HTMLButtonElementProps;
  canvas: HTMLCanvasElementProps;
  caption: HTMLElementProps;
  center: HTMLElementProps;
  cite: HTMLElementProps;
  code: HTMLElementProps;
  col: HTMLTableColElementProps;
  colgroup: HTMLTableColGroupElementProps;
  data: HTMLDataElementProps;
  datalist: HTMLDataListElementProps;
  dd: HTMLElementProps;
  del: HTMLModElementProps;
  details: HTMLDetailsElementProps;
  dfn: HTMLElementProps;
  dialog: HTMLDialogElementProps;
  div: HTMLDivElementProps;
  dl: HTMLDListElementProps;
  dt: HTMLElementProps;
  em: HTMLElementProps;
  embed: HTMLEmbedElementProps;
  fieldset: HTMLFieldSetElementProps;
  figcaption: HTMLElementProps;
  figure: HTMLElementProps;
  footer: HTMLElementProps;
  form: HTMLFormElementProps;
  h1: HTMLHeadingElementProps;
  h2: HTMLHeadingElementProps;
  h3: HTMLHeadingElementProps;
  h4: HTMLHeadingElementProps;
  h5: HTMLHeadingElementProps;
  h6: HTMLHeadingElementProps;
  head: HTMLHeadElementProps;
  header: HTMLElementProps;
  hgroup: HTMLElementProps;
  hr: HTMLHRElementProps;
  html: HTMLHtmlElementProps;
  i: HTMLElementProps;
  iframe: HTMLIFrameElementProps;
  img: HTMLImageElementProps;
  input: HTMLInputElementProps;
  ins: HTMLModElementProps;
  kbd: HTMLElementProps;
  keygen: HTMLKeygenElementProps;
  label: HTMLLabelElementProps;
  legend: HTMLLegendElementProps;
  li: HTMLLIElementProps;
  link: HTMLLinkElementProps;
  main: HTMLElementProps;
  nav: HTMLElementProps;
  object: HTMLObjectElementProps;
  ol: HTMLOListElementProps;
  option: HTMLOptionElementProps;
  p: HTMLParagraphElementProps;
  pre: HTMLPreElementProps;
  progress: HTMLProgressElementProps;
  select: HTMLSelectElementProps;
  small: HTMLElementProps;
  source: HTMLSourceElementProps;
  span: HTMLSpanElementProps;
  strong: HTMLElementProps;
  sub: HTMLElementProps;
  sup: HTMLElementProps;
  table: HTMLTableElementProps;
  tbody: HTMLTableSectionElementProps;
  td: HTMLTableDataCellElementProps;
  textarea: HTMLTextAreaProps;
  tfoot: HTMLTableSectionElementProps;
  thead: HTMLTableSectionElementProps;
  tr: HTMLTableRowProps;
  th: HTMLTableHeaderCellElementProps;
  ul: HTMLUListElementProps;
  video: HTMLVideoElementProps;
  q: HTMLQuoteElementProps;
};

export type HTMLAttributes = {
  // Standard HTML Attributes
  accessKey?: string | undefined;
  autoFocus?: boolean | undefined;
  className?: string | undefined;
  contentEditable?: Booleanish | "inherit" | undefined;
  contextMenu?: string | undefined;
  dir?: string | undefined;
  draggable?: Booleanish | undefined;
  hidden?: boolean | undefined;
  id?: string | undefined;
  lang?: string | undefined;
  nonce?: string | undefined;
  placeholder?: string | undefined;
  slot?: string | undefined;
  spellCheck?: Booleanish | undefined;
  style?: CSSProperties | undefined;
  tabIndex?: number | undefined;
  title?: string | undefined;
  translate?: "yes" | "no" | undefined;

  // Unknown
  radioGroup?: string | undefined; // <command>, <menuitem>

  // WAI-ARIA
  role?: AriaRole | undefined;

  // RDFa Attributes
  about?: string | undefined;
  content?: string | undefined;
  datatype?: string | undefined;
  inlist?: any;
  prefix?: string | undefined;
  property?: string | undefined;
  rel?: string | undefined;
  resource?: string | undefined;
  rev?: string | undefined;
  typeof?: string | undefined;
  vocab?: string | undefined;

  // Non-standard Attributes
  autoCapitalize?: string | undefined;
  autoCorrect?: string | undefined;
  autoSave?: string | undefined;
  color?: string | undefined;
  itemProp?: string | undefined;
  itemScope?: boolean | undefined;
  itemType?: string | undefined;
  itemID?: string | undefined;
  itemRef?: string | undefined;
  results?: number | undefined;
  security?: string | undefined;
  unselectable?: "on" | "off" | undefined;

  // Living Standard
  /**
   * Hints at the type of data that might be entered by the user while editing the element or its contents
   * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
   */
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search"
    | undefined;
  /**
   * Specify that a standard HTML element should behave like a defined custom built-in element
   * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
   */
  is?: string | undefined;

  // TODO: Had to copy all aria atributes here, didn't know
  // how to handle interesection and mapped types

  /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
  "aria-activedescendant"?: string | undefined;
  /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
  "aria-atomic"?: Booleanish | undefined;
  /**
   * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
   * presented if they are made.
   */
  "aria-autocomplete"?: "none" | "inline" | "list" | "both" | undefined;
  /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
  /**
   * Defines a string value that labels the current element, which is intended to be converted into Braille.
   * @see aria-label.
   */
  "aria-braillelabel"?: string | undefined;
  /**
   * Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.
   * @see aria-roledescription.
   */
  "aria-brailleroledescription"?: string | undefined;
  "aria-busy"?: Booleanish | undefined;
  /**
   * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
   * @see aria-pressed @see aria-selected.
   */
  "aria-checked"?: boolean | "false" | "mixed" | "true" | undefined;
  /**
   * Defines the total number of columns in a table, grid, or treegrid.
   * @see aria-colindex.
   */
  "aria-colcount"?: number | undefined;
  /**
   * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
   * @see aria-colcount @see aria-colspan.
   */
  "aria-colindex"?: number | undefined;
  /**
   * Defines a human readable text alternative of aria-colindex.
   * @see aria-rowindextext.
   */
  "aria-colindextext"?: string | undefined;
  /**
   * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-colindex @see aria-rowspan.
   */
  "aria-colspan"?: number | undefined;
  /**
   * Identifies the element (or elements) whose contents or presence are controlled by the current element.
   * @see aria-owns.
   */
  "aria-controls"?: string | undefined;
  /** Indicates the element that represents the current item within a container or set of related elements. */
  "aria-current"?:
    | boolean
    | "false"
    | "true"
    | "page"
    | "step"
    | "location"
    | "date"
    | "time"
    | undefined;
  /**
   * Identifies the element (or elements) that describes the object.
   * @see aria-labelledby
   */
  "aria-describedby"?: string | undefined;
  /**
   * Defines a string value that describes or annotates the current element.
   * @see related aria-describedby.
   */
  "aria-description"?: string | undefined;
  /**
   * Identifies the element that provides a detailed, extended description for the object.
   * @see aria-describedby.
   */
  "aria-details"?: string | undefined;
  /**
   * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
   * @see aria-hidden @see aria-readonly.
   */
  "aria-disabled"?: Booleanish | undefined;
  /**
   * Indicates what functions can be performed when a dragged object is released on the drop target.
   * @deprecated in ARIA 1.1
   */
  "aria-dropeffect"?:
    | "none"
    | "copy"
    | "execute"
    | "link"
    | "move"
    | "popup"
    | undefined;
  /**
   * Identifies the element that provides an error message for the object.
   * @see aria-invalid @see aria-describedby.
   */
  "aria-errormessage"?: string | undefined;
  /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
  "aria-expanded"?: Booleanish | undefined;
  /**
   * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
   * allows assistive technology to override the general default of reading in document source order.
   */
  "aria-flowto"?: string | undefined;
  /**
   * Indicates an element's "grabbed" state in a drag-and-drop operation.
   * @deprecated in ARIA 1.1
   */
  "aria-grabbed"?: Booleanish | undefined;
  /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
  "aria-haspopup"?:
    | boolean
    | "false"
    | "true"
    | "menu"
    | "listbox"
    | "tree"
    | "grid"
    | "dialog"
    | undefined;
  /**
   * Indicates whether the element is exposed to an accessibility API.
   * @see aria-disabled.
   */
  "aria-hidden"?: Booleanish | undefined;
  /**
   * Indicates the entered value does not conform to the format expected by the application.
   * @see aria-errormessage.
   */
  "aria-invalid"?:
    | boolean
    | "false"
    | "true"
    | "grammar"
    | "spelling"
    | undefined;
  /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
  "aria-keyshortcuts"?: string | undefined;
  /**
   * Defines a string value that labels the current element.
   * @see aria-labelledby.
   */
  "aria-label"?: string | undefined;
  /**
   * Identifies the element (or elements) that labels the current element.
   * @see aria-describedby.
   */
  "aria-labelledby"?: string | undefined;
  /** Defines the hierarchical level of an element within a structure. */
  "aria-level"?: number | undefined;
  /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
  "aria-live"?: "off" | "assertive" | "polite" | undefined;
  /** Indicates whether an element is modal when displayed. */
  "aria-modal"?: Booleanish | undefined;
  /** Indicates whether a text box accepts multiple lines of input or only a single line. */
  "aria-multiline"?: Booleanish | undefined;
  /** Indicates that the user may select more than one item from the current selectable descendants. */
  "aria-multiselectable"?: Booleanish | undefined;
  /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
  "aria-orientation"?: "horizontal" | "vertical" | undefined;
  /**
   * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
   * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
   * @see aria-controls.
   */
  "aria-owns"?: string | undefined;
  /**
   * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
   * A hint could be a sample value or a brief description of the expected format.
   */
  "aria-placeholder"?: string | undefined;
  /**
   * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-setsize.
   */
  "aria-posinset"?: number | undefined;
  /**
   * Indicates the current "pressed" state of toggle buttons.
   * @see aria-checked @see aria-selected.
   */
  "aria-pressed"?: boolean | "false" | "mixed" | "true" | undefined;
  /**
   * Indicates that the element is not editable, but is otherwise operable.
   * @see aria-disabled.
   */
  "aria-readonly"?: Booleanish | undefined;
  /**
   * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
   * @see aria-atomic.
   */
  "aria-relevant"?:
    | "additions"
    | "additions removals"
    | "additions text"
    | "all"
    | "removals"
    | "removals additions"
    | "removals text"
    | "text"
    | "text additions"
    | "text removals"
    | undefined;
  /** Indicates that user input is required on the element before a form may be submitted. */
  "aria-required"?: Booleanish | undefined;
  /** Defines a human-readable, author-localized description for the role of an element. */
  "aria-roledescription"?: string | undefined;
  /**
   * Defines the total number of rows in a table, grid, or treegrid.
   * @see aria-rowindex.
   */
  "aria-rowcount"?: number | undefined;
  /**
   * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
   * @see aria-rowcount @see aria-rowspan.
   */
  "aria-rowindex"?: number | undefined;
  /**
   * Defines a human readable text alternative of aria-rowindex.
   * @see aria-colindextext.
   */
  "aria-rowindextext"?: string | undefined;
  /**
   * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-rowindex @see aria-colspan.
   */
  "aria-rowspan"?: number | undefined;
  /**
   * Indicates the current "selected" state of various widgets.
   * @see aria-checked @see aria-pressed.
   */
  "aria-selected"?: Booleanish | undefined;
  /**
   * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-posinset.
   */
  "aria-setsize"?: number | undefined;
  /** Indicates if items in a table or grid are sorted in ascending or descending order. */
  "aria-sort"?: "none" | "ascending" | "descending" | "other" | undefined;
  /** Defines the maximum allowed value for a range widget. */
  "aria-valuemax"?: number | undefined;
  /** Defines the minimum allowed value for a range widget. */
  "aria-valuemin"?: number | undefined;
  /**
   * Defines the current value for a range widget.
   * @see aria-valuetext.
   */
  "aria-valuenow"?: number | undefined;
  /** Defines the human readable text alternative of aria-valuenow for a range widget. */
  "aria-valuetext"?: string | undefined;
};

export type HTMLElementProps = SmllrHTMLElementProps<HTMLElement>;

export type HTMLDivElementProps = SmllrHTMLElementProps<HTMLDivElement>;

export type HTMLUListElementProps = SmllrHTMLElementProps<HTMLUListElement>;

export type HTMLLIElementProps = SmllrHTMLElementProps<HTMLLIElement>;

export type HTMLHeadingElementProps = SmllrHTMLElementProps<HTMLHeadingElement>;

export type HTMLTableRowProps = SmllrHTMLElementProps<HTMLTableRowElement>;

export type HTMLSpanElementProps = SmllrHTMLElementProps<HTMLSpanElement>;

export type HTMLTableSectionElementProps =
  SmllrHTMLElementProps<HTMLTableSectionElement>;

export type HTMLBRElementProps = SmllrHTMLElementProps<HTMLBRElement>;

export type HTMLHRElementProps = SmllrHTMLElementProps<HTMLHRElement>;

export type HTMLLegendElementProps = SmllrHTMLElementProps<HTMLLegendElement>;

export type HTMLParagraphElementProps =
  SmllrHTMLElementProps<HTMLParagraphElement>;

export type HTMLPreElementProps = SmllrHTMLElementProps<HTMLPreElement>;

export type HTMLAudioElementProps = SmllrHTMLElementProps<HTMLAudioElement>;

export type HTMLBodyElementProps = SmllrHTMLElementProps<HTMLBodyElement>;

export type HTMLDataListElementProps =
  SmllrHTMLElementProps<HTMLDataListElement>;

export type HTMLDListElementProps = SmllrHTMLElementProps<HTMLDListElement>;

export type HTMLHeadElementProps = SmllrHTMLElementProps<HTMLHeadElement>;

export type HTMLHtmlElementProps = SmllrHTMLElementProps<HTMLHtmlElement>;

export type HTMLModElementAttributes = {
  cite?: string | undefined;
  dateTime?: string | undefined;
};

export type HTMLModElementProps = SmllrHTMLElementProps<HTMLModElement> &
  HTMLModElementAttributes;

export type HTMLAttributeAnchorTarget =
  | "_self"
  | "_blank"
  | "_parent"
  | "_top"
  | (string & {});

export type HTMLAttributeReferrerPolicy =
  | ""
  | "no-referrer"
  | "no-referrer-when-downgrade"
  | "origin"
  | "origin-when-cross-origin"
  | "same-origin"
  | "strict-origin"
  | "strict-origin-when-cross-origin"
  | "unsafe-url";

export type HTMLAnchorElementAtributes = {
  download?: any;
  href?: string | undefined;
  hrefLang?: string | undefined;
  media?: string | undefined;
  ping?: string | undefined;
  target?: HTMLAttributeAnchorTarget | undefined;
  type?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
};

export type HTMLAnchorElementProps = SmllrHTMLElementProps<HTMLAnchorElement> &
  ReactiveProps<HTMLAnchorElementAtributes>;

export type HTMLAreaElementAttributes = {
  alt?: string | undefined;
  coords?: string | undefined;
  download?: any;
  href?: string | undefined;
  hrefLang?: string | undefined;
  media?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  shape?: string | undefined;
  target?: string | undefined;
};

export type HTMLAreaElementProps = SmllrHTMLElementProps<HTMLAreaElement> &
  HTMLAreaElementAttributes;

export type HTMLBaseElementAttributes = {
  href?: string | undefined;
  target?: string | undefined;
};

export type HTMLBaseElementProps = SmllrHTMLElementProps<HTMLBaseElement> &
  HTMLBaseElementAttributes;

export type HTMLButtonElementAttributes = {
  disabled?: boolean | undefined;
  form?: string | undefined;
  formAction?: string | undefined;
  formEncType?: string | undefined;
  formMethod?: string | undefined;
  formNoValidate?: boolean | undefined;
  formTarget?: string | undefined;
  name?: string | undefined;
  type?: "submit" | "reset" | "button" | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
};

export type HTMLButtonElementProps = SmllrHTMLElementProps<HTMLButtonElement> &
  HTMLButtonElementAttributes;

export type HTMLCanvasElementAttributes = {
  height?: number | string | undefined;
  width?: number | string | undefined;
};

export type HTMLCanvasElementProps = SmllrHTMLElementProps<HTMLCanvasElement> &
  HTMLCanvasElementAttributes;

export type HTMLTableColElementAttributes = {
  span?: number | undefined;
  width?: number | string | undefined;
};

export type HTMLTableColElementProps =
  SmllrHTMLElementProps<HTMLTableColElement> & HTMLTableColElementAttributes;

export type HTMLTableColGroupElementAttributes = {
  span?: number | undefined;
};

export type HTMLTableColGroupElementProps =
  SmllrHTMLElementProps<HTMLTableColElement> &
    HTMLTableColGroupElementAttributes;

export type HTMLDataElementAttributes = {
  value?: string | ReadonlyArray<string> | number | undefined;
};

export type HTMLDataElementProps = SmllrHTMLElementProps<HTMLDataElement> &
  HTMLDataElementAttributes;

export type HTMLDetailsElementAttributes = {
  open?: boolean | undefined;
};

export type HTMLDetailsElementEvents = {
  onToggle?: DomEventHandler<HTMLDetailsElement> | undefined;
};

export type HTMLDetailsElementProps =
  SmllrHTMLElementProps<HTMLDetailsElement> &
    HTMLDetailsElementAttributes &
    HTMLDetailsElementEvents;

export type HTMLDialogElementAttributes = {
  open?: boolean | undefined;
};

export type HTMLDialogElementEvents = {
  onCancel?: DomEventHandler<HTMLDialogElement> | undefined;
  onClose?: DomEventHandler<HTMLDialogElement> | undefined;
};

export type HTMLDialogElementProps = SmllrHTMLElementProps<HTMLDialogElement> &
  HTMLDialogElementAttributes &
  HTMLDialogElementEvents;

export type HTMLEmbedElementAttributes = {
  height?: number | string | undefined;
  src?: string | undefined;
  type?: string | undefined;
  width?: number | string | undefined;
};

export type HTMLEmbedElementProps = SmllrHTMLElementProps<HTMLEmbedElement> &
  HTMLEmbedElementAttributes;

export type HTMLFieldSetElementAttributes = {
  disabled?: boolean | undefined;
  form?: string | undefined;
  name?: string | undefined;
};

export type HTMLFieldSetElementProps =
  SmllrHTMLElementProps<HTMLFieldSetElement> & HTMLFieldSetElementAttributes;

export type HTMLFormElementAttributes = {
  acceptCharset?: string | undefined;
  action?: string | undefined;
  autoComplete?: string | undefined;
  encType?: string | undefined;
  method?: string | undefined;
  name?: string | undefined;
  noValidate?: boolean | undefined;
  target?: string | undefined;
};

export type HTMLFormElementProps = SmllrHTMLElementProps<HTMLFormElement> &
  HTMLFormElementAttributes;

export type HTMLIFrameElementAttributes = {
  allow?: string | undefined;
  allowFullScreen?: boolean | undefined;
  allowTransparency?: boolean | undefined;
  /** @deprecated */
  frameBorder?: number | string | undefined;
  height?: number | string | undefined;
  loading?: "eager" | "lazy" | undefined;
  /** @deprecated */
  marginHeight?: number | undefined;
  /** @deprecated */
  marginWidth?: number | undefined;
  name?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  sandbox?: string | undefined;
  /** @deprecated */
  scrolling?: string | undefined;
  seamless?: boolean | undefined;
  src?: string | undefined;
  srcDoc?: string | undefined;
  width?: number | string | undefined;
};

export type HTMLIFrameElementProps = SmllrHTMLElementProps<HTMLIFrameElement> &
  HTMLIFrameElementAttributes;

export type HTMLImageElementAttributes = {
  alt?: string | undefined;
  crossOrigin?: CrossOrigin;
  decoding?: "async" | "auto" | "sync" | undefined;
  height?: number | string | undefined;
  loading?: "eager" | "lazy" | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  sizes?: string | undefined;
  src?: string | undefined;
  srcSet?: string | undefined;
  useMap?: string | undefined;
  width?: number | string | undefined;
};

export type HTMLImageElementProps = SmllrHTMLElementProps<HTMLImageElement> &
  HTMLImageElementAttributes;

export type HTMLInputTypeAttribute =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week"
  | (string & {});

export type HTMLInputElementAttributes = {
  accept?: string | undefined;
  alt?: string | undefined;
  autoComplete?: string | undefined;
  capture?: boolean | "user" | "environment" | undefined; // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
  checked?: boolean | undefined;
  crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;
  disabled?: boolean | undefined;
  enterKeyHint?:
    | "enter"
    | "done"
    | "go"
    | "next"
    | "previous"
    | "search"
    | "send"
    | undefined;
  form?: string | undefined;
  formAction?: string | undefined;
  formEncType?: string | undefined;
  formMethod?: string | undefined;
  formNoValidate?: boolean | undefined;
  formTarget?: string | undefined;
  height?: number | string | undefined;
  list?: string | undefined;
  max?: number | string | undefined;
  maxLength?: number | undefined;
  min?: number | string | undefined;
  minLength?: number | undefined;
  multiple?: boolean | undefined;
  name?: string | undefined;
  pattern?: string | undefined;
  placeholder?: string | undefined;
  readOnly?: boolean | undefined;
  required?: boolean | undefined;
  size?: number | undefined;
  src?: string | undefined;
  step?: number | string | undefined;
  type?: HTMLInputTypeAttribute | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
  width?: number | string | undefined;
};

export type HTMLInputElementProps = SmllrHTMLElementProps<HTMLInputElement> &
  ReactiveProps<HTMLInputElementAttributes>;

export type HTMLKeygenElementAttributes = {
  challenge?: string | undefined;
  disabled?: boolean | undefined;
  form?: string | undefined;
  keyType?: string | undefined;
  keyParams?: string | undefined;
  name?: string | undefined;
};

export type HTMLKeygenElementProps = SmllrHTMLElementProps<HTMLElement> &
  HTMLKeygenElementAttributes;

export type HTMLLabelElementAttributes = {
  form?: string | undefined;
  htmlFor?: string | undefined;
};

export type HTMLLabelElementProps = SmllrHTMLElementProps<HTMLLabelElement> &
  HTMLLabelElementAttributes;

export type HTMLLinkElementAttributes = {
  as?: string | undefined;
  crossOrigin?: CrossOrigin;
  fetchPriority?: "high" | "low" | "auto";
  href?: string | undefined;
  hrefLang?: string | undefined;
  integrity?: string | undefined;
  media?: string | undefined;
  imageSrcSet?: string | undefined;
  imageSizes?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  sizes?: string | undefined;
  type?: string | undefined;
  charSet?: string | undefined;
};

export type HTMLLinkElementProps = SmllrHTMLElementProps<HTMLLinkElement> &
  HTMLLinkElementAttributes;

export type HTMLObjectElementAttributes = {
  classID?: string | undefined;
  data?: string | undefined;
  form?: string | undefined;
  height?: number | string | undefined;
  name?: string | undefined;
  type?: string | undefined;
  useMap?: string | undefined;
  width?: number | string | undefined;
  wmode?: string | undefined;
};

export type HTMLObjectElementProps = SmllrHTMLElementProps<HTMLObjectElement> &
  HTMLObjectElementAttributes;

export type HTMLOListElementAttributes = {
  reversed?: boolean | undefined;
  start?: number | undefined;
  type?: "1" | "a" | "A" | "i" | "I" | undefined;
};

export type HTMLOListElementProps = SmllrHTMLElementProps<HTMLOListElement> &
  HTMLOListElementAttributes;

export type HTMLOptionElementAttributes = {
  disabled?: boolean | undefined;
  label?: string | undefined;
  selected?: boolean | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
};

export type HTMLOptionElementProps = SmllrHTMLElementProps<HTMLOptionElement> &
  HTMLOptionElementAttributes;

export type HTMLProgressElementAttributes = {
  max?: number | string | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
};

export type HTMLProgressElementProps =
  SmllrHTMLElementProps<HTMLProgressElement> & HTMLProgressElementAttributes;

export type HTMLQuoteElementAttributes = {
  cite?: string | undefined;
};

export type HTMLQuoteElementProps = SmllrHTMLElementProps<HTMLQuoteElement> &
  HTMLQuoteElementAttributes;

export type HTMLSelectElementAttributes = {
  autoComplete?: string | undefined;
  disabled?: boolean | undefined;
  form?: string | undefined;
  multiple?: boolean | undefined;
  name?: string | undefined;
  required?: boolean | undefined;
  size?: number | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
};

export type HTMLSelectElementProps = SmllrHTMLElementProps<HTMLSelectElement> &
  HTMLSelectElementAttributes;

export type HTMLSourceElementAttributes = {
  height?: number | string | undefined;
  media?: string | undefined;
  sizes?: string | undefined;
  src?: string | undefined;
  srcSet?: string | undefined;
  type?: string | undefined;
  width?: number | string | undefined;
};

export type HTMLSourceElementProps = SmllrHTMLElementProps<HTMLSourceElement> &
  HTMLSourceElementAttributes;

export type TableHTMLAttributes = {
  align?: "left" | "center" | "right" | undefined;
  bgcolor?: string | undefined;
  border?: number | undefined;
  cellPadding?: number | string | undefined;
  cellSpacing?: number | string | undefined;
  frame?: boolean | undefined;
  rules?: "none" | "groups" | "rows" | "columns" | "all" | undefined;
  summary?: string | undefined;
  width?: number | string | undefined;
};

export type HTMLTableElementProps = SmllrHTMLElementProps<HTMLTableElement> &
  TableHTMLAttributes;

export type HTMLTableDataCellAttributes = {
  align?: "left" | "center" | "right" | "justify" | "char" | undefined;
  colSpan?: number | undefined;
  headers?: string | undefined;
  rowSpan?: number | undefined;
  scope?: string | undefined;
  abbr?: string | undefined;
};

export type HTMLTableDataCellElementProps =
  SmllrHTMLElementProps<HTMLTableCellElement> & HTMLTableDataCellAttributes;

export type HTMLTextAreaAttributes = {
  autoComplete?: string | undefined;
  cols?: number | undefined;
  dirName?: string | undefined;
  disabled?: boolean | undefined;
  form?: string | undefined;
  maxLength?: number | undefined;
  minLength?: number | undefined;
  name?: string | undefined;
  placeholder?: string | undefined;
  readOnly?: boolean | undefined;
  required?: boolean | undefined;
  rows?: number | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
  wrap?: string | undefined;
};

export type HTMLTextAreaProps = SmllrHTMLElementProps<HTMLTextAreaElement> &
  ReactiveProps<HTMLTextAreaAttributes>;

export type HTMLTableHeaderCellElementAttributes = {
  align?: "left" | "center" | "right" | "justify" | "char" | undefined;
  colSpan?: number | undefined;
  headers?: string | undefined;
  rowSpan?: number | undefined;
  scope?: string | undefined;
  abbr?: string | undefined;
};

export type HTMLTableHeaderCellElementProps =
  SmllrHTMLElementProps<HTMLTableCellElement> &
    HTMLTableHeaderCellElementAttributes;

export type HTMLVideElementAttributes = {
  height?: number | string | undefined;
  playsInline?: boolean | undefined;
  poster?: string | undefined;
  width?: number | string | undefined;
  disablePictureInPicture?: boolean | undefined;
  disableRemotePlayback?: boolean | undefined;
};

export type HTMLVideoElementProps = SmllrHTMLElementProps<HTMLVideoElement> &
  HTMLVideElementAttributes;
