// import { BaseStructure } from "./BaseStructure.ts";


// export class Stack<T> extends BaseStructure<T> {
//   constructor(name: string, dataType: string) {
//     super(name, "stack", dataType);
//   }

//   add(value: T): void {
//     this.values.push(value);
//     this.updateMetadata();
//   }

//   remove(): T | null {
//     if (this.values.length === 0) return null;
//     const removed = this.values.pop()!;
//     this.updateMetadata();
//     return removed;
//   }
// }


import { BaseStructure } from "./BaseStructure.ts";

export class Stack<T> extends BaseStructure<T> {
  constructor(name: string, dataType: string) {
    super(name, "stack", dataType);
  }

  // Insertar en el Tope (Top)
  push(value: T): void {
    this.values.push(value);
    this.updateMetadata();
  }

  // Eliminar del Tope (Top)
  pop(): T | null {
    if (this.values.length === 0) return null;
    const removed = this.values.pop()!;
    this.updateMetadata();
    return removed;
  }
}