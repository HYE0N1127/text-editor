export class BrowserStorage<T> {
  private readonly storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  set(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      this.storage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`${key} save error: ${error}`);
    }
  }

  get(key: string): T | null {
    try {
      const item = this.storage.getItem(key);

      if (item == null) {
        return null;
      }

      return JSON.parse(item) as T;
    } catch (error) {
      return null;
    }
  }
}
