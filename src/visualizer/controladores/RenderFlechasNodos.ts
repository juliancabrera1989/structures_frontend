

// import {getNodos} from "../contenedores/ContenedorNodos.ts"
// import {getFlechas} from "../contenedores/ContenedorFlechas.ts"

// declare global {
//   interface Window {
//     banderaFlechaInicial: number;
//     banderaFlechaFinal: number;
//     banderaFlecha : number;
//   }
// }

// function setFlechasNodos(necesitaTransicion: number): void;

// function setFlechasNodos(necesitaTransicion: number, metodo: number, s1: number, s2: number): void;





// function setFlechasNodos(necesitaTransicion: number, metodo?: number, s1?: number, s2?: number): void {
//   const resultado = 2 * necesitaTransicion + 1 * window.banderaFlecha;

//   // Aquí dividimos la lógica de manera tajante:
//   if (resultado === 0 || resultado === 1) {
//     ejecutarFlujoInicial(resultado);
//   } else {
//     // Si no es 0 ni 1, TypeScript exige que existan metodo, s1 y s2
//     if (metodo !== undefined && s1 !== undefined && s2 !== undefined) {
//       ejecutarFlujoDefault(metodo, s1, s2);
//     } else {
//       console.error("Faltan parámetros requeridos para el flujo principal.");
//     }
//   }
// }





// function ejecutarFlujoInicial(resultado: number): void {
//   const flechas = getFlechas();
//   const contenedor_nodos = document.getElementById("contenedor_nodos") as HTMLDivElement;
//   const firstChild = contenedor_nodos?.firstElementChild as HTMLDivElement;
//   if (!firstChild) return;
//   const root = document.documentElement;

//   if (resultado === 0) {
//     for (const flecha of flechas) {
//       flecha.classList.add("no-mover__flecha");
//       for (const elemento of flecha.children) elemento.classList.add("inmediato");
//     }
//     window.banderaFlechaInicial = 1;
//   }

//   const cantidadNodos = flechas.length + 1;
//   const s2Calculado = (contenedor_nodos.offsetWidth - (cantidadNodos * firstChild.offsetWidth)) / (cantidadNodos + 1);

//   const flecha_width = s2Calculado + firstChild.offsetWidth / 4;
//   root.style.setProperty('--linea-flecha-width', `${flecha_width}px`);
//   root.style.setProperty('--punta-flecha-width', `20px`);
// }
 





// function ejecutarFlujoDefault(metodo: number, s1: number, s2: number): void {
//   const flechas = getFlechas();
//   const nodos = getNodos();
//   const contenedor_nodos = document.getElementById("contenedor_nodos") as HTMLDivElement;
//   const firstChild = contenedor_nodos?.firstElementChild as HTMLDivElement;
//   if (!firstChild) return;
//   const root = document.documentElement;

//   let i = 0;
//   nodos[i].classList.remove("no-mover");
//   nodos[i].style.left = metodo === 1 ? (nodos.length - i) * (s1 - s2) + 'px' : (i + 1) * (s2 - s1) + 'px';

//   for (const flecha of flechas) {
//     flecha.classList.remove("no-mover__flecha");
//     for (const elemento of flecha.children) elemento.classList.remove("inmediato");
    
//     i++;
//     nodos[i].classList.remove("no-mover");
//     nodos[i].style.left = metodo === 1 ? (nodos.length - i) * (s1 - s2) + 'px' : (i + 1) * (s2 - s1) + 'px';
//   }

//   const flecha_left = ((flechas.length + 2) / 2) * (metodo === 1 ? (s1 - s2) : (s2 - s1));
//   root.style.setProperty('--flecha-left', `${flecha_left - 25}px`);
  
//   window.banderaFlecha = 0;
//   window.banderaFlechaInicial = 0;

//   const flecha_width = s2 + firstChild.offsetWidth / 4;
//   root.style.setProperty('--linea-flecha-width', `${flecha_width}px`);
//   root.style.setProperty('--punta-flecha-width', `20px`);
// }



//  export {setFlechasNodos}




// RenderFlechasNodos.ts
import { getNodos } from "../contenedores/ContenedorNodos.ts";
import { getFlechas } from "../contenedores/ContenedorFlechas.ts";
import * as DOM from "../elementosDOM.ts"; // Core centralizado

// Extendemos la interfaz global de Window para que TypeScript no tire error al leer tus banderas
declare global {
  interface Window {
    banderaFlecha: number;
    banderaFlechaInicial: number;
    banderaFlechaFinal: number;
  }
}


/* ==========================================================================
   1. SET FLECHAS NODOS (Manejo de transiciones para Comienzo y Final)
   ========================================================================== */
