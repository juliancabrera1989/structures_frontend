import { setFlechasNodos, setFlechasNodos2, RolCurva, setFlechasNodosDefinitiva } from "./RenderFlechasNodos.ts";
import { agregarNodo, agregarNodoN,  getNodos } from "../contenedores/ContenedorNodos.ts";
import { agregarFlecha, agregarFlechaN, getFlechas } from "../contenedores/ContenedorFlechas.ts";
import { inicializarPuntero, setPuntero, setFlechaInicial, setFlechaFinal } from "./ControladorInicializador.ts";
import { renderizar , estructuraActiva } from "./ControladorBarraSuperior.ts";
import { animarPath, animarPuntaAzul, crearFlechaCurvaInterfila } from "../elementosGraficos/FlechaCurva.ts";
import { obtenerInfoLayout, getCantidadNodosFila } from "../utils/layoutHelpers.ts";
import { esperar, esperarTransicion } from "../utils/asyncUtils.ts";

import * as DOM from "../utils/elementosDOM.ts";


const root = document.documentElement;
let necesitaTransicion: number;
let s1: number;
let s2: number;

// Tipamos correctamente el manejador de eventos global para congelar la pantalla
function handler(e: Event): void {
  e.stopPropagation();
  e.preventDefault();
}



function crearSaltoFlex(): HTMLDivElement {
  const salto = document.createElement("div");
  salto.className = "salto-flex";
  return salto;
}




// function agregarPrimerNodo(): void {
//   if (!DOM.verificarDOM()) return;

//   const nodos = getNodos() as HTMLDivElement[];
//   const ancho = DOM.principal.offsetWidth;
//   DOM.principalWrapper.style.maxWidth = `${ancho}px`;
//   DOM.principalWrapper.style.minWidth = `${ancho}px`;

//   if (root.style.getPropertyValue("--principal-height") === '50vw') {
//     const altura = DOM.principal.offsetHeight;
//     root.style.setProperty("--principal-height", `${altura}px`);
//   }

//   document.addEventListener("click", handler, true);
//   DOM.botonAgregar1erNodo.setAttribute("hidden", "hidden");

//   // Agrega el nodo físico al contenedor
//   agregarNodo(DOM.inputNodo.value, 0);
//   inicializarPuntero(0);

//   const inicialUl = DOM.inicialUl();
//   const inicialLs = DOM.inicialLs();
//   const inicialLi = DOM.inicialLi();
//   const finalUl = DOM.finalUl();

//   inicialUl?.classList.remove("flecha_puntero__lista-vacia", "inmediato");
//   inicialLs?.classList.remove("inmediato");
//   inicialLi?.classList.remove("inmediato");

//   DOM.agregarComienzo.removeAttribute("hidden");
//   DOM.agregarComienzo.disabled = true;
//   DOM.agregarFinal.removeAttribute("hidden");
//   DOM.agregarFinal.disabled = true;

//   // -------------------------------------------------------------
//   // PASO 1: Inclinar / Desplazar puntero arriba (setPuntero 1)
//   // -------------------------------------------------------------
//   setTimeout(() => {
//     setPuntero(1);

//     // -------------------------------------------------------------
//     // PASO 2: Hacer visible el primer nodo (opacity 1)
//     // -------------------------------------------------------------
//     setTimeout(() => {
//       const primerNodo = nodos[0] || (DOM.contenedorNodos.firstElementChild as HTMLElement);

//       if (primerNodo) {
//         primerNodo.style.opacity = "1";

//         primerNodo.addEventListener("transitionend", function fAparecerNodo(e) {
//           if (e.target !== primerNodo) return;
//           primerNodo.removeEventListener("transitionend", fAparecerNodo);

//           // -------------------------------------------------------------
//           // PASO 3: Contraer la flecha inicial recta a 0px
//           // -------------------------------------------------------------
//           root.style.setProperty('--linea-flecha-inicial-transform-origin', `left`);
//           root.style.setProperty('--linea-flecha-inicial-width', `0px`);
//           root.style.setProperty('--punta-flecha-inicial-width', `0px`);

//           inicialUl?.classList.add("arrowend-first-ul");
//           inicialLs?.classList.add("arrowend-first");
//           inicialLi?.classList.add("arrowend-first");

//           if (inicialUl) {
//             inicialUl.addEventListener("transitionend", function fContraerFlechaRecta(e) {
//               if (e.target !== inicialUl) return;
//               inicialUl.removeEventListener("transitionend", fContraerFlechaRecta);

//               inicialUl.classList.remove("arrowend-first-ul");
//               inicialLs?.classList.remove("arrowend-first");
//               inicialLi?.classList.remove("arrowend-first");

//               // -------------------------------------------------------------
//               // PASO 4: Activar las flechas diagonales del 1er nodo
//               // -------------------------------------------------------------
//               necesitaTransicion = 1;
//               window.banderaFlechaInicial = 0;

//               setFlechaInicial(true, necesitaTransicion);
//               setFlechaFinal(true, necesitaTransicion);

//               if (finalUl) {
//                 finalUl.addEventListener("transitionend", function fFlechasDiagonalesListas(e) {
//                   if (e.target !== finalUl) return;
//                   finalUl.removeEventListener("transitionend", fFlechasDiagonalesListas);

//                   finalUl.classList.remove("flecha_puntero__lista-vacia");
//                   document.removeEventListener("click", handler, true);

//                   // -------------------------------------------------------------
//                   // PASO 5: Limpieza de estilos de inicializador y reacomodo CSS
//                   // -------------------------------------------------------------
//                   DOM.inicializador.removeAttribute("style");
//                   DOM.str.removeAttribute("style");
//                   DOM.nulo.removeAttribute("style");

//                   DOM.str.classList.add("inmediato_reacomodo");
//                   DOM.nulo.classList.add("inmediato_reacomodo");

//                   root.style.setProperty('--nulo-left', `${100 - (3 + (DOM.nulo.offsetWidth / DOM.principal.offsetWidth) * 100)}%`);
//                   root.style.setProperty('--str-top', `${100 - DOM.str.offsetHeight / 2}px`);
//                   root.style.setProperty('--nulo-top', `${100 - DOM.nulo.offsetHeight / 2}px`);
//                   root.style.setProperty('--linea-flecha-inicial-top', `${DOM.str.offsetTop + DOM.str.offsetHeight / 2}px`);
//                   root.style.setProperty('--punta-flecha-inicial-top', `${DOM.principal.offsetHeight / 2 - 2.5}px`);
//                   root.style.setProperty('--linea-flecha-final-top', `${DOM.principal.offsetHeight / 2 - 2.5}px`);
//                   root.style.setProperty('--punta-flecha-final-top', `${DOM.nulo.offsetTop + DOM.nulo.offsetHeight}px`);

//                   DOM.agregarComienzo.disabled = false;
//                   DOM.agregarFinal.disabled = false;

//                   setTimeout(() => {
//                     DOM.str.classList.remove("inmediato_reacomodo");
//                     DOM.nulo.classList.remove("inmediato_reacomodo");
//                     inicialUl?.classList.remove("cambio_top");

//                     if (window.innerWidth !== (DOM.principalWrapper.offsetWidth + 33)) {
//                       DOM.principalWrapper.removeAttribute("style");
//                       renderizar();
//                       setFlechaInicial(true, 0);
//                       setFlechaFinal(true, 0);
//                     } else {
//                       DOM.principalWrapper.removeAttribute("style");
//                     }
//                   }, 100);

//                 });
//               }
//             });
//           }
//         });
//       }
//     }, 900);
//   }, 100);
// }

// function prepararEstructuraInicial(): void {
//   const ancho = DOM.principal.offsetWidth;
//   DOM.principalWrapper.style.maxWidth = `${ancho}px`;
//   DOM.principalWrapper.style.minWidth = `${ancho}px`;

//   if (root.style.getPropertyValue("--principal-height") === '50vw') {
//     const altura = DOM.principal.offsetHeight;
//     root.style.setProperty("--principal-height", `${altura}px`);
//   }

//   document.addEventListener("click", handler, true);
//   // DOM.botonAgregar1erNodo.setAttribute("hidden", "hidden");

