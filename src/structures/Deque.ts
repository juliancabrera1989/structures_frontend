// import { BaseStructure } from "./BaseStructure.ts";

// export class Deque<T> extends BaseStructure<T> {
//   constructor(name: string, dataType: string) {
//     super(name, "deque", dataType);
//   }

//   addFront(value: T): void {
//     this.values.unshift(value);
//     this.updateMetadata();
//   }

//   addBack(value: T): void {
//     this.values.push(value);
//     this.updateMetadata();
//   }

//   removeFront(): T | null {
//     if (this.values.length === 0) return null;
//     const removed = this.values.shift()!;
//     this.updateMetadata();
//     return removed;
//   }

//   removeBack(): T | null {
//     if (this.values.length === 0) return null;
//     const removed = this.values.pop()!;
//     this.updateMetadata();
//     return removed;
//   }


//   add(value: T): void {
//   this.addBack(value);
// }

// remove(): T | null {
//   return this.removeFront();
// }
// }
import { BaseStructure } from "./BaseStructure.ts";

export class Deque<T> extends BaseStructure<T> {
  constructor(name: string, dataType: string) {
    super(name, "deque", dataType);
  }

  // Insertar por el frente (Inicio)
  addFront(value: T): void {
    this.values.unshift(value);
    this.updateMetadata();
  }

  // Insertar por el final (Back)
  addBack(value: T): void {
    this.values.push(value);
    this.updateMetadata();
  }

  // Eliminar por el frente
  removeFront(): T | null {
    if (this.values.length === 0) return null;
    const removed = this.values.shift()!;
    this.updateMetadata();
    return removed;
  }

  // Eliminar por el final
  removeBack(): T | null {
    if (this.values.length === 0) return null;
    const removed = this.values.pop()!;
    this.updateMetadata();
    return removed;
  }
}