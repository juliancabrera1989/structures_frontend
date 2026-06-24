import { crearFlecha } from "../elementosGraficos/Flecha.ts";
import * as DOM from "../elementosDOM.ts"; // Usamos la centralización del DOM

const root = document.documentElement;

// 1. Extendemos la interfaz Window para que TS reconozca nuestras propiedades globales
declare global {
  interface Window {
    espacio: number;
    banderaFlechaInicial: number;
    banderaFlechaFinal: number;
  }
}



function inicializarPuntero(valor: number): void {
  if (!DOM.verificarDOM() || !DOM.inicializador) return;

  const flecha_puntero_clone = crearFlecha();
  
  // Buscamos el original de forma segura
  const idOriginal = valor === 1 ? "flecha_puntero_inicial" : "flecha_puntero_final";
  const original = document.getElementById(idOriginal);
  
  // Le asignamos el ID al clon
  flecha_puntero_clone.setAttribute("id", idOriginal);

  // Forzamos el tipo a HTMLDivElement porque SABEMOS que la estructura de la flecha los tiene.
  // Al usar querySelector, si estás seguro de tu HTML, lo casteás directamente.
  const underline = flecha_puntero_clone.querySelector(".underline") as HTMLDivElement;
  const lineaS    = flecha_puntero_clone.querySelector(".linea-s") as HTMLDivElement;
  const lineaI    = flecha_puntero_clone.querySelector(".linea-i") as HTMLDivElement;

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

  root.style.setProperty('--str-nulo-top', `${ptrHeight}px`);
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

// function setFlechaInicial(mostrar: boolean, necesitaTransicion: number, s2?: number): void {
//   if (!DOM.verificarDOM() || !DOM.str || !DOM.contenedorNodos) return;

//   // Obtenemos dinámicamente el elemento actual para leer sus hijos
//   const flecha_puntero_inicial = document.getElementById("flecha_puntero_inicial");
//   if (!flecha_puntero_inicial) return;
//   const hijos = flecha_puntero_inicial.children;

//   switch (mostrar) {
//     case true: {
//       const resultado = necesitaTransicion * 2 + window.banderaFlechaInicial * 1;
      
//       switch (resultado) {
//         case 0: {
//           for (const hijo of hijos) {
//             (hijo as HTMLElement).classList.add("inmediato");
//           }
//           window.banderaFlechaInicial = 1;
//           break;
//         }
//         case 2: {
//           for (const hijo of hijos) {
//             const h = hijo as HTMLElement;
//             if (h.classList.contains("underline")) {
//               h.classList.remove("arrowend-first-ul");
//             } else {
//               h.classList.remove("arrowend-first");
//             }
//           }
//           root.style.setProperty('--punta-flecha-inicial-width', `20px`);
//           break;
//         }
//         case 3: {
//           for (const hijo of hijos) {
//             const h = hijo as HTMLElement;
//             h.classList.remove("inmediato");
//             if (h.classList.contains("underline")) {
//               h.classList.remove("arrowend-first-ul");
//             } else {
//               h.classList.remove("arrowend-first");
//             }
//           }
//           window.banderaFlechaInicial = 0;
//           break;
//         }
//       }

//       const long = DOM.contenedorNodos.childElementCount;
//       const strElem = DOM.str as HTMLElement;
//       const contenedorElem = DOM.contenedorNodos as HTMLElement;
      
//       let flecha_puntero_inicial_left = 0;
//       let flecha_puntero_inicial_width = 0;
//       let angulo = 0;

//       switch (long) {
//         case 0: {
//           flecha_puntero_inicial_left = strElem.offsetLeft + strElem.offsetWidth + 5;
//           flecha_puntero_inicial_width = contenedorElem.offsetWidth - 2 * (strElem.offsetLeft + strElem.offsetWidth) - strElem.offsetWidth / 2;
//           break;
//         }
//         default: {
//           const primerNodo = contenedorElem.firstElementChild as HTMLElement | null;
//           if (!primerNodo) return;

//           const x2 = s2 === undefined ? primerNodo.offsetLeft : s2;
//           const x1 = strElem.offsetLeft + strElem.offsetWidth + 5;
          
//           flecha_puntero_inicial_left = x1;
//           flecha_puntero_inicial_width = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(100, 2));
          
//           const y2 = primerNodo.offsetTop + primerNodo.offsetHeight / 2;
//           const y1 = strElem.offsetTop + strElem.offsetHeight - 7.5;
          
//           angulo = (Math.asin((y2 - y1) / flecha_puntero_inicial_width) * 180) / Math.PI;
//           root.style.setProperty('--rotation-angle-fpi', `${angulo}deg`);
//           root.style.setProperty('--punta-flecha-inicial-top', `0`);
//           break;
//         }
//       }

//       const distancia_horizontal = angulo !== 0 ? (s2 === undefined ? (contenedorElem.firstElementChild as HTMLElement).offsetLeft : s2) - (strElem.offsetLeft + strElem.offsetWidth + 5) : flecha_puntero_inicial_width;

//       root.style.setProperty('--linea-flecha-inicial-width', `${flecha_puntero_inicial_width}px`);
//       root.style.setProperty('--punta-flecha-inicial-left', `${flecha_puntero_inicial_left + distancia_horizontal}px`);
//       root.style.setProperty('--linea-flecha-inicial-left', `${flecha_puntero_inicial_left}px`);
//       break;
//     }
//     case false: {
//       root.style.setProperty('--linea-flecha-inicial-width', `0px`);
//       root.style.setProperty('--punta-flecha-inicial-width', `0px`);
//       window.banderaFlechaInicial = 0;
//       for (const hijo of hijos) {
//         const h = hijo as HTMLElement;
//         h.classList.remove("inmediato");
//         if (h.classList.contains("underline")) {
//           h.classList.add("arrowend-first-ul");
//         } else {
//           h.classList.add("arrowend-first");
//         }
//       }
//       break;
//     }
//   }
// }


// function setFlechaInicial(mostrar: boolean, necesitaTransicion: number, s2?: number): void {
//   if (!DOM.verificarDOM() || !DOM.str || !DOM.contenedorNodos) return;

//   const flecha_puntero_inicial = document.getElementById("flecha_puntero_inicial");
//   if (!flecha_puntero_inicial) return;
//   const hijos = flecha_puntero_inicial.children;

//   switch (mostrar) {
//     case true: {
//       const resultado = necesitaTransicion * 2 + window.banderaFlechaInicial * 1;
      
//       switch (resultado) {
//         case 0: {
//           for (const hijo of hijos) {
//             (hijo as HTMLElement).classList.add("inmediato");
//           }
//           window.banderaFlechaInicial = 1;
//           break;
//         }
//         case 2: {
//           for (const hijo of hijos) {
//             const h = hijo as HTMLElement;
//             if (h.classList.contains("underline")) {
//               h.classList.remove("arrowend-first-ul");
//             } else {
//               h.classList.remove("arrowend-first");
//             }
//           }
//           root.style.setProperty('--punta-flecha-inicial-width', `20px`);
//           break;
//         }
//         case 3: {
//           for (const hijo of hijos) {
//             const h = hijo as HTMLElement;
//             h.classList.remove("inmediato");
//             if (h.classList.contains("underline")) {
//               h.classList.remove("arrowend-first-ul");
//             } else {
//               h.classList.remove("arrowend-first");
//             }
//           }
//           window.banderaFlechaInicial = 0;
//           break;
//         }
//       }

//       const long = DOM.contenedorNodos.childElementCount;
//       const strElem = DOM.str as HTMLElement;
//       const contenedorElem = DOM.contenedorNodos as HTMLElement;
      
//       let flecha_puntero_inicial_left = 0;
//       let flecha_puntero_inicial_width = 0;
//       let angulo = 0;

//       // 💥 DEFINIMOS LAS COORDENADAS BASE COMO MANDABA TU VANILLA
//       let x1 = 0;
//       let x2 = 0;

//       switch (long) {
//         case 0: {
//           flecha_puntero_inicial_left = strElem.offsetLeft + strElem.offsetWidth + 5;
//           flecha_puntero_inicial_width = contenedorElem.offsetWidth - 2 * (strElem.offsetLeft + strElem.offsetWidth) - strElem.offsetWidth / 2;
//           break;
//         }
//         default: {
//           const primerNodo = contenedorElem.firstElementChild as HTMLElement | null;
//           if (!primerNodo) return;

//           // Asignación idéntica a tu JS clásico
//           x2 = s2 === undefined ? primerNodo.offsetLeft : s2;
//           x1 = strElem.offsetLeft + strElem.offsetWidth + 5;
          
//           flecha_puntero_inicial_left = x1;
//           flecha_puntero_inicial_width = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(100, 2));
          
//           const y2 = primerNodo.offsetTop + primerNodo.offsetHeight / 2;
//           const y1 = strElem.offsetTop + strElem.offsetHeight - 7.5;
          
//           angulo = (Math.asin((y2 - y1) / flecha_puntero_inicial_width) * 180) / Math.PI;
//           root.style.setProperty('--rotation-angle-fpi', `${angulo}deg`);
//           root.style.setProperty('--punta-flecha-inicial-top', `0`);
//           break;
//         }
//       }

//       // 💥 REPARACIÓN DE LA LÍNEA AFECTADA: Usamos los valores planos puros
//       let distancia_horizontal = 0;
//       if (angulo !== 0) {
//         distancia_horizontal = x2 - x1; // Fiel reflejo de tu condicional original
//       } else {
//         distancia_horizontal = flecha_puntero_inicial_width;
//       }

//       root.style.setProperty('--linea-flecha-inicial-width', `${flecha_puntero_inicial_width}px`);
//       root.style.setProperty('--punta-flecha-inicial-left', `${flecha_puntero_inicial_left + distancia_horizontal}px`);
//       root.style.setProperty('--linea-flecha-inicial-left', `${flecha_puntero_inicial_left}px`);
//       break;
//     }
//     case false: {
//       root.style.setProperty('--linea-flecha-inicial-width', `0px`);
//       root.style.setProperty('--punta-flecha-inicial-width', `0px`);
//       window.banderaFlechaInicial = 0;
//       for (const hijo of hijos) {
//         const h = hijo as HTMLElement;
//         h.classList.remove("inmediato");
//         if (h.classList.contains("underline")) {
//           h.classList.add("arrowend-first-ul");
//         } else {
//           h.classList.add("arrowend-first");
//         }
//       }
//       break;
//     }
//   }
// }


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
                 console.log("S2 es:"+x2);
                 console.log("str.offsetLeft es es: "+str.offsetLeft);
                 console.log("str.offsetWidth es es: "+str.offsetWidth);         
                 
                 
          var x1 = str.offsetLeft + str.offsetWidth + 5;
          var flecha_puntero_inicial_left = x1;

          var flecha_puntero_inicial_width = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(100, 2));

                  console.log("flecha_puntero_inicial_width es: "+flecha_puntero_inicial_width);
                  console.log("str.offsetHeight es:"+str.offsetHeight);
                  console.log("str.offsetTop es:"+str.offsetTop);

          var angulo = (Math.asin((((firstChild.offsetTop + firstChild.offsetHeight / 2) - (str.offsetTop + str.offsetHeight - 7.5)) / flecha_puntero_inicial_width)) * 180 / Math.PI);
          console.log("En angulo es: "+angulo);
          root.style.setProperty('--rotation-angle-fpi', `${angulo}deg`);
          root.style.setProperty('--punta-flecha-inicial-top', `0`);
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
      if (s2 === undefined) {
        const cantidadNodos = contenedorElem.childElementCount;
        s2_f = (contenedorElem.offsetWidth - cantidadNodos * lastChild.offsetWidth) / (cantidadNodos + 1);
      } else {
        s2_f = s2;
      }

      const x2 = contenedorElem.offsetWidth - (s2_f + (lastChild.offsetWidth / 4));
      const firstChild = contenedorElem.firstElementChild as HTMLElement | null;
      if (!firstChild) return;

      const y1 = (firstChild.offsetTop + firstChild.offsetHeight / 2) - (nuloElem.offsetTop + nuloElem.offsetHeight);
      const flecha_puntero_final_width = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1, 2));
      const angulo = -(Math.asin(y1 / flecha_puntero_final_width) * 180 / Math.PI);

      root.style.setProperty('--rotation-angle-fpf', `${angulo}deg`);
      root.style.setProperty('--linea-flecha-final-width', `${flecha_puntero_final_width}px`);
      root.style.setProperty('--linea-flecha-final-left', `${x2}px`);
      root.style.setProperty('--punta-flecha-final-left', `${x1}px`);
      root.style.setProperty('--punta-flecha-final-width', `20px`);

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