//   // Agrega el nodo físico al contenedor
//   agregarNodo(DOM.inputNodo.value, 0);
//   inicializarPuntero(0);

//   const inicialUl = DOM.inicialUl();
//   const inicialLs = DOM.inicialLs();
//   const inicialLi = DOM.inicialLi();

//   inicialUl?.classList.remove("flecha_puntero__lista-vacia", "inmediato");
//   inicialLs?.classList.remove("inmediato");
//   inicialLi?.classList.remove("inmediato");

//   // DOM.agregarComienzo.removeAttribute("hidden");
//   // // DOM.agregarComienzo.disabled = true;
//   // DOM.agregarFinal.removeAttribute("hidden");
//   // // DOM.agregarFinal.disabled = true;

//   // bloquearInterfaz();
// }

function prepararEstructuraInicial(): void {
  const ancho = DOM.principal.offsetWidth;
  DOM.principalWrapper.style.maxWidth = `${ancho}px`;
  DOM.principalWrapper.style.minWidth = `${ancho}px`;

  if (root.style.getPropertyValue("--principal-height") === '50vw') {
    const altura = DOM.principal.offsetHeight;
    root.style.setProperty("--principal-height", `${altura}px`);
  }

  document.addEventListener("click", handler, true);

  // 🛑 REVISIÓN EN VANILLA TS:
  // Si la estructura ya tiene el nodo creado en el DOM, solo actualizamos el puntero.
  // Si no está, lo agregamos.
  const nodos = getNodos();
  if (nodos.length === 0) {
    agregarNodo(DOM.inputNodo.value, 0);
  }

  inicializarPuntero(0);

  const inicialUl = DOM.inicialUl();
  const inicialLs = DOM.inicialLs();
  const inicialLi = DOM.inicialLi();

  inicialUl?.classList.remove("flecha_puntero__lista-vacia", "inmediato");
  inicialLs?.classList.remove("inmediato");
  inicialLi?.classList.remove("inmediato");
}


async function paso1_MoverPuntero(): Promise<void> {
  await esperar(100);
  setPuntero(1);
}

// Paso 2: Aparecer el primer nodo
async function paso2_AparecerNodo(nodo: HTMLElement | null): Promise<void> {
  await esperar(900);
  if (nodo) {
    nodo.style.opacity = "1";
    await esperarTransicion(nodo);
  }
}

// Paso 3: Contraer la flecha inicial recta
async function paso3_ContraerFlechaRecta(
  inicialUl: HTMLElement | null,
  inicialLs: HTMLElement | null,
  inicialLi: HTMLElement | null
): Promise<void> {
  root.style.setProperty('--linea-flecha-inicial-transform-origin', 'left');
  root.style.setProperty('--linea-flecha-inicial-width', '0px');
  root.style.setProperty('--punta-flecha-inicial-width', '0px');

  inicialUl?.classList.add("arrowend-first-ul");
  inicialLs?.classList.add("arrowend-first");
  inicialLi?.classList.add("arrowend-first");

  await esperarTransicion(inicialUl);

  inicialUl?.classList.remove("arrowend-first-ul");
  inicialLs?.classList.remove("arrowend-first");
  inicialLi?.classList.remove("arrowend-first");
}

// Paso 4: Activar flechas diagonales
async function paso4_ActivarFlechasDiagonales(finalUl: HTMLElement | null): Promise<void> {
  necesitaTransicion = 1;
  window.banderaFlechaInicial = 0;

  setFlechaInicial(true, necesitaTransicion);
  setFlechaFinal(true, necesitaTransicion);

  await esperarTransicion(finalUl);
}

// Paso 5: Reacomodar CSS y limpiar interfaz
async function paso5_ReacomodarYLimpiar(
  finalUl: HTMLElement | null,
  inicialUl: HTMLElement | null
): Promise<void> {
  finalUl?.classList.remove("flecha_puntero__lista-vacia");
  document.removeEventListener("click", handler, true);

  DOM.inicializador.removeAttribute("style");
  DOM.str.removeAttribute("style");
  DOM.nulo.removeAttribute("style");

  void DOM.principal.offsetHeight; // Reflow

  DOM.str.classList.add("inmediato_reacomodo");
  DOM.nulo.classList.add("inmediato_reacomodo");

  root.style.setProperty('--nulo-left', `${100 - (3 + (DOM.nulo.offsetWidth / DOM.principal.offsetWidth) * 100)}%`);
  root.style.setProperty('--str-top', `${100 - DOM.str.offsetHeight / 2}px`);
  root.style.setProperty('--nulo-top', `${100 - DOM.nulo.offsetHeight / 2}px`);
  root.style.setProperty('--linea-flecha-inicial-top', `${DOM.str.offsetTop + DOM.str.offsetHeight / 2}px`);
  root.style.setProperty('--punta-flecha-inicial-top', `${DOM.principal.offsetHeight / 2 - 2.5}px`);
  root.style.setProperty('--linea-flecha-final-top', `${DOM.principal.offsetHeight / 2 - 2.5}px`);
  root.style.setProperty('--punta-flecha-final-top', `${DOM.nulo.offsetTop + DOM.nulo.offsetHeight}px`);

  // DOM.agregarComienzo.disabled = false;
  // DOM.agregarFinal.disabled = false;
  // liberarInterfaz();

  await esperar(100);
  DOM.str.classList.remove("inmediato_reacomodo");
  DOM.nulo.classList.remove("inmediato_reacomodo");
  inicialUl?.classList.remove("cambio_top");


  if (window.innerWidth !== (DOM.principalWrapper.offsetWidth + 33)) {
    DOM.principalWrapper.removeAttribute("style");
    renderizar();
    setFlechaInicial(true, 0);
    setFlechaFinal(true, 0);
  } else {
    DOM.principalWrapper.removeAttribute("style");
  }
}



 async function agregarPrimerNodo(): Promise<void> {
  if (!DOM.verificarDOM()) return;

  prepararEstructuraInicial(); // Seteos iniciales de dimensiones y DOM

  const nodos = getNodos() as HTMLDivElement[];
  const primerNodo = nodos[0] || (DOM.contenedorNodos.firstElementChild as HTMLElement);
  const inicialUl = DOM.inicialUl();
  const inicialLs = DOM.inicialLs();
  const inicialLi = DOM.inicialLi();
  const finalUl = DOM.finalUl();

  // === SECUENCIA DE PASOS ORDENADOS ===
  await paso1_MoverPuntero();
  await paso2_AparecerNodo(primerNodo);
  await paso3_ContraerFlechaRecta(inicialUl, inicialLs, inicialLi);
  await paso4_ActivarFlechasDiagonales(finalUl);
  await paso5_ReacomodarYLimpiar(finalUl, inicialUl);

  actualizarSelectoresIntermedios();

  document.dispatchEvent(new CustomEvent("animacion_nodo_completada"));
}






// function agregarNodoAlComienzo(): void {
//   if (!DOM.verificarDOM()) return;

//   const nodos = getNodos() as HTMLElement[];
//   const ultimoNodo = DOM.contenedorNodos.lastElementChild as HTMLElement | null;
//   if (!ultimoNodo) return;

//   document.addEventListener("click", handler, true);
//   DOM.agregarComienzo.disabled = true;
//   DOM.agregarFinal.disabled = true;

//   necesitaTransicion = 1;
//   setFlechaInicial(false, necesitaTransicion);

//   const inicialUl = DOM.inicialUl();
//   inicialUl?.addEventListener("transitionend", function nfpi_aC() {
//     inicialUl.removeEventListener("transitionend", nfpi_aC);

//     const M = 5; // Tu límite configurado por fila

//     const layout = obtenerInfoLayout(M);

//     const nodosPrimeraFila = getCantidadNodosFila(layout, 0);

//     if (nodosPrimeraFila < M) {

//       const n = nodosPrimeraFila; // nodos actuales en esta fila

