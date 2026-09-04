// import { BaseStructure } from "./BaseStructure.ts";

// class ListNode<T> {
//   value: T;
//   next: ListNode<T> | null = null;

//   constructor(value: T) {
//     this.value = value;
//   }
// }

// export class LinkedList<T> extends BaseStructure<T> {
//   head: ListNode<T> | null = null;
//   tail: ListNode<T> | null = null;

//   constructor(name: string, dataType: string) {
//     super(name, "linkedlist", dataType);
//   }

//   add(value: T): void {
//     const node = new ListNode(value);

//     if (!this.head) {
//       this.head = node;
//       this.tail = node;
//     } else {
//       this.tail!.next = node;
//       this.tail = node;
//     }

//     this.values.push(value);
//     this.updateMetadata();
//   }

//   remove(): T | null {
//     if (!this.head) return null;

//     const removedValue = this.head.value;
//     this.head = this.head.next;

//     if (!this.head) this.tail = null;

//     this.values.shift();
//     this.updateMetadata();

//     return removedValue;
//   }

//   removeAt(index: number): T | null {
//     if (index < 0 || index >= this.nodesCount) return null;

//     if (index === 0) return this.remove();

//     let prev = this.head;
//     for (let i = 0; i < index - 1; i++) {
//       prev = prev!.next;
//     }

//     const removed = prev!.next;
//     prev!.next = removed!.next;
//     if (removed === this.tail) this.tail = prev;

//     this.values.splice(index, 1);
//     this.updateMetadata();

//     return removed!.value;
//   }
// }


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

  constructor(name: string, dataType: string) {
    super(name, "linkedlist", dataType);
  }

  // 1. AGREGAR AL PRINCIPIO
  addFirst(value: T): void {
    const node = new ListNode(value);
    node.next = this.head;
    this.head = node;

    this.values.unshift(value);
    this.updateMetadata();
  }

  // 2. AGREGAR AL FINAL
  addLast(value: T): void {
    const node = new ListNode(value);

    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }

    this.values.push(value);
    this.updateMetadata();
  }

  // 3. AGREGAR EN POSICIÓN INTERMEDIA
  insertAt(index: number, value: T): void {
    if (index <= 0) {
      this.addFirst(value);
      return;
    }
    if (index >= this.nodesCount) {
      this.addLast(value);
      return;
    }

    const node = new ListNode(value);
    let prev = this.head;
    for (let i = 0; i < index - 1; i++) {
      prev = prev!.next;
    }

    node.next = prev!.next;
    prev!.next = node;

    this.values.splice(index, 0, value);
    this.updateMetadata();
  }

  // 4. BORRAR AL PRINCIPIO
  removeFirst(): T | null {
    if (!this.head) return null;

    const removedValue = this.head.value;
    this.head = this.head.next;

    this.values.shift();
    this.updateMetadata();

    return removedValue;
  }

  // 5. BORRAR AL FINAL
  removeLast(): T | null {
    if (!this.head) return null;

    if (!this.head.next) {
      return this.removeFirst();
    }

    let prev = this.head;
    while (prev.next && prev.next.next) {
      prev = prev.next;
    }

    const removedValue = prev.next!.value;
    prev.next = null;

    this.values.pop();
    this.updateMetadata();

    return removedValue;
  }

  // 6. BORRAR EN POSICIÓN INTERMEDIA
  removeAt(index: number): T | null {
    if (index < 0 || index >= this.nodesCount) return null;
    if (index === 0) return this.removeFirst();
    if (index === this.nodesCount - 1) return this.removeLast();

    let prev = this.head;
    for (let i = 0; i < index - 1; i++) {
      prev = prev!.next;
    }

    const removed = prev!.next;
    prev!.next = removed!.next;

    this.values.splice(index, 1);
    this.updateMetadata();

    return removed!.value;
  }
}