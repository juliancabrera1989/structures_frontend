import { setFlechasNodos, setFlechasNodos2, RolCurva, setFlechasNodosDefinitiva } from "./RenderFlechasNodos.ts";
import { agregarNodo, agregarNodoN,  getNodos } from "../contenedores/ContenedorNodos.ts";
import { agregarFlecha, agregarFlechaN, getFlechas } from "../contenedores/ContenedorFlechas.ts";
import { inicializarPuntero, setPuntero, setFlechaInicial, setFlechaFinal } from "./ControladorInicializador.ts";
import { renderizar } from "./ControladorBarraSuperior.ts";
import { animarPath, animarPuntaAzul, crearFlechaCurvaInterfila } from "../elementosGraficos/FlechaCurva.ts";
import { obtenerInfoLayout, getCantidadNodosFila } from "../utils/layoutHelpers.ts";

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
    
//     const inicialUl = DOM.inicialUl();
//     const inicialLs = DOM.inicialLs();
//     const inicialLi = DOM.inicialLi();

//     const finalUl = DOM.finalUl();

//     inicialUl?.classList.remove("flecha_puntero__lista-vacia", "inmediato");
//     inicialLs?.classList.remove("inmediato");
//     inicialLi?.classList.remove("inmediato");
//   // }

//   setTimeout(() => {
//     setPuntero(1);
//   }, 100);

//   setTimeout(() => {
//     if (nodos[0]) nodos[0].style.opacity = "1";
//   }, 1000);

//   if (nodos[0]) {
//     nodos[0].addEventListener("transitionend", function f1() {
//       root.style.setProperty('--linea-flecha-inicial-transform-origin', `left`);
//       root.style.setProperty('--linea-flecha-inicial-width', `0px`);
//       root.style.setProperty('--punta-flecha-inicial-width', `0px`);

//         inicialUl?.classList.add("arrowend-first-ul");
//         inicialLs?.classList.add("arrowend-first");
//         inicialLi?.classList.add("arrowend-first");

//         // const underline = flecha_puntero_inicial.querySelector(".underline") as HTMLElement;
//         inicialUl?.addEventListener("transitionend", function f2() {
//           inicialUl.classList.remove("arrowend-first-ul");
//           inicialLs?.classList.remove("arrowend-first");
//           inicialLi?.classList.remove("arrowend-first");
//           // const finalUnderline = flecha_puntero_final?.querySelector(".underline") as HTMLElement | null;


//           const val = finalUl ? finalUl.offsetWidth : 0;

//           if (!DOM.flechaPunteroInicial()?.offsetWidth && !val) {
//             necesitaTransicion = 1;
//             window.banderaFlechaInicial = 0;
//             setFlechaInicial(true, necesitaTransicion);
//             setFlechaFinal(true, necesitaTransicion);
//           }

//           inicialUl.removeEventListener("transitionend", f2);
//         });
//       // }
//       nodos[0].removeEventListener("transitionend", f1);
//     });
//   }

//   DOM.agregarComienzo.removeAttribute("hidden");
//   DOM.agregarComienzo.disabled = true;
//   DOM.agregarFinal.removeAttribute("hidden");
//   DOM.agregarFinal.disabled = true;

//   // const primerHijoFinal = flecha_puntero_final?.firstElementChild as HTMLElement | null;
//   finalUl?.addEventListener("transitionend", function f() {
//     console.log("entro aqui?");
//     finalUl?.classList.remove("flecha_puntero__lista-vacia");
//     finalUl.removeEventListener("transitionend", f);
//     document.removeEventListener("click", handler, true);








//     DOM.inicializador.removeAttribute("style");
//     DOM.str.removeAttribute("style");
//     DOM.nulo.removeAttribute("style");

//     DOM.str.classList.add("inmediato_reacomodo");
//     DOM.nulo.classList.add("inmediato_reacomodo");
//     root.style.setProperty('--nulo-left', `${100  - (3 + (DOM.nulo.offsetWidth / DOM.principal.offsetWidth)*100)}%`);
//     root.style.setProperty('--str-top', `${100-DOM.str.offsetHeight/2}px`);
//     root.style.setProperty('--nulo-top', `${100-DOM.nulo.offsetHeight/2}px`);
//     root.style.setProperty('--linea-flecha-inicial-top', `${DOM.str.offsetTop + DOM.str.offsetHeight/2}px`);
//     root.style.setProperty('--punta-flecha-inicial-top', `${DOM.principal.offsetHeight/2 -2.5}px`);
//     root.style.setProperty('--linea-flecha-final-top', `${DOM.principal.offsetHeight/2 - 2.5}px`);
//     root.style.setProperty('--punta-flecha-final-top', `${DOM.nulo.offsetTop + DOM.nulo.offsetHeight}px`);
//     DOM.agregarComienzo.disabled = false;
//     DOM.agregarFinal.disabled = false;

//   setTimeout(() => {
//     DOM.str.classList.remove("inmediato_reacomodo");
//     DOM.nulo.classList.remove("inmediato_reacomodo");
//     inicialUl?.classList.remove("cambio_top");
//    }, 100);






