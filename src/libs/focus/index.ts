export class Focus {
  private _focusId: string | undefined = undefined;
  private readonly listeners: Set<() => void> = new Set();

  public get focusId(): string | undefined {
    return this._focusId;
  }

  private set currentFocusId(value: string | undefined) {
    this._focusId = value;
    this.listeners.forEach((listener) => listener());
  }

  /**
   * 포커스를 변경합니다.
   *
   * @param id 포커스할 블록의 ID
   */
  public changeFocus = (id: string | undefined) => {
    if (this._focusId === id) {
      return;
    }

    this.currentFocusId = id;
  };

  public subscribe = (listener: () => void) => {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  };
}
