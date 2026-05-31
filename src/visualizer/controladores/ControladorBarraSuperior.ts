
// // src/visualizer/controladores/ControladorBarraSuperior.js

// import { agregarNodoAlComienzo, agregarNodoAlFinal, agregarPrimerNodo } from "./RenderAgregarNuevoNodo.ts";
// import { inicializarPuntero, setFlechaInicial, setFlechaFinal } from "./ControladorInicializador.ts";
// import { setFlechasNodos } from "./RenderFlechasNodos.ts";

// // shared flags (you were already using these on window)
// window.banderaFlechaInicial = 0;
// window.banderaFlechaFinal = 0;
// window.banderaFlecha = 0;

// // Export the initializer only. It must be called AFTER the React components are mounted.
// export function initControladorBarraSuperior() {
//   // query DOM *here*, not at module top-level
//   const inic = document.getElementById("inicializar") as HTMLButtonElement;
//   const texto = document.getElementById("texto") as HTMLElement;
//   const input = document.getElementById("nodo") as HTMLInputElement;

//   const agregarPrimero = document.getElementById("agregar_1er_nodo") as HTMLButtonElement;
//   const agregarComienzo = document.getElementById("agregar_comienzo") as HTMLButtonElement;
//   const agregarFinal = document.getElementById("agregar_final") as HTMLButtonElement;

//   const contenedor_nodos = document.getElementById("contenedor_nodos") as HTMLDivElement;
//   const contenedor_flechas = document.getElementById("contenedor_flechas");

//   const str = document.getElementById("str") as HTMLDivElement;
//   const nulo = document.getElementById("nulo") as HTMLDivElement;

//   const flecha_puntero_inicial = document.getElementById("flecha_puntero_inicial");
//   const flecha_puntero_final = document.getElementById("flecha_puntero_final");
//   const flecha_puntero_actual = document.getElementById("flecha_puntero_actual");

//   // sanity check — if any required element is missing, stop and show an error
//   if (!inic || !agregarPrimero || !agregarComienzo || !agregarFinal || !flecha_puntero_inicial || !contenedor_nodos) {
//     console.error("ControladorBarraSuperior: required DOM elements not found. Make sure Buttons and ContainersWrapper are mounted before calling initControladorBarraSuperior().");
//     // You can return false or throw if you want a hard failure
//     return;
//   }

//   // local helper functions (use these so they capture the element refs above)
//   function inicializar() {
//     // show/hide UI exactly as before but using local refs
//     inic.setAttribute("hidden", "hidden");
//     texto.removeAttribute("hidden");
//     input.removeAttribute("hidden");
//     agregarPrimero.removeAttribute("hidden");

//     str.removeAttribute("hidden");
//     nulo.removeAttribute("hidden");

//     inicializarPuntero(1);

//     // You said you don't want timers, but your original code had a small timeout
//     // to let replacer/clone work — keep it minimal (100ms) if necessary.
//     setTimeout(() => {
//       setFlechaInicial(true, 1);
//     }, 100);
//   }

//   function renderizar() {
//     // this uses the elements we just captured
//     const nodos = contenedor_nodos.children;
//     const flechas = contenedor_flechas ? contenedor_flechas.children : [];

//     let necesitaTransicion = 0;
//     if (flecha_puntero_inicial && flecha_puntero_inicial.childElementCount !== 0) necesitaTransicion = 0;
//     // if str visible
//     if (str && str.getAttribute("hidden") !== "hidden") setFlechaInicial(true, necesitaTransicion);
//     if (nodos.length !== 0) setFlechaFinal(true, necesitaTransicion);
//     if (flechas.length !== 0) setFlechasNodos(necesitaTransicion);
//   }

//   // attach event listeners now that we have the elements
//   inic.addEventListener("click", inicializar);
//   agregarPrimero.addEventListener("click", agregarPrimerNodo);
//   agregarComienzo.addEventListener("click", agregarNodoAlComienzo);
//   agregarFinal.addEventListener("click", agregarNodoAlFinal);

//   window.addEventListener("resize", renderizar);

//   console.log("✅ ControladorBarraSuperior initialized");
// }