//     if (window.innerWidth !== (DOM.principalWrapper.offsetWidth + 33)) {
//       DOM.principalWrapper.removeAttribute("style");
//       renderizar();
//       setFlechaInicial(true, 0);
//       setFlechaFinal(true, 0);
//     } else {
//       DOM.principalWrapper.removeAttribute("style");
//     }
//   });
// }


 function agregarPrimerNodo(): void {
  if (!DOM.verificarDOM()) return;

  const nodos = getNodos() as HTMLDivElement[];
  const ancho = DOM.principal.offsetWidth;
  DOM.principalWrapper.style.maxWidth = `${ancho}px`;
  DOM.principalWrapper.style.minWidth = `${ancho}px`;

  if (root.style.getPropertyValue("--principal-height") === '50vw') {
    const altura = DOM.principal.offsetHeight;
    root.style.setProperty("--principal-height", `${altura}px`);
  }

  document.addEventListener("click", handler, true);
  DOM.botonAgregar1erNodo.setAttribute("hidden", "hidden");

  // Agrega el nodo físico al contenedor
  agregarNodo(DOM.inputNodo.value, 0);
  inicializarPuntero(0);
  // debugger;

  const inicialUl = DOM.inicialUl();
  const inicialLs = DOM.inicialLs();
  const inicialLi = DOM.inicialLi();
  const finalUl = DOM.finalUl();

  inicialUl?.classList.remove("flecha_puntero__lista-vacia", "inmediato");
  inicialLs?.classList.remove("inmediato");
  inicialLi?.classList.remove("inmediato");


   
  DOM.agregarComienzo.removeAttribute("hidden");
  DOM.agregarComienzo.disabled = true;
  DOM.agregarFinal.removeAttribute("hidden");
  DOM.agregarFinal.disabled = true;

  // -------------------------------------------------------------
  // PASO 1: Inclinar / Desplazar puntero arriba (setPuntero 1)
  // -------------------------------------------------------------
  setTimeout(() => {
    setPuntero(1);
    //  debugger ;
    // -------------------------------------------------------------
    // PASO 2: Hacer visible el primer nodo (opacity 1)
    // -------------------------------------------------------------
    setTimeout(() => {
      const primerNodo = nodos[0] || (DOM.contenedorNodos.firstElementChild as HTMLElement);

      if (primerNodo) {
        primerNodo.style.opacity = "1";

        primerNodo.addEventListener("transitionend", function fAparecerNodo(e) {
          if (e.target !== primerNodo) return;
          primerNodo.removeEventListener("transitionend", fAparecerNodo);

          // -------------------------------------------------------------
          // PASO 3: Contraer la flecha inicial recta a 0px
          // -------------------------------------------------------------
          root.style.setProperty('--linea-flecha-inicial-transform-origin', `left`);
          root.style.setProperty('--linea-flecha-inicial-width', `0px`);
          root.style.setProperty('--punta-flecha-inicial-width', `0px`);

          inicialUl?.classList.add("arrowend-first-ul");
          inicialLs?.classList.add("arrowend-first");
          inicialLi?.classList.add("arrowend-first");

          if (inicialUl) {
            inicialUl.addEventListener("transitionend", function fContraerFlechaRecta(e) {
              if (e.target !== inicialUl) return;
              inicialUl.removeEventListener("transitionend", fContraerFlechaRecta);

              inicialUl.classList.remove("arrowend-first-ul");
              inicialLs?.classList.remove("arrowend-first");
              inicialLi?.classList.remove("arrowend-first");

              // const val = finalUl ? finalUl.offsetWidth : 0;

              // -------------------------------------------------------------
              // PASO 4: Activar las flechas diagonales del 1er nodo
              // -------------------------------------------------------------
              // if (!DOM.flechaPunteroInicial()?.offsetWidth) {
                necesitaTransicion = 1;
                window.banderaFlechaInicial = 0;
                // debugger;
                setFlechaInicial(true, necesitaTransicion);
                setFlechaFinal(true, necesitaTransicion);
              // }

              if (finalUl) {
                finalUl.addEventListener("transitionend", function fFlechasDiagonalesListas(e) {
                  if (e.target !== finalUl) return;
                  finalUl.removeEventListener("transitionend", fFlechasDiagonalesListas);

                  finalUl.classList.remove("flecha_puntero__lista-vacia");
                  document.removeEventListener("click", handler, true);

                  // -------------------------------------------------------------
                  // PASO 5: Limpieza de estilos de inicializador y reacomodo CSS
                  // -------------------------------------------------------------
                  // debugger;
                  DOM.inicializador.removeAttribute("style");
                  DOM.str.removeAttribute("style");
                  DOM.nulo.removeAttribute("style");
// debugger;
                  DOM.str.classList.add("inmediato_reacomodo");
                  DOM.nulo.classList.add("inmediato_reacomodo");
                    // debugger;
                  root.style.setProperty('--nulo-left', `${100 - (3 + (DOM.nulo.offsetWidth / DOM.principal.offsetWidth) * 100)}%`);
                  root.style.setProperty('--str-top', `${100 - DOM.str.offsetHeight / 2}px`);
                  root.style.setProperty('--nulo-top', `${100 - DOM.nulo.offsetHeight / 2}px`);
                  root.style.setProperty('--linea-flecha-inicial-top', `${DOM.str.offsetTop + DOM.str.offsetHeight / 2}px`);
                  root.style.setProperty('--punta-flecha-inicial-top', `${DOM.principal.offsetHeight / 2 - 2.5}px`);
                  root.style.setProperty('--linea-flecha-final-top', `${DOM.principal.offsetHeight / 2 - 2.5}px`);
                  root.style.setProperty('--punta-flecha-final-top', `${DOM.nulo.offsetTop + DOM.nulo.offsetHeight}px`);
// debugger;
                  DOM.agregarComienzo.disabled = false;
                  DOM.agregarFinal.disabled = false;

                  setTimeout(() => {
                    DOM.str.classList.remove("inmediato_reacomodo");
                    DOM.nulo.classList.remove("inmediato_reacomodo");
                    inicialUl?.classList.remove("cambio_top");

                    if (window.innerWidth !== (DOM.principalWrapper.offsetWidth + 33)) {
                      DOM.principalWrapper.removeAttribute("style");
                      // debugger;
                      renderizar();
                    //  debugger;
                      setFlechaInicial(true, 0);
                      setFlechaFinal(true, 0);
                    } else {
                      DOM.principalWrapper.removeAttribute("style");
                    }
                  }, 100);

                });
              }
            });
          }
        });
      }
    }, 900);
  }, 100);
}

