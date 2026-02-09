import { BrowserStorage } from "../../libs/storage/index";
import { Block } from "../../type/index";

const STORAGE_KEY = "markdown_editor_contents";

export class BlockRepository {
  private readonly storage: BrowserStorage<Block[]> = new BrowserStorage(
    window.localStorage,
  );

  public get(): Block[] {
    return this.storage.get(STORAGE_KEY) ?? [];
  }

  public update(blocks: Block[]): void {
    this.storage.set(STORAGE_KEY, blocks);
  }

  clear(): void {
    this.storage.set(STORAGE_KEY, []);
  }
}
