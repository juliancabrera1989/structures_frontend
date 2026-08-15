// RenderSacarNodo.ts
import { setPuntero, setFlechaFinal, setFlechaInicial } from "./ControladorInicializador.ts";
import { sacarNodo, getNodos } from "../contenedores/ContenedorNodos.ts";
import { sacarFlecha, getFlechas } from "../contenedores/ContenedorFlechas.ts";
import { setFlechasNodos, setFlechasNodos2 , setFlechasNodosDefinitiva} from "./RenderFlechasNodos.ts";
import { renderizar } from "./ControladorBarraSuperior.ts";
import { obtenerInfoLayout, getCantidadNodosFila } from "../utils/layoutHelpers.ts";
import { animarPath , animarPuntaAzul} from "../elementosGraficos/FlechaCurva.ts";
import { esperar, esperarTransicion } from "../utils/asyncUtils.ts";
// import { animarPathAsync, animarPuntaAzulAsync } from "./RenderAgregarNuevoNodo.ts";
import * as DOM from "../utils/elementosDOM.ts"; // Tu core centralizado



const root = document.documentElement;

let necesitaTransicion: number;
let s1: number;
let s2: number;

/**
 * Handler seguro para capturar y congelar eventos durante las animaciones
 */
function handler(e: Event): void {
  e.stopPropagation();
  e.preventDefault();
}

/**
 * Helper para extraer sub-elementos internos de las flechas de forma estricta sin nulls
 */
function obtenerSubElemento(padre: HTMLElement, clase: string): HTMLElement {
  const el = padre.getElementsByClassName(clase)[0];
  if (!el) {
    throw new Error(`Error Estructural: No se encontró la clase .${clase} dentro del elemento.`);
  }
  return el as HTMLElement;
}


// export function borrarUltimoNodo(): void {
//   if (!DOM.verificarDOM()) return;

//   // Deshabilitamos interacción mientras dura la secuencia
//   DOM.botonAgregar1erNodo.removeAttribute("hidden");
//   DOM.botonAgregar1erNodo.disabled = true;
//   DOM.agregarComienzo.setAttribute("hidden", "hidden");
//   DOM.agregarFinal.setAttribute("hidden", "hidden");

//   const ancho = DOM.principal.offsetWidth;
//   DOM.principal.style.width = `${ancho}px`;

//   if (root.style.getPropertyValue("--principal-height") === '50vw') {
//     const altura = DOM.principal.offsetHeight; 
//     root.style.setProperty("--principal-height", `${altura}px`);
//   }

//   document.addEventListener("click", handler, true);

//   const finalUl = DOM.finalUl();
//   const inicialUl = DOM.inicialUl();
//   const inicialLs = DOM.inicialLs();
//   const inicialLi = DOM.inicialLi();
  
//   const primerNodo = DOM.contenedorNodos.firstElementChild as HTMLElement;

//   // =========================================================================
//   // PASO 1: Contracción de la flecha final (derecha)
//   // =========================================================================
//   setFlechaFinal(false, 1);

//   if (finalUl) {
//     finalUl.addEventListener("transitionend", function fPaso1(e) {
//       if (e.target !== finalUl) return;
//       finalUl.removeEventListener("transitionend", fPaso1);

//       // =========================================================================
//       // PASO 2: Contracción de la flecha inicial (izquierda) hacia StrPtr
//       // =========================================================================
//       setFlechaInicial(false, 1);


      
//       if (inicialUl) {
//         inicialUl.addEventListener("transitionend", function fPaso2(e) {
//           if (e.target !== inicialUl) return;
          
//           inicialUl.removeEventListener("transitionend", fPaso2);

//           // Limpieza de clases de rotación/diagonal
//           inicialUl.classList.remove("arrowend-first-ul");
//           inicialLs?.classList.remove("arrowend-first");
//           inicialLi?.classList.remove("arrowend-first");

//           root.style.setProperty('--rotation-angle-fpi', '0deg');

//           // =========================================================================
//           // PASO 3: Re-extensión de la flecha inicial superior (StrPtr -> NULL arriba)
//           // =========================================================================
//           // RESTAURACIÓN DE ESTILOS: Se colocan aquí para acompañar la re-extensión
        

//           //Calculamos el ancho entre los márgenes del 3%/5% antes de moverlos
//           const fpiLeft = 0.03 * DOM.contenedorNodos.offsetWidth + DOM.str.offsetWidth;
//           const fpiWidth = DOM.contenedorNodos.offsetWidth - 2 * fpiLeft;

//           root.style.setProperty('--linea-flecha-inicial-width', `${fpiWidth}px`);
//           root.style.setProperty('--punta-flecha-inicial-width', `20px`);
//           root.style.setProperty('--punta-flecha-inicial-left', `${fpiLeft + fpiWidth}px`);
//           root.style.setProperty('--linea-flecha-final-top', `-2.5px`);
//       inicialUl?.classList.add("cambio_top");    
//       DOM.str.classList.add("inmediato_reacomodo");
//       DOM.nulo.classList.add("inmediato_reacomodo");
  
//           inicialUl.addEventListener("transitionend", function fPaso3(e) {
//           inicialUl.classList.add("inmediato");
//           inicialLs?.classList.add("inmediato");
//           inicialLi?.classList.add("inmediato");  
//             if (e.target !== inicialUl) return;
//             inicialUl.removeEventListener("transitionend", fPaso3);
//         setPuntero(1);
//         if (DOM.inicializador) {
//             DOM.inicializador.style.display = "flex";
//             DOM.inicializador.style.justifyContent = "space-between";
//             DOM.inicializador.style.alignItems = "center";
//           }
//           DOM.str.style.position = "relative";
//           DOM.nulo.style.position = "relative";
 


          
//     root.style.setProperty('--linea-flecha-inicial-width', `${fpiWidth}px`);
//     root.style.setProperty('--punta-flecha-inicial-width', `20px`);
//     root.style.setProperty('--punta-flecha-inicial-top', `-100px`);
//     root.style.setProperty('--punta-flecha-inicial-left', `${fpiLeft + fpiWidth}px`);


//             // =========================================================================
//             // PASO 4: Desvanecer el nodo del centro (opacity: 1 -> 0)
//             // =========================================================================
//             if (primerNodo) {
//               primerNodo.classList.remove("inmediato-nodo");
//               primerNodo.style.opacity = "0";

//               primerNodo.addEventListener("transitionend", function fPaso4(e) {
//                 if (e.target !== primerNodo) return;
//                 primerNodo.removeEventListener("transitionend", fPaso4);
                
//                 // =========================================================================
//                 // PASO 5: Sacar nodo del DOM y reacomodar StrPtr / NULL al 25% y centro vertical
//                 // =========================================================================
//                   const divValor = primerNodo.firstElementChild;
//                   const valor = divValor?.innerHTML;
//                   sacarNodo(valor!);
//                     DOM.str.classList.remove("inmediato_reacomodo");
//                     DOM.nulo.classList.remove("inmediato_reacomodo");
//                     inicialUl.classList.remove("inmediato");
//                     inicialLs?.classList.remove("inmediato");
//                     inicialLi?.classList.remove("inmediato");   
//                 // Vuelve a la geometría de la imagen 1 (centrado y 25%)
//                 setPuntero(0);

//                 if (DOM.str) {
//                   DOM.str.addEventListener("transitionend", function fPaso5(e) {
//                     if (e.target !== DOM.str) return;
//                     DOM.str.removeEventListener("transitionend", fPaso5);

//                     // --- FIN DE LA ANIMACIÓN ---
//                     DOM.botonAgregar1erNodo.disabled = false;
//                     document.removeEventListener("click", handler, true);
//                     // renderizar();
//                     DOM.principal.removeAttribute("style");
//                   });
//                 } else {
//                   DOM.botonAgregar1erNodo.disabled = false;
//                   document.removeEventListener("click", handler, true);
//                   renderizar();
//                   DOM.principal.removeAttribute("style");
//                 }
//               });
//             }
//           });
//         });
//       }
//     });
//   }
// }


// Configuración previa de interfaz
function prepararEstructuraBorrar(): void {
  DOM.botonAgregar1erNodo.removeAttribute("hidden");
  DOM.botonAgregar1erNodo.disabled = true;
  DOM.agregarComienzo.setAttribute("hidden", "hidden");
  DOM.agregarFinal.setAttribute("hidden", "hidden");

  const ancho = DOM.principal.offsetWidth;
  DOM.principal.style.width = `${ancho}px`;

  if (root.style.getPropertyValue("--principal-height") === '50vw') {
    const altura = DOM.principal.offsetHeight; 
    root.style.setProperty("--principal-height", `${altura}px`);
  }

  document.addEventListener("click", handler, true);
}

// PASO 1: Contracción de la flecha final
async function paso1_ContraerFlechaFinal(finalUl: HTMLElement | null): Promise<void> {
  setFlechaFinal(false, 1);
  await esperarTransicion(finalUl);
}

// PASO 2: Contracción de la flecha inicial hacia StrPtr
async function paso2_ContraerFlechaInicial(
  inicialUl: HTMLElement | null,
  inicialLs: HTMLElement | null,
  inicialLi: HTMLElement | null
): Promise<void> {
  setFlechaInicial(false, 1);
  await esperarTransicion(inicialUl);

  // Limpieza de clases de rotación/diagonal
  inicialUl?.classList.remove("arrowend-first-ul");
  inicialLs?.classList.remove("arrowend-first");
  inicialLi?.classList.remove("arrowend-first");

  root.style.setProperty('--rotation-angle-fpi', '0deg');
}

// PASO 3: Re-extensión de la flecha inicial superior
async function paso3_ReExtenderFlechaInicial(
  inicialUl: HTMLElement | null,
  inicialLs: HTMLElement | null,
  inicialLi: HTMLElement | null
): Promise<void> {
  const fpiLeft = 0.03 * DOM.contenedorNodos.offsetWidth + DOM.str.offsetWidth;
  const fpiWidth = DOM.contenedorNodos.offsetWidth - 2 * fpiLeft;

  root.style.setProperty('--linea-flecha-inicial-width', `${fpiWidth}px`);
  root.style.setProperty('--punta-flecha-inicial-width', `20px`);
  root.style.setProperty('--punta-flecha-inicial-left', `${fpiLeft + fpiWidth}px`);
  root.style.setProperty('--linea-flecha-final-top', `-2.5px`);

  inicialUl?.classList.add("cambio_top");    
  DOM.str.classList.add("inmediato_reacomodo");
  DOM.nulo.classList.add("inmediato_reacomodo");

  await esperarTransicion(inicialUl);

  inicialUl?.classList.add("inmediato");
  inicialLs?.classList.add("inmediato");
  inicialLi?.classList.add("inmediato");  

  setPuntero(1);

  if (DOM.inicializador) {
    DOM.inicializador.style.display = "flex";
    DOM.inicializador.style.justifyContent = "space-between";
    DOM.inicializador.style.alignItems = "center";
  }

  DOM.str.style.position = "relative";
  DOM.nulo.style.position = "relative";

  root.style.setProperty('--linea-flecha-inicial-width', `${fpiWidth}px`);
  root.style.setProperty('--punta-flecha-inicial-width', `20px`);
  root.style.setProperty('--punta-flecha-inicial-top', `-100px`);
  root.style.setProperty('--punta-flecha-inicial-left', `${fpiLeft + fpiWidth}px`);
}

