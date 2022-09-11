export abstract class LocalStorageManager<T> {
  constructor(private readonly key: string) {}

  public load(): T {
    const savedItem = localStorage.getItem(this.key);
    if (savedItem !== null) {
      return JSON.parse(savedItem) as T;
    } else {
      throw new Error(`No value for key ${this.key} exists!`);
    }
  }

  public save(value: T): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
}