// import { 
//   agregarNodoAlComienzo, 
//   agregarNodoIntermedio, 
//   agregarNodoAlFinal, 
//   agregarPrimerNodo 
// } from "./RenderAgregarNuevoNodo.ts";
// import { inicializarPuntero, setFlechaInicial, setFlechaFinal } from "./ControladorInicializador.ts";
// // import { setFlechasNodos } from "./RenderFlechasNodos.ts";
// import * as DOM from "../elementosDOM.ts"; // Importamos todo el objeto DOM

// const root = document.documentElement;

// // 1. Declaramos las extensiones de la interfaz Window para que TS no chille
// declare global {
//   interface Window {
//     banderaFlechaInicial: number;
//     banderaFlechaFinal: number;
//     banderaFlecha: number;
//   }
// }

// // Inicializamos las banderas en el objeto global de forma segura
// window.banderaFlechaInicial = 0;
// window.banderaFlechaFinal = 0;
// window.banderaFlecha = 0;

// /**
//  * Función que despierta el controlador una vez que React montó los elementos.
//  * Esta es la función que llamás en el useEffect de tu View de React.
//  */
// export function initControladorBarraSuperior(): void {
//   if (!DOM.verificarDOM()) return;

//   // Asignamos los listeners de forma segura quitando las llamadas mágicas de la raíz
//   DOM.inic.addEventListener("click", inicializar);
//   DOM.botonAgregar1erNodo.addEventListener("click", agregarPrimerNodo);
//   DOM.agregarComienzo.addEventListener("click", agregarNodoAlComienzo);
//   DOM.agregarIntermedio.addEventListener("click", agregarNodoIntermedio);
//   DOM.agregarFinal.addEventListener("click", agregarNodoAlFinal);
//   window.addEventListener("resize", renderizar);
// }

// function inicializar(): void {
//   if (!DOM.verificarDOM()) return;

//   // Remoción e interactividad con chequeos estrictos de existencia
//   if (DOM.inic && DOM.barraSuperior) {
//     DOM.barraSuperior.removeChild(DOM.inic);
//   }
//   console.log("entró a inicializar");
//   DOM.inic.setAttribute("hidden","hidden");
//   DOM.texto.removeAttribute("hidden");
//   DOM.inputNodo.removeAttribute("hidden");
//   DOM.botonAgregar1erNodo.removeAttribute("hidden");
//   DOM.str.removeAttribute("hidden");
//   DOM.nulo.removeAttribute("hidden");

//   inicializarPuntero(1);

//   const necesitaTransicion = 1;
//   setTimeout(() => {
//     setFlechaInicial(true, necesitaTransicion);
//   }, 100);
// }

// function setContainer(): void {
//   if (!DOM.verificarDOM() || !DOM.contenedorNodos) return;

//   const x = window.innerWidth;
//   const y = root.style.getPropertyValue('--principal-height');
//   const menorSeisNodos = DOM.contenedorNodos.childElementCount < 6;

//   if (menorSeisNodos) {
//     if (x < 500) {
//       if (y !== '250px') {
//         root.style.setProperty('--principal-width', `1000px`);
//         root.style.setProperty('--principal-height', `250px`);
//       }
//     } else {
//       if (y !== '400px') {
//         root.style.setProperty('--principal-width', `100%`);
//         root.style.setProperty('--principal-height', `400px`);
//       }
//     }
//   }
// }

// function renderizar(): void {
//   if (!DOM.verificarDOM() || !DOM.principalWrapper || !DOM.contenedorNodos || !DOM.flechaPunteroInicial || !DOM.str) return;

//   const estiloWrapper = DOM.principalWrapper.getAttribute("style");
  
//   if (estiloWrapper === null || estiloWrapper === '') {
//     setContainer();
    
//     let necesitaTransicion = 1; // Default
//     if (DOM.flechaPunteroInicial.childElementCount !== 0) {
//       necesitaTransicion = 0;
//     }

//     if (DOM.str.getAttribute("hidden") !== "hidden") {
//       setFlechaInicial(true, necesitaTransicion);
//     }
    
//     if (DOM.contenedorNodos.children.length !== 0) {
//       setFlechaFinal(true, necesitaTransicion);
//       // setFlechasNodos(necesitaTransicion);
//     }
//   }
// }

// export { renderizar };