// PASO 4: Desvanecer el nodo del centro
async function paso4_DesvanecerNodo(nodo: HTMLElement | null): Promise<void> {
  if (!nodo) return;
  
  nodo.classList.remove("inmediato-nodo");
  nodo.style.opacity = "0";

  await esperarTransicion(nodo);
}

// PASO 5: Sacar nodo del DOM y reacomodar elementos
async function paso5_SacarNodoYReacomodar(
  nodo: HTMLElement | null,
  inicialUl: HTMLElement | null,
  inicialLs: HTMLElement | null,
  inicialLi: HTMLElement | null
): Promise<void> {
  if (nodo) {
    const divValor = nodo.firstElementChild;
    const valor = divValor?.innerHTML;
    sacarNodo(valor!);
  }

  DOM.str.classList.remove("inmediato_reacomodo");
  DOM.nulo.classList.remove("inmediato_reacomodo");
  inicialUl?.classList.remove("inmediato");
  inicialLs?.classList.remove("inmediato");
  inicialLi?.classList.remove("inmediato");   

  // Vuelve a la geometría inicial
  setPuntero(0);

  if (DOM.str) {
    await esperarTransicion(DOM.str);
  }

  // --- FIN DE LA ANIMACIÓN ---
  DOM.botonAgregar1erNodo.disabled = false;
  document.removeEventListener("click", handler, true);
  DOM.principal.removeAttribute("style");
}


export async function borrarUltimoNodo(): Promise<void> {
  if (!DOM.verificarDOM()) return;

  prepararEstructuraBorrar();

  const finalUl = DOM.finalUl();
  const inicialUl = DOM.inicialUl();
  const inicialLs = DOM.inicialLs();
  const inicialLi = DOM.inicialLi();
  const primerNodo = DOM.contenedorNodos.firstElementChild as HTMLElement;

  // === SECUENCIA DE PASOS ORDENADOS ===
  await paso1_ContraerFlechaFinal(finalUl);
  await paso2_ContraerFlechaInicial(inicialUl, inicialLs, inicialLi);
  await paso3_ReExtenderFlechaInicial(inicialUl, inicialLs, inicialLi);
  await paso4_DesvanecerNodo(primerNodo);
  await paso5_SacarNodoYReacomodar(primerNodo, inicialUl, inicialLs, inicialLi);
}






export function borrarNodoAlComienzo(data: string): void {
  if (!DOM.verificarDOM() || DOM.contenedorNodos.childElementCount === 0) return;

  const nodos = getNodos() as HTMLDivElement[];
  const flechas = getFlechas() as HTMLDivElement[];

  document.addEventListener("click", handler, true);
  DOM.agregarComienzo.disabled = true;
  DOM.agregarFinal.disabled = true;

  necesitaTransicion = 1;

  const M = 5; // Tu límite configurado por fila

  const layout = obtenerInfoLayout(M);

  const nodosPrimeraFila = getCantidadNodosFila(layout, 0);

  if (nodosPrimeraFila > 1) {
    const flechaObjetivo = flechas[0];
    if (flechaObjetivo) {
      const ul = obtenerSubElemento(flechaObjetivo, "underline");
      const ls = obtenerSubElemento(flechaObjetivo, "linea-s");
      const li = obtenerSubElemento(flechaObjetivo, "linea-i");

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

        necesitaTransicion = 1;
        setFlechaInicial(false, necesitaTransicion);

        const inicialUl = DOM.inicialUl();

        inicialUl?.addEventListener("transitionend", function fpu() {
          setTimeout(() => {
            const primerHijo = DOM.contenedorNodos.firstElementChild as HTMLElement;
            if (primerHijo) {
              primerHijo.classList.remove("inmediato-nodo");
              primerHijo.style.opacity = "0";
            }
          }, 1100);

          const primerHijo = DOM.contenedorNodos.firstElementChild as HTMLElement;
          if (primerHijo) {
            primerHijo.addEventListener("transitionend", function fn() {
              const nodoUltimo = DOM.contenedorNodos.lastElementChild as HTMLElement;
              s1 = ((DOM.contenedorNodos.offsetWidth - (nodosPrimeraFila) * nodoUltimo.offsetWidth) / (nodosPrimeraFila + 1));
              s2 = (DOM.contenedorNodos.offsetWidth - (nodosPrimeraFila - 1) * nodoUltimo.offsetWidth) / (nodosPrimeraFila);

              if (layout.totalFilas === 1) {
                // Solo si estamos en la Fila 1 ajustamos la flecha del puntero inicial (StrPtr)
                setFlechaFinal(true, necesitaTransicion, s2);
              }
              setFlechasNodosDefinitiva(necesitaTransicion, 1, s1, s2, "emisor", layout);

              const unicoNodoFila1 = DOM.contenedorNodos.querySelectorAll(".caja-nodo")[1] as HTMLElement;

              unicoNodoFila1.addEventListener("transitionend", function g() {

                if (layout.totalFilas > 1 && layout.nodosPorFila.get(0)! == 2) {
                  const spacer = document.createElement("div");
                  spacer.classList.add("flecha-spacer-fila");
                  DOM.contenedorFlechas.prepend(spacer);
                  if (layout.totalFilas >= 2)
                    DOM.contenedorFlechas.classList.remove("margin-flex");
                }

                sacarNodo(data);
                for (let i = 0; i < (nodosPrimeraFila - 1); i++) {
                  nodos[i].classList.add("no-mover");
                  nodos[i].style.left = '0px';
                  flechas[i].classList.remove("flecha-animando");
                }

                sacarFlecha(0);

                if (layout.totalFilas == 1 && flechas.length != 0) {
                  flechas.forEach((flecha) => {
                    // (flecha as HTMLElement).style.removeProperty("width");
                    (flecha as HTMLElement).classList.remove("flecha-animando");
                  });
                }

                setTimeout(() => {
                  setFlechaInicial(true, 1);
                }, 1000);

                const inicialLi = DOM.inicialLi();
                inicialLi?.addEventListener("transitionend", function h() {
                  document.removeEventListener("click", handler, true);
                  DOM.agregarComienzo.disabled = false;
                  DOM.agregarFinal.disabled = false;

                  // inicialUl?.classList.remove("no-desplazar");

                  inicialLi.removeEventListener("transitionend", h);
                });

                // actualizarSelectoresIntermedios();

                unicoNodoFila1.removeEventListener("transitionend", g);
              });

              primerHijo.removeEventListener("transitionend", fn);
            });
          }

          inicialUl.removeEventListener("transitionend", fpu);
        });

        ul.removeEventListener("transitionend", fu);
      });
    }

    return;

  } else {
    console.log("Iniciando reversión: Desvaneciendo punta de flecha curva...");
    const flechaCurva = DOM.contenedorFlechasCurvas?.firstElementChild as SVGElement;
    const pathCurva = flechaCurva?.firstElementChild as SVGPathElement | null;

    if (pathCurva) {

      // 1. Primero se encogen las patitas azules hacia la punta
      const animsPunta = animarPuntaAzul(flechaCurva, false);

      animsPunta[0].onfinish = () => {
        // 2. Una vez que desapareció la punta, recién ahí se retrocede/desvanece la curva roja
        const animacionCurva = animarPath(pathCurva!, false);

        animacionCurva.onfinish = () => {
          console.log("La animación del path terminó. Eliminando contenedor SVG...");
          const svgContenedor = pathCurva.closest(".svg-flecha-interfila");
          svgContenedor?.remove();

          // -------------------------------------------------------------------------
          // PASO 2: Contraer la flecha inicial (StrPtr)
          // -------------------------------------------------------------------------
          necesitaTransicion = 1;
          setFlechaInicial(false, necesitaTransicion);

          const inicialUl = DOM.inicialUl();

          inicialUl?.addEventListener("transitionend", function a() {
            // -------------------------------------------------------------------------
            // PASO 3: Hacer invisible el primer nodo
            // -------------------------------------------------------------------------
            const primerNodo = nodos[0];
            if (primerNodo) {
              primerNodo.style.removeProperty("opacity");

              primerNodo.addEventListener("transitionend", function handlerOcultarNodo(ev) {
                if (ev.propertyName === 'opacity') {
                  primerNodo.removeEventListener("transitionend", handlerOcultarNodo);
                  console.log("🚀 PASO 3 Terminado: El nodo es invisible. Listo para congelar abajo (Paso 4).");

                  // Aquí vas a meter tu Paso 4 de mutación limpia del DOM
                  // A. Mutación física del DOM (Borramos nodo y el salto flex)

                  const auxAltura = DOM.principal.offsetHeight;
                  // B. Achicamos principal y contenedores a 400px de golpe (sin transición todavía)
                  root.style.setProperty('--principal-height', `${DOM.principal.offsetHeight - 200 - 50 * (layout.totalFilas > 2 ? 1 : 0)}px`);

                  const contenedorFlechas = document.getElementById("contenedor_flechas");
                  if (contenedorFlechas) {
                  }

                  setTimeout(() => {
                    
                    const puedeAchicarse = auxAltura < DOM.principalWrapper.offsetHeight;
                    // if (DOM.principalWrapper.style.getPropertyValue("max-height") == "" || window.alturaDeVentana != window.innerHeight) {
                    // if (root.style.getPropertyPriority("--wrapper-height") != "" || window.alturaDeVentana != window.innerHeight) { 
                    if (puedeAchicarse || window.alturaDeVentana != window.innerHeight) {
                      window.alturaDeVentana = window.innerHeight;
                      // 2. Calcular la altura máxima física disponible en el viewport
                      //    (Alto total de ventana - Margen inferior deseado - Distancia desde el techo hasta el wrapper)
                      const maxPermitido = window.alturaDeVentana - 8 - DOM.principalWrapper.offsetTop;

                      // 3. Aplicar el alto deseado (ej: 400, 600, 800...), pero frenado en la altura máxima real
                      const altoDeseado = auxAltura - 200 - 50 * (layout.totalFilas > 2 ? 1 : 0);
                      console.log("El alto deseado es: ",altoDeseado);
                      console.log("El max permitido es: ",maxPermitido); // El valor que quieras según las filas
                      const altoFinal = Math.min(altoDeseado, maxPermitido);

                       if (altoFinal != maxPermitido)
                        DOM.principalWrapper.style.removeProperty('max-height');

                      root.style.setProperty('--wrapper-height', `${altoFinal}px`);
                    }

                    const nodosRestantes = Array.from(getNodos() as HTMLElement[]);
                    nodosRestantes.forEach(nodo => {
                      nodo.classList.remove("inmediato-nodo", "inmediato", "inmediato_reacomodo", "no-mover");
                      nodo.classList.add("transicion-nodos-negativa");
                    });

                    const contenedorFlechas = DOM.contenedorFlechas;
                    if (contenedorFlechas) {
                      const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");

                      flechasExistentes.forEach((flecha) => {
                        (flecha as HTMLElement).classList.add("transicion-flechas-negativa");
                      });
                    }

                    const flechasCurvas = DOM.contenedorFlechasCurvas.querySelectorAll(".svg-flecha-interfila");
                    flechasCurvas.forEach((flecha) => {
                      // Replicamos la limpieza de tu setFlechasNodos() para permitir la transición suave
                      
                      (flecha as HTMLElement).classList.add("transicion-flechas-negativa");
                    });

                    const flecha_puntero_final = document.getElementById("flecha_puntero_final");
                    if (!flecha_puntero_final) return;
                    const hijos = flecha_puntero_final.children;

                    for (const hijo of hijos) {
                      (hijo as HTMLElement).style.transition = "top 2s ease-out";
                    }

                    root.style.setProperty('--linea-flecha-final-top', `${DOM.finalUl()!.offsetTop - 250}px`);
                    root.style.setProperty('--nulo-top', `${DOM.nulo.offsetTop - 250}px`);
                    root.style.setProperty('--punta-flecha-final-top', `${DOM.nulo.offsetTop + DOM.nulo.offsetHeight - 250}px`);

                    DOM.contenedorNodos.lastElementChild?.addEventListener("transitionend", function ultimaParte() {

                      ///Analizar lo de este condicional a ver si lo de coso va afuera 
                      //// lo de los comentarios va afuera.

                      if (layout.totalFilas == 2) {    
                        DOM.contenedorNodos?.classList.remove("cambio-flex", "margin-flex");
                        DOM.contenedorFlechas?.classList.remove("cambio-flex");
                      }
                      else {
                         if(layout.totalFilas >= 2) {
                          DOM.contenedorFlechas?.classList.add("margin-flex");
                         }
                      }


                      const saltoNodos = DOM.contenedorNodos.querySelectorAll(".salto-flex")[0];

                      if (saltoNodos) saltoNodos.remove();

                      const saltoFlechas = DOM.contenedorFlechas.querySelectorAll(".salto-flex")[0];
                      if (saltoFlechas) saltoFlechas.remove();

                      DOM.contenedorFlechas.querySelector(".flecha-spacer-fila")?.remove();


                      const nodosRestantes = Array.from(getNodos() as HTMLElement[]);
                      nodosRestantes.forEach(nodo => {
                        nodo.classList.remove("transicion-nodos-negativa");
                      });

                      const contenedorFlechas = document.getElementById("contenedor_flechas");
                      if (contenedorFlechas) {
                        const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
                        flechasExistentes.forEach((flecha) => {
                          (flecha as HTMLElement).classList.remove("transicion-flechas-negativa");
                        });
                      }


                      
                      const flechasCurvas = DOM.contenedorFlechasCurvas.querySelectorAll(".svg-flecha-interfila");
                      flechasCurvas.forEach((flecha) => {
                        // Replicamos la limpieza de tu setFlechasNodos() para permitir la transición suave
                        
                        (flecha as HTMLElement).classList.remove("transicion-flechas-negativa");
                        const alturaFC = (flecha as HTMLElement).style.getPropertyValue("top");
                        console.log("La altura de la flecha curva es: ",alturaFC);
                        (flecha as HTMLElement).style.setProperty("top",`calc(${alturaFC} - 250px)`);
                      });


                      sacarNodo(data);

                      setFlechaInicial(true, necesitaTransicion);
                      // Liberamos los controles de la UI al terminar la secuencia completa
                      document.removeEventListener("click", handler, true);
                      DOM.agregarComienzo.disabled = false;
                      DOM.agregarFinal.disabled = false;
                      DOM.contenedorNodos.lastElementChild?.removeEventListener("transitionend", ultimaParte);

                    });

                  }, 100);

                }
              });

            }

            inicialUl.removeEventListener("transitionend", a);
          });
        }
      };

    }

  }

}



