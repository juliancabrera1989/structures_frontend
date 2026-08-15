// RenderFlechasNodos.ts
import { getNodos } from "../contenedores/ContenedorNodos.ts";
import { getFlechas } from "../contenedores/ContenedorFlechas.ts";
import {animarDesplazamientoCurva, obtenerPuntosExtremos} from "./RenderFlechasCurvas.ts";
import * as DOM from "../utils/elementosDOM.ts"; // Core centralizado
import { LayoutInfo , obtenerUbicacionNodo } from "../utils/layoutHelpers.ts";
import { jsx } from "react/jsx-runtime";

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
  
  console.log("El metodo es: ",metodo);
  const flechas = getFlechas() as HTMLDivElement[];
  const nodos = getNodos() as HTMLDivElement[];

  const root = document.documentElement;
  let s2 = s2Input; // Permitimos la reasignación interna que requiere tu lógica del switch

  // Aseguramos que las variables de ventana tengan un valor por defecto numérico
  const bFlecha = window.banderaFlecha ?? 0;
  const resultado = 2 * necesitaTransicion + 1 * bFlecha;
  
  const primerNodo = DOM.contenedorNodos.firstElementChild as HTMLElement;
  console.log("el resultado dentro de flechasnodos es "+resultado);
  switch (resultado) {
    case 0: {
      let i = 0;
      if (nodos[i]) {
        nodos[i].classList.remove("no-mover");
        nodos[i].classList.add("inmediato-nodo");
      }
      console.log(flechas);
      for (const flecha of flechas) {
        flecha.classList.add("no-mover__flecha");
        console.log("para saber vis");
        const elementos = Array.from(flecha.children) as HTMLElement[];
        for (const elemento of elementos) {
          elemento.classList.add("inmediato");
          console.log("para saber si entra vis");
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
  console.log("el valor de s2 es: ",s2);
  console.log("el valor de flecha_width es: ",flecha_width);

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



export type RolCurva = "emisor" | "receptor";



export function setFlechasNodosDefinitiva(
  necesitaTransicion: number,
  metodo: number,
  s1: number,
  s2Input: number,
  rol: RolCurva,
  layout: LayoutInfo
): void {
 if (!DOM.verificarDOM() || DOM.contenedorNodos.childElementCount === 0) return;
  
  console.log("El metodo es: ",metodo);
  const flechas = getFlechas() as HTMLDivElement[];
  const nodos = getNodos() as HTMLDivElement[];

  const root = document.documentElement;
  let s2 = s2Input; // Permitimos la reasignación interna que requiere tu lógica del switch

  // Aseguramos que las variables de ventana tengan un valor por defecto numérico
  const bFlecha = window.banderaFlecha ?? 0;
  const resultado = 2 * necesitaTransicion + 1 * bFlecha;
  
  const primerNodo = DOM.contenedorNodos.firstElementChild as HTMLElement;
  console.log("el resultado dentro de flechasnodos es "+resultado);
  switch (resultado) {
    case 0: {
      let i = 0;
      if (nodos[i]) {
        nodos[i].classList.remove("no-mover");
        nodos[i].classList.add("inmediato-nodo");
      }
      console.log(flechas);
      for (const flecha of flechas) {
        flecha.classList.add("no-mover__flecha");
        console.log("para saber vis");
        const elementos = Array.from(flecha.children) as HTMLElement[];
        for (const elemento of elementos) {
          elemento.classList.add("inmediato");
          console.log("para saber si entra vis");
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
      
      
  console.log(" La cantidad de nodos en la fila 1 es: ",layout.nodosPorFila.get(0));

 console.log(" El indice de inicio en la ultima fila tendria que ser 5 donde da error : ",layout.indiceInicioUltimaFila);
console.log("El ultimo calculo del primer nodo en movimiento es: ",s2Input - s1);
const  indiceNodoMovil = (metodo == 1) ? layout.nodosPorFila.get(0)! - 1 : layout.indiceInicioUltimaFila;

const nodoMóvil = nodos[indiceNodoMovil];
    console.log("El nodo movil agarrado a la flecha curva es: ",nodoMóvil);
  
  // 1. Deducimos el ancla según el rol
  const indiceAncla = (rol === "emisor") ? indiceNodoMovil + 1 : indiceNodoMovil! - 1;
  const nodoAncla = nodos[indiceAncla];

 console.log("El nodo ancla agarrado a la flecha curva es: ",nodoAncla);




// USAMOS EL LAYOUT RECIBIDO
    const ubicacion = obtenerUbicacionNodo(layout, indiceNodoMovil!); 
    var iLocal = ubicacion.indiceLocal;
    const cantidadNodosFila = ubicacion.cantidadNodosEnEstaFila;
    
    

// 2. Cálculo dinámico y agnóstico del desplazamiento (Misma fórmula que setFlechasNodos de 1 fila)
var desplazamiento = (metodo === 1) 
  ? (cantidadNodosFila - 0) * (s1 - s2Input) 
  :  (s2Input - s1);


  console.log(" s1 es: ",s1 );
 console.log(" s2 es : ",s2Input);
console.log("El ultimo calculo del primer nodo en movimiento es: ",s2Input - s1);

  // 3. Aplicamos la posición al nodo móvil

const primerIndiceFila = (metodo == 1 ) ? 0 : layout.indiceInicioUltimaFila;

console.log("El primer indice de la fila actual es: ",primerIndiceFila);
console.log("El nodo de primer indice fila es: ",nodos[primerIndiceFila]);

nodos[primerIndiceFila].style.left = `${desplazamiento}px`;



console.log("Imprimimos abajo el nodo 0 de la fila en cuestion :");
console.log(nodoMóvil);


nodoMóvil?.classList.remove("no-mover", "inmediato-nodo");

    


       const flecha_width = s2 + primerNodo.offsetWidth / 4;
       root.style.setProperty('--linea-flecha-width', `${flecha_width}px`);

      let flecha_left = 0;
      if (metodo === 1) {
        flecha_left = (((cantidadNodosFila - 1) + 2) / 2) * (s1 - s2);
      } else {
        flecha_left = (((cantidadNodosFila - 1) + 2) / 2) * (s2 - s1);
      }

     console.log("El indice de donde arranca a mover las flechas: ",iLocal);
     console.log("La cantidad de nodos en la fila es :",cantidadNodosFila);
      if (cantidadNodosFila > 1) {




       var i = 0;
       const indiceMetodoCero = (layout.totalFilas > 1 ) ? layout.indiceInicioUltimaFila - (layout.totalFilas - 1) : 0 ;
        
        const indiceParaFlechas = (metodo ==1 ) ? 0 : indiceMetodoCero ;
        console.log("El indice para flechas comienza en: ",indiceParaFlechas);

        const sumar1o2 = (metodo == 1) ? 1 : layout.totalFilas;
        for(let j = indiceParaFlechas  ; j < (indiceParaFlechas +(cantidadNodosFila - 1)) ; j++){
          
          console.log("A ver, imprimo j aca a ver si busca a j = 1 :",j);
          flechas[j].classList.remove("no-mover__flecha");
          
          const elementos = Array.from(flechas[j].children) as HTMLElement[];
          for (const elemento of elementos) {
            elemento.classList.remove("inmediato");
          }

          flechas[j].style.setProperty('width',`${flecha_width}px`);
          // flechas[j].style.setProperty('left', `${flecha_left - 25}px`);
          
          console.log("Esta es la flecha j",flechas[j]);
          console.log("le tendria que agregar aca a bajo la clase flecha animando");
          flechas[j].classList.add("flecha-animando");
          
          if (nodos[j+sumar1o2]) {
            nodos[j+sumar1o2].classList.remove("no-mover");
            nodos[j+sumar1o2].classList.remove("inmediato-nodo");
            if (metodo === 1) {
              nodos[j+sumar1o2].style.left = (cantidadNodosFila - (i+1)) * (s1 - s2) + 'px';
            } else {
              console.log("Entro aca para desplazar nodo");
              nodos[j+sumar1o2].style.left = (i + 2) * (s2 - s1) + 'px';
             console.log("el valor de left para el nodo es: ",nodos[j+sumar1o2].style.getPropertyValue("left"));
            }                                            
            
             if((j+sumar1o2) == (cantidadNodosFila - 1) && layout.totalFilas > 1)
              desplazamiento = parseInt(nodos[(j+sumar1o2)].style.getPropertyValue("left"), 10);
          }
          console.log("Indice del nodo que no se mueve: ",j+sumar1o2);
          console.log("Aca abajo el nodo que no se mueve lpm: ")
          console.log(nodos[j+sumar1o2]);

         i++;
        }
      }



  if (nodoMóvil && layout.totalFilas > 1) {
    
    const path = (metodo == 1) ? 
    DOM.contenedorFlechasCurvas.firstElementChild?.firstElementChild as SVGPathElement | null
     : 
     DOM.contenedorFlechasCurvas.lastElementChild?.firstElementChild as SVGPathElement | null
    const tieneCurva = (path !== null);


    if (tieneCurva && path) {
      path.style.transition = "none";
      const contenedorNodos = (document.getElementById("contenedor_nodos") || DOM.contenedorNodos) as HTMLElement;

      if (contenedorNodos && nodoAncla) {
        // Asignamos emisor y receptor para el helper de extremos
        const emisor = (rol === "emisor") ? nodoMóvil : nodoAncla;
        const receptor = (rol === "receptor") ? nodoMóvil : nodoAncla;

        const puntos = obtenerPuntosExtremos(emisor, receptor, contenedorNodos);
        
        // 2. Deducimos qué coordenada X desplazar
        const x_final = (rol === "emisor") 
          ? puntos.x1 + desplazamiento 
          : puntos.x2 + desplazamiento;

        // 3. El rol pasa directamente a la animación
        animarDesplazamientoCurva(path, puntos, x_final, rol, 2000);
      }
    }
  }

      
 
      root.style.setProperty('--flecha-left-dinamica', `${flecha_left - 25}px`);
      window.banderaFlecha = 0;
      window.banderaFlechaInicial = 0;
      break;
    }
  }
  
  root.style.setProperty('--punta-flecha-width', `20px`);
}