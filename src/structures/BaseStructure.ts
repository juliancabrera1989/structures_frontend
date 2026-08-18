// export interface StructureMetadata {
//   [key: string]: any;
// }

// export abstract class BaseStructure<T> {
//   id: string;
//   name: string;
//   type: string;
//   dataType: string;
//   createdAt: Date;
//   updatedAt: Date;
//   lastAccessedAt: Date;
//   nodesCount: number;
//   values: T[];
//   metadata?: StructureMetadata;

//   constructor(name: string, type: string, dataType: string) {
//     this.id = crypto.randomUUID();
//     this.name = name;
//     this.type = type;
//     this.dataType = dataType;
//     this.createdAt = new Date();
//     this.updatedAt = new Date();
//     this.lastAccessedAt = new Date();
//     this.nodesCount = 0;
//     this.values = [];
//   }

//   protected updateMetadata() {
//     this.nodesCount = this.values.length;
//     this.updatedAt = new Date();
//   }

//   abstract add(value: T): void;
//   abstract remove(): T | null;
// }
export interface StructureMetadata {
  [key: string]: any;
}

export abstract class BaseStructure<T> {
  readonly id: string;
  name: string;
  readonly type: string;
  readonly dataType: string;
  createdAt: Date;
  updatedAt: Date;
  lastAccessedAt: Date;
  nodesCount: number;
  values: T[];
  metadata?: StructureMetadata;

  constructor(name: string, type: string, dataType: string) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.type = type;
    this.dataType = dataType;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.lastAccessedAt = new Date();
    this.nodesCount = 0;
    this.values = [];
  }

  /**
   * Actualiza los contadores de nodos y las fechas de modificación.
   * Debe llamarse desde las clases hijas tras cada inserción o eliminación.
   */
  protected updateMetadata(): void {
    this.nodesCount = this.values.length;
    this.updatedAt = new Date();
    this.lastAccessedAt = new Date();
  }

  /**
   * Registra una lectura de la estructura (ej. al recorrerla o renderizarla).
   */
  public touch(): void {
    this.lastAccessedAt = new Date();
  }

  /**
   * Vacía la estructura por completo.
   */
  public clear(): void {
    this.values = [];
    this.updateMetadata();
  }
}