/* ==========================================================================
   2. BORRAR NODO AL COMIENZO
   ========================================================================== */
// export function borrarNodoAlComienzo(data: string): void {
//   if (!DOM.verificarDOM() || DOM.contenedorNodos.childElementCount === 0) return;


//   const nodos = getNodos() as HTMLDivElement[];
//   const flechas = getFlechas() as HTMLDivElement[];


//   document.addEventListener("click", handler, true);
//   DOM.agregarComienzo.disabled = true;
//   DOM.agregarFinal.disabled = true;

//   necesitaTransicion = 1;



// const M = 5; // Tu límite configurado por fila
  
  
  
//   const layout = obtenerInfoLayout(M);

//  const nodosPrimeraFila = getCantidadNodosFila(layout, 0);

// if (nodosPrimeraFila > 1) {
// const flechaObjetivo = flechas[0];
//   if (flechaObjetivo) {
//     const ul = obtenerSubElemento(flechaObjetivo, "underline");
//     const ls = obtenerSubElemento(flechaObjetivo, "linea-s");
//     const li = obtenerSubElemento(flechaObjetivo, "linea-i");

//     ul.classList.remove("inmediato");
//     ls.classList.remove("inmediato");
//     li.classList.remove("inmediato");
//     ul.classList.add("arrowend-first-ul");
//     ls.classList.add("arrowend-first");
//     li.classList.add("arrowend-first");

//     setTimeout(() => {
//       ul.style.width = '0px';
//       ls.style.width = '0px';
//       li.style.width = '0px';
//     }, 100);

//     ul.addEventListener("transitionend", function fu() {



//       necesitaTransicion = 1;
//       setFlechaInicial(false, necesitaTransicion);

//        const inicialUl = DOM.inicialUl();

//   inicialUl?.addEventListener("transitionend", function fpu() {
//     setTimeout(() => {
//       const primerHijo = DOM.contenedorNodos.firstElementChild as HTMLElement;
//       if (primerHijo) {
//         primerHijo.classList.remove("inmediato-nodo");
//         primerHijo.style.opacity = "0";
//       }
//     }, 1100);
     
//      const primerHijo = DOM.contenedorNodos.firstElementChild as HTMLElement;
//     if (primerHijo) {
//       primerHijo.addEventListener("transitionend", function fn() {
//         const nodoUltimo = DOM.contenedorNodos.lastElementChild as HTMLElement;
//         s1 = ((DOM.contenedorNodos.offsetWidth - (nodosPrimeraFila) * nodoUltimo.offsetWidth) / (nodosPrimeraFila + 1));
//         s2 = (DOM.contenedorNodos.offsetWidth - (nodosPrimeraFila - 1) * nodoUltimo.offsetWidth) / (nodosPrimeraFila);
     

//           if (layout.totalFilas === 1) {
//             // Solo si estamos en la Fila 1 ajustamos la flecha del puntero inicial (StrPtr)
//             setFlechaFinal(true, necesitaTransicion, s2);
//           }
//         setFlechasNodosDefinitiva(necesitaTransicion, 1, s1, s2, "emisor", layout);



//          const unicoNodoFila1 = DOM.contenedorNodos.querySelectorAll(".caja-nodo")[1] as HTMLElement;


//           unicoNodoFila1.addEventListener("transitionend", function g() {




//             if(layout.totalFilas > 1 && layout.nodosPorFila.get(0)! == 2) {
//                           const spacer = document.createElement("div");
//                           spacer.classList.add("flecha-spacer-fila");
//                           DOM.contenedorFlechas.prepend(spacer);
//                        if(layout.totalFilas >=2 )
//                           DOM.contenedorFlechas.classList.remove("margin-flex");
//           }

//           sacarNodo(data);
//           for (let i = 0; i < (nodosPrimeraFila - 1 ); i++) {
//             nodos[i].classList.add("no-mover");
//             nodos[i].style.left = '0px';
//             flechas[i].classList.remove("flecha-animando");
//           }

//           sacarFlecha(0);



//                 if (layout.totalFilas == 1 && flechas.length != 0 ) {

//                     flechas.forEach((flecha) => {

//                       // (flecha as HTMLElement).style.removeProperty("width");

//                       (flecha as HTMLElement).classList.remove("flecha-animando");
//                     });

//                 }
   

//            setTimeout(() => {
//             setFlechaInicial(true,1);
//           }, 1000);
          
          
//           const inicialLi = DOM.inicialLi();
//             inicialLi?.addEventListener("transitionend", function h() {
//             document.removeEventListener("click", handler, true);
//             DOM.agregarComienzo.disabled = false;
//             DOM.agregarFinal.disabled = false;


//             // inicialUl?.classList.remove("no-desplazar");

  
//             inicialLi.removeEventListener("transitionend", h);
//           });

//               // actualizarSelectoresIntermedios();

              

//               unicoNodoFila1.removeEventListener("transitionend", g);
//             });



//         primerHijo.removeEventListener("transitionend", fn);
//       });
//     }


//     inicialUl.removeEventListener("transitionend", fpu);
//   });

//       ul.removeEventListener("transitionend", fu);
//     });
//   }


    
//     return;



//   }
//   else {
//       console.log("Iniciando reversión: Desvaneciendo punta de flecha curva...");
//       const flechaCurva = DOM.contenedorFlechasCurvas?.firstElementChild as SVGElement;
//       const pathCurva = flechaCurva?.firstElementChild as SVGPathElement | null;
      
  
    
//       if (pathCurva) {

   


// // 1. Primero se encogen las patitas azules hacia la punta
//         const animsPunta = animarPuntaAzul(flechaCurva, false);

//         animsPunta[0].onfinish = () => {
//           // 2. Una vez que desapareció la punta, recién ahí se retrocede/desvanece la curva roja
//           const animacionCurva = animarPath(pathCurva!, false);


//           animacionCurva.onfinish = () => {
//           console.log("La animación del path terminó. Eliminando contenedor SVG...");
//           const svgContenedor = pathCurva.closest(".svg-flecha-interfila");
//           svgContenedor?.remove();


//         // -------------------------------------------------------------------------
//           // PASO 2: Contraer la flecha inicial (StrPtr)
//           // -------------------------------------------------------------------------
//           necesitaTransicion = 1;
//           setFlechaInicial(false, necesitaTransicion);

//           const inicialUl = DOM.inicialUl();

//           inicialUl?.addEventListener("transitionend", function a() { 
//             // -------------------------------------------------------------------------
//             // PASO 3: Hacer invisible el primer nodo
//             // -------------------------------------------------------------------------
//             const primerNodo = nodos[0];
//             if (primerNodo) {
//               primerNodo.style.removeProperty("opacity");

//               primerNodo.addEventListener("transitionend", function handlerOcultarNodo(ev) {
//               if (ev.propertyName === 'opacity') {
//                 primerNodo.removeEventListener("transitionend", handlerOcultarNodo);
//                 console.log("🚀 PASO 3 Terminado: El nodo es invisible. Listo para congelar abajo (Paso 4).");
                
//                 // Aquí vas a meter tu Paso 4 de mutación limpia del DOM
//                 // A. Mutación física del DOM (Borramos nodo y el salto flex)
              