//       const primero = DOM.contenedorNodos.firstElementChild as HTMLElement;
//       // Recalculamos espaciados s1 y s2 para los nodos de la ÚLTIMA fila únicamente
//       const s1 = (DOM.contenedorNodos.offsetWidth - n * primero.offsetWidth) / (n + 1);
//       const s2 = (DOM.contenedorNodos.offsetWidth - (n + 1) * primero.offsetWidth) / (n + 2);
//       console.log("el valor de s1 es: ", s1);
//       console.log("el valor de s2 es: ", s2);
      
//       if (layout.totalFilas === 1) {
//         // Solo si estamos en la Fila 1 ajustamos la flecha del puntero inicial (StrPtr)
//         setFlechaFinal(true, necesitaTransicion, s2);
//         setFlechasNodos(necesitaTransicion, 1, s1, s2);
//       }

//       // Reacomodamos únicamente los nodos de esta última fila
//       setFlechasNodosDefinitiva(necesitaTransicion, 1, s1, s2, "emisor", layout);

//       primero.addEventListener("transitionend", function nald() {
//         agregarNodo(DOM.inputNodo.value, 1);

//         const nuevosNodos = getNodos() as HTMLElement[];

//         for (let i = 1; i < nuevosNodos.length; i++) {
//           nuevosNodos[i].classList.add("no-mover");
//           nuevosNodos[i].style.left = '0px';
//         }

//         const nodoNuevo = nuevosNodos[0];

//         if (nodoNuevo) {
//           setTimeout(() => {
//             nodoNuevo.style.opacity = "1";
//           }, 100);
//         }

//         nodoNuevo.addEventListener("transitionend", function na() {

//           nodoNuevo.removeEventListener("transitionend", na);
//           window.banderaFlechaInicial = 0;
//           setFlechaInicial(true, necesitaTransicion);

//           const inicialLi = DOM.inicialLi();
//           inicialLi?.addEventListener("transitionend", function af() {

//             const esFilaSuperior = layout.totalFilas > 1;
//             const esSegundoNodoDeFila = (nodosPrimeraFila + 1) === 2;

//             console.log("El valor de esFilaSuperior es: ", esFilaSuperior);
//             console.log("El valor de esSegundoNodoDeFila es: ", esSegundoNodoDeFila);
            
//             if (esFilaSuperior && esSegundoNodoDeFila) {
//               DOM.contenedorFlechas?.classList.add("margin-flex");
//               DOM.contenedorFlechas?.firstElementChild?.remove();
//             }

//             // Creación de la nueva flecha (Cae automáticamente debajo del salto-flex si se creó arriba)
//             agregarFlecha(1);

//             const flechasActuales = getFlechas() as HTMLElement[];
//             const primeraFlecha = flechasActuales[0];

//             if (primeraFlecha) {
//               // Únicamente seteamos el margin-top a la nueva flecha si estamos en fila inferior
//               if (esFilaSuperior) {
//                 primeraFlecha.style.setProperty('width', root.style.getPropertyValue("--linea-flecha-width"));
//               }
//             }

//             const ultimoHijoFlecha = primeraFlecha.lastElementChild as HTMLElement | null;

//             ultimoHijoFlecha?.addEventListener("transitionend", function fl() {

//               // Liberación del camino original
//               document.removeEventListener("click", handler, true);
//               DOM.agregarComienzo.disabled = false;
//               DOM.agregarFinal.disabled = false;

//               actualizarSelectoresIntermedios();

//               inicialUl?.classList.remove("no-desplazar");

//               ultimoHijoFlecha.removeEventListener("transitionend", fl);
//             });
//             inicialLi?.removeEventListener("transitionend", af);
//           });

//         });

//         primero.removeEventListener("transitionend", nald);
//       });
//       return;

//       // Rama A: Reacomodamiento Horizontal
//       // Calculas desplazamiento usando layout.nodosUltimaFila y layout.indiceInicioUltimaFila
//     } else {
//       // Rama B: Expansión Vertical (Nueva Fila)
//       // Insertas el `.salto-flex`, abres la fila layout.totalFilas y dibujas la curva inter-row
//       console.log("🔵 FASE 1: Bajada suave del Wrapper y Nodos por transform.");

//       if (DOM.principalWrapper.style.getPropertyValue("max-height") != "" || window.alturaDeVentana != window.innerHeight) {

//         window.alturaDeVentana = window.innerHeight;
//         // 2. Calcular la altura máxima física disponible en el viewport
//         //    (Alto total de ventana - Margen inferior deseado - Distancia desde el techo hasta el wrapper)
//         const maxPermitido = window.alturaDeVentana - 8 - DOM.principalWrapper.offsetTop;

//         // 3. Aplicar el alto deseado (ej: 400, 600, 800...), pero frenado en la altura máxima real
//         const altoDeseado = DOM.principalWrapper.offsetHeight + 200 + 50 * (layout.totalFilas > 1 ? 1 : 0); // El valor que quieras según las filas
//         const altoFinal = Math.min(altoDeseado, maxPermitido);

//         if (altoFinal == maxPermitido)
//           DOM.principalWrapper.style.setProperty('max-height', `${altoFinal}px`);

//         root.style.setProperty('--wrapper-height', `${altoFinal}px`);
//       }

//       const alturaNull = DOM.nulo.offsetTop;
//       DOM.nulo.classList.add("transicion-nulo");
      
//       // 2. Bajada con tu valor corregido de transform
//       const nodosActuales = Array.from(getNodos() as HTMLElement[]);
//       nodosActuales.forEach(nodo => {
//         nodo.classList.remove("inmediato-nodo", "inmediato", "inmediato_reacomodo", "no-mover");
//         nodo.classList.add("transicion-nodos");
//       });

//       const contenedorFlechas = document.getElementById("contenedor_flechas");
//       if (contenedorFlechas) {
//         const flechasExistentes = Array.from(contenedorFlechas.querySelectorAll(".arrow")) as HTMLElement[];

//         flechasExistentes.forEach((flecha) => {
//           // Replicamos la limpieza de tu setFlechasNodos() para permitir la transición suave
//           flecha.classList.remove("no-mover__flecha");

//           const elementosHijos = Array.from(flecha.children) as HTMLElement[];
//           elementosHijos.forEach((elemento) => {
//             elemento.classList.remove("inmediato");
//           });

//           // Ahora sí le aplicamos la animación de bajada
//           flecha.classList.add("transicion-flechas");
//         });
//       }
     
//       const flechasCurvas = DOM.contenedorFlechasCurvas.querySelectorAll(".svg-flecha-interfila");
//       flechasCurvas.forEach((flecha) => {
//         // Replicamos la limpieza de tu setFlechasNodos() para permitir la transición suave
        
//         (flecha as HTMLElement).classList.add("transicion-flechas");
        
//       });
  
//       const flecha_puntero_final = document.getElementById("flecha_puntero_final");
//       if (!flecha_puntero_final) return;
//       const hijos = flecha_puntero_final.children;

//       for (const hijo of hijos) {
//         (hijo as HTMLElement).classList.remove("inmediato");
//         (hijo as HTMLElement).style.transition = "top 2s ease-out";
//       }
      
//       const finalUl = DOM.finalUl();
//       const finalLi = DOM.finalLi();
//       const finalLs = DOM.finalLs();

//       if (finalUl && finalLi && finalLs) {
//         const alturaFUl = finalUl?.offsetTop;
//         const alturaNulo = DOM.nulo.offsetTop;
//         finalUl.style.top = `${alturaFUl + 250}px`;
//         finalLi.style.top = `${alturaNulo + DOM.nulo.offsetHeight + 250}px`;
//         finalLs.style.top = `${alturaNulo + DOM.nulo.offsetHeight + 250}px`;
//       }

//       // =========================================================================
//       // FASE 2: RETENCIÓN (A los 2000ms, clavamos los nodos en el fondo)
//       // =========================================================================
//       setTimeout(() => {
//         console.log("⚡ FASE 2: Retención instantánea en contenedor de una fila.");

//         root.style.setProperty('--principal-height', `${DOM.principal.offsetHeight + 200 + 50 * (layout.totalFilas > 1 ? 1 : 0)}px`);

//         nodosActuales.forEach(nodo => {
//           nodo.classList.remove("transicion-nodos");
//         });

//         const contenedorFlechas = document.getElementById("contenedor_flechas");
//         if (contenedorFlechas) {
//           const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");