// // src/visualizer/controladores/ControladorBarraSuperior.ts
// import { 
//   agregarNodoAlComienzo, 
//   agregarNodoIntermedio, 
//   agregarNodoAlFinal, 
//   agregarPrimerNodo 
// } from "./RenderAgregarNuevoNodo.ts";
// import { inicializarPuntero, setFlechaInicial, setFlechaFinal } from "./ControladorInicializador.ts";
// import * as DOM from "../elementosDOM.ts";

// const root = document.documentElement;

// declare global {
//   interface Window {
//     banderaFlechaInicial: number;
//     banderaFlechaFinal: number;
//     banderaFlecha: number;
//   }
// }

// window.banderaFlechaInicial = 0;
// window.banderaFlechaFinal = 0;
// window.banderaFlecha = 0;

// /**
//  * Función que despierta el controlador una vez que React montó los elementos.
//  */
// export function initControladorBarraSuperior(): void {
//   // Ahora verificarDOM() dará TRUE porque se ejecuta DENTRO del useEffect (DOM ya montado)
//   if (!DOM.verificarDOM()) {
//     console.error("No se pudo inicializar la barra superior: Elementos del DOM ausentes.");
//     return;
//   }

//   // Obtenemos los elementos reales mediante las funciones reactivas
//   DOM.getInic()?.addEventListener("click", inicializar);
//   DOM.getBotonAgregar1erNodo()?.addEventListener("click", agregarPrimerNodo);
//   DOM.getAgregarComienzo()?.addEventListener("click", agregarNodoAlComienzo);
//   DOM.getAgregarIntermedio()?.addEventListener("click", agregarNodoIntermedio);
//   DOM.getAgregarFinal()?.addEventListener("click", agregarNodoAlFinal);
  
//   window.addEventListener("resize", renderizar);
//   console.log("✅ ControladorBarraSuperior asignado correctamente.");
// }

// function inicializar(): void {
//   if (!DOM.verificarDOM()) return;

//   const inic = DOM.getInic();
//   const barra = DOM.getBarraSuperior();

//   console.log("¡Entró a inicializar con éxito!");

//   // Si querías removerlo físicamente:
//   if (inic && barra) {
//     barra.removeChild(inic);
//   }

//   // Ocultamos y mostramos usando los getters de forma segura
//   inic?.setAttribute("hidden", "hidden");
//   DOM.getTexto()?.removeAttribute("hidden");
//   DOM.getInputNodo()?.removeAttribute("hidden");
//   DOM.getBotonAgregar1erNodo()?.removeAttribute("hidden");
//   DOM.getStr()?.removeAttribute("hidden");
//   DOM.getNulo()?.removeAttribute("hidden");

//   inicializarPuntero(1);

//   const necesitaTransicion = 1;
//   setTimeout(() => {
//     setFlechaInicial(true, necesitaTransicion);
//   }, 100);
// }

// function setContainer(): void {
//   const contenedorNodos = DOM.getContenedorNodos();
//   if (!contenedorNodos) return;

//   const x = window.innerWidth;
//   const y = root.style.getPropertyValue('--principal-height');
//   const menorSeisNodos = contenedorNodos.childElementCount < 6;

//   if (menorSeisNodos) {
//     if (x < 500) {
//       if (y !== '250px') {
//         root.style.setProperty('--principal-width', `1000px`);
//         root.style.setProperty('--principal-height', `250px`);
//       }
//     } else {
//       if (y !== '400px') {
//         root.style.setProperty('--principal-width', `100%`);
//         root.style.setProperty('--principal-height', `400px`);
//       }
//     }
//   }
// }

// function renderizar(): void {
//   if (!DOM.verificarDOM()) return;

//   const principalWrapper = DOM.getPrincipalWrapper();
//   const flechaPunteroInicial = DOM.getFlechaPunteroInicial();
//   const str = DOM.getStr();
//   const contenedorNodos = DOM.getContenedorNodos();

//   if (!principalWrapper || !flechaPunteroInicial || !str || !contenedorNodos) return;

//   const estiloWrapper = principalWrapper.getAttribute("style");
  
//   if (estiloWrapper === null || estiloWrapper === '') {
//     setContainer();
    
//     let necesitaTransicion = 1;
//     if (flechaPunteroInicial.childElementCount !== 0) {
//       necesitaTransicion = 0;
//     }

//     if (str.getAttribute("hidden") !== "hidden") {
//       setFlechaInicial(true, necesitaTransicion);
//     }
    
