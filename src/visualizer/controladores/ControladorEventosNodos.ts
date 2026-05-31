import { 
  borrarNodoAlComienzo, 
  borrarNodoIntermedio, 
  borrarNodoAlFinal, 
  borrarUltimoNodo 
} from "./RenderSacarNodo.ts";
import {  indexOf } from "../contenedores/ContenedorNodos.ts";
import * as DOM from "../elementosDOM.ts";

/**
 * Esta función maneja la decisión de qué tipo de borrado ejecutar
 * según la posición del nodo en la lista matemática.
 */

// export function nodoSeleccionado(valor: string): void {
//   // 1. Pedimos la confirmación al usuario de forma segura para ESLint
//   if (!window.confirm(`¿Estás seguro de que deseas eliminar el nodo con valor "${valor}"?`)) {
//     return; // Si cancela, cortamos el flujo acá
//   }

//   const nodos = getNodos();
  
//   // 2. Buscamos en qué posición del array de datos está el nodo clickeado
//   // Asumiendo que tus nodos guardan el valor en una propiedad textContent o similar
//   const indice = nodos.findIndex(nodo => nodo.textContent?.trim() === valor);

//   if (indice === -1) {
//     console.error("No se encontró el nodo en el contenedor de datos.");
//     return;
//   }

//   // 3. Orquestamos el render correspondiente según la posición matemática
//   if (nodos.length === 1) {
//     borrarUltimoNodo();
//   } else if (indice === 0) {
//     borrarNodoAlComienzo(valor);
//   } else if (indice === nodos.length - 1) {
//     borrarNodoAlFinal(valor);
//   } else {
//     // Le pasamos el índice para que sepa qué flechas romper internamente
//     borrarNodoIntermedio(valor, indice); 
//   }
// }



export function nodoSeleccionado(data: string): void {
  if (!DOM.verificarDOM() || !DOM.contenedorFlechas) return;

  const result = window.confirm('¿Desea eliminar el nodo?');
  if (!result) {
    console.log("no se borrara el nodo");
    return;
  }

  const cantidad_flechas = DOM.contenedorFlechas.childElementCount;

  switch (cantidad_flechas) {
    case 0: {
      borrarUltimoNodo();
      break;
    }
    default: {
      const indice = indexOf(data);
      if (indice === -1) return; // Si no se encuentra el nodo, abortamos de forma segura

      switch (indice) {
        case 0: {
          borrarNodoAlComienzo(data);
          break;
        }
        case cantidad_flechas: {
          borrarNodoAlFinal(data);
          break;
        }
        default: {
          borrarNodoIntermedio(data, indice);
          break;
        }
      }
      break;
    }
  }
}