//                  const auxAltura = DOM.principal.offsetHeight;
//                 // B. Achicamos principal y contenedores a 400px de golpe (sin transición todavía)
//                  root.style.setProperty('--principal-height', `${ DOM.principal.offsetHeight  - 200 -  50 * (layout.totalFilas > 2 ? 1 : 0)}px`);

                      
//                 const contenedorFlechas = document.getElementById("contenedor_flechas");
//                 if (contenedorFlechas) {
//                 }


                

//                 setTimeout(()=> {


                  

//                    if (DOM.principalWrapper.style.getPropertyValue("max-height") == "" || window.alturaDeVentana != window.innerHeight) {
                    
//                      window.alturaDeVentana = window.innerHeight;
//                     // 2. Calcular la altura máxima física disponible en el viewport
//                     //    (Alto total de ventana - Margen inferior deseado - Distancia desde el techo hasta el wrapper)
//                     const maxPermitido = window.alturaDeVentana - 8 - DOM.principalWrapper.offsetTop;
                    
//                     // 3. Aplicar el alto deseado (ej: 400, 600, 800...), pero frenado en la altura máxima real
//                     const altoDeseado =  auxAltura - 200 -  50 * (layout.totalFilas > 2 ? 1 : 0); // El valor que quieras según las filas
//                     const altoFinal = Math.min(altoDeseado, maxPermitido);
                    
//                     // if (altoFinal != maxPermitido)
//                     //  DOM.principalWrapper.style.setProperty('max-height', `${altoFinal}px`);
                    
//                     root.style.setProperty('--wrapper-height', `${altoFinal}px`);
//                     }

                  
//                   const nodosRestantes = Array.from(getNodos() as HTMLElement[]);
//                   nodosRestantes.forEach(nodo => {
//                      nodo.classList.remove("inmediato-nodo", "inmediato", "inmediato_reacomodo", "no-mover");
                    
                     
//                     nodo.classList.add("transicion-nodos-negativa");

//                   });

//                        const contenedorFlechas = DOM.contenedorFlechas;
//                         if (contenedorFlechas) {
//                           const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
                          
//                           flechasExistentes.forEach((flecha) => {
                            
//                             (flecha as HTMLElement).classList.add("transicion-flechas-negativa");
//                           });
//                         }

//                           const flecha_puntero_final = document.getElementById("flecha_puntero_final");
//                           if (!flecha_puntero_final) return;
//                           const hijos = flecha_puntero_final.children;
                        
//                                   for (const hijo of hijos) {
//                                     (hijo as HTMLElement).style.transition = "top 2s ease-in-out";
                                    
//                                   }    

          
//                                     root.style.setProperty('--linea-flecha-final-top', `${DOM.finalUl()!.offsetTop - 250}px`);
//                                     root.style.setProperty('--nulo-top', `${DOM.nulo.offsetTop - 250}px`);
//                                     root.style.setProperty('--punta-flecha-final-top', `${DOM.nulo.offsetTop + DOM.nulo.offsetHeight - 250}px`);


//             DOM.principalWrapper.addEventListener("transitionend", function ultimaParte() {
                       

  
                
//                 ///Analizar lo de este condicional a ver si lo de coso va afuera 
//               //// lo de los comentarios va afuera.
//                   if (layout.totalFilas == 2) {
//                   DOM.contenedorNodos?.classList.remove("cambio-flex", "margin-flex");
                 

//             // DOM.contenedorFlechas.querySelector(".salto-flex")?.remove();



//                    DOM.contenedorFlechas?.classList.remove("cambio-flex");


//             const saltoNodos = DOM.contenedorNodos.querySelectorAll(".salto-flex")[0];


//                 if (saltoNodos) saltoNodos.remove();

                   
//                 const saltoFlechas = DOM.contenedorFlechas.querySelectorAll(".salto-flex")[0];
//                 if (saltoFlechas) saltoFlechas.remove();
                  
//                    DOM.contenedorFlechas.querySelector(".flecha-spacer-fila")?.remove();

//                     const nodosRestantes = Array.from(getNodos() as HTMLElement[]);
//                   nodosRestantes.forEach(nodo => {
//                     nodo.classList.remove("transicion-nodos-negativa");
                    
//                   });

                  
//                   const contenedorFlechas = document.getElementById("contenedor_flechas");
//                   if (contenedorFlechas) {
//                     const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
//                     flechasExistentes.forEach((flecha) => {
//                     (flecha as HTMLElement).classList.remove("transicion-flechas-negativa");
                    
//                     });
//                   }
//                 }
//                        sacarNodo(data);

//                                         setFlechaInicial(true, necesitaTransicion);
                    
//                                         // Aseguramos las variables CSS de la punta de la flecha curva en su destino exacto

//                                         // document.documentElement.style.setProperty('--punta-flecha-curva-opacity', '1');
                    
                    
//                                         // Liberamos los controles de la UI al terminar la secuencia completa
//                                         document.removeEventListener("click", handler, true);
//                                         DOM.agregarComienzo.disabled = false;
//                                         DOM.agregarFinal.disabled = false;
//                     DOM.principalWrapper.removeEventListener("transitionend", ultimaParte);
                                        
//                   });

//                 },100);

                  




//               }
//             });

//               }


//           inicialUl.removeEventListener("transitionend", a);
//             });
//         }
//         };










 
//       }

//   }
 
// }





// const M = 5; // Límite configurado por fila

// /**
//  * Función Principal: Borrar Nodo al Comienzo
//  */
// export async function borrarNodoAlComienzo(data: string): Promise<void> {
//   if (!DOM.verificarDOM() || DOM.contenedorNodos.childElementCount === 0) return;

//   prepararEstructuraBorrarComienzo();

//   necesitaTransicion = 1;
//   const layout = obtenerInfoLayout(M);
//   const nodosPrimeraFila = getCantidadNodosFila(layout, 0);

//   if (nodosPrimeraFila > 1) {
//     // RAMA A: Eliminación en la primera fila (sin colapso de filas complejas)
//     await ejecutarRamaHorizontalBorrarComienzo(data, layout, nodosPrimeraFila, necesitaTransicion);
//   } else {
//     // RAMA B: Eliminación del primer nodo que provoca colapso/reacomodo de fila superior
//     await ejecutarRamaReversionFilaBorrarComienzo(data, layout, necesitaTransicion);
//   }
// }

// // =============================================================================
// // SUB-RAMAS PRINCIPALES
// // =============================================================================

// /**
//  * RAMA A: Reacomodo horizontal dentro de la primera fila
//  */
// async function ejecutarRamaHorizontalBorrarComienzo(
//   data: string,
//   layout: any,
//   nodosPrimeraFila: number,
//   necesitaTransicion: number
// ): Promise<void> {
//   const flechas = getFlechas() as HTMLDivElement[];
//   const flechaObjetivo = flechas[0];

//   if (flechaObjetivo) {
//     const ul = obtenerSubElemento(flechaObjetivo, "underline");
//     const ls = obtenerSubElemento(flechaObjetivo, "linea-s");
//     const li = obtenerSubElemento(flechaObjetivo, "linea-i");

//     ul.classList.remove("inmediato");
//     ls.classList.remove("inmediato");
//     li.classList.remove("inmediato");
//     ul.classList.add("arrowend-first-ul");
//     ls.classList.add("arrowend-first");
//     li.classList.add("arrowend-first");

//     await esperar(100);
//     ul.style.width = "0px";
//     ls.style.width = "0px";
//     li.style.width = "0px";

//     await esperarTransicion(ul);
//   }

//   // Desactivar puntero inicial
//   setFlechaInicial(false, necesitaTransicion);
//   const inicialUl = DOM.inicialUl();
//   if (inicialUl) {
//     await esperarTransicion(inicialUl);
//   }

//   await esperar(1100);

//   // Ocultar el primer nodo
//   const primerHijo = DOM.contenedorNodos.firstElementChild as HTMLElement;
//   if (primerHijo) {
//     primerHijo.classList.remove("inmediato-nodo");
//     primerHijo.style.opacity = "0";
//     await esperarTransicion(primerHijo);
//   }

//   // Recalcular espaciados de nodos
//   const nodoUltimo = DOM.contenedorNodos.lastElementChild as HTMLElement;
//   const s1 = (DOM.contenedorNodos.offsetWidth - nodosPrimeraFila * nodoUltimo.offsetWidth) / (nodosPrimeraFila + 1);
//   const s2 = (DOM.contenedorNodos.offsetWidth - (nodosPrimeraFila - 1) * nodoUltimo.offsetWidth) / nodosPrimeraFila;

//   if (layout.totalFilas === 1) {
//     setFlechaFinal(true, necesitaTransicion, s2);
//   }

//   setFlechasNodosDefinitiva(necesitaTransicion, 1, s1, s2, "emisor", layout);

//   const unicoNodoFila1 = DOM.contenedorNodos.querySelectorAll(".caja-nodo")[1] as HTMLElement;
//   if (unicoNodoFila1) {
//     await esperarTransicion(unicoNodoFila1);
//   }

//   // Inserción de spacer si la fila pasa a tener estructura especial
//   if (layout.totalFilas > 1 && layout.nodosPorFila.get(0) === 2) {
//     const spacer = document.createElement("div");
//     spacer.classList.add("flecha-spacer-fila");
//     DOM.contenedorFlechas.prepend(spacer);

//     if (layout.totalFilas >= 2) {
//       DOM.contenedorFlechas.classList.remove("margin-flex");
//     }
//   }

//   // Remoción del nodo e iteración de clases sobre los remanentes
//   sacarNodo(data);

//   const nodos = getNodos() as HTMLDivElement[];
//   for (let i = 0; i < nodosPrimeraFila - 1; i++) {
//     if (nodos[i]) {
//       nodos[i].classList.add("no-mover");
//       nodos[i].style.left = "0px";
//     }
//     if (flechas[i]) {
//       flechas[i].classList.remove("flecha-animando");
//     }
//   }

//   sacarFlecha(0);

//   if (layout.totalFilas === 1 && flechas.length !== 0) {
//     flechas.forEach((flecha) => {
//       flecha.classList.remove("flecha-animando");
//     });
//   }

//   await esperar(1000);
//   setFlechaInicial(true, 1);

//   const inicialLi = DOM.inicialLi();
//   if (inicialLi) {
//     await esperarTransicion(inicialLi);
//   }

//   finalizarProcesoBorrarComienzo();
// }

// /**
//  * RAMA B: Reversión de la curva interfila y colapso vertical
//  */
// async function ejecutarRamaReversionFilaBorrarComienzo(
//   data: string,
//   layout: any,
//   necesitaTransicion: number
// ): Promise<void> {
//   const flechaCurva = DOM.contenedorFlechasCurvas?.firstElementChild as SVGElement;
//   const pathCurva = flechaCurva?.firstElementChild as SVGPathElement | null;


//   if (pathCurva) {
//   // 1. Encoger patitas azules (false = desaparecer)
//   await animarPuntaAzulAsync(flechaCurva, false);

//   // 2. Desvanecer la curva SVG (false = desaparecer)
//   await animarPathAsync(pathCurva, false);

