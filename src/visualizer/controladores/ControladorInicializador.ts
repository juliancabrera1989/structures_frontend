import { crearFlecha } from "../elementosGraficos/Flecha.ts";
import * as DOM from "../utils/elementosDOM.ts"; // Usamos la centralización del DOM
import { LayoutInfo , obtenerInfoLayout } from "../utils/layoutHelpers.ts";
const root = document.documentElement;

// 1. Extendemos la interfaz Window para que TS reconozca nuestras propiedades globales
declare global {
  interface Window {
    espacio: number;
    banderaFlechaInicial: number;
    banderaFlechaFinal: number;
    alturaDeVentana:number;
  }
}

export function prepararDOMParaEstado1(): void {
  const root = document.documentElement;

  // 1. Apagar transiciones de 2s para que los cambios sean instantáneos
  if (DOM.str) DOM.str.style.transition = "none";
  if (DOM.nulo) DOM.nulo.style.transition = "none";

  // 2. Limpiar atributos de estilo en línea inyectados previamente
  if (DOM.inicializador) DOM.inicializador.removeAttribute("style");
  if (DOM.str) DOM.str.removeAttribute("style");
  if (DOM.nulo) DOM.nulo.removeAttribute("style");

  // 3. Resetear todas las CSS Custom Properties a su valor base de Estado 1
  root.style.setProperty('--str-left', '25%');
  root.style.setProperty('--nulo-left', '-25%');
  root.style.setProperty('--str-top', '0px');
  root.style.setProperty('--nulo-top', '0px');

  root.style.setProperty('--rotation-angle-fpi', '0deg');
  root.style.setProperty('--rotation-angle-fpf', '0deg');

  root.style.setProperty('--linea-flecha-inicial-width', '0px');
  root.style.setProperty('--linea-flecha-inicial-left', '0px');
  root.style.setProperty('--linea-flecha-inicial-top', '0px');
  root.style.setProperty('--linea-flecha-inicial-transform-origin', 'left');

  root.style.setProperty('--punta-flecha-inicial-width', '0px');
  root.style.setProperty('--punta-flecha-inicial-left', '0px');
  root.style.setProperty('--punta-flecha-inicial-top', '0px');

  root.style.setProperty('--linea-flecha-final-width', '0px');
  root.style.setProperty('--linea-flecha-final-left', '0px');
  root.style.setProperty('--linea-flecha-final-top', '0px');

  root.style.setProperty('--punta-flecha-final-width', '0px');
  root.style.setProperty('--punta-flecha-final-top', '0px');
  root.style.setProperty('--punta-flecha-final-left', '0px');

  // 4. Forzar reflow en el navegador para asentar los cambios inmediatamente
  if (DOM.principal) void DOM.principal.offsetHeight;

  // 5. Restablecer transiciones y posicionar punteros neutros
  if (DOM.str) DOM.str.style.transition = "";
  if (DOM.nulo) DOM.nulo.style.transition = "";

  inicializarPuntero(1);
  setPuntero(1);
}

function inicializarPuntero(valor: number): void {
  if (!DOM.verificarDOM() || !DOM.inicializador) return;

  const flecha_puntero_clone = crearFlecha();
  
  // Buscamos el original de forma segura
  const idOriginal = valor === 1 ? "flecha_puntero_inicial" : "flecha_puntero_final";
  const original = document.getElementById(idOriginal);
  
  // Le asignamos el ID al clon
  flecha_puntero_clone.setAttribute("id", idOriginal);
  flecha_puntero_clone.style.height = "0px";
  // Forzamos el tipo a HTMLDivElement porque SABEMOS que la estructura de la flecha los tiene.
  // Al usar querySelector, si estás seguro de tu HTML, lo casteás directamente.
  const underline = flecha_puntero_clone.querySelector(".underline") as HTMLDivElement;
  const lineaS    = flecha_puntero_clone.querySelector(".linea-s") as HTMLDivElement;
  const lineaI    = flecha_puntero_clone.querySelector(".linea-i") as HTMLDivElement;



  if(valor == 1) {
    underline.classList.add("cambio_top");
    
    }


  // Rompemos la ejecución si por algún motivo el HTML original mutó y no encuentra el nodo
  if (!original) {
    console.error(`No se encontró el elemento original con ID: ${idOriginal}`);
    return;
  }

  // Ahora podés operar con absoluta confianza. TS sabe que son Divs y que NO son null/undefined.
  underline.classList.add("flecha_puntero__lista-vacia");
  underline.removeAttribute("style");
  lineaS.removeAttribute("style");
  lineaI.removeAttribute("style");

  // Ejemplo: Si acá necesitaras hacer: const ancho = underline.offsetWidth; ¡TS te va a dejar sin errores!

  DOM.inicializador.replaceChild(flecha_puntero_clone, original);
}

