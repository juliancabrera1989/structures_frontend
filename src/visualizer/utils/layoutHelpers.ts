import * as DOM from "./elementosDOM.ts";

export interface LayoutInfo {
  /** Mapa dinámico: Key = Índice de Fila (0..S-1), Value = Cantidad de Nodos */
  nodosPorFila: Map<number, number>;
  /** Cantidad total de filas (S) */
  totalFilas: number;
  /** Cantidad de nodos en la última fila (n) */
  nodosUltimaFila: number;
  /** Cantidad total de nodos en la grilla */
  totalNodos: number;
  /** Índice del primer nodo de la última fila en el DOM */
  indiceInicioUltimaFila: number;
  /** Indica si la última fila tiene capacidad para al menos un nodo más (n < M) */
  tieneEspacioUltimaFila: boolean;
}


/**
 * Inspecciona el DOM y calcula la topología actual del layout.
 * @param M Capacidad máxima de nodos por fila.
 */
export function obtenerInfoLayout(M: number): LayoutInfo {
  const contenedor = DOM.contenedorNodos;
  const nodosPorFila = new Map<number, number>();

  if (!contenedor) {
    return {
      nodosPorFila,
      totalFilas: 0,
      nodosUltimaFila: 0,
      totalNodos: 0,
      indiceInicioUltimaFila: 0,
      tieneEspacioUltimaFila: true,
    };
  }

  let filaActual = 0;
  let contadorFila = 0;
  let totalNodos = 0;
  let indiceInicioUltimaFila = 0;

  // Recorremos los hijos directos del contenedor en O(N)
  const elementos = Array.from(contenedor.children);

  for (const el of elementos) {
    if (el.classList.contains("salto-flex")) {
      // Cerramos la fila actual en el Map
      nodosPorFila.set(filaActual, contadorFila);
      
      // El inicio de la siguiente fila será el acumulado actual de nodos
      indiceInicioUltimaFila += contadorFila;
      
      filaActual++;
      contadorFila = 0;
    } else if (el.classList.contains("caja-nodo")) {
      contadorFila++;
      totalNodos++;
    }
  }

  // Registramos la última fila activa (o la única si no hubo .salto-flex)
  nodosPorFila.set(filaActual, contadorFila);

  const totalFilas = nodosPorFila.size;
  const nodosUltimaFila = nodosPorFila.get(totalFilas - 1) ?? 0;

  return {
    nodosPorFila,
    totalFilas,
    nodosUltimaFila,
    totalNodos,
    indiceInicioUltimaFila,
    tieneEspacioUltimaFila: nodosUltimaFila < M,
  };
}







/**
 * Devuelve la cantidad de nodos de una fila específica (0..S-1).
 */
export function getCantidadNodosFila(layout: LayoutInfo, numFila: number): number {
  return layout.nodosPorFila.get(numFila) ?? 0;
}

/**
 * Calcula el índice global de inicio dentro del DOM para CUALQUIER fila.
 */
export function getIndiceInicioFila(layout: LayoutInfo, numFila: number): number {
  let acumulado = 0;
  for (let f = 0; f < numFila; f++) {
    acumulado += layout.nodosPorFila.get(f) ?? 0;
  }
  return acumulado;
}

/**
 * Dado un índice global de nodo (0..totalNodos-1), determina a qué fila pertenece 
 * y cuál es su índice local dentro de esa fila.
 */
export function obtenerUbicacionNodo(layout: LayoutInfo, indiceGlobal: number) {
  let acumulado = 0;

  for (const [numFila, cantidad] of layout.nodosPorFila.entries()) {
    if (indiceGlobal < acumulado + cantidad) {
      return {
        numFila,
        indiceLocal: indiceGlobal - acumulado,
        cantidadNodosEnEstaFila: cantidad,
        indiceInicioFila: acumulado
      };
    }
    acumulado += cantidad;
  }

  // Fallback por si apunta a la posición donde se va a insertar al final
  const ultimaFila = Math.max(0, layout.totalFilas - 1);
  const nodosUltima = layout.nodosPorFila.get(ultimaFila) ?? 0;
  return {
    numFila: ultimaFila,
    indiceLocal: indiceGlobal - acumulado,
    cantidadNodosEnEstaFila: nodosUltima,
    indiceInicioFila: acumulado
  };
}