//   const svgContenedor = pathCurva.closest(".svg-flecha-interfila");
//   svgContenedor?.remove();
// }

//   // 3. Contraer flecha inicial
//   setFlechaInicial(false, necesitaTransicion);
//   const inicialUl = DOM.inicialUl();
//   if (inicialUl) {
//     await esperarTransicion(inicialUl);
//   }

//   // 4. Desvanecer el primer nodo
//   const nodos = getNodos() as HTMLDivElement[];
//   const primerNodo = nodos[0];
//   if (primerNodo) {
//     primerNodo.style.removeProperty("opacity");
//     await esperarTransicion(primerNodo);
//   }

//   // 5. Ajuste de dimensiones de contenedor y variables CSS
//   const auxAltura = DOM.principal.offsetHeight;
//   root.style.setProperty(
//     "--principal-height",
//     `${auxAltura - 200 - 50 * (layout.totalFilas > 2 ? 1 : 0)}px`
//   );

//   await esperar(100);

//   // Recalculo de Wrapper y dimensiones de ventana
//   if (
//     DOM.principalWrapper.style.getPropertyValue("max-height") === "" ||
//     window.alturaDeVentana !== window.innerHeight
//   ) {
//     window.alturaDeVentana = window.innerHeight;
//     const maxPermitido = window.alturaDeVentana - 8 - DOM.principalWrapper.offsetTop;
//     const altoDeseado = auxAltura - 200 - 50 * (layout.totalFilas > 2 ? 1 : 0);
//     const altoFinal = Math.min(altoDeseado, maxPermitido);

//     root.style.setProperty("--wrapper-height", `${altoFinal}px`);
//   }

//   // Aplicación de clases de transición negativa a nodos y flechas restantes
//   const nodosRestantes = Array.from(getNodos() as HTMLElement[]);
//   nodosRestantes.forEach((nodo) => {
//     nodo.classList.remove("inmediato-nodo", "inmediato", "inmediato_reacomodo", "no-mover");
//     nodo.classList.add("transicion-nodos-negativa");
//   });

//   const contenedorFlechas = DOM.contenedorFlechas;
//   if (contenedorFlechas) {
//     const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
//     flechasExistentes.forEach((flecha) => {
//       (flecha as HTMLElement).classList.add("transicion-flechas-negativa");
//     });
//   }

//   // Transición de la flecha del puntero final y elemento nulo
//   const flechaPunteroFinal = document.getElementById("flecha_puntero_final");
//   if (flechaPunteroFinal) {
//     for (const hijo of Array.from(flechaPunteroFinal.children)) {
//       (hijo as HTMLElement).style.transition = "top 2s ease-in-out";
//     }
//   }

//   const finalUl = DOM.finalUl();
//   if (finalUl) {
//     root.style.setProperty("--linea-flecha-final-top", `${finalUl.offsetTop - 250}px`);
//   }
//   root.style.setProperty("--nulo-top", `${DOM.nulo.offsetTop - 250}px`);
//   root.style.setProperty("--punta-flecha-final-top", `${DOM.nulo.offsetTop + DOM.nulo.offsetHeight - 250}px`);

//   // Esperar a que el wrapper complete la transición física
//   await esperarTransicion(DOM.principalWrapper);

//   // Limpieza de estructura Flex al colapsar filas
//   if (layout.totalFilas === 2) {
//     DOM.contenedorNodos?.classList.remove("cambio-flex", "margin-flex");
//     DOM.contenedorFlechas?.classList.remove("cambio-flex");

//     const saltoNodos = DOM.contenedorNodos.querySelectorAll(".salto-flex")[0];
//     if (saltoNodos) saltoNodos.remove();

//     const saltoFlechas = DOM.contenedorFlechas.querySelectorAll(".salto-flex")[0];
//     if (saltoFlechas) saltoFlechas.remove();

//     DOM.contenedorFlechas.querySelector(".flecha-spacer-fila")?.remove();

//     nodosRestantes.forEach((nodo) => {
//       nodo.classList.remove("transicion-nodos-negativa");
//     });

//     if (contenedorFlechas) {
//       const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
//       flechasExistentes.forEach((flecha) => {
//         (flecha as HTMLElement).classList.remove("transicion-flechas-negativa");
//       });
//     }
//   }

//   sacarNodo(data);
//   setFlechaInicial(true, necesitaTransicion);

//   finalizarProcesoBorrarComienzo();
// }

// // =============================================================================
// // PASOS Y UTILIDADES DE APOYO
// // =============================================================================

// function prepararEstructuraBorrarComienzo(): void {
//   document.addEventListener("click", handler, true);
//   DOM.agregarComienzo.disabled = true;
//   DOM.agregarFinal.disabled = true;
// }

// function finalizarProcesoBorrarComienzo(): void {
//   document.removeEventListener("click", handler, true);
//   DOM.agregarComienzo.disabled = false;
//   DOM.agregarFinal.disabled = false;
// }










// export function borrarNodoAlFinal(data: string): void {
//   if (!DOM.verificarDOM()) return;

//   const nodos = getNodos() as HTMLDivElement[];
//   const flechas = getFlechas() as HTMLDivElement[];
//   const totalNodos = nodos.length; // 🔥 Evaluamos acá el estado lógico antes de tocar el DOM

//   console.log("Entro a borrar nodo al final. Total nodos actuales:", totalNodos);

//   // Bloqueo de UI inicial estándar
//   document.addEventListener("click", handler, true);
//   DOM.agregarComienzo.disabled = true;
//   DOM.agregarFinal.disabled = true;

//   necesitaTransicion = 1;
//   setFlechaFinal(false, necesitaTransicion);

//   const finalUl = DOM.finalUl();





//   const M = 5; // Tu límite configurado por fila
  
  
  
//   const layout = obtenerInfoLayout(M);
// const n = layout.nodosUltimaFila;
//  finalUl?.addEventListener("transitionend", function fpu() {
//       finalUl.removeEventListener("transitionend", fpu);
//   if(n > 1) {


//       const flechaUltima = flechas[flechas.length - 1];
//       if (!flechaUltima) return;

//       const ul = obtenerSubElemento(flechaUltima, "underline");
//       const ls = obtenerSubElemento(flechaUltima, "linea-s");
//       const li = obtenerSubElemento(flechaUltima, "linea-i");

//       ul.classList.remove("inmediato");

//       setTimeout(() => {
//         ul.style.width = '0px';
//         ls.style.width = '0px';
//         li.style.width = '0px';
//         ul.classList.add("arrowend-first-ul");
//         ls.classList.add("arrowend-first");
//         li.classList.add("arrowend-first");
//       }, 100);

//       // Escuchamos el fin de la flecha para DESVANECER el nodo
//       ul.addEventListener("transitionend", function fu() {
//         ul.removeEventListener("transitionend", fu);

//         const ultimoHijo = DOM.contenedorNodos.lastElementChild as HTMLElement;
//         if (!ultimoHijo) return;

//         ultimoHijo.classList.remove("inmediato-nodo");
//         ultimoHijo.style.opacity = "0";

//         // 🔥 CORRECCIÓN CRÍTICA: El reacomodo matemático escucha al nodo RECIÉN CUANDO EMPIEZA a desaparecer
//         ultimoHijo.addEventListener("transitionend", function fn() {
//           ultimoHijo.removeEventListener("transitionend", fn);

//           // const listaNodos = DOM.contenedorNodos.children;
//           const nodoUltimo = DOM.contenedorNodos.lastElementChild as HTMLElement;
  
//           // Cálculo del layout inverso
//           s1 = ((DOM.contenedorNodos.offsetWidth - (n) * nodoUltimo.offsetWidth) / (n + 1));
//           s2 = (DOM.contenedorNodos.offsetWidth - (n - 1) * nodoUltimo.offsetWidth) / (n);


//            if (layout.totalFilas === 1) {
//               // Solo si estamos en la Fila 1 ajustamos la flecha del puntero inicial (StrPtr)
//               setFlechaInicial(true, necesitaTransicion, s2);
//               setFlechasNodos(1,0,s1,s2);
//             }
//           // Disparamos la animación que vamos a arreglar ahora
//           setFlechasNodosDefinitiva(1, 0, s1, s2, "receptor", layout);


//           const primeroNodoUltimaFila = nodos[layout.indiceInicioUltimaFila];
//           // const primeroNodoUltimaFila = DOM.contenedorNodos.querySelectorAll(".caja-nodo")[2] as HTMLElement;
//           if (!primeroNodoUltimaFila) return;

//           primeroNodoUltimaFila.addEventListener("transitionend", function g() {
//             primeroNodoUltimaFila.removeEventListener("transitionend", g);





//             sacarNodo(data);
            

//             for (let i = layout.indiceInicioUltimaFila ; i < layout.indiceInicioUltimaFila + layout.nodosUltimaFila-1 ; i++) {
//               nodos[i].classList.add("no-mover");
//               nodos[i].style.left = '0px';
//             }



             


//             if(layout.nodosUltimaFila == 2) {
//                           const spacer = document.createElement("div");
//                           spacer.classList.add("flecha-spacer-fila");
//                           DOM.contenedorFlechas.appendChild(spacer);
//           }

//             const flechas = DOM.contenedorFlechas.querySelectorAll(".arrow");
//             const cantidadFlechas = flechas.length;

//             sacarFlecha(cantidadFlechas-1);

           

//               if(layout.totalFilas >= 2) {

               
//                flechas.forEach((flecha) => {
//                       // (flecha as HTMLElement).style.marginTop = "150px";
//                       (flecha as HTMLElement).classList.remove("flecha-animando");
//                     })
                  
//              const haySpacer = DOM.contenedorFlechas.querySelectorAll(".flecha-spacer-fila").length == 1 && DOM.contenedorFlechas.lastElementChild?.classList.contains(".flechas-spacer-fila");
//              if(layout.totalFilas >= 2 && haySpacer == true) 
//                    DOM.contenedorFlechas?.classList.add("margin-flex");
//             }
//               else {
//                 if (layout.totalFilas == 1 && DOM.contenedorFlechas.hasChildNodes()) {
//                     flechas.forEach((flecha) => {

//                       // (flecha as HTMLElement).style.removeProperty("width");

//                       (flecha as HTMLElement).classList.remove("flecha-animando");
//                     });

//                 }
//               }
      

//            setFlechaFinal(true, 1);
            
//             const finalLi = DOM.finalLi();
//             finalLi?.addEventListener("transitionend", function h() {
//               finalLi.removeEventListener("transitionend", h);
//               document.removeEventListener("click", handler, true);
//               DOM.agregarComienzo.disabled = false;
//               DOM.agregarFinal.disabled = false;
//               finalUl?.classList.remove("no-desplazar");
//             });
//           });
//         });
//       });
//     finalUl.classList.add("no-desplazar");
//     return; // Fin absoluto del caso 4

    
//   }
//   else {
//  // =========================================================================
//       // 🔵 CAMINO MULTI-FILA (TOTALMENTE AISLADO)
//       // =========================================================================
//       console.log("Iniciando reversión: Desvaneciendo punta de flecha curva...");





     
//        const flechaCurva = DOM.contenedorFlechasCurvas?.lastElementChild as SVGElement;
//       const pathCurva = flechaCurva?.firstElementChild as SVGPathElement | null;
      

    
//       if (pathCurva) {