function agregarNodoAlComienzo(): void {
  if (!DOM.verificarDOM()) return;

  const nodos = getNodos() as HTMLElement[];
  const ultimoNodo = DOM.contenedorNodos.lastElementChild as HTMLElement | null;
  if (!ultimoNodo) return;

  document.addEventListener("click", handler, true);
  DOM.agregarComienzo.disabled = true;
  DOM.agregarFinal.disabled = true;

  necesitaTransicion = 1;
  setFlechaInicial(false, necesitaTransicion);

  const inicialUl = DOM.inicialUl();
  inicialUl?.addEventListener("transitionend", function nfpi_aC() {
    inicialUl.removeEventListener("transitionend", nfpi_aC);




const M = 5; // Tu límite configurado por fila







const layout = obtenerInfoLayout(M);

const nodosPrimeraFila = getCantidadNodosFila(layout, 0);



if (nodosPrimeraFila < M) {

const n = nodosPrimeraFila; // nodos actuales en esta fila
  

const primero = DOM.contenedorNodos.firstElementChild as HTMLElement;
  // Recalculamos espaciados s1 y s2 para los nodos de la ÚLTIMA fila únicamente
  const s1 = (DOM.contenedorNodos.offsetWidth - n * primero.offsetWidth) / (n + 1);
  const s2 = (DOM.contenedorNodos.offsetWidth - (n + 1) * primero.offsetWidth) / (n + 2);
console.log("el valor de s1 es: ",s1);
console.log("el valor de s2 es: ",s2);
  if (layout.totalFilas === 1) {
    // Solo si estamos en la Fila 1 ajustamos la flecha del puntero inicial (StrPtr)
    setFlechaFinal(true, necesitaTransicion, s2);
    setFlechasNodos(necesitaTransicion, 1, s1, s2);
  }
 
  // Reacomodamos únicamente los nodos de esta última fila
  
  setFlechasNodosDefinitiva(necesitaTransicion, 1, s1, s2,"emisor",layout);

    primero.addEventListener("transitionend", function nald() {
    agregarNodo(DOM.inputNodo.value, 1);

    const nuevosNodos = getNodos() as HTMLElement[];


        for (let i = 1; i < nuevosNodos.length ; i++) {
          nuevosNodos[i].classList.add("no-mover");
          nuevosNodos[i].style.left = '0px';
        }



          const nodoNuevo = nuevosNodos[0];

          if (nodoNuevo) {
            //  if (layout.totalFilas > 1) {
            // nodoNuevo.style.marginTop = "150px";
            //  }
            setTimeout(() => {
              nodoNuevo.style.opacity = "1";
            }, 100);
          }

          nodoNuevo.addEventListener("transitionend", function na() {
             
nodoNuevo.removeEventListener("transitionend", na);
             window.banderaFlechaInicial = 0;
          setFlechaInicial(true, necesitaTransicion);

          const inicialLi = DOM.inicialLi();
         inicialLi?.addEventListener("transitionend", function af() {

  const esFilaSuperior = layout.totalFilas > 1;
  const esSegundoNodoDeFila = (nodosPrimeraFila + 1) === 2;

  console.log("El valor de esFilaSuperior es: ",esFilaSuperior);
  console.log("El valor de esSegundoNodoDeFila es: ",esSegundoNodoDeFila);
  if (esFilaSuperior && esSegundoNodoDeFila) {
    // if (DOM.contenedorFlechas) {
    //   console.log("al final tenia que entrar aca , pero no se si entra");

    //   // 2. Ajuste de flechas existentes
    //   const flechasExistentes = DOM.contenedorFlechas.querySelectorAll(".arrow");
    //   flechasExistentes.forEach((flecha) => {
    //     const hFlecha = flecha as HTMLElement;
        
    //     hFlecha.style.marginTop = "150px";
    //   });

    // }

  
   DOM.contenedorFlechas?.classList.add("margin-flex");
   DOM.contenedorFlechas?.firstElementChild?.remove();
   
  }



  // Creación de la nueva flecha (Cae automáticamente debajo del salto-flex si se creó arriba)
  agregarFlecha(1);

  const flechasActuales = getFlechas() as HTMLElement[];
  const primeraFlecha = flechasActuales[0];

  if (primeraFlecha) {
    // Únicamente seteamos el margin-top a la nueva flecha si estamos en fila inferior
    if (esFilaSuperior ) {
      primeraFlecha.style.setProperty('width',root.style.getPropertyValue("--linea-flecha-width"));
      // primeraFlecha.style.setProperty("margin-top", "150px");
    }
  }

    const ultimoHijoFlecha = primeraFlecha.lastElementChild as HTMLElement | null;

          ultimoHijoFlecha?.addEventListener("transitionend", function fl() {

            // Liberación del camino original
            document.removeEventListener("click", handler, true);
            DOM.agregarComienzo.disabled = false;
            DOM.agregarFinal.disabled = false;

            actualizarSelectoresIntermedios();



            inicialUl?.classList.remove("no-desplazar");
            
          
          
            ultimoHijoFlecha.removeEventListener("transitionend", fl);
          });
        inicialLi?.removeEventListener("transitionend", af);
          });

          });



    primero.removeEventListener("transitionend", nald);
  });
  return;


  // Rama A: Reacomodamiento Horizontal
  // Calculas desplazamiento usando layout.nodosUltimaFila y layout.indiceInicioUltimaFila
} else {
  // Rama B: Expansión Vertical (Nueva Fila)
  // Insertas el `.salto-flex`, abres la fila layout.totalFilas y dibujas la curva inter-row
      console.log("🔵 FASE 1: Bajada suave del Wrapper y Nodos por transform.");


    
if (DOM.principalWrapper.style.getPropertyValue("max-height") == "" || window.alturaDeVentana != window.innerHeight) {

   window.alturaDeVentana = window.innerHeight;
// 2. Calcular la altura máxima física disponible en el viewport
//    (Alto total de ventana - Margen inferior deseado - Distancia desde el techo hasta el wrapper)
const maxPermitido = window.alturaDeVentana - 8 - DOM.principalWrapper.offsetTop;

// 3. Aplicar el alto deseado (ej: 400, 600, 800...), pero frenado en la altura máxima real
const altoDeseado =  DOM.principalWrapper.offsetHeight  + 200 +  50 * (layout.totalFilas > 1 ? 1 : 0); // El valor que quieras según las filas
const altoFinal = Math.min(altoDeseado, maxPermitido);

if (altoFinal == maxPermitido)
 DOM.principalWrapper.style.setProperty('max-height', `${altoFinal}px`);

root.style.setProperty('--wrapper-height', `${altoFinal}px`);
}




      const alturaNull = DOM.nulo.offsetTop;
       DOM.nulo.classList.add("transicion-nulo");
      // 2. Bajada con tu valor corregido de transform
      const nodosActuales = Array.from(getNodos() as HTMLElement[]);
      nodosActuales.forEach(nodo => {
        nodo.classList.remove("inmediato-nodo", "inmediato", "inmediato_reacomodo", "no-mover");
         nodo.classList.add("transicion-nodos");
      });

     const contenedorFlechas = document.getElementById("contenedor_flechas");
      if (contenedorFlechas) {
        const flechasExistentes = Array.from(contenedorFlechas.querySelectorAll(".arrow")) as HTMLElement[];

        flechasExistentes.forEach((flecha) => {
          // Replicamos la limpieza de tu setFlechasNodos() para permitir la transición suave
          flecha.classList.remove("no-mover__flecha");

          const elementosHijos = Array.from(flecha.children) as HTMLElement[];
          elementosHijos.forEach((elemento) => {
            elemento.classList.remove("inmediato");
          });

          // Ahora sí le aplicamos la animación de bajada
          flecha.classList.add("transicion-flechas");
        });
      }

        const flechasCurvas =DOM.contenedorFlechasCurvas.querySelectorAll(".svg-flecha-interfila");
        flechasCurvas.forEach((flecha) => {
          // Replicamos la limpieza de tu setFlechasNodos() para permitir la transición suave
          (flecha as HTMLElement).classList.add("transicion-flechas");
        });



        const flecha_puntero_final = document.getElementById("flecha_puntero_final");
        if (!flecha_puntero_final) return;
        const hijos = flecha_puntero_final.children;

                for (const hijo of hijos) {
                  (hijo as HTMLElement).classList.remove("inmediato");
                  (hijo as HTMLElement).style.transition = "top 2s ease-in-out";

                }
            const finalUl = DOM.finalUl();
            const finalLi = DOM.finalLi();
            const finalLs = DOM.finalLs();


         if (finalUl && finalLi && finalLs) {
          const altura = finalUl?.offsetTop;
            finalUl.style.top = `${altura + 250}px`;
            finalLi.style.top = `${DOM.str.offsetTop + DOM.nulo.offsetHeight + 250}px`;
            finalLs.style.top = `${DOM.str.offsetTop + DOM.nulo.offsetHeight + 250}px`;
         }

      // =========================================================================
      // FASE 2: RETENCIÓN (A los 2000ms, clavamos los nodos en el fondo)
      // =========================================================================
      setTimeout(() => {
        console.log("⚡ FASE 2: Retención instantánea en contenedor de una fila.");

        root.style.setProperty('--principal-height', `${ DOM.principal.offsetHeight  + 200 +  50 * (layout.totalFilas > 1 ? 1 : 0)}px`);


        nodosActuales.forEach(nodo => {
          nodo.classList.remove("transicion-nodos");
          // nodo.style.setProperty("margin-top", "300px", "important"); // 🔥 Tu corrección
        });


        const contenedorFlechas = document.getElementById("contenedor_flechas");
        if (contenedorFlechas) {

          const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
          
             if(layout.nodosPorFila.get(0)! > 1) 
              for(let i = 0; i < layout.nodosPorFila.get(0)! - 1 ; i++){
    
            (flechasExistentes[i] as HTMLElement).classList.remove("transicion-flechas");
            // (flechasExistentes[i] as HTMLElement).style.setProperty("margin-top","400px","important");
             }

              for(let j = layout.nodosPorFila.get(0)! - 1; j! < flechasExistentes.length ; j!++){
              
                (flechasExistentes[j!] as HTMLElement).classList.remove("transicion-flechas");
            }

            }
                    var count = 0;
            const flechasCurvas =DOM.contenedorFlechasCurvas.querySelectorAll(".svg-flecha-interfila");
                   flechasCurvas.forEach((flecha) => {
                    count++;
          // Replicamos la limpieza de tu setFlechasNodos() para permitir la transición suave
          (flecha as HTMLElement).classList.remove("transicion-flechas");
          (flecha as HTMLElement).style.setProperty("margin-top",`${250*count}px`,"important");

        });



        const flecha_puntero_final = document.getElementById("flecha_puntero_final");
        if (!flecha_puntero_final) return;
        const hijos = flecha_puntero_final.children;

                for (const hijo of hijos) {
                  (hijo as HTMLElement).removeAttribute("style");
                }

        if (DOM.nulo) {
          
          
          const ultimoNodo = DOM.contenedorNodos.lastElementChild;
          const topUN = (ultimoNodo as HTMLElement).offsetTop;
          root.style.setProperty('--linea-flecha-final-top', `${DOM.principal.offsetHeight - 150 - 2.5}px`);
          root.style.setProperty('--nulo-top', `${( alturaNull + 250 )}px`);
            root.style.setProperty('--punta-flecha-final-top', `${( alturaNull +  DOM.nulo.offsetHeight/2  + 250)}px`);
          DOM.nulo.classList.remove("transicion-nulo");
        }



       // =========================================================================
        // 🛠️ FASE 3: Pasando a modo multi-fila e insertando elementos.
        // =========================================================================
        setTimeout(() => {
          console.log("🛠️ FASE 3: Pasando a modo multi-fila e insertando elementos.");

          // 1. Convertimos el contenedor a dos filas (Wrap) justo en este frame
          if (DOM.contenedorNodos) {
              DOM.contenedorNodos?.classList.add("cambio-flex");
          }

          DOM.contenedorFlechas.classList.add("cambio-flex");

          
          const saltoDeLineaNodos = crearSaltoFlex();
            DOM.contenedorNodos.prepend(saltoDeLineaNodos);
          // }
               const saltoDeLineaFlechas = crearSaltoFlex();
             DOM.contenedorFlechas.insertBefore(saltoDeLineaFlechas, DOM.contenedorFlechas.firstElementChild);



            // if (nodosEnFila.length === 1) {
              const spacer = document.createElement("div");
              spacer.classList.add("flecha-spacer-fila");
              DOM.contenedorFlechas.prepend(spacer);
            // } else {
            //   // Renderizas las flechas rectas normales para esa fila
            //   renderizarFlechasDeFila(nodosEnFila);
            // }



          // 2. Tu función pura mete el nuevo nodo al principio (índice 0)
          agregarNodo(DOM.inputNodo.value, 1);

          const todosLosNodos = Array.from(getNodos() as HTMLElement[]);
          const nodoNuevo = todosLosNodos[0]; // El recién inyectado arriba

          // 🔥 Identificamos al nodo que antes estaba primero y ahora bajó a la segunda fila
          const nodoOrigenReal = todosLosNodos[1];

    

          // 5. Con las dos filas armadas por el salto, pasamos todo al layout final
          // todosLosNodos.forEach(nodo => {
          //   nodo.style.setProperty("margin-top", "150px", "important");
          // });
          
          

      const haySpacer = DOM.contenedorFlechas.querySelectorAll(".flecha-spacer-fila");
       if(layout.totalFilas >= 2 && haySpacer.length != 0) {
         DOM.contenedorFlechas?.classList.remove("margin-flex");
       }
          

           DOM.contenedorNodos.classList.add("margin-flex");


          


           if (nodoNuevo) {

            setTimeout(() => {
              nodoNuevo.style.opacity = "1";
            }, 100);

            // 🎯 AGREGADO: Escuchamos el final de la opacidad para disparar la flecha curva
            nodoNuevo.addEventListener('transitionend', function dispararFlechaCurvaComienzo(e) {
              if (e.propertyName === 'opacity') {
                nodoNuevo.removeEventListener('transitionend', dispararFlechaCurvaComienzo);

                const contenedorCurvas = document.getElementById("contenedor_flechas_curvas");
                if (!contenedorCurvas) {
                  document.removeEventListener("click", handler, true);
                  DOM.agregarComienzo.disabled = false;
                  DOM.agregarFinal.disabled = false;
                  return;
                }

                // Si ambos nodos existen, calculamos la geometría rígida sin deformaciones
                if (nodoNuevo && nodoOrigenReal) {
                  // const animacionFlecha = crearFlechaCurvaInterfila(nodoNuevo, nodoOrigenReal, DOM.contenedorFlechasCurvas, DOM.contenedorNodos );
                   const flechaCurva = crearFlechaCurvaInterfila(nodoNuevo, nodoOrigenReal, DOM.contenedorNodos );
                   DOM.contenedorFlechasCurvas.prepend(flechaCurva);
                   const pathCurva = flechaCurva.firstElementChild as SVGPathElement;
                 


                   const animacionCurva  = animarPath(pathCurva!, true);

                  animacionCurva.onfinish = () => {
                    // 1. Cuando la curva llega al nodo destino, SALEN las dos líneas azules hacia atrás
                    const animsPunta = animarPuntaAzul(flechaCurva, true);
                    
                    // 2. Al terminar de brotar las patitas, cerramos la transición
                    animsPunta[0].onfinish = () => {



                      // setFlechaFinal(true, necesitaTransicion);


                      setFlechaInicial(true, necesitaTransicion);

                    // Aseguramos las variables CSS de la punta de la flecha curva en su destino exacto
                    // document.documentElement.style.setProperty('--punta-flecha-curva-left', `${x2}px`);
                    // document.documentElement.style.setProperty('--punta-flecha-curva-top', `${y2}px`);
                    document.documentElement.style.setProperty('--punta-flecha-curva-opacity', '1');


                    // Liberamos los controles de la UI al terminar la secuencia completa
                    document.removeEventListener("click", handler, true);
                    DOM.agregarComienzo.disabled = false;
                    DOM.agregarFinal.disabled = false;

                    actualizarSelectoresIntermedios();
                    };
                  };

                  //  animacionFlecha.onfinish = () => {
                  //   console.log("La animación del path terminó. Seteando flecha final...");


                  //   setFlechaInicial(true, necesitaTransicion);

                  //   // Aseguramos las variables CSS de la punta de la flecha curva en su destino exacto
                  //   // document.documentElement.style.setProperty('--punta-flecha-curva-left', `${x2}px`);
                  //   // document.documentElement.style.setProperty('--punta-flecha-curva-top', `${y2}px`);
                  //   document.documentElement.style.setProperty('--punta-flecha-curva-opacity', '1');


                  //   // Liberamos los controles de la UI al terminar la secuencia completa
                  //   document.removeEventListener("click", handler, true);
                  //   DOM.agregarComienzo.disabled = false;
                  //   DOM.agregarFinal.disabled = false;

                  //   actualizarSelectoresIntermedios();
                  // };
                }
              }
            });
          }

          console.log("🛑 Estructura DOM armada y escuchador de flecha curva activo.");

        }, 100);
      }, 2000);




}
 


  });
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

function agregarNodoAlFinal(): void {
  if (!DOM.verificarDOM()) return;

  const nodos = getNodos() as HTMLElement[];
  const ancho = DOM.principal.offsetWidth;

  DOM.principal.style.width = `${ancho}px`;
  if (root.style.getPropertyValue("--principal-height") === '50vw') {
    root.style.setProperty("--principal-height", `${DOM.principal.offsetHeight}px`);
  }

  // 1. Bloqueamos clicks al iniciar la acción
  document.addEventListener("click", handler, true);
  DOM.agregarComienzo.disabled = true;
  DOM.agregarFinal.disabled = true;

  necesitaTransicion = 1;
  setFlechaFinal(false, necesitaTransicion);

  const finalUl = DOM.finalUl();

  finalUl?.addEventListener("transitionend", function nfpf_aC() {
    const ultimo = DOM.contenedorNodos.lastElementChild as HTMLElement;
    const totalNodosActuales = nodos.length;

    finalUl.removeEventListener("transitionend", nfpf_aC);



const M = 5; // Tu límite configurado por fila







const layout = obtenerInfoLayout(M);

if (layout.tieneEspacioUltimaFila) {

const n = layout.nodosUltimaFila; // nodos actuales en esta fila
  

const ultimo = DOM.contenedorNodos.lastElementChild as HTMLElement;
  // Recalculamos espaciados s1 y s2 para los nodos de la ÚLTIMA fila únicamente
  const s1 = (DOM.contenedorNodos.offsetWidth - n * ultimo.offsetWidth) / (n + 1);
  const s2 = (DOM.contenedorNodos.offsetWidth - (n + 1) * ultimo.offsetWidth) / (n + 2);
console.log("el valor de s1 es: ",s1);
console.log("el valor de s2 es: ",s2);
  if (layout.totalFilas === 1) {
    // Solo si estamos en la Fila 1 ajustamos la flecha del puntero inicial (StrPtr)
    setFlechaInicial(true, necesitaTransicion, s2);
    setFlechasNodos(necesitaTransicion, 0, s1, s2);
  }

  // Reacomodamos únicamente los nodos de esta última fila
  setFlechasNodosDefinitiva(necesitaTransicion, 0, s1, s2,"receptor",layout);


    ultimo.addEventListener("transitionend", function nald() {
    agregarNodo(DOM.inputNodo.value, 0);

    const nuevosNodos = getNodos() as HTMLElement[];


        for (let i = 0; i < (nuevosNodos.length - 1); i++) {
          nuevosNodos[i].classList.add("no-mover");
          nuevosNodos[i].style.left = '0px';
        }



          const nodoNuevo = nuevosNodos[nuevosNodos.length - 1];

          if (nodoNuevo) {
            //  if (layout.totalFilas > 1) {
            // nodoNuevo.style.marginTop = "150px";
            //  }
            setTimeout(() => {
              nodoNuevo.style.opacity = "1";
            }, 100);
          }

          nodoNuevo.addEventListener("transitionend", function na() {
             
nodoNuevo.removeEventListener("transitionend", na);

const esFilaInferior = layout.totalFilas > 1;
  const esSegundoNodoDeFila = (layout.nodosUltimaFila + 1) === 2;

  console.log("El valor de esFilaInferior es: ",esFilaInferior);
  console.log("El valor de esSegundoNodoDeFila es: ",esSegundoNodoDeFila);
  if (esFilaInferior && esSegundoNodoDeFila) {
    if (DOM.contenedorFlechas) {
      console.log("al final tenia que entrar aca , pero no se si entra");

       DOM.contenedorFlechas.lastElementChild?.remove();
       
      // 1. Reestructuración del contenedor
      // DOM.contenedorFlechas.classList.add("cambio-flex");
     
      // 2. Ajuste de flechas existentes
      // const flechasExistentes = DOM.contenedorFlechas.querySelectorAll(".arrow");
      // flechasExistentes.forEach((flecha) => {
      //   const hFlecha = flecha as HTMLElement;
      //   hFlecha.style.marginTop = "150px";
      // });


    }
  }

  // Creación de la nueva flecha (Cae automáticamente debajo del salto-flex si se creó arriba)
  agregarFlecha(0);

  const flechasActuales = getFlechas() as HTMLElement[];
  const ultimaFlecha = flechasActuales[flechasActuales.length - 1];



  
    // Únicamente seteamos el margin-top a la nueva flecha si estamos en fila inferior
    if (esFilaInferior) {
      // ultimaFlecha.style.setProperty("margin-top", "150px");
    }
  

    const ultimoHijoFlecha = ultimaFlecha.lastElementChild as HTMLElement | null;

          ultimoHijoFlecha?.addEventListener("transitionend", function fl() {
            setFlechaFinal(true, necesitaTransicion);


          const finalLi = DOM.finalLi();
          finalLi?.addEventListener("transitionend", function g() {
            // Liberación del camino original
            document.removeEventListener("click", handler, true);
            DOM.agregarComienzo.disabled = false;
            DOM.agregarFinal.disabled = false;

            actualizarSelectoresIntermedios();



            finalUl?.classList.remove("no-desplazar");
            finalLi?.removeEventListener("transitionend", g);
          });

            ultimoHijoFlecha.removeEventListener("transitionend", fl);
          });

          });




      finalUl.classList.add("no-desplazar");
    ultimo.removeEventListener("transitionend", nald);
  });
  return;


  // Rama A: Reacomodamiento Horizontal
  // Calculas desplazamiento usando layout.nodosUltimaFila y layout.indiceInicioUltimaFila
} else {
      
      console.log("Paso 1: Expansión escalable a 600px con contra-desplazamiento interno.");


if (DOM.principalWrapper.style.getPropertyValue("max-height") == "" || window.alturaDeVentana != window.innerHeight) {

   window.alturaDeVentana = window.innerHeight;
// 2. Calcular la altura máxima física disponible en el viewport
//    (Alto total de ventana - Margen inferior deseado - Distancia desde el techo hasta el wrapper)
const maxPermitido = window.alturaDeVentana - 8 - DOM.principalWrapper.offsetTop;

// 3. Aplicar el alto deseado (ej: 400, 600, 800...), pero frenado en la altura máxima real
const altoDeseado =  DOM.principalWrapper.offsetHeight  + 200 +  50 * (layout.totalFilas > 1 ? 1 : 0); // El valor que quieras según las filas
const altoFinal = Math.min(altoDeseado, maxPermitido);

if (altoFinal == maxPermitido)
 root.style.setProperty('max-height', `${altoFinal}px`);

root.style.setProperty('--wrapper-height', `${altoFinal}px`);
}




      
        DOM.principalWrapper.style.overflow = "hidden";

   

      setTimeout(() => {
     
 
        root.style.setProperty('--principal-height', `${DOM.principal.offsetHeight * (layout.totalFilas+2)/(layout.totalFilas+1) + 50 * (layout.totalFilas > 1 ? 1 : 0)}px`);
       console.log("el valor nuevo de la altura principal es: ",root.style.getPropertyValue('--principal-height'));




       if(layout.totalFilas == 1) {
          DOM.contenedorNodos?.classList.add("cambio-flex", "margin-flex");

          DOM.contenedorFlechas?.classList.add("cambio-flex", "margin-flex");
       }
 
      const haySpacer = DOM.contenedorFlechas.querySelectorAll(".flecha-spacer-fila");
       if(layout.totalFilas >= 2 && haySpacer.length == 0) {
         DOM.contenedorFlechas?.classList.remove("margin-flex");
       }

        //   const contenedorFlechas = document.getElementById("contenedor_flechas");
        // if (contenedorFlechas) {

        //   const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
        //   flechasExistentes.forEach((flecha) => {
        //     (flecha as HTMLElement).style.setProperty("margin-top","150px","important");
        //   });

        // }



       const saltoDeLineaFlechas = crearSaltoFlex();
       DOM.contenedorFlechas.appendChild(saltoDeLineaFlechas);



         const alturaNull = DOM.nulo.offsetTop;
          const ultimoNodo = DOM.contenedorNodos.lastElementChild;
          const topUN = (ultimoNodo as HTMLElement).offsetTop;
          // root.style.setProperty('--linea-flecha-final-top', `${DOM.principal.offsetHeight*3/4 - 2.5}px`);
          // root.style.setProperty('--nulo-top', `${( 400 - 50 - DOM.nulo.offsetHeight/2)}px`);
          // root.style.setProperty('--punta-flecha-final-top', `${( 400 + DOM.nulo.offsetHeight/2 - 50)}px`);
          root.style.setProperty('--linea-flecha-final-top', `${DOM.principal.offsetHeight - 150 - 2.5}px`);
          root.style.setProperty('--nulo-top', `${( alturaNull + 250 )}px`);
          root.style.setProperty('--punta-flecha-final-top', `${( alturaNull +  DOM.nulo.offsetHeight  + 250)}px`);
          // DOM.nulo.classList.remove("transicion-nulo");

          
        // const nodosActuales = Array.from(getNodos() as HTMLElement[]);
        // nodosActuales.forEach(nodo => {
        //   nodo.style.marginTop = "150px";
        // });

        // 3. Insertamos el salto flex en ambos lados en la misma posición
          const saltoDeLineaNodos = crearSaltoFlex();
          DOM.contenedorNodos.appendChild(saltoDeLineaNodos);


              const spacer = document.createElement("div");
              spacer.classList.add("flecha-spacer-fila");
              DOM.contenedorFlechas.appendChild(spacer);
              
        setTimeout(() => {
          const nodosAntesDeAgregar = Array.from(getNodos() as HTMLElement[]);
          const nodoOrigenReal = nodosAntesDeAgregar[nodosAntesDeAgregar.length - 1];

          agregarNodo(DOM.inputNodo.value, 0);

          const todosLosNodos = Array.from(getNodos() as HTMLElement[]);
          const nodoNuevo = todosLosNodos[todosLosNodos.length - 1];

          if (nodoNuevo) {
            // nodoNuevo.style.marginTop = "150px";
            setTimeout(() => {
              nodoNuevo.style.opacity = "1";
            }, 100);

            nodoNuevo.addEventListener('transitionend', function dispararFlechaCurva(e) {
              if (e.propertyName === 'opacity') {
                nodoNuevo.removeEventListener('transitionend', dispararFlechaCurva);

                // const contenedorCurvas = document.getElementById("contenedor_flechas_curvas");
                // if (!contenedorCurvas) {
                //   document.removeEventListener("click", handler, true); // 👈 Seguridad
                //   DOM.agregarComienzo.disabled = false;
                //   DOM.agregarFinal.disabled = false;
                //   return;
                // }

                const nodoCinco = nodoOrigenReal;
                const nodoSeis = nodoNuevo;

                if (nodoCinco && nodoSeis) {
                  // const animacionFlecha = crearFlechaCurvaInterfila(nodoCinco, nodoSeis, DOM.contenedorFlechasCurvas, DOM.contenedorNodos );
                  
                   const flechaCurva = crearFlechaCurvaInterfila(nodoCinco, nodoSeis, DOM.contenedorNodos );
                   DOM.contenedorFlechasCurvas.appendChild(flechaCurva);
                   const pathCurva = flechaCurva.firstElementChild as SVGPathElement;
                 


                    const animacionCurva  = animarPath(pathCurva!, true);

                  animacionCurva.onfinish = () => {
                    // 1. Cuando la curva llega al nodo destino, SALEN las dos líneas azules hacia atrás
                    const animsPunta = animarPuntaAzul(flechaCurva, true);
                    
                    // 2. Al terminar de brotar las patitas, cerramos la transición
                    animsPunta[0].onfinish = () => {

                        console.log("La animación del path terminó. Seteando flecha final...");
                    setFlechaFinal(true, necesitaTransicion);

                    // document.documentElement.style.setProperty('--punta-flecha-curva-left', `${x2}px`);
                    // document.documentElement.style.setProperty('--punta-flecha-curva-top', `${y2}px`);
                    document.documentElement.style.setProperty('--punta-flecha-curva-opacity', '1');

                    // 💥 LIBERACIÓN DEL ELSE: Removemos el handler global del principio
                    document.removeEventListener("click", handler, true);
                    DOM.agregarComienzo.disabled = false;
                    DOM.agregarFinal.disabled = false;

                    actualizarSelectoresIntermedios();

                    // Rematamos limpiando cualquier rastro elástico del Ul original
                    finalUl?.classList.remove("no-desplazar");
                    };
                  };



















                  //  const animacionFlecha  = animarPath(pathCurva!, true);


                   
                  // animacionFlecha.onfinish = () => {
                  //   console.log("La animación del path terminó. Seteando flecha final...");
                  //   setFlechaFinal(true, necesitaTransicion);

                  //   // document.documentElement.style.setProperty('--punta-flecha-curva-left', `${x2}px`);
                  //   // document.documentElement.style.setProperty('--punta-flecha-curva-top', `${y2}px`);
                  //   document.documentElement.style.setProperty('--punta-flecha-curva-opacity', '1');

                  //   // 💥 LIBERACIÓN DEL ELSE: Removemos el handler global del principio
                  //   document.removeEventListener("click", handler, true);
                  //   DOM.agregarComienzo.disabled = false;
                  //   DOM.agregarFinal.disabled = false;

                  //   actualizarSelectoresIntermedios();

                  //   // Rematamos limpiando cualquier rastro elástico del Ul original
                  //   finalUl?.classList.remove("no-desplazar");
                  // };
                } else {
                  document.removeEventListener("click", handler, true);
                  DOM.agregarComienzo.disabled = false;
                  DOM.agregarFinal.disabled = false;
                }
              }
              
            });
          }
        }, 100);
      }, 2000);


 finalUl?.classList.add("no-desplazar");
}










    // Se limpia el evento de la transición base inicial
    finalUl.classList.add("no-desplazar");

  });
}

// Función auxiliar reutilizable para evitar duplicación de código e inconsistencias
function actualizarSelectoresIntermedios(): void {
  if (DOM.contenedorNodos.childElementCount > 1 && DOM.agregarIntermedio && DOM.textoSelector && DOM.selectorPares) {
    DOM.agregarIntermedio.removeAttribute("hidden");
    DOM.textoSelector.removeAttribute("hidden");
    DOM.selectorPares.removeAttribute("hidden");

    const opt = document.createElement('option');
    const cuenta = DOM.contenedorNodos.childElementCount.toString();
    opt.value = cuenta;
    opt.innerHTML = cuenta;
    DOM.selectorPares.appendChild(opt);
  }
}

export { agregarNodoAlComienzo, agregarNodoIntermedio, agregarNodoAlFinal, agregarPrimerNodo };