export function setFlechasNodos(necesitaTransicion: number, metodo: number, s1: number, s2Input: number): void {
  if (!DOM.verificarDOM() || DOM.contenedorNodos.childElementCount === 0) return;


  const flechas = getFlechas() as HTMLDivElement[];
  const nodos = getNodos() as HTMLDivElement[];

  const root = document.documentElement;
  let s2 = s2Input; // Permitimos la reasignación interna que requiere tu lógica del switch

  // Aseguramos que las variables de ventana tengan un valor por defecto numérico
  const bFlecha = window.banderaFlecha ?? 0;
  const resultado = 2 * necesitaTransicion + 1 * bFlecha;

  const primerNodo = DOM.contenedorNodos.firstElementChild as HTMLElement;

  switch (resultado) {
    case 0: {
      let i = 0;
      if (nodos[i]) {
        nodos[i].classList.remove("no-mover");
        nodos[i].classList.add("inmediato-nodo");
      }

      for (const flecha of flechas) {
        flecha.classList.add("no-mover__flecha");
        const elementos = Array.from(flecha.children) as HTMLElement[];
        for (const elemento of elementos) {
          elemento.classList.add("inmediato");
        }

        i++;
        if (nodos[i]) {
          nodos[i].classList.add("inmediato-nodo");
          nodos[i].classList.remove("no-mover");
        }
      }

      const cantidadNodos = flechas.length + 1;
      s2 = (DOM.contenedorNodos.offsetWidth - (cantidadNodos * primerNodo.offsetWidth)) / (cantidadNodos + 1);
      
      window.banderaFlechaInicial = 1;
      break;
    }

    case 1: {
      const cantidadNodos = flechas.length + 1;
      s2 = (DOM.contenedorNodos.offsetWidth - (cantidadNodos * primerNodo.offsetWidth)) / (cantidadNodos + 1);
      break;
    }

    default: {
      let i = 0;
      if (nodos[i]) {
        nodos[i].classList.remove("no-mover");
        nodos[i].classList.remove("inmediato-nodo");
        if (metodo === 1) {
          nodos[i].style.left = (nodos.length - i) * (s1 - s2) + 'px';
        } else {
          nodos[i].style.left = (i + 1) * (s2 - s1) + 'px';
        }
      }

      if (flechas) {
        for (const flecha of flechas) {
          flecha.classList.remove("no-mover__flecha");
          const elementos = Array.from(flecha.children) as HTMLElement[];
          for (const elemento of elementos) {
            elemento.classList.remove("inmediato");
          }

          i++;
          if (nodos[i]) {
            nodos[i].classList.remove("no-mover");
            nodos[i].classList.remove("inmediato-nodo");
            if (metodo === 1) {
              nodos[i].style.left = (nodos.length - i) * (s1 - s2) + 'px';
            } else {
              nodos[i].style.left = (i + 1) * (s2 - s1) + 'px';
            }
          }
        }
      }

      let flecha_left = 0;
      if (metodo === 1) {
        flecha_left = ((flechas.length + 2) / 2) * (s1 - s2);
      } else {
        flecha_left = ((flechas.length + 2) / 2) * (s2 - s1);
      }
      
      root.style.setProperty('--flecha-left', `${flecha_left - 25}px`);
      window.banderaFlecha = 0;
      window.banderaFlechaInicial = 0;
      break;
    }
  }

  const flecha_width = s2 + primerNodo.offsetWidth / 4;
  root.style.setProperty('--linea-flecha-width', `${flecha_width}px`);
  root.style.setProperty('--punta-flecha-width', `20px`);
}

/* ==========================================================================
   2. SET FLECHAS NODOS 2 (Manejo de transiciones para borrado Intermedio)
   ========================================================================== */
export function setFlechasNodos2(indice: number, s1: number, s2: number): void {
  if (!DOM.verificarDOM() || DOM.contenedorNodos.childElementCount === 0) return;


  const flechas = getFlechas() as HTMLDivElement[];
  const nodos = getNodos() as HTMLDivElement[];


  const root = document.documentElement;
  const primerNodo = DOM.contenedorNodos.firstElementChild as HTMLElement;

  let i = 0;
  if (nodos[i]) {
    nodos[i].classList.remove("no-mover");
    nodos[i].classList.remove("inmediato-nodo");
    nodos[i].style.left = (i + 1) * (s2 - s1) + 'px';
  }

  if (flechas) {
    for (const flecha of flechas) {
      if (flechas.length > 1 && i < (indice - 2)) {
        flechas[i].style.left = `${(((flechas.length + 2) / 2) * (s2 - s1)) - 25}px`;
      }
      if (flechas.length > 1 && i >= (indice - 1)) {
        flechas[i].style.left = `${(((flechas.length + 2) / 2) * (s1 - s2)) - 25}px`;
      }

      flecha.classList.remove("no-mover__flecha");
      const elementos = Array.from(flecha.children) as HTMLElement[];
      for (const elemento of elementos) {
        elemento.classList.remove("inmediato");
      }

      i++;
      if (nodos[i]) {
        nodos[i].classList.remove("no-mover");
        nodos[i].classList.remove("inmediato-nodo");

        if (i < (indice - 1)) {
          nodos[i].style.left = (i + 1) * (s2 - s1) + 'px';
        } else {
          nodos[i].style.left = (nodos.length - i) * (s1 - s2) + 'px';
        }
      }
    }
  }

  window.banderaFlecha = 0;
  window.banderaFlechaInicial = 0;
  window.banderaFlechaFinal = 0;

  const flecha_width = s2 + primerNodo.offsetWidth / 4;
  root.style.setProperty('--linea-flecha-width', `${flecha_width}px`);
  root.style.setProperty('--punta-flecha-width', `20px`);
}