// // 1. Primero se encogen las patitas azules hacia la punta
//         const animsPunta = animarPuntaAzul(flechaCurva, false);

//         animsPunta[0].onfinish = () => {
//           // 2. Una vez que desapareció la punta, recién ahí se retrocede/desvanece la curva roja
//           const animacionCurva = animarPath(pathCurva!, false);



   
//           animacionCurva.onfinish = () => {


//                     console.log("La animación del path terminó. Eliminando contenedor SVG...");
//           const svgContenedor = pathCurva.closest(".svg-flecha-interfila");
//           svgContenedor?.remove();

//           const ultimoNodo = DOM.contenedorNodos.lastElementChild as HTMLElement | null;
          
//           if (ultimoNodo) {
//             console.log("Paso 1: Achicando el Wrapper externo a 400px (2 segundos)...");
//             ultimoNodo.style.removeProperty("opacity");

//             ultimoNodo.addEventListener('transitionend', function desvanecerNodo(e) {
//               if (e.propertyName === 'opacity') {
//                 ultimoNodo.removeEventListener('transitionend', desvanecerNodo);
                
//                 console.log("Nodo invisible. Iniciando contracción coordinada del Wrapper.");


//                 root.style.setProperty('--linea-flecha-final-top', `${DOM.finalUl()!.offsetTop - 250}px`);
//                 root.style.setProperty('--nulo-top', `${DOM.nulo.offsetTop - 250}px`);
//                 root.style.setProperty('--punta-flecha-final-top', `${DOM.finalLi()!.offsetTop - 250}px`);


// if (DOM.principalWrapper.style.getPropertyValue("max-height") == "" || window.alturaDeVentana != window.innerHeight) {

//    window.alturaDeVentana = window.innerHeight;
// // 2. Calcular la altura máxima física disponible en el viewport
// //    (Alto total de ventana - Margen inferior deseado - Distancia desde el techo hasta el wrapper)
// const maxPermitido = window.alturaDeVentana - 8 - DOM.principalWrapper.offsetTop;

// // 3. Aplicar el alto deseado (ej: 400, 600, 800...), pero frenado en la altura máxima real
// const altoDeseado =  DOM.principal.offsetHeight  - 200 -  50 * (layout.totalFilas > 2 ? 1 : 0); // El valor que quieras según las filas
// const altoFinal = Math.min(altoDeseado, maxPermitido);

// // if (altoFinal != maxPermitido)
// //  DOM.principalWrapper.style.setProperty('max-height', `${altoFinal}px`);

// root.style.setProperty('--wrapper-height', `${altoFinal}px`);
// }


// DOM.contenedorFlechas.lastElementChild?.remove();

//                 setTimeout(() => {
//                   console.log("Paso 2: Wrapper cerrado. Limpiando el DOM en bloque.");

//                   // 1. Borrado físico del DOM
//                   sacarNodo(data);
                  
                  




//                   // 2. Reseteamos las cajas internas barriendo estilos en línea
//                   root.style.setProperty('--principal-height', `${ DOM.principal.offsetHeight  - 200 -  50 * (layout.totalFilas > 2 ? 1 : 0)}px`);

//                   const saltoNodos = DOM.contenedorNodos.querySelectorAll(".salto-flex")[layout.totalFilas-2];


//                 if (saltoNodos) saltoNodos.remove();

                   
//                 const saltoFlechas = DOM.contenedorFlechas.querySelectorAll(".salto-flex")[layout.totalFilas-2];
//                 if (saltoNodos) saltoFlechas.remove();


//                 console.log("estoy en una posicion en la que no se borra margin flex");
//                 console.log("la cantidad de filas es: ",layout.totalFilas);
//                   if (layout.totalFilas == 2) {
//                   DOM.contenedorNodos.classList.remove("cambio-flex", "margin-flex");
                 





//                    DOM.contenedorFlechas?.classList.remove("cambio-flex", "margin-flex");
//                   }

      
                  


//                   const contenedorFlechas = document.getElementById("contenedor_flechas");
//                   if (contenedorFlechas) {
//                     const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
//                     if (layout.totalFilas == 2) {
//                     flechasExistentes.forEach((flecha) => {
//                     (flecha as HTMLElement).classList.remove("no_mover__flecha");

//                     // (flecha as HTMLElement).style.removeProperty("width"); 

//                      (flecha as HTMLElement).style.removeProperty("margin-top"); 
//                     });
//                       }
//                     else {


//                     }
//                   }

 

//                   // 3. Purgamos los inline styles residuales de los nodos de Fila 1 (Evita lefts molestos)
//                   const nodosRestantes = Array.from(getNodos() as HTMLElement[]);
//                   nodosRestantes.forEach(nodo => {
//                     nodo.style.removeProperty("transition");
//                     nodo.style.removeProperty("margin-top"); 
//                   });

//                   // 4. Revivimos la flecha final recta original
//                   setFlechaFinal(true, necesitaTransicion);

//                   // 5. Liberamos la aplicación
//                   document.removeEventListener("click", handler, true);
//                   DOM.agregarComienzo.disabled = false;
//                   DOM.agregarFinal.disabled = false;
                  
//                   finalUl?.classList.remove("no-desplazar");
//                   console.log("Reversión multi-fila completada con éxito.");
//                 }, 2000);
//               }
//             });
//           }

//           }
//         }



//       } else {
//         document.removeEventListener("click", handler, true);
//         DOM.agregarComienzo.disabled = false;
//         DOM.agregarFinal.disabled = false;
//       }

//   }

// });
//  finalUl?.classList.add("no-desplazar");
 
// }


