import { Content } from "../../type/index";
import { generateId } from "../id/index";

export class MarkdownEditor {
  private _contents: Content[] = [];

  private readonly contentsListener: Set<() => void> = new Set();

  public get contents(): Content[] {
    return this._contents;
  }

  private set contents(value: Content[]) {
    this._contents = [...value];
    this.contentsListener.forEach((listener) => listener());
  }

  /**
   * 파일을 추가하는 경우 사용됩니다.
   *
   * @param url 외부 Storage에 업로드 이후 받아온 이미지의 주소
   */
  public addFile = (url: string) => {
    const value = {
      id: generateId(),
      url: url,
    };

    this.contents = [...this._contents, value];
  };

  /**
   * 유저가 엔터를 입력한 경우 사용됩니다.
   * enter를 누른 경우는 TextContent 타입으로 캐스팅됩니다.
   */
  public enter = () => {
    const value = {
      id: generateId(),
      text: "",
    };

    this.contents = [...this._contents, value];
  };

  /**
   * BackSpace를 이용하여 아이템을 삭제하려는 경우에 사용됩니다.
   *
   * @param id : 삭제할 칸의 id
   */
  public delete = (id: string) => {
    const update = this._contents.filter((content) => content.id !== id);

    this._contents = update;
  };

  /**
   * 아이템을 드래그하여 위치를 바꾸는 함수입니다.
   *
   * @param activeId : 현재 드래그 중인 아이템의 id
   * @param overId : 가장 근처에 존재하는 아이템의 id
   */
  public moveTo = (activeId: string, overId: string) => {
    const active = this._contents.find((content) => content.id === activeId);
    if (active == null) return;

    const update = this._contents.filter((content) => content.id !== activeId);
    const over = update.findIndex((content) => content.id === overId);

    if (over === -1) return;

    update.splice(over, 0, active);

    this.contents = update;
  };

  public subscribeContents = (listener: () => void) => {
    this.contentsListener.add(listener);

    return () => {
      this.contentsListener.delete(listener);
    };
  };
}
