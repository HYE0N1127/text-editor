import { text } from "stream/consumers";
import { BlockRepository } from "../../repository/block/index";
import {
  Block,
  BlockType,
  Child,
  ImageBlock,
  TextBlock,
} from "../../type/index";
import { generateId } from "../id/index";
import {
  findPrevBlockId,
  insertBlockAfter,
  traverseAndFilter,
  traverseAndMap,
} from "./helpers";

export class MarkdownEditor {
  private _blocks: Block[];
  private readonly blockListeners: Set<() => void> = new Set();
  private readonly repository = new BlockRepository();

  constructor() {
    this._blocks = this.repository.get();
  }

  public get blocks(): Block[] {
    return this._blocks;
  }

  private set blocks(value: Block[]) {
    this._blocks = [...value];
    this.repository.update(value);
    this.blockListeners.forEach((listener) => listener());
  }

  public addPendingImage = (): string => {
    const id = generateId();
    const block: ImageBlock = {
      id,
      type: "image",
      value: "",
      isLoading: true,
    };

    this.blocks = [...this._blocks, block];
    return id;
  };

  public updateImageBlock = (blockId: string, url: string) => {
    this.updateBlock(blockId, { value: url, isLoading: false });
  };

  /**
   * 유저가 엔터를 입력한 경우 사용됩니다.
   * @param next: 새롭게 만들어질 블럭의 id (optional)
   * @param prev: 만들어진 블럭이 삽입될 기준점이 되는 블럭의 id (optional)
   * @param type: 만들어질 블럭의 타입 (optional), 기본값: text
   */
  public enter = (
    option: { next?: string; prev?: string; type?: BlockType } = {},
  ) => {
    const { next, prev, type = "text" } = option;
    const id = next || generateId();

    const block: Block = {
      id: id,
      type: type,
      value: "",
      children: [],
    } as Block;

    if (prev == null) {
      this.blocks = [block, ...this._blocks];
      return;
    }

    this.blocks = insertBlockAfter(this._blocks, prev, block);
  };

  public getPrevId = (id: string): string | undefined => {
    return findPrevBlockId(this._blocks, id, undefined);
  };

  public getLastId = (): string | undefined => {
    const index = this._blocks.length - 1;

    if (index === -1) {
      return undefined;
    }

    return this._blocks[index].id;
  };

  /**
   * 특정 블록의 데이터를 업데이트합니다.
   */
  public updateBlock = (id: string, data: Partial<Block>) => {
    this.blocks = traverseAndMap(this._blocks, (block) => {
      // 만약 업데이트할 블럭이라면 그 부분의 데이터를 수정합니다.
      if (block.id === id) {
        return { ...block, ...data } as Block;
      }

      return block;
    });
  };

  /**
   * 자식 요소를 추가합니다.
   */
  public addChild = (parentId: string, child: Child) => {
    this.blocks = traverseAndMap(this._blocks, (block) => {
      // 만약 찾던 부모 블럭의 아이디라면, 그 아이디 내부의 children 배열에 child 블럭을 추가합니다.
      if (block.id === parentId) {
        return {
          ...block,
          children: [...(block.children || []), child],
        };
      }

      return block;
    });
  };

  /**
   * BackSpace를 이용하여 아이템을 삭제하려는 경우에 사용됩니다.
   */
  public deleteBlock = (id: string) => {
    this.blocks = traverseAndFilter(this._blocks, (block) => block.id !== id);
  };

  /**
   * 블럭을 드래그 드랍으로 이동시키는 경우 사용됩니다.
   *
   * @param activeId 드래그 중인 아이템의 id
   * @param overId 드랍 시점에 가장 가까운 아이템의 id
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