export function borrarNodoAlFinal(data: string): void {
  if (!DOM.verificarDOM()) return;

  const nodos = getNodos() as HTMLDivElement[];
  const flechas = getFlechas() as HTMLDivElement[];
  const totalNodos = nodos.length; // 🔥 Evaluamos acá el estado lógico antes de tocar el DOM

  console.log("Entro a borrar nodo al final. Total nodos actuales:", totalNodos);

  // Bloqueo de UI inicial estándar
  document.addEventListener("click", handler, true);
  DOM.agregarComienzo.disabled = true;
  DOM.agregarFinal.disabled = true;

  necesitaTransicion = 1;
  setFlechaFinal(false, necesitaTransicion);

  const finalUl = DOM.finalUl();

  const M = 5; // Tu límite configurado por fila

  const layout = obtenerInfoLayout(M);
  const n = layout.nodosUltimaFila;

  finalUl?.addEventListener("transitionend", function fpu() {
    finalUl.removeEventListener("transitionend", fpu);

    if (n > 1) {

      const flechaUltima = flechas[flechas.length - 1];
      if (!flechaUltima) return;

      const ul = obtenerSubElemento(flechaUltima, "underline");
      const ls = obtenerSubElemento(flechaUltima, "linea-s");
      const li = obtenerSubElemento(flechaUltima, "linea-i");

      ul.classList.remove("inmediato");

      setTimeout(() => {
        ul.style.width = '0px';
        ls.style.width = '0px';
        li.style.width = '0px';
        ul.classList.add("arrowend-first-ul");
        ls.classList.add("arrowend-first");
        li.classList.add("arrowend-first");
      }, 100);

      // Escuchamos el fin de la flecha para DESVANECER el nodo
      ul.addEventListener("transitionend", function fu() {
        ul.removeEventListener("transitionend", fu);

        const ultimoHijo = DOM.contenedorNodos.lastElementChild as HTMLElement;
        if (!ultimoHijo) return;

        ultimoHijo.classList.remove("inmediato-nodo");
        ultimoHijo.style.opacity = "0";

        // 🔥 CORRECCIÓN CRÍTICA: El reacomodo matemático escucha al nodo RECIÉN CUANDO EMPIEZA a desaparecer
        ultimoHijo.addEventListener("transitionend", function fn() {
          ultimoHijo.removeEventListener("transitionend", fn);

          // const listaNodos = DOM.contenedorNodos.children;
          const nodoUltimo = DOM.contenedorNodos.lastElementChild as HTMLElement;

          // Cálculo del layout inverso
          s1 = ((DOM.contenedorNodos.offsetWidth - (n) * nodoUltimo.offsetWidth) / (n + 1));
          s2 = (DOM.contenedorNodos.offsetWidth - (n - 1) * nodoUltimo.offsetWidth) / (n);

          if (layout.totalFilas === 1) {
            // Solo si estamos en la Fila 1 ajustamos la flecha del puntero inicial (StrPtr)
            setFlechaInicial(true, necesitaTransicion, s2);
            setFlechasNodos(1, 0, s1, s2);
          }
          // Disparamos la animación que vamos a arreglar ahora
          setFlechasNodosDefinitiva(1, 0, s1, s2, "receptor", layout);

          const primeroNodoUltimaFila = nodos[layout.indiceInicioUltimaFila];
          // const primeroNodoUltimaFila = DOM.contenedorNodos.querySelectorAll(".caja-nodo")[2] as HTMLElement;
          if (!primeroNodoUltimaFila) return;

          primeroNodoUltimaFila.addEventListener("transitionend", function g() {
            primeroNodoUltimaFila.removeEventListener("transitionend", g);

            sacarNodo(data);

            for (let i = layout.indiceInicioUltimaFila; i < layout.indiceInicioUltimaFila + layout.nodosUltimaFila - 1; i++) {
              nodos[i].classList.add("no-mover");
              nodos[i].style.left = '0px';
            }

            if (layout.nodosUltimaFila == 2) {
              const spacer = document.createElement("div");
              spacer.classList.add("flecha-spacer-fila");
              DOM.contenedorFlechas.appendChild(spacer);
            }

            const flechas = DOM.contenedorFlechas.querySelectorAll(".arrow");
            const cantidadFlechas = flechas.length;

            sacarFlecha(cantidadFlechas - 1);

            if (layout.totalFilas >= 2) {

              flechas.forEach((flecha) => {
                // (flecha as HTMLElement).style.marginTop = "150px";
                (flecha as HTMLElement).classList.remove("flecha-animando");
              });

              const haySpacer = DOM.contenedorFlechas.querySelectorAll(".flecha-spacer-fila").length == 1 && DOM.contenedorFlechas.lastElementChild?.classList.contains(".flechas-spacer-fila");
              if (layout.totalFilas >= 2 && haySpacer == true)
                DOM.contenedorFlechas?.classList.add("margin-flex");
            }
            else {
              if (layout.totalFilas == 1 && DOM.contenedorFlechas.hasChildNodes()) {
                flechas.forEach((flecha) => {

                  // (flecha as HTMLElement).style.removeProperty("width");

                  (flecha as HTMLElement).classList.remove("flecha-animando");
                });

              }
            }

            setFlechaFinal(true, 1);

            const finalLi = DOM.finalLi();
            finalLi?.addEventListener("transitionend", function h() {
              finalLi.removeEventListener("transitionend", h);
              document.removeEventListener("click", handler, true);
              DOM.agregarComienzo.disabled = false;
              DOM.agregarFinal.disabled = false;
              finalUl?.classList.remove("no-desplazar");
            });
          });
        });
      });
      finalUl.classList.add("no-desplazar");
      return; // Fin absoluto del caso 4

    }
    else {
      // =========================================================================
      // 🔵 CAMINO MULTI-FILA (TOTALMENTE AISLADO)
      // =========================================================================
      console.log("Iniciando reversión: Desvaneciendo punta de flecha curva...");

      const flechaCurva = DOM.contenedorFlechasCurvas?.lastElementChild as SVGElement;
      const pathCurva = flechaCurva?.firstElementChild as SVGPathElement | null;

      if (pathCurva) {

        // 1. Primero se encogen las patitas azules hacia la punta
        const animsPunta = animarPuntaAzul(flechaCurva, false);

        animsPunta[0].onfinish = () => {
          // 2. Una vez que desapareció la punta, recién ahí se retrocede/desvanece la curva roja
          const animacionCurva = animarPath(pathCurva!, false);

          animacionCurva.onfinish = () => {

            console.log("La animación del path terminó. Eliminando contenedor SVG...");
            const svgContenedor = pathCurva.closest(".svg-flecha-interfila");
            svgContenedor?.remove();

            const ultimoNodo = DOM.contenedorNodos.lastElementChild as HTMLElement | null;

            if (ultimoNodo) {
              console.log("Paso 1: Achicando el Wrapper externo a 400px (2 segundos)...");
              ultimoNodo.style.removeProperty("opacity");

              ultimoNodo.addEventListener('transitionend', function desvanecerNodo(e) {
                if (e.propertyName === 'opacity') {
                  ultimoNodo.removeEventListener('transitionend', desvanecerNodo);

                  console.log("Nodo invisible. Iniciando contracción coordinada del Wrapper.");
                  const auxAltura = DOM.principal.offsetHeight;
             
                  root.style.setProperty('--linea-flecha-final-top', `${DOM.finalUl()!.offsetTop - 250}px`);
                  root.style.setProperty('--nulo-top', `${DOM.nulo.offsetTop - 250}px`);
                  root.style.setProperty('--punta-flecha-final-top', `${DOM.finalLi()!.offsetTop - 250}px`);





                  // if (DOM.principalWrapper.style.getPropertyValue("max-height") == "" || window.alturaDeVentana != window.innerHeight) {

                  //   window.alturaDeVentana = window.innerHeight;
                  //   // 2. Calcular la altura máxima física disponible en el viewport
                  //   //    (Alto total de ventana - Margen inferior deseado - Distancia desde el techo hasta el wrapper)
                  //   const maxPermitido = window.alturaDeVentana - 8 - DOM.principalWrapper.offsetTop;

                  //   // 3. Aplicar el alto deseado (ej: 400, 600, 800...), pero frenado en la altura máxima real
                  //   const altoDeseado = auxAltura - 200 - 50 * (layout.totalFilas > 2 ? 1 : 0); // El valor que quieras según las filas
                  //   const altoFinal = Math.min(altoDeseado, maxPermitido);

                  //   // if (altoFinal != maxPermitido)
                  //   //  DOM.principalWrapper.style.setProperty('max-height', `${altoFinal}px`);

                  //   root.style.setProperty('--wrapper-height', `${altoFinal}px`);
                  // }


                  const altoDeseado = auxAltura - 200 - 50 * (layout.totalFilas > 2 ? 1 : 0);
                  const puedeAchicarse = altoDeseado < DOM.principalWrapper.offsetHeight; //&& DOM.principalWrapper.style.getPropertyValue("max-height") == "";
                  // if (DOM.principalWrapper.style.getPropertyValue("max-height") == "" || window.alturaDeVentana != window.innerHeight) {
                  // if (root.style.getPropertyPriority("--wrapper-height") != "" || window.alturaDeVentana != window.innerHeight) { 
                  if (puedeAchicarse || window.alturaDeVentana != window.innerHeight) {
                    window.alturaDeVentana = window.innerHeight;
                    // 2. Calcular la altura máxima física disponible en el viewport
                    //    (Alto total de ventana - Margen inferior deseado - Distancia desde el techo hasta el wrapper)
                    const maxPermitido = window.alturaDeVentana - 8 - DOM.principalWrapper.offsetTop;

                    // 3. Aplicar el alto deseado (ej: 400, 600, 800...), pero frenado en la altura máxima real
                    // const altoDeseado = auxAltura - 200 - 50 * (layout.totalFilas > 2 ? 1 : 0);
                    console.log("El alto deseado es: ",altoDeseado);
                    console.log("El max permitido es: ",maxPermitido); // El valor que quieras según las filas
                    const altoFinal = Math.min(altoDeseado, maxPermitido);

                      if (altoFinal != maxPermitido)
                      DOM.principalWrapper.style.removeProperty('max-height');
                    //  DOM.principalWrapper.style.setProperty('max-height', `${altoFinal}px`);

                    root.style.setProperty('--wrapper-height', `${altoFinal}px`);
                  }




                  DOM.contenedorFlechas.lastElementChild?.remove();

                  setTimeout(() => {
                    console.log("Paso 2: Wrapper cerrado. Limpiando el DOM en bloque.");

                    // 1. Borrado físico del DOM
                    sacarNodo(data);

                    // 2. Reseteamos las cajas internas barriendo estilos en línea
                    root.style.setProperty('--principal-height', `${DOM.principal.offsetHeight - 200 - 50 * (layout.totalFilas > 2 ? 1 : 0)}px`);

                    const saltoNodos = DOM.contenedorNodos.querySelectorAll(".salto-flex")[layout.totalFilas - 2];

                    if (saltoNodos) saltoNodos.remove();

                    const saltoFlechas = DOM.contenedorFlechas.querySelectorAll(".salto-flex")[layout.totalFilas - 2];
                    if (saltoNodos) saltoFlechas.remove();

                    console.log("estoy en una posicion en la que no se borra margin flex");
                    console.log("la cantidad de filas es: ", layout.totalFilas);
                    if (layout.totalFilas == 2) {
                      DOM.contenedorNodos.classList.remove("cambio-flex", "margin-flex");

                      DOM.contenedorFlechas?.classList.remove("cambio-flex", "margin-flex");
                    }

                    const contenedorFlechas = document.getElementById("contenedor_flechas");
                    if (contenedorFlechas) {
                      const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
                      if (layout.totalFilas == 2) {
                        flechasExistentes.forEach((flecha) => {
                          (flecha as HTMLElement).classList.remove("no_mover__flecha");

                          // (flecha as HTMLElement).style.removeProperty("width"); 

                          (flecha as HTMLElement).style.removeProperty("margin-top");
                        });
                      }
                      else {

                      }
                    }

                    // 3. Purgamos los inline styles residuales de los nodos de Fila 1 (Evita lefts molestos)
                    const nodosRestantes = Array.from(getNodos() as HTMLElement[]);
                    nodosRestantes.forEach(nodo => {
                      nodo.style.removeProperty("transition");
                      nodo.style.removeProperty("margin-top");
                    });

                    // 4. Revivimos la flecha final recta original
                    setFlechaFinal(true, necesitaTransicion);

                    // 5. Liberamos la aplicación
                    document.removeEventListener("click", handler, true);
                    DOM.agregarComienzo.disabled = false;
                    DOM.agregarFinal.disabled = false;

                    setTimeout(()=> {finalUl?.classList.remove("no-desplazar");},100);

                    console.log("Reversión multi-fila completada con éxito.");
                  }, 2000);
                }
                finalUl?.classList.add("no-desplazar");
              });
            }

          }
        }

      } else {
        document.removeEventListener("click", handler, true);
        DOM.agregarComienzo.disabled = false;
        DOM.agregarFinal.disabled = false;
      }

    }

  });
  // finalUl?.classList.add("no-desplazar");

}



// export async function borrarNodoAlFinal(data: string): Promise<void> {
//   if (!DOM.verificarDOM()) return;

//   prepararEstructuraBorrarFinal();

//   necesitaTransicion = 1;
//   setFlechaFinal(false, necesitaTransicion);

//   const finalUl = DOM.finalUl();
//   if (finalUl) {
//     finalUl.classList.add("no-desplazar");
//     await esperarTransicion(finalUl);
//   }

//   const layout = obtenerInfoLayout(M);
//   const n = layout.nodosUltimaFila;

//   if (n > 1) {
//     // RAMA A: Eliminación dentro de la misma fila (sin colapso interfila)
//     await ejecutarRamaMismaFilaBorrarFinal(data, layout, n, necesitaTransicion);
//   } else {
//     // RAMA B: Reversión multi-fila (se elimina el único nodo de la última fila)
//     await ejecutarRamaReversionMultiFilaBorrarFinal(data, layout, necesitaTransicion);
//   }
// }

// // =============================================================================
// // SUB-RAMAS PRINCIPALES
// // =============================================================================

// /**
//  * RAMA A: Reacomodo horizontal dentro de la misma fila
//  */
// async function ejecutarRamaMismaFilaBorrarFinal(
//   data: string,
//   layout: any,
//   n: number,
//   necesitaTransicion: number
// ): Promise<void> {
//   const flechas = getFlechas() as HTMLDivElement[];
//   const flechaUltima = flechas[flechas.length - 1];

//   if (flechaUltima) {
//     const ul = obtenerSubElemento(flechaUltima, "underline");
//     const ls = obtenerSubElemento(flechaUltima, "linea-s");
//     const li = obtenerSubElemento(flechaUltima, "linea-i");

//     ul.classList.remove("inmediato");

//     await esperar(100);
//     ul.style.width = "0px";
//     ls.style.width = "0px";
//     li.style.width = "0px";
//     ul.classList.add("arrowend-first-ul");
//     ls.classList.add("arrowend-first");
//     li.classList.add("arrowend-first");

//     await esperarTransicion(ul);
//   }

//   // Desvanecer el último nodo
//   const ultimoHijo = DOM.contenedorNodos.lastElementChild as HTMLElement;
//   if (ultimoHijo) {
//     ultimoHijo.classList.remove("inmediato-nodo");
//     ultimoHijo.style.opacity = "0";
//     await esperarTransicion(ultimoHijo);
//   }

//   // Recalcular layout espacial
//   const nodoUltimo = DOM.contenedorNodos.lastElementChild as HTMLElement;
//   const s1 = (DOM.contenedorNodos.offsetWidth - n * nodoUltimo.offsetWidth) / (n + 1);
//   const s2 = (DOM.contenedorNodos.offsetWidth - (n - 1) * nodoUltimo.offsetWidth) / n;

//   if (layout.totalFilas === 1) {
//     setFlechaInicial(true, necesitaTransicion, s2);
//     setFlechasNodos(1, 0, s1, s2);
//   }

//   setFlechasNodosDefinitiva(1, 0, s1, s2, "receptor", layout);

//   const nodos = getNodos() as HTMLDivElement[];
//   const primeroNodoUltimaFila = nodos[layout.indiceInicioUltimaFila];

