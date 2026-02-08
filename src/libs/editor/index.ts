import { Block, ImageBlock, TextBlock } from "../../type/index";
import { generateId } from "../id/index";

export class MarkdownEditor {
  private _blocks: Block[] = [];

  private readonly blockListeners: Set<() => void> = new Set();

  public get blocks(): Block[] {
    return this._blocks;
  }

  private set blocks(value: Block[]) {
    this._blocks = [...value];
    this.blockListeners.forEach((listener) => listener());
  }

  /**
   * 로딩 상태의 이미지 블록을 추가합니다.
   *
   * @returns 생성된 블록의 ID
   */
  public addPendingImage = (): string => {
    const id = generateId();
    const newBlock: ImageBlock = {
      id,
      type: "image",
      value: "",
      isLoading: true,
    };

    this.blocks = [...this._blocks, newBlock];
    return id;
  };

  /**
   * 업로드가 완료될 시 인자로 받은 ID 값에 URL을 추가합니다.
   */
  public updateImageBlock = (blockId: string, url: string) => {
    this.blocks = this._blocks.map((block) => {
      if (block.id === blockId) {
        return { ...block, value: url, isLoading: false };
      }
      return block;
    });
  };

  /**
   * 유저가 엔터를 입력한 경우 사용됩니다.
   *
   * @param next? 새로 생성될 블록의 id
   * @param prev? 기준이 되는 이전 블록의 id (없으면 맨 앞에 추가)
   */
  public enter = (option: { next?: string; prev?: string } = {}) => {
    const { next, prev } = option;

    const id = next || generateId();

    const block: TextBlock = {
      id: id,
      type: "text",
      value: "",
    };

    // 기준이 되는 블럭의 아이디가 존재하지 않으면 맨 앞에 삽입합니다.
    if (prev == null) {
      this.blocks = [block, ...this._blocks];
      return;
    }

    const index = this._blocks.findIndex((block) => block.id === prev);

    // 기준 블럭을 찾지 못하는 경우 맨 뒤에 추가합니다.
    if (index === -1) {
      this.blocks = [...this._blocks, block];
      return;
    }

    const update = [...this._blocks];
    update.splice(index + 1, 0, block);

    this.blocks = update;
  };

  /**
   * 블럭을 삭제하고, 이전의 아이템에 포커싱을 줘야 하는 경우 사용됩니다.
   *
   * @param id 삭제될 블럭의 아이디
   *
   * @return 삭제될 블럭 이전의 아이디
   */
  public getPrevId = (id: string): string | undefined => {
    const index = this._blocks.findIndex((block) => block.id === id);

    if (index === -1) {
      return undefined;
    }

    return this._blocks[index - 1].id;
  };

  /**
   * add button을 통하여 아이템을 추가하는 경우, 마지막에 아이템을 추가해야 하기에 prev의 아이디 사용 목적으로 마지막 아이디를 가져옵니다.
   *
   * @returns 마지막 배열의 아이템의 아이디를 받아옵니다.
   */
  public getLastId = (): string | undefined => {
    const index = this._blocks.length - 1;

    if (index === -1) {
      return undefined;
    }

    return this._blocks[index].id;
  };

  /**
   * 특정 블록의 데이터를 업데이트합니다.
   *
   * @param id 업데이트할 블록의 id
   * @param data 변경할 데이터 (Partial)
   */
  public updateBlock = (id: string, data: Partial<Block>) => {
    const updatedBlocks = this._blocks.map((block) => {
      if (block.id === id) {
        return { ...block, ...data } as Block;
      }
      return block;
    });

    this.blocks = updatedBlocks;
  };

  /**
   * BackSpace를 이용하여 아이템을 삭제하려는 경우에 사용됩니다.
   *
   * @param id : 삭제할 칸의 id
   */
  public deleteBlock = (id: string) => {
    const update = this._blocks.filter((block) => block.id !== id);

    this.blocks = update;
  };

  /**
   * 아이템을 드래그하여 위치를 바꾸는 함수입니다.
   *
   * @param activeId : 현재 드래그 중인 아이템의 id
   * @param overId : 가장 근처에 존재하는 아이템의 id
   */
  public moveTo = (activeId: string, overId: string) => {
    const activeIndex = this._blocks.findIndex(
      (block) => block.id === activeId,
    );
    const overIndex = this._blocks.findIndex((block) => block.id === overId);

    if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex)
      return;

    const update = [...this._blocks];
    const [movedItem] = update.splice(activeIndex, 1);
    update.splice(overIndex, 0, movedItem);

    this.blocks = update;
  };

  public subscribe = (listener: () => void) => {
    this.blockListeners.add(listener);

    return () => {
      this.blockListeners.delete(listener);
    };
  };
}