//           if (layout.nodosPorFila.get(0)! > 1) {
//             for (let i = 0; i < layout.nodosPorFila.get(0)! - 1; i++) {
//               (flechasExistentes[i] as HTMLElement).classList.remove("transicion-flechas");
//             }
//           }

//           for (let j = layout.nodosPorFila.get(0)! - 1; j! < flechasExistentes.length; j!++) {
//             (flechasExistentes[j!] as HTMLElement).classList.remove("transicion-flechas");
//           }
//         }
        
//         var count = 0;
//         const flechasCurvas = DOM.contenedorFlechasCurvas.querySelectorAll(".svg-flecha-interfila");

//         flechasCurvas.forEach((flecha) => {
//           count++;
//           // Replicamos la limpieza de tu setFlechasNodos() para permitir la transición suave
//           (flecha as HTMLElement).classList.remove("transicion-flechas");
//           // (flecha as HTMLElement).style.setProperty("margin-top", `${250 * count}px`, "important");
//           // (flecha as HTMLElement).style.setProperty("margin-top", `250px`, "important");
//            const alturaFC = (flecha as HTMLElement).style.getPropertyValue("top");
//            console.log("La altura de la flecha curva es: ",alturaFC);
//            (flecha as HTMLElement).style.setProperty("top",`calc(${alturaFC} + 250px)`);
       
//             //  `position: absolute; top: ${minY - PADDING_Y}px; left: ${-PADDING_X}px; width: calc(100% + ${PADDING_X * 2}px); height: ${altoSVG}px; pointer-events: none; z-index: 10; overflow: visible;`
             
//         });

//         const flecha_puntero_final = document.getElementById("flecha_puntero_final");
//         if (!flecha_puntero_final) return;
//         const hijos = flecha_puntero_final.children;

//         for (const hijo of hijos) {
//           (hijo as HTMLElement).removeAttribute("style");
//         }

//         if (DOM.nulo) {
//           const ultimoNodo = DOM.contenedorNodos.lastElementChild;
//           const topUN = (ultimoNodo as HTMLElement).offsetTop;
//           root.style.setProperty('--linea-flecha-final-top', `${DOM.principal.offsetHeight - 150 - 2.5}px`);
//           root.style.setProperty('--nulo-top', `${(alturaNull + 250)}px`);
//           root.style.setProperty('--punta-flecha-final-top', `${(alturaNull + DOM.nulo.offsetHeight / 2 + 250)}px`);
//           DOM.nulo.classList.remove("transicion-nulo");
//         }

//         // =========================================================================
//         // 🛠️ FASE 3: Pasando a modo multi-fila e insertando elementos.
//         // =========================================================================
//         setTimeout(() => {
//           console.log("🛠️ FASE 3: Pasando a modo multi-fila e insertando elementos.");

//           // 1. Convertimos el contenedor a dos filas (Wrap) justo en este frame
//           if (DOM.contenedorNodos) {
//             DOM.contenedorNodos?.classList.add("cambio-flex");
//           }

//           DOM.contenedorFlechas.classList.add("cambio-flex");

//           const saltoDeLineaNodos = crearSaltoFlex();
//           DOM.contenedorNodos.prepend(saltoDeLineaNodos);

//           const saltoDeLineaFlechas = crearSaltoFlex();
//           DOM.contenedorFlechas.insertBefore(saltoDeLineaFlechas, DOM.contenedorFlechas.firstElementChild);

//           const spacer = document.createElement("div");
//           spacer.classList.add("flecha-spacer-fila");
//           DOM.contenedorFlechas.prepend(spacer);

//           // 2. Tu función pura mete el nuevo nodo al principio (índice 0)
//           agregarNodo(DOM.inputNodo.value, 1);

//           const todosLosNodos = Array.from(getNodos() as HTMLElement[]);
//           const nodoNuevo = todosLosNodos[0]; // El recién inyectado arriba

//           // 🔥 Identificamos al nodo que antes estaba primero y ahora bajó a la segunda fila
//           const nodoOrigenReal = todosLosNodos[1];

//           const haySpacer = DOM.contenedorFlechas.querySelectorAll(".flecha-spacer-fila");
//           if (layout.totalFilas >= 2 && haySpacer.length != 0) {
//             DOM.contenedorFlechas?.classList.remove("margin-flex");
//           }

//           DOM.contenedorNodos.classList.add("margin-flex");

//           if (nodoNuevo) {
//             setTimeout(() => {
//               nodoNuevo.style.opacity = "1";
//             }, 100);

//             // 🎯 AGREGADO: Escuchamos el final de la opacidad para disparar la flecha curva
//             nodoNuevo.addEventListener('transitionend', function dispararFlechaCurvaComienzo(e) {
//               if (e.propertyName === 'opacity') {
//                 nodoNuevo.removeEventListener('transitionend', dispararFlechaCurvaComienzo);

//                 const contenedorCurvas = document.getElementById("contenedor_flechas_curvas");
//                 if (!contenedorCurvas) {
//                   document.removeEventListener("click", handler, true);
//                   DOM.agregarComienzo.disabled = false;
//                   DOM.agregarFinal.disabled = false;
//                   return;
//                 }

//                 // Si ambos nodos existen, calculamos la geometría rígida sin deformaciones
//                 if (nodoNuevo && nodoOrigenReal) {
//                   const flechaCurva = crearFlechaCurvaInterfila(nodoNuevo, nodoOrigenReal, DOM.contenedorNodos);
//                   DOM.contenedorFlechasCurvas.prepend(flechaCurva);
//                   const pathCurva = flechaCurva.firstElementChild as SVGPathElement;

//                   const animacionCurva = animarPath(pathCurva!, true);

//                   animacionCurva.onfinish = () => {
//                     // 1. Cuando la curva llega al nodo destino, SALEN las dos líneas azules hacia atrás
//                     const animsPunta = animarPuntaAzul(flechaCurva, true);

//                     // 2. Al terminar de brotar las patitas, cerramos la transición
//                     animsPunta[0].onfinish = () => {

//                       setFlechaInicial(true, necesitaTransicion);

//                       // Liberamos los controles de la UI al terminar la secuencia completa
//                       document.removeEventListener("click", handler, true);
//                       DOM.agregarComienzo.disabled = false;
//                       DOM.agregarFinal.disabled = false;

//                       actualizarSelectoresIntermedios();
//                     };
//                   };
//                 }
//               }
//             });
//           }

//           console.log("🛑 Estructura DOM armada y escuchador de flecha curva activo.");

//         }, 100);
//       }, 2000);

//     }

