// RenderSacarNodo.ts
import { setPuntero, setFlechaFinal, setFlechaInicial } from "./ControladorInicializador.ts";
import { sacarNodo, getNodos } from "../contenedores/ContenedorNodos.ts";
import { sacarFlecha, getFlechas } from "../contenedores/ContenedorFlechas.ts";
import { setFlechasNodos, setFlechasNodos2 ,setFlechasNodosConFlechaCurva, setFlechasNodosDefinitiva} from "./RenderFlechasNodos.ts";
import { renderizar } from "./ControladorBarraSuperior.ts";
import { obtenerInfoLayout, getCantidadNodosFila } from "../utils/layoutHelpers.ts";
import { animarPath , animarPuntaAzul} from "../elementosGraficos/FlechaCurva.ts";
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

/* ==========================================================================
   1. BORRAR ÚLTIMO NODO (Cuando queda solo 1 en la lista)
   ========================================================================== */
// export function borrarUltimoNodo(): void {
//   if (!DOM.verificarDOM()) return;




//   DOM.botonAgregar1erNodo.removeAttribute("hidden");
//   DOM.botonAgregar1erNodo.disabled = true;
//   DOM.agregarComienzo.setAttribute("hidden", "hidden");
//   DOM.agregarFinal.setAttribute("hidden", "hidden");

//   const ancho = DOM.principal.offsetWidth;
//   DOM.principal.style.width = ancho + 'px';

//   if (root.style.getPropertyValue("--principal-height") === '50vw') {
//     const altura = DOM.principal.offsetHeight; 
//     root.style.setProperty("--principal-height", `${altura}px`);
//   }

//   document.addEventListener("click", handler, true);
//   setFlechaFinal(false, 1);

//   // const ulFinal = obtenerSubElemento(DOM.flechaPunteroFinal, "underline");
//   // const ulInicial = obtenerSubElemento(DOM.flechaPunteroInicial, "underline");

//   const finalUl = DOM.finalUl();
//   const inicialUl = DOM.inicialUl();
//   const inicialLs = DOM.inicialLs();
//   const inicialLi = DOM.inicialLi();

//   finalUl?.addEventListener("transitionend", function fbpn() {
//     setFlechaInicial(false, 1);
//     finalUl.removeEventListener("transitionend", fbpn);
//   });

//   inicialUl?.addEventListener("transitionend", function f2() {
//     inicialUl.classList.remove("arrowend-first-ul");
//     inicialLs?.classList.remove("arrowend-first");
//     inicialLi?.classList.remove("arrowend-first");
//     const angulo = 0;
//     // const fpiLeft = 0.05 * DOM.contenedorNodos.offsetWidth + DOM.str.offsetWidth;
//     // const fpiWidth = DOM.contenedorNodos.offsetWidth - 2 * fpiLeft;

//     root.style.setProperty('--rotation-angle-fpi', `${angulo}deg`);


//     sacarNodo(DOM.inputNodo.value);
//         if (DOM.inicializador) {
//           DOM.inicializador.style.display = "flex";
//           DOM.inicializador.style.justifyContent = "space-between";
//           DOM.inicializador.style.alignItems = "center";
      
//         }
//         DOM.str.style.position = "relative";
//         DOM.nulo.style.position = "relative";
      
//       setPuntero(0);
//     // root.style.setProperty('--linea-flecha-inicial-width', `${fpiWidth}px`);
//     // root.style.setProperty('--punta-flecha-inicial-width', `20px`);
//     // root.style.setProperty('--punta-flecha-inicial-top', `-100px`);
//     // root.style.setProperty('--punta-flecha-inicial-left', `${fpiLeft + fpiWidth}px`);

//     setTimeout(() => {
//       const primerHijo = DOM.contenedorNodos.firstElementChild as HTMLElement;
//       if (primerHijo)
//         primerHijo.classList.remove("inmediato-nodo");
//         primerHijo.style.opacity = "0";
//     }, 1000);

