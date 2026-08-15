import { BaseStructure } from "./BaseStructure.ts";


export class Queue<T> extends BaseStructure<T> {
  constructor(name: string, dataType: string) {
    super(name, "queue", dataType);
  }

  add(value: T): void {
    this.values.push(value);
    this.updateMetadata();
  }

  remove(): T | null {
    if (this.values.length === 0) return null;
    const removed = this.values.shift()!;
    this.updateMetadata();
    return removed;
  }
}
