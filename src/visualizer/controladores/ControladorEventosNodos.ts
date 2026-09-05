import { 
  borrarNodoAlComienzo, 
  borrarNodoIntermedio, 
  borrarNodoAlFinal, 
  borrarUltimoNodo 
} from "./RenderSacarNodo.ts";
import {  indexOf } from "../contenedores/ContenedorNodos.ts";
import * as DOM from "../utils/elementosDOM.ts";




export function nodoSeleccionado(data: string): void {
  if (!DOM.verificarDOM() || !DOM.contenedorFlechas) return;

  const result = window.confirm('¿Do you want to remove the node?');
  if (!result) {
    console.log("Node won't be removed");
    return;
  }
  
  // const cantidad_flechas = DOM.contenedorFlechas.childElementCount + DOM.contenedorFlechasCurvas.childElementCount;
  // console.log("ver la cantidad de flechas rectas: ",cantidad_flechas);

// 🔥 SOLUCIÓN: Contamos únicamente los elementos que representen flechas reales (.arrow)
  // ignorando por completo los 'salto-flex' u otros contenedores de diseño.
  const flechasRectas = DOM.contenedorFlechas.querySelectorAll('.arrow').length;
  const flechasCurvas = DOM.contenedorFlechasCurvas.childElementCount;
  
  const cantidad_flechas = flechasRectas + flechasCurvas;
  console.log("Cantidad real de flechas lógicas: ", cantidad_flechas);


  switch (cantidad_flechas) {
    case 0: {
      borrarUltimoNodo();
      break;
    }
    default: {
      const indice = indexOf(data);
      console.log("ver el indice: ",indice);
      if (indice === -1) return; // Si no se encuentra el nodo, abortamos de forma segura

      switch (indice) {
        case 0: {
          borrarNodoAlComienzo();
          break;
        }
        case cantidad_flechas: {
          console.log("Entro aqui");
          borrarNodoAlFinal();
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