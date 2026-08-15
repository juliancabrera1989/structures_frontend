import { BaseStructure } from "./BaseStructure.ts";

class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class LinkedList<T> extends BaseStructure<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;

  constructor(name: string, dataType: string) {
    super(name, "linkedlist", dataType);
  }

  add(value: T): void {
    const node = new ListNode(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }

    this.values.push(value);
    this.updateMetadata();
  }

  remove(): T | null {
    if (!this.head) return null;

    const removedValue = this.head.value;
    this.head = this.head.next;

    if (!this.head) this.tail = null;

    this.values.shift();
    this.updateMetadata();

    return removedValue;
  }

  removeAt(index: number): T | null {
    if (index < 0 || index >= this.nodesCount) return null;

    if (index === 0) return this.remove();

    let prev = this.head;
    for (let i = 0; i < index - 1; i++) {
      prev = prev!.next;
    }

    const removed = prev!.next;
    prev!.next = removed!.next;
    if (removed === this.tail) this.tail = prev;

    this.values.splice(index, 1);
    this.updateMetadata();

    return removed!.value;
  }
}