//     inicialUl.removeEventListener("transitionend", f2);
//   });
   
//   const primerNodo = DOM.contenedorNodos.firstElementChild as HTMLElement;
//   if (primerNodo) {
//     primerNodo.addEventListener("transitionend", function f1() {

//       primerNodo.removeEventListener("transitionend", f1);
//     });
//   }

//   DOM.str.addEventListener("transitionend", function f1() {
//     DOM.botonAgregar1erNodo.disabled = false;
//     document.removeEventListener("click", handler, true);
//     renderizar();
//     DOM.principal.removeAttribute("style");
//     DOM.str.removeEventListener("transitionend", f1); // Corregido typo nativo 'transitioned'
//   });
// }
export function borrarUltimoNodo(): void {
  if (!DOM.verificarDOM()) return;

  // Deshabilitamos interacción mientras dura la secuencia
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

  const finalUl = DOM.finalUl();
  const inicialUl = DOM.inicialUl();
  const inicialLs = DOM.inicialLs();
  const inicialLi = DOM.inicialLi();
  // renderizar();
  // inicialUl?.classList.add("cambio_top");
  // setPuntero(1);
  //       if (DOM.inicializador) {
  //           DOM.inicializador.style.display = "flex";
  //           DOM.inicializador.style.justifyContent = "space-between";
  //           DOM.inicializador.style.alignItems = "center";
  //         }
  //         DOM.str.style.position = "relative";
  //         DOM.nulo.style.position = "relative";
  //     DOM.str.classList.add("inmediato_reacomodo");
  //     DOM.nulo.classList.add("inmediato_reacomodo");
      
      
    // DOM.str.classList.remove("inmediato_reacomodo");
    // DOM.nulo.classList.remove("inmediato_reacomodo");
  const primerNodo = DOM.contenedorNodos.firstElementChild as HTMLElement;

  // =========================================================================
  // PASO 1: Contracción de la flecha final (derecha)
  // =========================================================================
  setFlechaFinal(false, 1);

  if (finalUl) {
    finalUl.addEventListener("transitionend", function fPaso1(e) {
      if (e.target !== finalUl) return;
      finalUl.removeEventListener("transitionend", fPaso1);

      // =========================================================================
      // PASO 2: Contracción de la flecha inicial (izquierda) hacia StrPtr
      // =========================================================================
      setFlechaInicial(false, 1);


      
      if (inicialUl) {
        inicialUl.addEventListener("transitionend", function fPaso2(e) {
          if (e.target !== inicialUl) return;
          
          inicialUl.removeEventListener("transitionend", fPaso2);

          // Limpieza de clases de rotación/diagonal
          inicialUl.classList.remove("arrowend-first-ul");
          inicialLs?.classList.remove("arrowend-first");
          inicialLi?.classList.remove("arrowend-first");

          root.style.setProperty('--rotation-angle-fpi', '0deg');

          // =========================================================================
          // PASO 3: Re-extensión de la flecha inicial superior (StrPtr -> NULL arriba)
          // =========================================================================
          // RESTAURACIÓN DE ESTILOS: Se colocan aquí para acompañar la re-extensión
        

          //Calculamos el ancho entre los márgenes del 3%/5% antes de moverlos
          const fpiLeft = 0.03 * DOM.contenedorNodos.offsetWidth + DOM.str.offsetWidth;
          const fpiWidth = DOM.contenedorNodos.offsetWidth - 2 * fpiLeft;

          root.style.setProperty('--linea-flecha-inicial-width', `${fpiWidth}px`);
          root.style.setProperty('--punta-flecha-inicial-width', `20px`);
          root.style.setProperty('--punta-flecha-inicial-left', `${fpiLeft + fpiWidth}px`);
          root.style.setProperty('--linea-flecha-final-top', `-2.5px`);
      inicialUl?.classList.add("cambio_top");    
      DOM.str.classList.add("inmediato_reacomodo");
      DOM.nulo.classList.add("inmediato_reacomodo");
          // inicialUl.classList.add("inmediato");
          // inicialLs?.classList.add("inmediato");
          // inicialLi?.classList.add("inmediato");   
          inicialUl.addEventListener("transitionend", function fPaso3(e) {
          inicialUl.classList.add("inmediato");
          inicialLs?.classList.add("inmediato");
          inicialLi?.classList.add("inmediato");  
            if (e.target !== inicialUl) return;
            inicialUl.removeEventListener("transitionend", fPaso3);
        setPuntero(1);
        if (DOM.inicializador) {
            DOM.inicializador.style.display = "flex";
            DOM.inicializador.style.justifyContent = "space-between";
            DOM.inicializador.style.alignItems = "center";
          }
          DOM.str.style.position = "relative";
          DOM.nulo.style.position = "relative";
 
          // setPuntero(1);
          // if (DOM.inicializador) {
          //   DOM.inicializador.style.display = "flex";
          //   DOM.inicializador.style.justifyContent = "space-between";
          //   DOM.inicializador.style.alignItems = "center";
          // }
          // DOM.str.style.position = "relative";
          // DOM.nulo.style.position = "relative";


          
    root.style.setProperty('--linea-flecha-inicial-width', `${fpiWidth}px`);
    root.style.setProperty('--punta-flecha-inicial-width', `20px`);
    root.style.setProperty('--punta-flecha-inicial-top', `-100px`);
    root.style.setProperty('--punta-flecha-inicial-left', `${fpiLeft + fpiWidth}px`);


            // =========================================================================
            // PASO 4: Desvanecer el nodo del centro (opacity: 1 -> 0)
            // =========================================================================
            if (primerNodo) {
              primerNodo.classList.remove("inmediato-nodo");
              primerNodo.style.opacity = "0";

              primerNodo.addEventListener("transitionend", function fPaso4(e) {
                if (e.target !== primerNodo) return;
                primerNodo.removeEventListener("transitionend", fPaso4);
                
                // =========================================================================
                // PASO 5: Sacar nodo del DOM y reacomodar StrPtr / NULL al 25% y centro vertical
                // =========================================================================
                  const divValor = primerNodo.firstElementChild;
                  const valor = divValor?.innerHTML;
                  sacarNodo(valor!);
                    DOM.str.classList.remove("inmediato_reacomodo");
                    DOM.nulo.classList.remove("inmediato_reacomodo");
                    inicialUl.classList.remove("inmediato");
                    inicialLs?.classList.remove("inmediato");
                    inicialLi?.classList.remove("inmediato");   
                // Vuelve a la geometría de la imagen 1 (centrado y 25%)
                setPuntero(0);

                if (DOM.str) {
                  DOM.str.addEventListener("transitionend", function fPaso5(e) {
                    if (e.target !== DOM.str) return;
                    DOM.str.removeEventListener("transitionend", fPaso5);

                    // --- FIN DE LA ANIMACIÓN ---
                    DOM.botonAgregar1erNodo.disabled = false;
                    document.removeEventListener("click", handler, true);
                    // renderizar();
                    DOM.principal.removeAttribute("style");
                  });
                } else {
                  DOM.botonAgregar1erNodo.disabled = false;
                  document.removeEventListener("click", handler, true);
                  renderizar();
                  DOM.principal.removeAttribute("style");
                }
              });
            }
          });
        });
      }
    });
  }
}

