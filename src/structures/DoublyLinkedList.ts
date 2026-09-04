import { BaseStructure } from "./BaseStructure.ts";

class DoublyNode<T> {
  value: T;
  next: DoublyNode<T> | null = null;
  prev: DoublyNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class DoublyLinkedList<T> extends BaseStructure<T> {
  head: DoublyNode<T> | null = null;
  tail: DoublyNode<T> | null = null;

  constructor(name: string, dataType: string) {
    super(name, "doublylinkedlist", dataType);
  }

  add(value: T): void {
    const node = new DoublyNode(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail!.next = node;
      this.tail = node;
    }

    this.values.push(value);
    this.updateMetadata();
  }

  remove(): T | null {
    if (!this.tail) return null;

    const removedValue = this.tail.value;
    this.tail = this.tail.prev;
    if (this.tail) this.tail.next = null;
    else this.head = null;

    this.values.pop();
    this.updateMetadata();

    return removedValue;
  }
}