function setPuntero(valor: number): void {
  if (!DOM.verificarDOM() || !DOM.contenedorNodos || !DOM.str) return;

  let ptrLeft: number;
  let ptrHeight: number;
  let ptrOrigin: string;

  if (valor === 1) {
    ptrLeft = 0.03;
    ptrHeight = -100;
    ptrOrigin = "center";
  } else {
    ptrLeft = 0.25;
    ptrHeight = 0;
    ptrOrigin = "left";
  }
  
  root.style.setProperty('--str-top', `${ptrHeight}px`);
  root.style.setProperty('--nulo-top', `${ptrHeight}px`);
  root.style.setProperty('--str-left', `${ptrLeft * 100}%`);
  root.style.setProperty('--nulo-left', `-${ptrLeft * 100}%`);
  
  const contenedorWidth = (DOM.contenedorNodos as HTMLElement).offsetWidth;
  const strWidth = (DOM.str as HTMLElement).offsetWidth;

  const flecha_puntero_inicial_left = ptrLeft * contenedorWidth + strWidth + 5;
  const flecha_puntero_inicial_width = contenedorWidth - 2 * (flecha_puntero_inicial_left + 5);

  root.style.setProperty('--linea-flecha-inicial-transform-origin', `${ptrOrigin}`);
  root.style.setProperty('--linea-flecha-inicial-width', `${flecha_puntero_inicial_width}px`);
  root.style.setProperty('--linea-flecha-inicial-left', `${flecha_puntero_inicial_left}px`);
  root.style.setProperty('--punta-flecha-inicial-top', `${ptrHeight}px`);
  root.style.setProperty('--punta-flecha-inicial-left', `${flecha_puntero_inicial_left + flecha_puntero_inicial_width}px`);
  

}






function setFlechaInicial(mostrar: boolean, necesitaTransicion: number, s2?: number): void {
  const root = document.documentElement;
  
  const flecha_puntero_inicial = document.getElementById("flecha_puntero_inicial");
  if (!flecha_puntero_inicial) return;
  const hijos = flecha_puntero_inicial.children;

  switch (mostrar) {
    case true: {
      var resultado = necesitaTransicion * 2 + window.banderaFlechaInicial * 1;
      switch (resultado) {
        case 0: {
          for (let hijo of hijos) {
            (hijo as HTMLElement).classList.add("inmediato");
          }
          window.banderaFlechaInicial = 1;
          break;
        }
        case 2: {
          for (let hijo of hijos) {
            const h = hijo as HTMLElement;
            if (h.classList.contains("underline")) {
              h.classList.remove("arrowend-first-ul");
            } else {
              h.classList.remove("arrowend-first");
            }
          }
          root.style.setProperty('--punta-flecha-inicial-width', `20px`);
          break;
        }
        case 3: {
          for (let hijo of hijos) {
            const h = hijo as HTMLElement;
            h.classList.remove("inmediato");
            if (h.classList.contains("underline")) {
              h.classList.remove("arrowend-first-ul");
            } else {
              h.classList.remove("arrowend-first");
            }
          }
          window.banderaFlechaInicial = 0;
          break;
        }
      }

      // Referencias a elementos globales desde tu módulo DOM
      const contenedor_nodos = DOM.contenedorNodos;
      const str = DOM.str;
      if (!contenedor_nodos || !str) return;

      var long = contenedor_nodos.childElementCount;
      switch (long) {
        case 0: {
          var flecha_puntero_inicial_left = str.offsetLeft + str.offsetWidth + 5;
          var angulo = 0;
          var flecha_puntero_inicial_width = contenedor_nodos.offsetWidth - 2 * (str.offsetLeft + str.offsetWidth) - str.offsetWidth / 2;
          break;
        }
        default: {
          const firstChild = contenedor_nodos.firstElementChild as HTMLElement;
          if (!firstChild) return;

          if (s2 == undefined) {
            var x2 = firstChild.offsetLeft;
          } else {
            var x2 = s2;
          }
                 
          var x1 = str.offsetLeft + str.offsetWidth + 5;
          var flecha_puntero_inicial_left = x1;

          var flecha_puntero_inicial_width = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(100, 2));

          var angulo = (Math.asin((((firstChild.offsetTop + firstChild.offsetHeight / 2) - (str.offsetTop + str.offsetHeight - 7.5)) / flecha_puntero_inicial_width)) * 180 / Math.PI);
          root.style.setProperty('--rotation-angle-fpi', `${angulo}deg`);
          // root.style.setProperty('--punta-flecha-inicial-top', `202px`);
          break;
        }
      }

      var distancia_horizontal;
      if (angulo != 0) {
        distancia_horizontal = x2! - x1!;
      } else {
        distancia_horizontal = flecha_puntero_inicial_width;
      }

      root.style.setProperty('--linea-flecha-inicial-width', `${flecha_puntero_inicial_width}px`);
      root.style.setProperty('--punta-flecha-inicial-left', `${flecha_puntero_inicial_left + distancia_horizontal}px`);
      root.style.setProperty('--linea-flecha-inicial-left', `${flecha_puntero_inicial_left}px`);
      break;
    }
    case false: {
      root.style.setProperty('--linea-flecha-inicial-width', `0px`);
      root.style.setProperty('--punta-flecha-inicial-width', `0px`);
      window.banderaFlechaInicial = 0;
      for (let hijo of hijos) {
        const h = hijo as HTMLElement;
        h.classList.remove("inmediato");
        if (h.classList.contains("underline")) {
          h.classList.add("arrowend-first-ul");
        } else {
          h.classList.add("arrowend-first");
        }
      }
      break;
    }
  }
}