//   if (primeroNodoUltimaFila) {
//     await esperarTransicion(primeroNodoUltimaFila);
//   }

//   // Modificaciones del DOM y eliminación física
//   sacarNodo(data);

//   for (let i = layout.indiceInicioUltimaFila; i < layout.indiceInicioUltimaFila + layout.nodosUltimaFila - 1; i++) {
//     if (nodos[i]) {
//       nodos[i].classList.add("no-mover");
//       nodos[i].style.left = "0px";
//     }
//   }

//   if (layout.nodosUltimaFila === 2) {
//     const spacer = document.createElement("div");
//     spacer.classList.add("flecha-spacer-fila");
//     DOM.contenedorFlechas.appendChild(spacer);
//   }

//   const flechasDOM = DOM.contenedorFlechas.querySelectorAll(".arrow");
//   sacarFlecha(flechasDOM.length - 1);

//   if (layout.totalFilas >= 2) {
//     flechasDOM.forEach((flecha) => {
//       (flecha as HTMLElement).classList.remove("flecha-animando");
//     });

//     const haySpacer =
//       DOM.contenedorFlechas.querySelectorAll(".flecha-spacer-fila").length === 1 &&
//       DOM.contenedorFlechas.lastElementChild?.classList.contains("flecha-spacer-fila");

//     if (haySpacer) {
//       DOM.contenedorFlechas?.classList.add("margin-flex");
//     }
//   } else if (layout.totalFilas === 1 && DOM.contenedorFlechas.hasChildNodes()) {
//     flechasDOM.forEach((flecha) => {
//       (flecha as HTMLElement).classList.remove("flecha-animando");
//     });
//   }

//   setFlechaFinal(true, 1);

//   const finalLi = DOM.finalLi();
//   if (finalLi) {
//     await esperarTransicion(finalLi);
//   }

//   finalizarProcesoBorrarFinal();
// }

// /**
//  * RAMA B: Reversión multi-fila cuando cae el último nodo de una fila
//  */
// async function ejecutarRamaReversionMultiFilaBorrarFinal(
//   data: string,
//   layout: any,
//   necesitaTransicion: number
// ): Promise<void> {
//   const flechaCurva = DOM.contenedorFlechasCurvas?.lastElementChild as SVGElement;
//   const pathCurva = flechaCurva?.firstElementChild as SVGPathElement | null;

//   if (!pathCurva) {
//     finalizarProcesoBorrarFinal();
//     return;
//   }

//   // 1. Desaparecer curva interfila (false = contracción/desaparición)
//   await animarPuntaAzulAsync(flechaCurva, false);
//   await animarPathAsync(pathCurva, false);

//   const svgContenedor = pathCurva.closest(".svg-flecha-interfila");
//   svgContenedor?.remove();

//   // 2. Desvanecer último nodo
//   const ultimoNodo = DOM.contenedorNodos.lastElementChild as HTMLElement | null;
//   // if (ultimoNodo) {
//   //   ultimoNodo.style.removeProperty("opacity");
//   //   await esperarTransicion(ultimoNodo, "opacity");
//   // }
//   if (ultimoNodo) {
//   ultimoNodo.classList.remove("inmediato-nodo");
//   ultimoNodo.style.opacity = "0";
//   await esperarTransicion(ultimoNodo);
// }

//   // 3. Reajuste de variables CSS y dimensiones de contenedor
//   root.style.setProperty("--linea-flecha-final-top", `${DOM.finalUl()!.offsetTop - 250}px`);
//   root.style.setProperty("--nulo-top", `${DOM.nulo.offsetTop - 250}px`);
//   root.style.setProperty("--punta-flecha-final-top", `${DOM.finalLi()!.offsetTop - 250}px`);

//   if (
//     DOM.principalWrapper.style.getPropertyValue("max-height") === "" ||
//     window.alturaDeVentana !== window.innerHeight
//   ) {
//     window.alturaDeVentana = window.innerHeight;
//     const maxPermitido = window.alturaDeVentana - 8 - DOM.principalWrapper.offsetTop;
//     const altoDeseado = DOM.principal.offsetHeight - 200 - 50 * (layout.totalFilas > 2 ? 1 : 0);
//     const altoFinal = Math.min(altoDeseado, maxPermitido);

//     root.style.setProperty("--wrapper-height", `${altoFinal}px`);
//   }

//   DOM.contenedorFlechas.lastElementChild?.remove();

//   await esperar(2000);

//   // 4. Borrado del DOM y reseteo de clases Flex
//   sacarNodo(data);

//   root.style.setProperty(
//     "--principal-height",
//     `${DOM.principal.offsetHeight - 200 - 50 * (layout.totalFilas > 2 ? 1 : 0)}px`
//   );

//   const saltoNodos = DOM.contenedorNodos.querySelectorAll(".salto-flex")[layout.totalFilas - 2];
//   if (saltoNodos) saltoNodos.remove();

//   const saltoFlechas = DOM.contenedorFlechas.querySelectorAll(".salto-flex")[layout.totalFilas - 2];
//   if (saltoFlechas) saltoFlechas.remove();

//   if (layout.totalFilas === 2) {
//     DOM.contenedorNodos.classList.remove("cambio-flex", "margin-flex");
//     DOM.contenedorFlechas?.classList.remove("cambio-flex", "margin-flex");

//     const flechasExistentes = DOM.contenedorFlechas.querySelectorAll(".arrow");
//     flechasExistentes.forEach((flecha) => {
//       (flecha as HTMLElement).classList.remove("no_mover__flecha");
//       (flecha as HTMLElement).style.removeProperty("margin-top");
//     });
//   }

//   // 5. Purgar inline styles residuales
//   const nodosRestantes = Array.from(getNodos() as HTMLElement[]);
//   nodosRestantes.forEach((nodo) => {
//     nodo.style.removeProperty("transition");
//     nodo.style.removeProperty("margin-top");
//   });

//   setFlechaFinal(true, necesitaTransicion);

//   finalizarProcesoBorrarFinal();
// }

// // =============================================================================
// // PASOS Y UTILIDADES DE APOYO
// // =============================================================================

// function prepararEstructuraBorrarFinal(): void {
//   document.addEventListener("click", handler, true);
//   DOM.agregarComienzo.disabled = true;
//   DOM.agregarFinal.disabled = true;
// }

// function finalizarProcesoBorrarFinal(): void {
//   document.removeEventListener("click", handler, true);
//   DOM.agregarComienzo.disabled = false;
//   DOM.agregarFinal.disabled = false;
//   DOM.finalUl()?.classList.remove("no-desplazar");
// }




/* ==========================================================================
   3. BORRAR NODO INTERMEDIO
   ========================================================================== */
export function borrarNodoIntermedio(data: string, indice: number): void {
  
  if (!DOM.verificarDOM()) return;


  const nodos = getNodos() as HTMLDivElement[];
  const flechas = getFlechas() as HTMLDivElement[];

  const flechaActual = flechas[indice];
  const flechaPrevia = flechas[indice - 1];

  if (!flechaActual || !flechaPrevia) return;

  const ul = obtenerSubElemento(flechaActual, "underline");
  const ls = obtenerSubElemento(flechaActual, "linea-s");
  const li = obtenerSubElemento(flechaActual, "linea-i");

  ul.classList.remove("inmediato");
  ls.classList.remove("inmediato");
  li.classList.remove("inmediato");

  const ul2 = obtenerSubElemento(flechaPrevia, "underline");
  const ls2 = obtenerSubElemento(flechaPrevia, "linea-s");
  const li2 = obtenerSubElemento(flechaPrevia, "linea-i");

  ul2.classList.remove("inmediato");
  ls2.classList.remove("inmediato");
  li2.classList.remove("inmediato");

  setTimeout(() => {
    ul.style.width = '0px';
    ls.style.width = '0px';
    li.style.width = '0px';
    ul.classList.add("arrowend-first-ul");
    ls.classList.add("arrowend-first");
    li.classList.add("arrowend-first");
  }, 100);

  ul.addEventListener("transitionend", function jj() {
    setTimeout(() => {
      ul2.style.width = '0px';
      ls2.style.width = '0px';
      ls2.style.width = '0px';
      ul2.classList.add("arrowend-first-ul");
      ls2.classList.add("arrowend-first");
      li2.classList.add("arrowend-first");
    }, 100);

    ul2.addEventListener("transitionend", function jj2() {
      const listaNodos = DOM.contenedorNodos.children;
      setTimeout(() => {
        const nodoObjetivo = listaNodos[indice] as HTMLElement;
        if (nodoObjetivo) {
          nodoObjetivo.classList.remove("inmediato-nodo");
          nodoObjetivo.style.opacity = "0";
        }
      }, 1100);
      ul2.removeEventListener("transitionend", jj2);
    });
    ul.removeEventListener("transitionend", jj);
  });

  const nodoIndexado = nodos[indice];
  if (nodoIndexado) {
    nodoIndexado.addEventListener("transitionend", function fn() {
      const listaNodos = DOM.contenedorNodos.children;
      const ultimoNodo = DOM.contenedorNodos.lastElementChild as HTMLElement;
      
      s1 = ((DOM.contenedorNodos.offsetWidth - (listaNodos.length) * ultimoNodo.offsetWidth) / (listaNodos.length + 1));
      s2 = (DOM.contenedorNodos.offsetWidth - (listaNodos.length - 1) * ultimoNodo.offsetWidth) / (listaNodos.length);

      setFlechaInicial(true, necesitaTransicion, s2);
      setFlechaFinal(true, necesitaTransicion, s2);
      setFlechasNodos2(indice + 2, s1, s2);

      
      const finalUl = DOM.finalUl();
      finalUl?.classList.add("no-desplazar");
      // obtenerSubElemento(DOM.flechaPunteroFinal, "underline").classList.add("no-desplazar");
      nodoIndexado.removeEventListener("transitionend", fn);
    });
  }

  const primerHijoNodo = DOM.contenedorNodos.firstElementChild as HTMLElement;
  if (primerHijoNodo) {
    primerHijoNodo.addEventListener("transitionend", function nald() {
      sacarNodo(data);
      for (let i = 0; i < nodos.length; i++) {
        nodos[i].classList.add("no-mover");
        nodos[i].style.left = '0px';
      }

      sacarFlecha(indice);

      for (const flecha of flechas) {
        if (flecha.style.left !== "") flecha.removeAttribute("style");
      }

      setTimeout(() => {
        ul2.removeAttribute("style");
        ls2.removeAttribute("style");
        li2.removeAttribute("style");
        ul2.classList.remove("arrowend-first-ul");
        ls2.classList.remove("arrowend-first");
        li2.classList.remove("arrowend-first");

        for (let i = 0; i < nodos.length; i++) {
          nodos[i].classList.remove("no-mover");
        }
      }, 100);

      if (DOM.contenedorNodos.childElementCount > 1) {
        if (DOM.selectorPares.lastChild) {
          DOM.selectorPares.removeChild(DOM.selectorPares.lastChild);
        }
      }
      primerHijoNodo.removeEventListener("transitionend", nald);
    });
  }
}