//   });
// }


 async function agregarNodoAlComienzo(): Promise<void> {
  if (!DOM.verificarDOM()) return;

  const nodos = getNodos() as HTMLElement[];
  const ultimoNodo = DOM.contenedorNodos.lastElementChild as HTMLElement | null;
  if (!ultimoNodo) return;

  document.addEventListener("click", handler, true);
  // DOM.agregarComienzo.disabled = true;
  // DOM.agregarFinal.disabled = true;
  // bloquearInterfaz();

  necesitaTransicion = 1;
  setFlechaInicial(false, necesitaTransicion);

  const inicialUl = DOM.inicialUl();
  await esperarTransicion(inicialUl);

  const M = 5; // Límite configurado por fila
  const layout = obtenerInfoLayout(M);
  const nodosPrimeraFila = getCantidadNodosFila(layout, 0);

  if (nodosPrimeraFila < M) {
    // =========================================================================
    // RAMA A: Reacomodamiento Horizontal en la Fila Actual
    // =========================================================================
    const n = nodosPrimeraFila;
    const primero = DOM.contenedorNodos.firstElementChild as HTMLElement;

    const s1 = (DOM.contenedorNodos.offsetWidth - n * primero.offsetWidth) / (n + 1);
    const s2 = (DOM.contenedorNodos.offsetWidth - (n + 1) * primero.offsetWidth) / (n + 2);

    console.log("el valor de s1 es: ", s1);
    console.log("el valor de s2 es: ", s2);

    if (layout.totalFilas === 1) {
      setFlechaFinal(true, necesitaTransicion, s2);
      setFlechasNodos(necesitaTransicion, 1, s1, s2);
    }

    setFlechasNodosDefinitiva(necesitaTransicion, 1, s1, s2, "emisor", layout);

    await esperarTransicion(primero);

    agregarNodo(DOM.inputNodo.value, 1);

    const nuevosNodos = getNodos() as HTMLElement[];
    for (let i = 1; i < nuevosNodos.length; i++) {
      nuevosNodos[i].classList.add("no-mover");
      nuevosNodos[i].style.left = "0px";
    }

    const nodoNuevo = nuevosNodos[0];
    if (nodoNuevo) {
      await esperar(100);
      nodoNuevo.style.opacity = "1";
      await esperarTransicion(nodoNuevo);
    }

    window.banderaFlechaInicial = 0;
    setFlechaInicial(true, necesitaTransicion);

    const inicialLi = DOM.inicialLi();
    await esperarTransicion(inicialLi);

    const esFilaSuperior = layout.totalFilas > 1;
    const esSegundoNodoDeFila = nodosPrimeraFila + 1 === 2;

    console.log("El valor de esFilaSuperior es: ", esFilaSuperior);
    console.log("El valor de esSegundoNodoDeFila es: ", esSegundoNodoDeFila);

    if (esFilaSuperior && esSegundoNodoDeFila) {
      DOM.contenedorFlechas?.classList.add("margin-flex");
      DOM.contenedorFlechas?.firstElementChild?.remove();
    }

    agregarFlecha(1);

    const flechasActuales = getFlechas() as HTMLElement[];
    const primeraFlecha = flechasActuales[0];

    if (primeraFlecha && esFilaSuperior) {
      primeraFlecha.style.setProperty("width", root.style.getPropertyValue("--linea-flecha-width"));
    }

    const ultimoHijoFlecha = primeraFlecha?.lastElementChild as HTMLElement | null;
    await esperarTransicion(ultimoHijoFlecha);

    // Liberación y limpieza final
    document.removeEventListener("click", handler, true);
    // DOM.agregarComienzo.disabled = false;
    // DOM.agregarFinal.disabled = false;
    // liberarInterfaz();

    actualizarSelectoresIntermedios();
    inicialUl?.classList.remove("no-desplazar");
    document.dispatchEvent(new CustomEvent("animacion_nodo_completada"));
  } else {
    // =========================================================================
    // RAMA B: Expansión Vertical (Nueva Fila)
    // =========================================================================
    console.log("🔵 FASE 1: Bajada suave del Wrapper y Nodos por transform.");

    if (
      DOM.principalWrapper.style.getPropertyValue("max-height") !== "" ||
      window.alturaDeVentana !== window.innerHeight
    ) {
      window.alturaDeVentana = window.innerHeight;
      const maxPermitido = window.alturaDeVentana - 8 - DOM.principalWrapper.offsetTop;
      const altoDeseado = DOM.principalWrapper.offsetHeight + 200 + 50 * (layout.totalFilas > 1 ? 1 : 0);
      const altoFinal = Math.min(altoDeseado, maxPermitido);

      if (altoFinal === maxPermitido) {
        DOM.principalWrapper.style.setProperty("max-height", `${altoFinal}px`);
      }

      root.style.setProperty("--wrapper-height", `${altoFinal}px`);
    }

    const alturaNull = DOM.nulo.offsetTop;
    DOM.nulo.classList.add("transicion-nulo");

    const nodosActuales = Array.from(getNodos() as HTMLElement[]);
    nodosActuales.forEach((nodo) => {
      nodo.classList.remove("inmediato-nodo", "inmediato", "inmediato_reacomodo", "no-mover");
      nodo.classList.add("transicion-nodos");
    });

    const contenedorFlechas = document.getElementById("contenedor_flechas");
    if (contenedorFlechas) {
      const flechasExistentes = Array.from(
        contenedorFlechas.querySelectorAll(".arrow")
      ) as HTMLElement[];

      flechasExistentes.forEach((flecha) => {
        flecha.classList.remove("no-mover__flecha");
        const elementosHijos = Array.from(flecha.children) as HTMLElement[];
        elementosHijos.forEach((elemento) => elemento.classList.remove("inmediato"));
        flecha.classList.add("transicion-flechas");
      });
    }

    const flechasCurvas = DOM.contenedorFlechasCurvas.querySelectorAll(".svg-flecha-interfila");
    flechasCurvas.forEach((flecha) => {
      (flecha as HTMLElement).classList.add("transicion-flechas");
    });

    const flecha_puntero_final = document.getElementById("flecha_puntero_final");
    if (!flecha_puntero_final) return;

    for (const hijo of flecha_puntero_final.children) {
      (hijo as HTMLElement).classList.remove("inmediato");
      (hijo as HTMLElement).style.transition = "top 2s ease-out";
    }

    const finalUl = DOM.finalUl();
    const finalLi = DOM.finalLi();
    const finalLs = DOM.finalLs();

    if (finalUl && finalLi && finalLs) {
      const alturaFUl = finalUl.offsetTop;
      const alturaNulo = DOM.nulo.offsetTop;
      finalUl.style.top = `${alturaFUl + 250}px`;
      finalLi.style.top = `${alturaNulo + DOM.nulo.offsetHeight + 250}px`;
      finalLs.style.top = `${alturaNulo + DOM.nulo.offsetHeight + 250}px`;
    }

    // FASE 2: Retención (A los 2000ms)
    await esperar(2000);
    console.log("⚡ FASE 2: Retención instantánea en contenedor.");

    root.style.setProperty(
      "--principal-height",
      `${DOM.principal.offsetHeight + 200 + 50 * (layout.totalFilas > 1 ? 1 : 0)}px`
    );

    nodosActuales.forEach((nodo) => nodo.classList.remove("transicion-nodos"));

    if (contenedorFlechas) {
      const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
      const nodosEnFila0 = layout.nodosPorFila.get(0) || 0;

      if (nodosEnFila0 > 1) {
        for (let i = 0; i < nodosEnFila0 - 1; i++) {
          (flechasExistentes[i] as HTMLElement).classList.remove("transicion-flechas");
        }
      }

      for (let j = nodosEnFila0 - 1; j < flechasExistentes.length; j++) {
        (flechasExistentes[j] as HTMLElement).classList.remove("transicion-flechas");
      }
    }

    flechasCurvas.forEach((flecha) => {
      (flecha as HTMLElement).classList.remove("transicion-flechas");
      const alturaFC = (flecha as HTMLElement).style.getPropertyValue("top");
      (flecha as HTMLElement).style.setProperty("top", `calc(${alturaFC} + 250px)`);
    });

    for (const hijo of flecha_puntero_final.children) {
      (hijo as HTMLElement).removeAttribute("style");
    }

    if (DOM.nulo) {
      root.style.setProperty("--linea-flecha-final-top", `${DOM.principal.offsetHeight - 150 - 2.5}px`);
      root.style.setProperty("--nulo-top", `${alturaNull + 250}px`);
      root.style.setProperty(
        "--punta-flecha-final-top",
        `${alturaNull + DOM.nulo.offsetHeight / 2 + 250}px`
      );
      DOM.nulo.classList.remove("transicion-nulo");
    }

    // FASE 3: Pasando a modo multi-fila e insertando elementos
    await esperar(100);
    console.log("🛠️ FASE 3: Pasando a modo multi-fila e insertando elementos.");

    DOM.contenedorNodos?.classList.add("cambio-flex");
    DOM.contenedorFlechas.classList.add("cambio-flex");

    DOM.contenedorNodos.prepend(crearSaltoFlex());
    DOM.contenedorFlechas.insertBefore(
      crearSaltoFlex(),
      DOM.contenedorFlechas.firstElementChild
    );

    const spacer = document.createElement("div");
    spacer.classList.add("flecha-spacer-fila");
    DOM.contenedorFlechas.prepend(spacer);

    agregarNodo(DOM.inputNodo.value, 1);

    const todosLosNodos = Array.from(getNodos() as HTMLElement[]);
    const nodoNuevo = todosLosNodos[0];
    const nodoOrigenReal = todosLosNodos[1];

    const haySpacer = DOM.contenedorFlechas.querySelectorAll(".flecha-spacer-fila");
    if (layout.totalFilas >= 2 && haySpacer.length !== 0) {
      DOM.contenedorFlechas?.classList.remove("margin-flex");
    }

    DOM.contenedorNodos.classList.add("margin-flex");

    if (nodoNuevo) {
      await esperar(100);
      nodoNuevo.style.opacity = "1";
      await esperarTransicion(nodoNuevo);

      const contenedorCurvas = document.getElementById("contenedor_flechas_curvas");
      if (!contenedorCurvas) {
        document.removeEventListener("click", handler, true);
        DOM.agregarComienzo.disabled = false;
        DOM.agregarFinal.disabled = false;
        return;
      }

      if (nodoNuevo && nodoOrigenReal) {
        const flechaCurva = crearFlechaCurvaInterfila(nodoNuevo, nodoOrigenReal, DOM.contenedorNodos);
        DOM.contenedorFlechasCurvas.prepend(flechaCurva);
        const pathCurva = flechaCurva.firstElementChild as SVGPathElement;

        const animacionCurva = animarPath(pathCurva!, true);

        // Coordinación de Web Animations API (onfinish)
        await new Promise<void>((resolve) => {
          animacionCurva.onfinish = () => {
            const animsPunta = animarPuntaAzul(flechaCurva, true);
            animsPunta[0].onfinish = () => {
              setFlechaInicial(true, necesitaTransicion);

              document.removeEventListener("click", handler, true);
              // DOM.agregarComienzo.disabled = false;
              // DOM.agregarFinal.disabled = false;
              // liberarInterfaz();

              actualizarSelectoresIntermedios();
              resolve();
            };
          };
        });
      }
    }
    document.dispatchEvent(new CustomEvent("animacion_nodo_completada"));
    console.log("🛑 Estructura DOM armada y secuencia completada.");
  }
}