/* ==========================================================================
   2. BORRAR NODO AL COMIENZO
   ========================================================================== */
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




            if(layout.totalFilas > 1 && layout.nodosPorFila.get(0)! == 2) {
                          const spacer = document.createElement("div");
                          spacer.classList.add("flecha-spacer-fila");
                          DOM.contenedorFlechas.prepend(spacer);
                       if(layout.totalFilas >=2 )
                          DOM.contenedorFlechas.classList.remove("margin-flex");
          }

          sacarNodo(data);
          for (let i = 0; i < (nodosPrimeraFila - 1 ); i++) {
            nodos[i].classList.add("no-mover");
            nodos[i].style.left = '0px';
            flechas[i].classList.remove("flecha-animando");
          }

          sacarFlecha(0);



                if (layout.totalFilas == 1 && flechas.length != 0 ) {

                    flechas.forEach((flecha) => {

                      // (flecha as HTMLElement).style.removeProperty("width");

                      (flecha as HTMLElement).classList.remove("flecha-animando");
                    });

                }
   

           setTimeout(() => {
            setFlechaInicial(true,1);
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



  }
  else {
      console.log("Iniciando reversión: Desvaneciendo punta de flecha curva...");
      // document.documentElement.style.setProperty('--punta-flecha-curva-opacity', '0');
      const flechaCurva = DOM.contenedorFlechasCurvas?.firstElementChild as SVGElement;
      const pathCurva = flechaCurva?.firstElementChild as SVGPathElement | null;
      
      // const pathCurva = document.getElementById("flecha_curva_dinamica") as SVGPathElement | null;
    
      if (pathCurva) {

        // const animacionContraccion = animarPath(pathCurva!);


// 1. Primero se encogen las patitas azules hacia la punta
        const animsPunta = animarPuntaAzul(flechaCurva, false);

        animsPunta[0].onfinish = () => {
          // 2. Una vez que desapareció la punta, recién ahí se retrocede/desvanece la curva roja
          const animacionCurva = animarPath(pathCurva!, false);

          // animacionCurva.onfinish = () => {
          //   flechaCurva.remove(); // Eliminamos el SVG del DOM al terminar todo
          // };

          // animacionContraccion.onfinish = () => {
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
                // sacarNodo(data);


          

               
         
                // const salto = DOM.contenedorNodos.querySelector(".salto-flex");

                //   const saltoNodos = DOM.contenedorNodos.querySelectorAll(".salto-flex")[0];


                // if (saltoNodos) saltoNodos.remove();

                   
                // const saltoFlechas = DOM.contenedorFlechas.querySelectorAll(".salto-flex")[0];
                // if (saltoFlechas) saltoFlechas.remove();




                // DOM.contenedorFlechas.querySelector(".salto-flex")?.remove();



                 const auxAltura = DOM.principal.offsetHeight;
                // B. Achicamos principal y contenedores a 400px de golpe (sin transición todavía)
                 root.style.setProperty('--principal-height', `${ DOM.principal.offsetHeight  - 200 -  50 * (layout.totalFilas > 2 ? 1 : 0)}px`);

                // C. Congelamos los nodos restantes abajo usando los márgenes de la Fase 2 original
                // const nodosRestantes = Array.from(getNodos() as HTMLElement[]);
                // nodosRestantes.forEach(nodo => {
                //   // nodo.classList.remove("transicion-nodos");
                //   nodo.style.setProperty("margin-top", "400px", "important");
                // });

                
                const contenedorFlechas = document.getElementById("contenedor_flechas");
                if (contenedorFlechas) {

                  // const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
                  // flechasExistentes.forEach((flecha) => {
  
                  // // (flecha as HTMLElement).classList.remove("transicion-flechas");
                  // (flecha as HTMLElement).style.setProperty("margin-top", "400px", "important");

                  // });
                }


                

                setTimeout(()=> {


                  

                   if (DOM.principalWrapper.style.getPropertyValue("max-height") == "" || window.alturaDeVentana != window.innerHeight) {
                    
                     window.alturaDeVentana = window.innerHeight;
                    // 2. Calcular la altura máxima física disponible en el viewport
                    //    (Alto total de ventana - Margen inferior deseado - Distancia desde el techo hasta el wrapper)
                    const maxPermitido = window.alturaDeVentana - 8 - DOM.principalWrapper.offsetTop;
                    
                    // 3. Aplicar el alto deseado (ej: 400, 600, 800...), pero frenado en la altura máxima real
                    const altoDeseado =  auxAltura - 200 -  50 * (layout.totalFilas > 2 ? 1 : 0); // El valor que quieras según las filas
                    const altoFinal = Math.min(altoDeseado, maxPermitido);
                    
                    // if (altoFinal != maxPermitido)
                    //  DOM.principalWrapper.style.setProperty('max-height', `${altoFinal}px`);
                    
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

                          const flecha_puntero_final = document.getElementById("flecha_puntero_final");
                          if (!flecha_puntero_final) return;
                          const hijos = flecha_puntero_final.children;
                        
                                  for (const hijo of hijos) {
                                    (hijo as HTMLElement).style.transition = "top 2s ease-in-out";
                                    
                                  }    

          
                                    root.style.setProperty('--linea-flecha-final-top', `${DOM.finalUl()!.offsetTop - 250}px`);
                                    root.style.setProperty('--nulo-top', `${DOM.nulo.offsetTop - 250}px`);
                                    root.style.setProperty('--punta-flecha-final-top', `${DOM.nulo.offsetTop + DOM.nulo.offsetHeight - 250}px`);


            DOM.principalWrapper.addEventListener("transitionend", function ultimaParte() {
                       

  
                
                ///Analizar lo de este condicional a ver si lo de coso va afuera 
              //// lo de los comentarios va afuera.
                  if (layout.totalFilas == 2) {
                  DOM.contenedorNodos?.classList.remove("cambio-flex", "margin-flex");
                 

            // DOM.contenedorFlechas.querySelector(".salto-flex")?.remove();



                   DOM.contenedorFlechas?.classList.remove("cambio-flex");


            const saltoNodos = DOM.contenedorNodos.querySelectorAll(".salto-flex")[0];


                if (saltoNodos) saltoNodos.remove();

                   
                const saltoFlechas = DOM.contenedorFlechas.querySelectorAll(".salto-flex")[0];
                if (saltoFlechas) saltoFlechas.remove();
                  
                   DOM.contenedorFlechas.querySelector(".flecha-spacer-fila")?.remove();

                    const nodosRestantes = Array.from(getNodos() as HTMLElement[]);
                  nodosRestantes.forEach(nodo => {
                    nodo.classList.remove("transicion-nodos-negativa");
                    // nodo.style.removeProperty("margin-top"); 
                  });

                  
                  const contenedorFlechas = document.getElementById("contenedor_flechas");
                  if (contenedorFlechas) {
                    const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
                    flechasExistentes.forEach((flecha) => {
                    (flecha as HTMLElement).classList.remove("transicion-flechas-negativa");
                    // (flecha as HTMLElement).style.removeProperty("margin-top"); 
                    });
                  }
                }
                       sacarNodo(data);

                                        setFlechaInicial(true, necesitaTransicion);
                    
                                        // Aseguramos las variables CSS de la punta de la flecha curva en su destino exacto
                                        // document.documentElement.style.setProperty('--punta-flecha-curva-left', `${x2}px`);
                                        // document.documentElement.style.setProperty('--punta-flecha-curva-top', `${y2}px`);
                                        // document.documentElement.style.setProperty('--punta-flecha-curva-opacity', '1');
                    
                    
                                        // Liberamos los controles de la UI al terminar la secuencia completa
                                        document.removeEventListener("click", handler, true);
                                        DOM.agregarComienzo.disabled = false;
                                        DOM.agregarFinal.disabled = false;
                    DOM.principalWrapper.removeEventListener("transitionend", ultimaParte);
                                        
                  });

                },100);

                  




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





  const M = 2; // Tu límite configurado por fila
  
  
  
  const layout = obtenerInfoLayout(M);
const n = layout.nodosUltimaFila;
 finalUl?.addEventListener("transitionend", function fpu() {
      finalUl.removeEventListener("transitionend", fpu);
  if(n > 1) {


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
              setFlechasNodos(1,0,s1,s2);
            }
          // Disparamos la animación que vamos a arreglar ahora
          setFlechasNodosDefinitiva(1, 0, s1, s2, "receptor", layout);


          const primeroNodoUltimaFila = nodos[layout.indiceInicioUltimaFila];
          // const primeroNodoUltimaFila = DOM.contenedorNodos.querySelectorAll(".caja-nodo")[2] as HTMLElement;
          if (!primeroNodoUltimaFila) return;

          primeroNodoUltimaFila.addEventListener("transitionend", function g() {
            primeroNodoUltimaFila.removeEventListener("transitionend", g);





            sacarNodo(data);
            

            for (let i = layout.indiceInicioUltimaFila ; i < layout.indiceInicioUltimaFila + layout.nodosUltimaFila-1 ; i++) {
              nodos[i].classList.add("no-mover");
              nodos[i].style.left = '0px';
            }



             


            if(layout.nodosUltimaFila == 2) {
                          const spacer = document.createElement("div");
                          spacer.classList.add("flecha-spacer-fila");
                          DOM.contenedorFlechas.appendChild(spacer);
          }

            const flechas = DOM.contenedorFlechas.querySelectorAll(".arrow");
            const cantidadFlechas = flechas.length;

            sacarFlecha(cantidadFlechas-1);

           

              if(layout.totalFilas >= 2) {

               
               flechas.forEach((flecha) => {
                      // (flecha as HTMLElement).style.marginTop = "150px";
                      (flecha as HTMLElement).classList.remove("flecha-animando");
                    })
                  
             const haySpacer = DOM.contenedorFlechas.querySelectorAll(".flecha-spacer-fila").length == 1 && DOM.contenedorFlechas.lastElementChild?.classList.contains(".flechas-spacer-fila");
             if(layout.totalFilas >= 2 && haySpacer == true) 
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
            // }, 100);

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
      // document.documentElement.style.setProperty('--punta-flecha-curva-opacity', '0');

      // // const pathCurva = document.getElementById("flecha_curva_dinamica") as SVGPathElement | null;

      // const pathCurva = DOM.contenedorFlechasCurvas.lastElementChild?.firstElementChild as SVGPathElement | null;




      // if (pathCurva) {


      //   const animacionContraccion = animarPath(pathCurva!);

       const flechaCurva = DOM.contenedorFlechasCurvas?.lastElementChild as SVGElement;
      const pathCurva = flechaCurva?.firstElementChild as SVGPathElement | null;
      
      // const pathCurva = document.getElementById("flecha_curva_dinamica") as SVGPathElement | null;
    
      if (pathCurva) {

        // const animacionContraccion = animarPath(pathCurva!);


// 1. Primero se encogen las patitas azules hacia la punta
        const animsPunta = animarPuntaAzul(flechaCurva, false);

        animsPunta[0].onfinish = () => {
          // 2. Una vez que desapareció la punta, recién ahí se retrocede/desvanece la curva roja
          const animacionCurva = animarPath(pathCurva!, false);

          // animacionCurva.onfinish = () => {
          //   flechaCurva.remove(); // Eliminamos el SVG del DOM al terminar todo
          // };

          // animacionContraccion.onfinish = () => {
          animacionCurva.onfinish = () => {
          // console.log("La animación del path terminó. Eliminando contenedor SVG...");
          // const svgContenedor = pathCurva.closest(".svg-flecha-interfila");
          // svgContenedor?.remove();

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


                root.style.setProperty('--linea-flecha-final-top', `${DOM.finalUl()!.offsetTop - 250}px`);
                root.style.setProperty('--nulo-top', `${DOM.nulo.offsetTop - 250}px`);
                root.style.setProperty('--punta-flecha-final-top', `${DOM.finalLi()!.offsetTop - 250}px`);


if (DOM.principalWrapper.style.getPropertyValue("max-height") == "" || window.alturaDeVentana != window.innerHeight) {

   window.alturaDeVentana = window.innerHeight;
// 2. Calcular la altura máxima física disponible en el viewport
//    (Alto total de ventana - Margen inferior deseado - Distancia desde el techo hasta el wrapper)
const maxPermitido = window.alturaDeVentana - 8 - DOM.principalWrapper.offsetTop;

// 3. Aplicar el alto deseado (ej: 400, 600, 800...), pero frenado en la altura máxima real
const altoDeseado =  DOM.principal.offsetHeight  - 200 -  50 * (layout.totalFilas > 2 ? 1 : 0); // El valor que quieras según las filas
const altoFinal = Math.min(altoDeseado, maxPermitido);

// if (altoFinal != maxPermitido)
//  DOM.principalWrapper.style.setProperty('max-height', `${altoFinal}px`);

root.style.setProperty('--wrapper-height', `${altoFinal}px`);
}


DOM.contenedorFlechas.lastElementChild?.remove();

                setTimeout(() => {
                  console.log("Paso 2: Wrapper cerrado. Limpiando el DOM en bloque.");

                  // 1. Borrado físico del DOM
                  sacarNodo(data);
                  
                  




                  // 2. Reseteamos las cajas internas barriendo estilos en línea
                  root.style.setProperty('--principal-height', `${ DOM.principal.offsetHeight  - 200 -  50 * (layout.totalFilas > 2 ? 1 : 0)}px`);

                  const saltoNodos = DOM.contenedorNodos.querySelectorAll(".salto-flex")[layout.totalFilas-2];


                if (saltoNodos) saltoNodos.remove();

                   
                const saltoFlechas = DOM.contenedorFlechas.querySelectorAll(".salto-flex")[layout.totalFilas-2];
                if (saltoNodos) saltoFlechas.remove();

              // DOM.contenedorNodos.querySelector(".salto-flex")?.remove();

                console.log("estoy en una posicion en la que no se borra margin flex");
                console.log("la cantidad de filas es: ",layout.totalFilas);
                  if (layout.totalFilas == 2) {
                  DOM.contenedorNodos.classList.remove("cambio-flex", "margin-flex");
                 

            // DOM.contenedorFlechas.querySelector(".salto-flex")?.remove();



                   DOM.contenedorFlechas?.classList.remove("cambio-flex", "margin-flex");
                  }
                  // else {
                  //   DOM.contenedorFlechas?.classList.remove("cambio-flex", "margin-flex");
                  // }
      
                  


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
                  
                  finalUl?.classList.remove("no-desplazar");
                  console.log("Reversión multi-fila completada con éxito.");
                }, 2000);
              }
            });
          }

          }
        }



//         animacionContraccion.onfinish = () => {
//           console.log("La animación del path terminó. Eliminando contenedor SVG...");
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

//               // DOM.contenedorNodos.querySelector(".salto-flex")?.remove();


//                   if (layout.totalFilas == 2) {
//                   DOM.contenedorNodos.classList.remove("cambio-flex", "margin-flex");
                 

//             // DOM.contenedorFlechas.querySelector(".salto-flex")?.remove();



//                    DOM.contenedorFlechas?.classList.remove("cambio-flex");
//                   }
      
  


//                   const contenedorFlechas = document.getElementById("contenedor_flechas");
//                   if (contenedorFlechas) {
//                     const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
//                     if (layout.totalFilas == 2) {
//                     flechasExistentes.forEach((flecha) => {
//                     (flecha as HTMLElement).classList.remove("no_mover__flecha");
//                     (flecha as HTMLElement).style.removeProperty("width"); 
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
                  
                  
//                   console.log("Reversión multi-fila completada con éxito.");
//                 }, 2000);
//               }
//             });
//           }
//         };
      } else {
        document.removeEventListener("click", handler, true);
        DOM.agregarComienzo.disabled = false;
        DOM.agregarFinal.disabled = false;
      }

  }

});
 finalUl?.classList.add("no-desplazar");
 
}