//     if (contenedorNodos.children.length !== 0) {
//       setFlechaFinal(true, necesitaTransicion);
//     }
//   }
// }

// export { renderizar };




// src/visualizer/controladores/ControladorBarraSuperior.ts
import { 
  agregarNodoAlComienzo, 
  agregarNodoIntermedio, 
  agregarNodoAlFinal, 
  agregarPrimerNodo 
} from "./RenderAgregarNuevoNodo.ts";
import { inicializarPuntero, setFlechaInicial, setFlechaFinal } from "./ControladorInicializador.ts";
import * as DOM from "../elementosDOM.ts";

const root = document.documentElement;

declare global {
  interface Window {
    banderaFlechaInicial: number;
    banderaFlechaFinal: number;
    banderaFlecha: number;
  }
}

window.banderaFlechaInicial = 0;
window.banderaFlechaFinal = 0;
window.banderaFlecha = 0;

/**
 * Función que despierta el controlador una vez que React montó los elementos.
 */
export function initControladorBarraSuperior(): void {
  // 1. Primero forzamos la captura de elementos reales del DOM
  DOM.actualizarElementosDOM();

  // 2. Validamos que todo se haya cargado bien
  if (!DOM.verificarDOM()) {
    console.error("No se pudo inicializar la barra superior: Elementos del DOM ausentes.");
    return;
  }

  // 3. Asignamos listeners con nombres normales directos sin funciones intermedias
  DOM.inic.addEventListener("click", inicializar);
  DOM.botonAgregar1erNodo.addEventListener("click", agregarPrimerNodo);
  DOM.agregarComienzo.addEventListener("click", agregarNodoAlComienzo);
  DOM.agregarIntermedio.addEventListener("click", agregarNodoIntermedio);
  DOM.agregarFinal.addEventListener("click", agregarNodoAlFinal);
  
  window.addEventListener("resize", renderizar);
  console.log("✅ ControladorBarraSuperior asignado correctamente.");
}

function inicializar(): void {
  if (!DOM.verificarDOM()) return;

  console.log("¡Entró a inicializar con éxito!");

  // Remoción física usando variables planas
  if (DOM.inic && DOM.barraSuperior) {
    DOM.barraSuperior.removeChild(DOM.inic);
  }

  // Modificación de estados con nombres limpios
  DOM.inic.setAttribute("hidden", "hidden");
  DOM.texto.removeAttribute("hidden");
  DOM.inputNodo.removeAttribute("hidden");
  DOM.botonAgregar1erNodo.removeAttribute("hidden");
  DOM.str.removeAttribute("hidden");
  DOM.nulo.removeAttribute("hidden");

  inicializarPuntero(1);

  const necesitaTransicion = 1;
  setTimeout(() => {
    setFlechaInicial(true, necesitaTransicion);
  }, 100);
}

function setContainer(): void {
  if (!DOM.contenedorNodos) return;

  const x = window.innerWidth;
  const y = root.style.getPropertyValue('--principal-height');
  const menorSeisNodos = DOM.contenedorNodos.childElementCount < 6;

  if (menorSeisNodos) {
    if (x < 500) {
      if (y !== '250px') {
        root.style.setProperty('--principal-width', `1000px`);
        root.style.setProperty('--principal-height', `250px`);
      }
    } else {
      if (y !== '400px') {
        root.style.setProperty('--principal-width', `100%`);
        root.style.setProperty('--principal-height', `400px`);
      }
    }
  }
}

function renderizar(): void {
  if (!DOM.verificarDOM()) return;

  if (!DOM.principalWrapper || !DOM.flechaPunteroInicial || !DOM.str || !DOM.contenedorNodos) return;

  const estiloWrapper = DOM.principalWrapper.getAttribute("style");
  
  if (estiloWrapper === null || estiloWrapper === '') {
    setContainer();
    
    let necesitaTransicion = 1;
    if (DOM.flechaPunteroInicial.childElementCount !== 0) {
      necesitaTransicion = 0;
    }

    if (DOM.str.getAttribute("hidden") !== "hidden") {
      setFlechaInicial(true, necesitaTransicion);
    }
    
    if (DOM.contenedorNodos.children.length !== 0) {
      setFlechaFinal(true, necesitaTransicion);
    }
  }
}

export { renderizar };