function setFlechaFinal(mostrar: boolean, necesitaTransicion: number, s2?: number): void {
  if (!DOM.verificarDOM() || !DOM.nulo || !DOM.contenedorNodos) return;

  const flecha_puntero_final = document.getElementById("flecha_puntero_final");
  if (!flecha_puntero_final) return;
  const hijos = flecha_puntero_final.children;

  const nuloElem = DOM.nulo as HTMLElement;
  const contenedorElem = DOM.contenedorNodos as HTMLElement;

  switch (mostrar) {
    case true: {
      const resultado = necesitaTransicion * 2 + window.banderaFlechaFinal * 1;
      
      switch (resultado) {
        case 0: {
          for (const hijo of hijos) {
            (hijo as HTMLElement).classList.add("inmediato");
          }
          window.banderaFlechaFinal = 1;
          break;
        }
        case 3: {
          for (const hijo of hijos) {
            (hijo as HTMLElement).classList.remove("inmediato");
          }
          window.banderaFlechaFinal = 0;
          break;
        }
        default: {
          window.espacio = nuloElem.offsetWidth / 3;
          break;
        }
      }

      const x1 = nuloElem.offsetLeft - window.espacio;
      const lastChild = contenedorElem.lastElementChild as HTMLElement | null;
      if (!lastChild) return;

      let s2_f = 0;


      const nodosReales = DOM.contenedorNodos.querySelectorAll('.caja-nodo');
      if (s2 === undefined) {
        
        
        const layout = obtenerInfoLayout(5);
        // let cantidadNodos = nodosReales.length % 5;
        // if(cantidadNodos == 0) 
        //    cantidadNodos = 5;
        
        // s2_f = (contenedorElem.offsetWidth - cantidadNodos * lastChild.offsetWidth) / (cantidadNodos + 1);
        s2_f = (contenedorElem.offsetWidth - layout.nodosUltimaFila * lastChild.offsetWidth) / (layout.nodosUltimaFila + 1);

      } else {
        s2_f = s2;
      }
      
      const x2 = contenedorElem.offsetWidth - (s2_f + (lastChild.offsetWidth / 4));
      // const firstChild = contenedorElem.lastElementChild as HTMLElement | null;
      // if (!firstChild) return;

      const y1 = (lastChild.offsetTop + lastChild.offsetHeight / 2) - (nuloElem.offsetTop + nuloElem.offsetHeight);
      const flecha_puntero_final_width = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1, 2));
      const angulo = -(Math.asin(y1 / flecha_puntero_final_width) * 180 / Math.PI);

      root.style.setProperty('--rotation-angle-fpf', `${angulo}deg`);
      root.style.setProperty('--linea-flecha-final-width', `${flecha_puntero_final_width}px`);
      root.style.setProperty('--linea-flecha-final-left', `${x2}px`);
      root.style.setProperty('--punta-flecha-final-left', `${x1}px`);
      root.style.setProperty('--punta-flecha-final-width', `20px`);
      
      // if(Math.trunc(nodosReales.length / 3) > 1) {
      //   console.log("solo entro aqui cuando hay mas de una fila");
      //   root.style.setProperty('--linea-flecha-final-top', `${(lastChild.offsetTop + lastChild.offsetHeight / 2)}px`);
      //   root.style.setProperty('--punta-flecha-final-top', `${(nuloElem.offsetTop + nuloElem.offsetHeight)}px`);
      // }
      for (const hijo of hijos) {
        const h = hijo as HTMLElement;
        if (h.classList.contains("underline")) {
          h.classList.remove("arrowend-first-ul");
        } else {
          h.classList.remove("arrowend-first");
        }
      }
      break;
    }
    case false: {
      root.style.setProperty('--linea-flecha-final-width', `0px`);
      root.style.setProperty('--punta-flecha-final-width', `0px`);
      window.banderaFlechaFinal = 0;
      for (const hijo of hijos) {
        const h = hijo as HTMLElement;
        h.classList.remove("inmediato");
        if (h.classList.contains("underline")) {
          h.classList.add("arrowend-first-ul");
        } else {
          h.classList.add("arrowend-first");
        }
      }
      break;
    }
  }
}

export { inicializarPuntero, setPuntero, setFlechaInicial, setFlechaFinal };