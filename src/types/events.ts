export type DomEventHandler<T, E = Event> = (
  e: E & { currentTarget: T }
) => void;

export type DomMouseEventHandler<T> = DomEventHandler<T, MouseEvent>;
export type DomKeyboardEventHandler<T> = DomEventHandler<T, KeyboardEvent>;
export type DomDragEventHandler<T> = DomEventHandler<T, DragEvent>;
export type DomTouchEventHandler<T> = DomEventHandler<T, TouchEvent>;
export type DomFocusEventHandler<T> = DomEventHandler<T, FocusEvent>;
export type DomSubmitEventHandler<T> = DomEventHandler<T, SubmitEvent>;

export type DomEventProps<T> = {
  onClick?: DomMouseEventHandler<T>;
  onMouseDown?: DomMouseEventHandler<T>;
  onMouseUp?: DomMouseEventHandler<T>;
  onMouseMove?: DomMouseEventHandler<T>;
  onMouseOver?: DomMouseEventHandler<T>;
  onMouseEnter?: DomMouseEventHandler<T>;
  onMouseLeave?: DomMouseEventHandler<T>;
  onTouchStart?: DomTouchEventHandler<T>;
  onTouchEnd?: DomTouchEventHandler<T>;
  onTouchCancel?: DomTouchEventHandler<T>;
  onTouchMove?: DomTouchEventHandler<T>;
  onInput?: DomEventHandler<T>;
  onChange?: DomEventHandler<T>;
  onSubmit?: DomSubmitEventHandler<T>;
  onFocus?: DomFocusEventHandler<T>;
  onBlur?: DomFocusEventHandler<T>;
  onKeyDown?: DomKeyboardEventHandler<T>;
  onKeyUp?: DomKeyboardEventHandler<T>;
  onKeyPress?: DomKeyboardEventHandler<T>;
  onDrag?: DomDragEventHandler<T>;
  onDragStart?: DomDragEventHandler<T>;
  onDragEnd?: DomDragEventHandler<T>;
  onDragEnter?: DomDragEventHandler<T>;
  onDragLeave?: DomDragEventHandler<T>;
  onDragOver?: DomDragEventHandler<T>;
  onDrop?: DomDragEventHandler<T>;
};
