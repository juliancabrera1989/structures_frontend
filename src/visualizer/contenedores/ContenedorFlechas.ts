import { crearFlecha } from "../elementosGraficos/Flecha.ts";
import { contenedorFlechas, verificarDOM } from "../utils/elementosDOM.ts";
import { obtenerInfoLayout, obtenerUbicacionNodo } from "../utils/layoutHelpers.ts";

const root = document.documentElement;

/**
 * Obtiene la colección actualizada de flechas en el DOM.
 * Retorna un HTMLCollectionOf<Element> o un array vacío simulado si el DOM no está listo.
 */
function getFlechas(): HTMLCollectionOf<Element> | Element[] {
  if (!verificarDOM() || !contenedorFlechas) {
    return [];
  }
  return contenedorFlechas.getElementsByClassName("arrow");
}

function agregarFlechaN(indice: number): void {
  
  const flecha = crearFlecha();
  
  root.style.setProperty('--flecha-left', `-25px`);
  
   
  const flechas = getFlechas();
   
  // Si el índice es válido dentro del rango actual de flechas
  if (indice < flechas.length && flechas[indice]) {
    flechas[indice].insertAdjacentElement("afterend", flecha);
  }



        for (let i = 0; i < flechas.length; i++) {
        if (i !== (indice)) {
          flechas[i].classList.add("no-mover__flecha");
        }
      }

      setTimeout(() => {
        const objetivo = flechas[indice+1];
        if (objetivo) {
          for (const elemento of objetivo.children) {
            (elemento as HTMLElement).removeAttribute("style");
          }
        }
      }, 100);
}

function agregarFlecha(metodo: number): void {
  if (!verificarDOM() || !contenedorFlechas) return;

  let n = 0;
  let m = 1;
  let o = 0;
  const flecha = crearFlecha();
  var flechas = getFlechas();
  const layout = obtenerInfoLayout(5);
  


  // 1. Inserción en el DOM según el método
  switch (metodo) {
    case 0: {
      contenedorFlechas.append(flecha);
      o = layout.totalFilas - 1;
      break;
    }
    case 1: {
      contenedorFlechas.prepend(flecha);
      n = 1;
      m = flechas.length;
      
      break;
    }
  }

  flechas = getFlechas();

       if(layout.totalFilas == 1)
        root.style.setProperty('--flecha-left', `-25px`);
       

       if (n ==1)
            
      for (let i = (0 + n); i < (layout.nodosPorFila.get(0)! - (2 - n)); i++) {
        flechas[i].classList.add("no-mover__flecha");
        flechas[i].classList.remove("flecha-animando");
      }
      else 
      for (let i = layout.indiceInicioUltimaFila - (layout.totalFilas-1); i < flechas.length ; i++) {
        flechas[i].classList.add("no-mover__flecha");
        flechas[i].classList.remove("flecha-animando");
 
           }




       console.log("Al agregar la ultima flecha de la fila, la cantidad de nodos es: ",layout.nodosPorFila);
      if(layout.nodosPorFila.get(obtenerUbicacionNodo(layout,flechas.length-m).numFila) === 5) {
        (flechas[flechas.length-m] as HTMLElement).style.setProperty("width",root.style.getPropertyValue('--linea-flecha-width'));
      }
      setTimeout(() => {
        const objetivo = flechas[flechas.length - m];
        if (objetivo) {
          for (const elemento of objetivo.children) {
            (elemento as HTMLElement).removeAttribute("style");
          }
        }
      }, 100);



}


function sacarFlecha(indice: number): void {
  if (!verificarDOM() || !contenedorFlechas) return;

  // 1. Obtenemos la foto de las flechas únicamente por clase
  const flechasAntes = contenedorFlechas.querySelectorAll(".arrow");
  const flechaAEliminar = flechasAntes[indice];

  // 2. Si existe, la eliminamos de forma directa y síncrona
  if (flechaAEliminar) {
    flechaAEliminar.remove(); // .remove() es más directo que removeChild
  }

  // 3. Aplicamos la clase "no-mover__flecha" sólo a las que sobrevivieron
  const flechasDespues = contenedorFlechas.querySelectorAll(".arrow");
  if (flechasDespues.length > 0) {
    root.style.setProperty('--flecha-left', `-25px`);
    flechasDespues.forEach((f) => f.classList.add("no-mover__flecha"));
  }
}


export { agregarFlecha, agregarFlechaN, sacarFlecha, getFlechas };