function agregarNodoIntermedio(): void {
  if (!DOM.verificarDOM() || !DOM.selectorPares) return;

  const flechas = getFlechas() as HTMLElement[];
  const nodos = getNodos() as HTMLElement[];
  const value = parseInt(DOM.selectorPares.options[DOM.selectorPares.selectedIndex].value, 10);

  const objetivoFlecha = flechas[value - 2];
  if (!objetivoFlecha) return;

  const ul = objetivoFlecha.querySelector(".underline") as HTMLElement;
  const ls = objetivoFlecha.querySelector(".linea-s") as HTMLElement;
  const li = objetivoFlecha.querySelector(".linea-i") as HTMLElement;

  ul.classList.remove("inmediato");
  ls.classList.remove("inmediato");
  li.classList.remove("inmediato");

  ul.classList.add("arrowend-first-ul");
  ls.classList.add("arrowend-first");
  li.classList.add("arrowend-first");

  setTimeout(() => {
    ul.style.width = '0px';
    ls.style.width = '0px';
    li.style.width = '0px';
  }, 100);

  ul.addEventListener("transitionend", function fu() {
    const ultimo = DOM.contenedorNodos.lastElementChild as HTMLElement;
    s1 = (DOM.contenedorNodos.offsetWidth - nodos.length * ultimo.offsetWidth) / (nodos.length + 1);
    s2 = (DOM.contenedorNodos.offsetWidth - (nodos.length + 1) * ultimo.offsetWidth) / (nodos.length + 2);

    setFlechaInicial(true, necesitaTransicion, s2);
    setFlechaFinal(true, necesitaTransicion, s2);
    setFlechasNodos2(value, s1, s2);

    ul.removeEventListener("transitionend", fu);
  });

  // const primerNodo = DOM.contenedorNodos.firstElementChild as HTMLElement | null;
  const primerNodo = DOM.contenedorNodos.firstElementChild as HTMLDivElement;

  primerNodo.addEventListener("transitionend", function nald() {

    agregarNodoN(DOM.inputNodo.value, (value-1));

    const nuevosNodos = getNodos() as HTMLElement[];

    for (let i = 0; i < nuevosNodos.length; i++) {
      if (i !== (value - 1)) {
        nuevosNodos[i].classList.add("no-mover");
        nuevosNodos[i].style.left = '0px';
      }
    }

    setTimeout(() => {
      if (nuevosNodos[value - 1]) nuevosNodos[value - 1].style.opacity = "1";
    }, 100);
    console.log("El nuevo nodo terminó su evento");
    console.log(nuevosNodos[value-1]);
    nuevosNodos[value - 1].addEventListener("transitionend", function na() {
      agregarFlechaN((value-2));
      const flechasActuales = getFlechas() as HTMLElement[];

      for (const flecha of flechasActuales) {
        if (flecha.style.left !== undefined) flecha.removeAttribute("style");
      }

      ls.removeAttribute("style");
      li.removeAttribute("style");
      ul.removeAttribute("style");

      ul.classList.remove("arrowend-first-ul");
      ls.classList.remove("arrowend-first");
      li.classList.remove("arrowend-first");

      ul.addEventListener("transitionend", function j1() {
        actualizarSelectoresIntermedios();
        ul.removeEventListener("transitionend", j1);
      });

      nuevosNodos[value - 1].removeEventListener("transitionend", na);
    });

    primerNodo.removeEventListener("transitionend", nald);
  });
}





 async function agregarNodoAlFinal(): Promise<void> {
  if (!DOM.verificarDOM()) return;

  const nodos = getNodos() as HTMLElement[];
  const ancho = DOM.principal.offsetWidth;

  DOM.principal.style.width = `${ancho}px`;
  if (root.style.getPropertyValue("--principal-height") === '50vw') {
    root.style.setProperty("--principal-height", `${DOM.principal.offsetHeight}px`);
  }

  // 1. Bloqueamos clicks al iniciar la acción
  document.addEventListener("click", handler, true);
  // DOM.agregarComienzo.disabled = true;
  // DOM.agregarFinal.disabled = true;
  // bloquearInterfaz();
  necesitaTransicion = 1;
  setFlechaFinal(false, necesitaTransicion);

  const finalUl = DOM.finalUl();

  // Esperamos la transición de ocultar/retraer la flecha final
  await esperarTransicion(finalUl);

  const layout = obtenerInfoLayout(5);

  if (layout.tieneEspacioUltimaFila) {
    // =========================================================================
    // RAMA A: Reacomodamiento Horizontal en la ÚLTIMA Fila
    // =========================================================================
    const n = layout.nodosUltimaFila;
    const ultimo = DOM.contenedorNodos.lastElementChild as HTMLElement;

    const s1 = (DOM.contenedorNodos.offsetWidth - n * ultimo.offsetWidth) / (n + 1);
    const s2 = (DOM.contenedorNodos.offsetWidth - (n + 1) * ultimo.offsetWidth) / (n + 2);

    console.log("el valor de s1 es: ", s1);
    console.log("el valor de s2 es: ", s2);

    if (layout.totalFilas === 1) {
      setFlechaInicial(true, necesitaTransicion, s2);
      setFlechasNodos(necesitaTransicion, 0, s1, s2);
    }

    setFlechasNodosDefinitiva(necesitaTransicion, 0, s1, s2, "receptor", layout);

    // Esperamos a que los nodos terminen de reacomodarse horizontalmente
    await esperarTransicion(ultimo);

    // --- Sincronización exacta Paso 1 ---
    agregarNodo(DOM.inputNodo.value, 0);

    const nuevosNodos = getNodos() as HTMLElement[];
    for (let i = 0; i < nuevosNodos.length - 1; i++) {
      nuevosNodos[i].classList.add("no-mover");
      nuevosNodos[i].style.left = '0px';
    }

    const nodoNuevo = nuevosNodos[nuevosNodos.length - 1];

    if (nodoNuevo) {
      await esperar(100);
      nodoNuevo.style.opacity = "1";
      
    }

    // Congelamiento síncrono del Ul antes de esperar la opacidad
    finalUl?.classList.add("no-desplazar");

    // Esperamos a que el nuevo nodo aparezca (transition de opacity)
    await esperarTransicion(nodoNuevo);

    // --- Sincronización exacta Paso 2 ---
    const esFilaInferior = layout.totalFilas > 1;
    const esSegundoNodoDeFila = (layout.nodosUltimaFila + 1) === 2;

    console.log("El valor de esFilaInferior es: ", esFilaInferior);
    console.log("El valor de esSegundoNodoDeFila es: ", esSegundoNodoDeFila);

    if (esFilaInferior && esSegundoNodoDeFila) {
      if (DOM.contenedorFlechas) {
        console.log("al final tenia que entrar aca , pero no se si entra");
        DOM.contenedorFlechas.lastElementChild?.remove();
      }
    }

    agregarFlecha(0);

    const flechasActuales = getFlechas() as HTMLElement[];
    const ultimaFlecha = flechasActuales[flechasActuales.length - 1];
    const ultimoHijoFlecha = ultimaFlecha?.lastElementChild as HTMLElement | null;

    // Esperamos que la flecha termine su animación de dibujo
    await esperarTransicion(ultimoHijoFlecha);

    // --- Sincronización exacta Paso 3 ---
    setFlechaFinal(true, necesitaTransicion);

    const finalLi = DOM.finalLi();
    await esperarTransicion(finalLi);

    // Liberación del camino
    document.removeEventListener("click", handler, true);
    // DOM.agregarComienzo.disabled = false;
    // DOM.agregarFinal.disabled = false;
    // liberarInterfaz();

    actualizarSelectoresIntermedios();
    finalUl?.classList.remove("no-desplazar");


  } else {
    // =========================================================================
    // RAMA B: Expansión Multidireccional / Nueva Fila
    // =========================================================================
    console.log("Paso 1: Expansión escalable a 600px con contra-desplazamiento interno.");

    if (DOM.principalWrapper.style.getPropertyValue("max-height") === "" || window.alturaDeVentana !== window.innerHeight) {
      window.alturaDeVentana = window.innerHeight;
      const maxPermitido = window.alturaDeVentana - 8 - DOM.principalWrapper.offsetTop;
      const altoDeseado = DOM.principalWrapper.offsetHeight + 200 + 50 * (layout.totalFilas > 1 ? 1 : 0);
      const altoFinal = Math.min(altoDeseado, maxPermitido);

      if (altoFinal === maxPermitido) {
        root.style.setProperty('max-height', `${altoFinal}px`);
      }

      root.style.setProperty('--wrapper-height', `${altoFinal}px`);
    }

    DOM.principalWrapper.style.overflow = "hidden";

    // Esperamos los 2000ms exactos de la expansión del wrapper
    await esperar(2000);

    root.style.setProperty('--principal-height', `${DOM.principal.offsetHeight + 200 + 50 * (layout.totalFilas > 1 ? 1 : 0)}px`);
    console.log("el valor nuevo de la altura principal es: ", root.style.getPropertyValue('--principal-height'));

    if (layout.totalFilas === 1) {
      DOM.contenedorNodos?.classList.add("cambio-flex", "margin-flex");
      DOM.contenedorFlechas?.classList.add("cambio-flex", "margin-flex");
    }

    const saltoDeLineaFlechas = crearSaltoFlex();
    DOM.contenedorFlechas.appendChild(saltoDeLineaFlechas);

    const alturaNull = DOM.nulo.offsetTop;
    root.style.setProperty('--linea-flecha-final-top', `${DOM.principal.offsetHeight - 150 - 2.5}px`);
    root.style.setProperty('--nulo-top', `${alturaNull + 250}px`);
    root.style.setProperty('--punta-flecha-final-top', `${alturaNull + DOM.nulo.offsetHeight + 250}px`);

    const saltoDeLineaNodos = crearSaltoFlex();
    DOM.contenedorNodos.appendChild(saltoDeLineaNodos);

    const spacer = document.createElement("div");
    spacer.classList.add("flecha-spacer-fila");
    DOM.contenedorFlechas.appendChild(spacer);

    const haySpacer = DOM.contenedorFlechas.querySelectorAll(".flecha-spacer-fila");
    if (layout.totalFilas >= 2 && haySpacer.length === 0) {
      DOM.contenedorFlechas?.classList.remove("margin-flex");
    }

    // Esperamos los 100ms de desfasaje para la creación del nodo
    await esperar(100);

    const nodosAntesDeAgregar = Array.from(getNodos() as HTMLElement[]);
    const nodoOrigenReal = nodosAntesDeAgregar[nodosAntesDeAgregar.length - 1];

    agregarNodo(DOM.inputNodo.value, 0);

    const todosLosNodos = Array.from(getNodos() as HTMLElement[]);
    const nodoNuevo = todosLosNodos[todosLosNodos.length - 1];

    if (nodoNuevo) {
      await esperar(100);
      nodoNuevo.style.opacity = "1";

      // Sincronización inmediata de 'no-desplazar' antes de esperar la opacidad
      finalUl?.classList.add("no-desplazar");

      await esperarTransicion(nodoNuevo);

      const nodoCinco = nodoOrigenReal;
      const nodoSeis = nodoNuevo;

      if (nodoCinco && nodoSeis) {
        const flechaCurva = crearFlechaCurvaInterfila(nodoCinco, nodoSeis, DOM.contenedorNodos);
        DOM.contenedorFlechasCurvas.appendChild(flechaCurva);
        const pathCurva = flechaCurva.firstElementChild as SVGPathElement;

        // 1. Animación del Trazo Curvo SVG
        const animacionCurva = animarPath(pathCurva, true);
        await new Promise<void>((resolve) => {
          animacionCurva.onfinish = () => resolve();
        });

        // 2. Animación de las Patitas Azules
        const animsPunta = animarPuntaAzul(flechaCurva, true);
        await new Promise<void>((resolve) => {
          animsPunta[0].onfinish = () => resolve();
        });

        console.log("La animación del path terminó. Seteando flecha final...");
        setFlechaFinal(true, necesitaTransicion);

        // Liberación de la UI
        document.removeEventListener("click", handler, true);
        // DOM.agregarComienzo.disabled = false;
        // DOM.agregarFinal.disabled = false;
        // liberarInterfaz();

        actualizarSelectoresIntermedios();

        await esperar(100);
        finalUl?.classList.remove("no-desplazar");
        
      } else {
        document.removeEventListener("click", handler, true);
        // DOM.agregarComienzo.disabled = false;
        // DOM.agregarFinal.disabled = false;
        // liberarInterfaz();
      }
    }
  }
 document.dispatchEvent(new CustomEvent("animacion_nodo_completada"));
}



// function actualizarSelectoresIntermedios(): void {
//   if (DOM.contenedorNodos.childElementCount > 1 && DOM.agregarIntermedio && DOM.textoSelector && DOM.selectorPares) {
//     DOM.agregarIntermedio.removeAttribute("hidden");
//     DOM.textoSelector.removeAttribute("hidden");
//     DOM.selectorPares.removeAttribute("hidden");

//     const opt = document.createElement('option');
//     const cuenta = DOM.contenedorNodos.childElementCount.toString();
//     opt.value = cuenta;
//     opt.innerHTML = cuenta;
//     DOM.selectorPares.appendChild(opt);
//   }
// }


// function actualizarSelectoresIntermedios(): void {
//   if (DOM.contenedorNodos.childElementCount > 1 && DOM.agregarIntermedio && DOM.textoSelector && DOM.selectorPares) {
//     DOM.agregarIntermedio.removeAttribute("hidden");
//     DOM.textoSelector.removeAttribute("hidden");
//     DOM.selectorPares.removeAttribute("hidden");

//     const opt = document.createElement('option');
//     const cuenta = DOM.contenedorNodos.childElementCount.toString();
//     opt.value = cuenta;
//     opt.innerHTML = cuenta;
//     DOM.selectorPares.appendChild(opt);
//   }
// }

// function actualizarSelectoresIntermedios(): void {
//   if (DOM.contenedorNodos.childElementCount > 1 && DOM.agregarIntermedio && DOM.textoSelector && DOM.selectorPares) {
//     DOM.agregarIntermedio.removeAttribute("hidden");
//     DOM.textoSelector.removeAttribute("hidden");
//     DOM.selectorPares.removeAttribute("hidden");

//     // Habilitamos controles al haber 2 o más nodos
//     DOM.agregarIntermedio.disabled = false;
//     DOM.selectorPares.disabled = false;

//     const opt = document.createElement('option');
//     const cuenta = DOM.contenedorNodos.childElementCount.toString();
//     opt.value = cuenta;
//     opt.innerHTML = cuenta;
//     DOM.selectorPares.appendChild(opt);
//   } else if (DOM.agregarIntermedio && DOM.selectorPares) {
//     // Deshabilitamos controles cuando hay menos de 2 nodos
//     DOM.agregarIntermedio.disabled = true;
//     DOM.selectorPares.disabled = true;
//   }
// }



// function actualizarSelectoresIntermedios(): void {
//   // CASO 1: Hay 2 o más nodos (Se muestran y habilitan los controles)
//   if (DOM.contenedorNodos.childElementCount > 1 && DOM.agregarIntermedio && DOM.textoSelector && DOM.selectorPares) {
//     DOM.agregarIntermedio.removeAttribute("hidden");
//     DOM.textoSelector.removeAttribute("hidden");
//     DOM.selectorPares.removeAttribute("hidden");

//     DOM.agregarIntermedio.disabled = false;
//     DOM.selectorPares.disabled = false;

//     const opt = document.createElement('option');
//     const cuenta = DOM.contenedorNodos.childElementCount.toString(); // Posición N
//     opt.value = cuenta;
//     opt.innerHTML = cuenta;
//     DOM.selectorPares.appendChild(opt);
//   } 
//   // CASO 2: Hay 1 nodo o menos (SE DESHABILITAN)
//   else if (DOM.agregarIntermedio && DOM.selectorPares) {
//     DOM.agregarIntermedio.disabled = true;
//     DOM.selectorPares.disabled = true;
//     DOM.selectorPares.innerHTML = '<option value="">-</option>';
//   }
// }

function actualizarSelectoresIntermedios(): void {
  const cantidadNodos = DOM.contenedorNodos.childElementCount;

  // CASO 1: Hay 2 o más nodos (Se muestran, limpian el guión y habilitan)
  if (cantidadNodos > 1 && DOM.agregarIntermedio && DOM.textoSelector && DOM.selectorPares) {
    DOM.agregarIntermedio.removeAttribute("hidden");
    DOM.textoSelector.removeAttribute("hidden");
    DOM.selectorPares.removeAttribute("hidden");

    DOM.agregarIntermedio.disabled = false;
    DOM.selectorPares.disabled = false;

    // 🧹 Limpiamos el guión viejo o las opciones desactualizadas
    DOM.selectorPares.innerHTML = "";

    // Poblamo de nuevo todas las posiciones intermedias válidas (2 hasta N)
    for (let i = 2; i <= cantidadNodos; i++) {
      const opt = document.createElement('option');
      opt.value = i.toString();
      opt.innerHTML = i.toString();
      DOM.selectorPares.appendChild(opt);
    }
  } 
  // CASO 2: Hay 1 nodo o menos (Se deshabilitan y vuelve el guión)
  else if (DOM.agregarIntermedio && DOM.selectorPares) {
    DOM.agregarIntermedio.disabled = true;
    DOM.selectorPares.disabled = true;
    DOM.selectorPares.innerHTML = '<option value="">-</option>';
  }
}



// function actualizarSelectoresIntermedios(): void {
//   // 1. Si no es una lista enlazada, ocultamos los selectores y salimos inmediatamente
//   if (estructuraActiva?.type !== "linkedlist") {
//     DOM.agregarIntermedio?.setAttribute("hidden", "hidden");
//     DOM.textoSelector?.setAttribute("hidden", "hidden");
//     DOM.selectorPares?.setAttribute("hidden", "hidden");
//     return;
//   }

//   // 2. Si es Lista Enlazada y hay más de un nodo, actualizamos la interfaz
//   if (DOM.contenedorNodos.childElementCount > 1 && DOM.agregarIntermedio && DOM.textoSelector && DOM.selectorPares) {
//     DOM.agregarIntermedio.removeAttribute("hidden");
//     DOM.textoSelector.removeAttribute("hidden");
//     DOM.selectorPares.removeAttribute("hidden");

//     const opt = document.createElement('option');
//     const cuenta = DOM.contenedorNodos.childElementCount.toString();
//     opt.value = cuenta;
//     opt.innerHTML = cuenta;
//     DOM.selectorPares.appendChild(opt);
//   }
// }


// export function actualizarSelectoresIntermedios(): void {
//   const cantidadNodos = DOM.contenedorNodos?.childElementCount || 0;

//   // Regla 1: Si NO es LinkedList O si tiene 1 nodo o menos, ocultamos todo y salimos
//   if (estructuraActiva?.type !== "linkedlist" || cantidadNodos <= 1) {
//     DOM.agregarIntermedio?.setAttribute("hidden", "hidden");
//     DOM.textoSelector?.setAttribute("hidden", "hidden");
//     DOM.selectorPares?.setAttribute("hidden", "hidden");
    
//     // Si la lista volvió a tener 1 o 0 nodos, reseteamos las opciones del <select>
//     if (DOM.selectorPares) {
//       DOM.selectorPares.innerHTML = "";
//     }
//     return;
//   }

//   // Regla 2: Solo si es LinkedList Y tiene 2 o más nodos, mostramos los controles
//   if (DOM.agregarIntermedio && DOM.textoSelector && DOM.selectorPares) {
//     DOM.agregarIntermedio.removeAttribute("hidden");
//     DOM.textoSelector.removeAttribute("hidden");
//     DOM.selectorPares.removeAttribute("hidden");

//     // Limpiamos y repoblamos las opciones para evitar duplicados en el <select>
//     DOM.selectorPares.innerHTML = "";
//     for (let i = 1; i < cantidadNodos; i++) {
//       const opt = document.createElement("option");
//       opt.value = i.toString();
//       opt.innerHTML = i.toString();
//       DOM.selectorPares.appendChild(opt);
//     }
//   }
// }

// export function actualizarSelectoresIntermedios(): void {
//   const cantidadNodos = DOM.contenedorNodos?.childElementCount || 0;
//   const esLinkedList = estructuraActiva?.type === "linkedlist";

//   // 1. Si NO es LinkedList, ocultamos los controles por completo
//   if (!esLinkedList) {
//     DOM.agregarIntermedio?.setAttribute("hidden", "hidden");
//     DOM.textoSelector?.setAttribute("hidden", "hidden");
//     DOM.selectorPares?.setAttribute("hidden", "hidden");
//     return;
//   }

//   // 2. Si SÍ es LinkedList, mostramos los elementos en la interfaz
//   DOM.agregarIntermedio?.removeAttribute("hidden");
//   DOM.textoSelector?.removeAttribute("hidden");
//   DOM.selectorPares?.removeAttribute("hidden");

//   // 3. Regla de activación/desactivación por cantidad de nodos
//   if (cantidadNodos <= 1) {
//     // Con 0 o 1 nodo: Deshabilitamos el botón y el selector
//     if (DOM.agregarIntermedio) DOM.agregarIntermedio.disabled = true;
//     if (DOM.selectorPares) {
//       DOM.selectorPares.disabled = true;
//       DOM.selectorPares.innerHTML = '<option value="">-</option>';
//     }
//   } else {
//     // Con 2 o más nodos: Habilitamos el botón y cargamos los índices
//     if (DOM.agregarIntermedio) DOM.agregarIntermedio.disabled = false;
//     if (DOM.selectorPares) {
//       DOM.selectorPares.disabled = false;
//       DOM.selectorPares.innerHTML = ""; // Limpiamos opciones previas

//       for (let i = 1; i < cantidadNodos; i++) {
//         const opt = document.createElement("option");
//         opt.value = i.toString();
//         opt.innerHTML = i.toString();
//         DOM.selectorPares.appendChild(opt);
//       }
//     }
//   }
// }


export { agregarNodoAlComienzo, agregarNodoIntermedio, agregarNodoAlFinal, agregarPrimerNodo };