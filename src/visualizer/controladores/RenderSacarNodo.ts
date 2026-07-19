// RenderSacarNodo.ts
import { setPuntero, setFlechaFinal, setFlechaInicial } from "./ControladorInicializador.ts";
import { sacarNodo, getNodos } from "../contenedores/ContenedorNodos.ts";
import { sacarFlecha, getFlechas } from "../contenedores/ContenedorFlechas.ts";
import { setFlechasNodos, setFlechasNodos2 , setFlechasNodos5, setFlechasNodos6} from "./RenderFlechasNodos.ts";
import { renderizar } from "./ControladorBarraSuperior.ts";
import * as DOM from "../elementosDOM.ts"; // Tu core centralizado



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
export function borrarUltimoNodo(): void {
  if (!DOM.verificarDOM()) return;




  DOM.botonAgregar1erNodo.removeAttribute("hidden");
  DOM.botonAgregar1erNodo.disabled = true;
  DOM.agregarComienzo.setAttribute("hidden", "hidden");
  DOM.agregarFinal.setAttribute("hidden", "hidden");

  const ancho = DOM.principal.offsetWidth;
  DOM.principal.style.width = ancho + 'px';

  if (root.style.getPropertyValue("--principal-height") === '50vw') {
    const altura = DOM.principal.offsetHeight; 
    root.style.setProperty("--principal-height", `${altura}px`);
  }

  document.addEventListener("click", handler, true);
  setFlechaFinal(false, 1);

  // const ulFinal = obtenerSubElemento(DOM.flechaPunteroFinal, "underline");
  // const ulInicial = obtenerSubElemento(DOM.flechaPunteroInicial, "underline");

  const finalUl = DOM.finalUl();
  const inicialUl = DOM.inicialUl();
  const inicialLs = DOM.inicialLs();
  const inicialLi = DOM.inicialLi();

  finalUl?.addEventListener("transitionend", function fbpn() {
    setFlechaInicial(false, 1);
    finalUl.removeEventListener("transitionend", fbpn);
  });

  inicialUl?.addEventListener("transitionend", function f2() {
    inicialUl.classList.remove("arrowend-first-ul");
    inicialLs?.classList.remove("arrowend-first");
    inicialLi?.classList.remove("arrowend-first");
    const angulo = 0;
    const fpiLeft = 0.05 * DOM.contenedorNodos.offsetWidth + DOM.str.offsetWidth;
    const fpiWidth = DOM.contenedorNodos.offsetWidth - 2 * fpiLeft;

    root.style.setProperty('--rotation-angle-fpi', `${angulo}deg`);
    root.style.setProperty('--linea-flecha-inicial-width', `${fpiWidth}px`);
    root.style.setProperty('--punta-flecha-inicial-width', `20px`);
    root.style.setProperty('--punta-flecha-inicial-top', `-100px`);
    root.style.setProperty('--punta-flecha-inicial-left', `${fpiLeft + fpiWidth}px`);

    setTimeout(() => {
      const primerHijo = DOM.contenedorNodos.firstElementChild as HTMLElement;
      if (primerHijo) primerHijo.style.opacity = "0";
    }, 1000);

    inicialUl.removeEventListener("transitionend", f2);
  });

  const primerNodo = DOM.contenedorNodos.firstElementChild as HTMLElement;
  if (primerNodo) {
    primerNodo.addEventListener("transitionend", function f1() {
      sacarNodo(DOM.inputNodo.value);
      setPuntero(0);
      primerNodo.removeEventListener("transitionend", f1);
    });
  }

  DOM.str.addEventListener("transitionend", function f1() {
    DOM.botonAgregar1erNodo.disabled = false;
    document.removeEventListener("click", handler, true);
    renderizar();
    DOM.principal.removeAttribute("style");
    DOM.str.removeEventListener("transitionend", f1); // Corregido typo nativo 'transitioned'
  });
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


 if(nodos.length === 4){
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
        s1 = ((DOM.contenedorNodos.offsetWidth - (2) * nodoUltimo.offsetWidth) / (2 + 1));
        s2 = (DOM.contenedorNodos.offsetWidth - (2 - 1) * nodoUltimo.offsetWidth) / (2);

        // setFlechaFinal(true, necesitaTransicion, s2);
        setFlechasNodos6(necesitaTransicion, 1, s1, s2, 1);



         const unicoNodoFila1 = DOM.contenedorNodos.querySelectorAll(".caja-nodo")[1] as HTMLElement;


          unicoNodoFila1.addEventListener("transitionend", function g() {


          sacarNodo(data);
          for (let i = 0; i < 1; i++) {
            nodos[i].classList.add("no-mover");
            nodos[i].style.left = '0px';
          }

          sacarFlecha(0);
          DOM.contenedorFlechas.querySelector(".salto-flex")?.remove();


          setTimeout(() => {
            for (let i = 0; i < flechas.length; i++) {
              flechas[i].style.marginTop = "300px";
            }
          }, 100);


          setFlechaInicial(true,1);
          
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


if(nodos.length < 3) {


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
      ul.removeEventListener("transitionend", fu);
    });
  }

  // const ulInicial = obtenerSubElemento(DOM.flechaPunteroInicial, "underline");
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
        s1 = ((DOM.contenedorNodos.offsetWidth - (nodos.length) * nodoUltimo.offsetWidth) / (nodos.length + 1));
        s2 = (DOM.contenedorNodos.offsetWidth - (nodos.length - 1) * nodoUltimo.offsetWidth) / (nodos.length);

        setFlechaFinal(true, necesitaTransicion, s2);
        setFlechasNodos(necesitaTransicion, 1, s1, s2);
        primerHijo.removeEventListener("transitionend", fn);
      });
    }
    inicialUl.removeEventListener("transitionend", fpu);
  });

  const ultimoHijoNodo = DOM.contenedorNodos.lastElementChild as HTMLElement;
  if (ultimoHijoNodo) {
    ultimoHijoNodo.addEventListener("transitionend", function fnf() {
      sacarNodo(data);

      for (let i = 0; i < nodos.length; i++) {
        nodos[i].classList.add("no-mover");
        nodos[i].style.left = '0px';
      }

      sacarFlecha(0);

      setTimeout(() => {
        setFlechaInicial(true, necesitaTransicion);
        for (let i = 0; i < nodos.length; i++) {
          nodos[i].classList.remove("no-mover");
        }
      }, 1000);

      // const ulInicialLast = DOM.flechaPunteroInicial.lastElementChild as HTMLElement;

      const inicialLi = DOM.inicialLi();
      // if (ulInicialLast) {
        inicialLi?.addEventListener("transitionend", function g() {
          document.removeEventListener("click", handler, true);
          DOM.agregarComienzo.disabled = false;
          DOM.agregarFinal.disabled = false;

          if (window.innerWidth !== (DOM.principal.offsetWidth + 33)) {
            DOM.principal.removeAttribute("style");
            renderizar();
          } else {
            DOM.principal.removeAttribute("style");
          }

          if (DOM.contenedorNodos.childElementCount > 1) {
            if (DOM.selectorPares.lastChild) {
              DOM.selectorPares.removeChild(DOM.selectorPares.lastChild);
            }
          }
          inicialLi?.removeEventListener("transitionend", g);
        });
      // }
      ultimoHijoNodo.removeEventListener("transitionend", fnf);
    });
  }
 return;
} 
 
      console.log("Iniciando reversión: Desvaneciendo punta de flecha curva...");
      document.documentElement.style.setProperty('--punta-flecha-curva-opacity', '0');

      const pathCurva = document.getElementById("flecha_curva_dinamica") as SVGPathElement | null;

      if (pathCurva) {
        const largoTotal = pathCurva.getTotalLength();
        
        const animacionContraccion = pathCurva.animate(
          [
            { strokeDashoffset: 0 }, 
            { strokeDashoffset: largoTotal }
          ], 
          {
            duration: 2000,
            easing: "ease-in-out",
            fill: "forwards"
          }
        );

        animacionContraccion.onfinish = () => {
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
              primerNodo.classList.remove("inmediato-nodo");
              primerNodo.style.transition = "opacity 0.8s ease-in-out";
              primerNodo.style.opacity = "0";

              primerNodo.addEventListener("transitionend", function handlerOcultarNodo(ev) {
              if (ev.propertyName === 'opacity') {
                primerNodo.removeEventListener("transitionend", handlerOcultarNodo);
                console.log("🚀 PASO 3 Terminado: El nodo es invisible. Listo para congelar abajo (Paso 4).");
                
                // Aquí vas a meter tu Paso 4 de mutación limpia del DOM
                // A. Mutación física del DOM (Borramos nodo y el salto flex)
                sacarNodo(data);
                const salto = DOM.contenedorNodos.querySelector(".salto-flex");
                if (salto) salto.remove();

                // B. Achicamos principal y contenedores a 400px de golpe (sin transición todavía)
                if (DOM.principal) DOM.principal.style.height = "400px";
                if (DOM.contenedorNodos) DOM.contenedorNodos.style.height = "400px";
                if (DOM.contenedorFlechas) DOM.contenedorFlechas.style.height = "400px";
                if (DOM.inicializador) DOM.inicializador.style.height = "400px";
                document.documentElement.style.setProperty('--principal-height', '400px');

                // C. Congelamos los nodos restantes abajo usando los márgenes de la Fase 2 original
                const nodosRestantes = Array.from(getNodos() as HTMLElement[]);
                nodosRestantes.forEach(nodo => {
                  nodo.style.transition = "none";
                  nodo.style.setProperty("margin-top", "400px", "important");
                });

                
                const contenedorFlechas = document.getElementById("contenedor_flechas");
                if (contenedorFlechas) {

                  const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
                  flechasExistentes.forEach((flecha) => {
                    // (flecha as HTMLElement).style.transition = "none";
                    // (flecha as HTMLElement).style.transform = "none";
                  (flecha as HTMLElement).setAttribute("style","");
                  (flecha as HTMLElement).style.setProperty("margin-top", "500px", "important");
                    // (flecha as HTMLElement).style.transition = "transform 2s ease-in-out";
                    // // Aplicamos el desfase vertical estático para que calcen con los nodos en margin-top 300px
                    // (flecha as HTMLElement).style.transform = "translateY(250px)"; 
                  });
                }

                setTimeout(()=> {

                        if (DOM.principalWrapper) {
                          DOM.principalWrapper.style.transition = "height 2s ease-in-out, min-height 2s ease-in-out, max-height 2s ease-in-out";
                          DOM.principalWrapper.style.height = "400px";
                          DOM.principalWrapper.style.minHeight = "400px";
                          DOM.principalWrapper.style.maxHeight = "400px";
                        }
                  
                  const nodosRestantes = Array.from(getNodos() as HTMLElement[]);
                  nodosRestantes.forEach(nodo => {
                    
                    nodo.style.transition = "transform 2s ease-in-out";
                    nodo.style.transform = "translateY(-250px)"; // 🔥 Tu corrección
                  });

                      //  const contenedorFlechas = document.getElementById("contenedor_flechas");
                       const contenedorFlechas = DOM.contenedorFlechas;
                        if (contenedorFlechas) {
                          const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
                          
                          flechasExistentes.forEach((flecha) => {
                            // Replicamos la limpieza de tu setFlechasNodos() para permitir la transición suave
                            // Ahora sí le aplicamos la animación de bajada
                            (flecha as HTMLElement).style.transition = "transform 2s ease-in-out";
                            (flecha as HTMLElement).style.transform = "translateY(-250px)";
                          });
                        }
                                    
                  if (DOM.nulo) {
                          DOM.nulo.style.transition = "top 2s ease-in-out";
                          // DOM.nulo.style.transform = "translateY(-250px)";
                    }
                  
                          const flecha_puntero_final = document.getElementById("flecha_puntero_final");
                          if (!flecha_puntero_final) return;
                          const hijos = flecha_puntero_final.children;
                        
                                  for (const hijo of hijos) {
                                    (hijo as HTMLElement).style.transition = "top 2s ease-in-out";
                                    
                                  }    
          root.style.setProperty('--linea-flecha-final-top', `${197.5}px`);
          root.style.setProperty('--nulo-top', `${92}px`);
          root.style.setProperty('--punta-flecha-final-top', `${108}px`);
          



                            DOM.principalWrapper.addEventListener("transitionend", function ultimaParte() {
                       
                    
                    if (DOM.contenedorNodos) {
                    DOM.contenedorNodos.style.height = "";
                    DOM.contenedorNodos.style.minHeight = "";
                    DOM.contenedorNodos.style.flexWrap = "";
                    DOM.contenedorNodos.style.alignContent = "";
                    DOM.contenedorNodos.style.alignItems = "";
                  }
                  
                    const nodosRestantes = Array.from(getNodos() as HTMLElement[]);
                  nodosRestantes.forEach(nodo => {
                    nodo.style.transition = "none";
                    nodo.style.removeProperty("transform");
                    nodo.style.alignSelf = "";
                    nodo.style.marginTop = ""; 
                    nodo.style.left = "";
                  });

                  
                  const contenedorFlechas = document.getElementById("contenedor_flechas");
                  if (contenedorFlechas) {
                    contenedorFlechas.style.height = "";
                    contenedorFlechas.style.minHeight = "";
                    const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
                    flechasExistentes.forEach((flecha) => {
                      (flecha as HTMLElement).style.removeProperty("transform");
                      (flecha as HTMLElement).style.removeProperty("margin-top");
                      (flecha as HTMLElement).style.removeProperty("transition");
                    });
                  }


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
      }






  //Aca va todo para contraer de nuevo a una fila

   
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

/* ==========================================================================
   4. BORRAR NODO AL FINAL
   ========================================================================== */
// export function borrarNodoAlFinal(data: string): void {
//   if (!DOM.verificarDOM()) return;

//   const nodos = getNodos() as HTMLDivElement[];
//   const flechas = getFlechas() as HTMLDivElement[];
//   console.log("entro a borrar nodo al final");
//   console.log(nodos);
//   console.log(flechas);

//   document.addEventListener("click", handler, true);
//   DOM.agregarComienzo.disabled = true;
//   DOM.agregarFinal.disabled = true;

//   necesitaTransicion = 1;
//   setFlechaFinal(false, necesitaTransicion);

//   const finalUl = DOM.finalUl();
      
//   finalUl?.addEventListener("transitionend", function fpu() {
//     const totalNodos = (getNodos() as HTMLElement[]).length;



//     if(totalNodos === 4) {
      
//     //  1. contraer la ultima flecha que une 3 y 4.
//      const flechaUltima = flechas[flechas.length - 1];
//       if (flechaUltima) {
//         const ul = obtenerSubElemento(flechaUltima, "underline");
//         const ls = obtenerSubElemento(flechaUltima, "linea-s");
//         const li = obtenerSubElemento(flechaUltima, "linea-i");

//         ul.classList.remove("inmediato");

//         setTimeout(() => {
//           ul.style.width = '0px';
//           ls.style.width = '0px';
//           li.style.width = '0px';
//           ul.classList.add("arrowend-first-ul");
//           ls.classList.add("arrowend-first");
//           li.classList.add("arrowend-first");
//         }, 100);


//      // 2. cuando termina eso, empieza a hacer desaparecer el nodo
//       ul.addEventListener("transitionend", function fu() {
//           setTimeout(() => {
//             const ultimoHijo = DOM.contenedorNodos.lastElementChild as HTMLElement;
//             if (ultimoHijo) {
//               ultimoHijo.classList.remove("inmediato-nodo");
//               ultimoHijo.style.opacity = "0";
//             }
//           }, 1100);

//       const ultimoHijoNodo = DOM.contenedorNodos.lastElementChild as HTMLElement;
//       if (ultimoHijoNodo) {
//           ultimoHijoNodo.addEventListener("transitionend", function fn() {
//           const listaNodos = DOM.contenedorNodos.children;
//           const nodoUltimo = DOM.contenedorNodos.lastElementChild as HTMLElement;

//           s1 = ((DOM.contenedorNodos.offsetWidth - (2) * nodoUltimo.offsetWidth) / (2 + 1));
//           s2 = (DOM.contenedorNodos.offsetWidth - (2 - 1) * nodoUltimo.offsetWidth) / (2);

//           // setFlechaInicial(true, necesitaTransicion, s2);
//           setFlechasNodos5(1, 0, s1, s2, 2);


//           const primerNodoFila2 = DOM.contenedorNodos.querySelectorAll(".caja-nodo")[2] as HTMLElement;


//           primerNodoFila2.addEventListener("transitionend", function g() {


//           sacarNodo(data);
//           for (let i = 2; i < nodos.length; i++) {
//             nodos[i].classList.add("no-mover");
//             nodos[i].style.left = '0px';
//           }

//           sacarFlecha(flechas.length - 1);
//           DOM.contenedorFlechas.querySelector(".salto-flex")?.remove();


//           setTimeout(() => {
//             for (let i = 0; i < flechas.length; i++) {
//               flechas[i].style.marginTop = "150px";
//             }
//           }, 100);


//           setFlechaFinal(true,1);
          
//           const finalLi = DOM.finalLi();
//             finalLi?.addEventListener("transitionend", function h() {
//             document.removeEventListener("click", handler, true);
//             DOM.agregarComienzo.disabled = false;
//             DOM.agregarFinal.disabled = false;

//             finalUl?.classList.remove("no-desplazar");

  
//             finalLi.removeEventListener("transitionend", h);
//           });

//               // actualizarSelectoresIntermedios();

              

//               primerNodoFila2.removeEventListener("transitionend", g);
//             });


//           ultimoHijoNodo.removeEventListener("transitionend", fn);
//         });
//       }









//           ul.removeEventListener("transitionend", fu);
//         });
//       }
//      // 3. cuando desaparece el nodo, borro el nodo y animo setFlechasNodos de abajo.
//      //tambien debo borrar la flechas, y borrar el setflecha nodos, y reacomodar
//      //la flecha de arriba.

//      //   4. cuando termina de animar el nodo 3, vuelvo al comportamiento normal de flex y animo 
//       //  la flecha finalUl.

//       return;
//     }




//      if (totalNodos < 3) {
//       // =========================================================================
//       // 🟢 CAMINO ORIGINAL: BORRADO EN UNA SOLA FILA
//       // =========================================================================
//       const flechaUltima = flechas[flechas.length - 1];
//       if (flechaUltima) {
//         const ul = obtenerSubElemento(flechaUltima, "underline");
//         const ls = obtenerSubElemento(flechaUltima, "linea-s");
//         const li = obtenerSubElemento(flechaUltima, "linea-i");

//         ul.classList.remove("inmediato");

//         setTimeout(() => {
//           ul.style.width = '0px';
//           ls.style.width = '0px';
//           li.style.width = '0px';
//           ul.classList.add("arrowend-first-ul");
//           ls.classList.add("arrowend-first");
//           li.classList.add("arrowend-first");
//         }, 100);

//         ul.addEventListener("transitionend", function fu() {
//           setTimeout(() => {
//             const ultimoHijo = DOM.contenedorNodos.lastElementChild as HTMLElement;
//             if (ultimoHijo) {
//               ultimoHijo.classList.remove("inmediato-nodo");
//               ultimoHijo.style.opacity = "0";
//             }
//           }, 1100);
          

//       const ultimoHijoNodo = DOM.contenedorNodos.lastElementChild as HTMLElement;
//       if (ultimoHijoNodo) {
//         ultimoHijoNodo.addEventListener("transitionend", function fn() {
//           const listaNodos = DOM.contenedorNodos.children;
//           const nodoUltimo = DOM.contenedorNodos.lastElementChild as HTMLElement;

//           s1 = ((DOM.contenedorNodos.offsetWidth - (listaNodos.length) * nodoUltimo.offsetWidth) / (listaNodos.length + 1));
//           s2 = (DOM.contenedorNodos.offsetWidth - (listaNodos.length - 1) * nodoUltimo.offsetWidth) / (listaNodos.length);

//           setFlechaInicial(true, necesitaTransicion, s2);
//           setFlechasNodos(1, 0, s1, s2);

//           finalUl?.classList.add("no-desplazar");


//            const primerHijoNodo = DOM.contenedorNodos.firstElementChild as HTMLElement;
//       if (primerHijoNodo) {
//         primerHijoNodo.addEventListener("transitionend", function fnf() {
//           sacarNodo(data);
//           for (let i = 0; i < nodos.length; i++) {
//             nodos[i].classList.add("no-mover");
//             nodos[i].style.left = '0px';
//           }

//           sacarFlecha(flechas.length - 1);

//           setTimeout(() => {
//             setFlechaFinal(true, necesitaTransicion);
//             for (let i = 0; i < nodos.length; i++) {
//               nodos[i].classList.remove("no-mover");
//             }
//           }, 100);

//           const finalLi = DOM.finalLi();
//           finalLi?.addEventListener("transitionend", function g() {
//             document.removeEventListener("click", handler, true);
//             DOM.agregarComienzo.disabled = false;
//             DOM.agregarFinal.disabled = false;

//             finalUl?.classList.remove("no-desplazar");

//             if (window.innerWidth !== (DOM.principal.offsetWidth + 33)) {
//               DOM.principal.removeAttribute("style");
//               renderizar();
//             } else {
//               DOM.principal.removeAttribute("style");
//             }

//             if (DOM.contenedorNodos.childElementCount > 1) {
//               if (DOM.selectorPares.lastChild) {
//                 DOM.selectorPares.removeChild(DOM.selectorPares.lastChild);
//               }
//             }
//             finalLi.removeEventListener("transitionend", g);
//           });
//           primerHijoNodo.removeEventListener("transitionend", fnf);
//         });
//       }   



//           ultimoHijoNodo.removeEventListener("transitionend", fn);
//         });
//       }







//           ul.removeEventListener("transitionend", fu);
//         });
//       }

//       // 🌟 LOS LISTENERS DE DESPLAZAMIENTO HORIZONTAL AHORA VIVEN EXCLUSIVAMENTE ACÁ ADENTRO


     
//       return;
//     }  
    

//       // =========================================================================
//       // 🔵 CAMINO MULTI-FILA (TOTALMENTE AISLADO)
//       // =========================================================================
//       console.log("Iniciando reversión: Desvaneciendo punta de flecha curva...");
//       document.documentElement.style.setProperty('--punta-flecha-curva-opacity', '0');

//       const pathCurva = document.getElementById("flecha_curva_dinamica") as SVGPathElement | null;

//       if (pathCurva) {
//         const largoTotal = pathCurva.getTotalLength();
        
//         const animacionContraccion = pathCurva.animate(
//           [
//             { strokeDashoffset: 0 }, 
//             { strokeDashoffset: largoTotal }
//           ], 
//           {
//             duration: 2000,
//             easing: "ease-in-out",
//             fill: "forwards"
//           }
//         );

//         animacionContraccion.onfinish = () => {
//           console.log("La animación del path terminó. Eliminando contenedor SVG...");
//           const svgContenedor = pathCurva.closest(".svg-flecha-interfila");
//           svgContenedor?.remove();

//           const ultimoNodo = DOM.contenedorNodos.lastElementChild as HTMLElement | null;
          
//           if (ultimoNodo) {
//             console.log("Paso 1: Achicando el Wrapper externo a 400px (2 segundos)...");
//             ultimoNodo.style.transition = "opacity 0.8s ease-in-out";
//             ultimoNodo.style.opacity = "0";

//             ultimoNodo.addEventListener('transitionend', function desvanecerNodo(e) {
//               if (e.propertyName === 'opacity') {
//                 ultimoNodo.removeEventListener('transitionend', desvanecerNodo);
                
//                 console.log("Nodo invisible. Iniciando contracción coordinada del Wrapper.");

//                 // Forzamos el reflotamiento del NULL de inmediato usando base estática de 400px
//                 root.style.setProperty('--nulo-top', `${DOM.str.offsetTop}px`);
//                 root.style.setProperty('--linea-flecha-final-top', `${400 / 2 - 2.5}px`);
//                 root.style.setProperty('--punta-flecha-final-top', `${DOM.str.offsetTop + DOM.nulo.offsetHeight}px`);

//                 if (DOM.principalWrapper) {
//                   DOM.principalWrapper.style.transition = "height 2s ease-in-out, min-height 2s ease-in-out, max-height 2s ease-in-out";
//                   DOM.principalWrapper.style.height = "400px";
//                   DOM.principalWrapper.style.minHeight = "400px";
//                   DOM.principalWrapper.style.maxHeight = "400px";
//                 }

//                 setTimeout(() => {
//                   console.log("Paso 2: Wrapper cerrado. Limpiando el DOM en bloque.");

//                   // 1. Borrado físico del DOM
//                   sacarNodo(data);
//                   DOM.contenedorNodos.querySelector(".salto-flex")?.remove();

//                   // 2. Reseteamos las cajas internas barriendo estilos en línea
//                   document.documentElement.style.setProperty('--principal-height', '400px');
                  
//                   if (DOM.principal) {
//                     DOM.principal.style.height = "";
//                     DOM.principal.style.minHeight = "";
//                   }
//                   if (DOM.contenedorNodos) {
//                     DOM.contenedorNodos.style.height = "";
//                     DOM.contenedorNodos.style.minHeight = "";
//                     DOM.contenedorNodos.style.flexWrap = "";
//                     DOM.contenedorNodos.style.alignContent = "";
//                     DOM.contenedorNodos.style.alignItems = "";
//                   }
//                   if (DOM.inicializador) DOM.inicializador.style.height = "";

//                   const contenedorFlechas = document.getElementById("contenedor_flechas");
//                   if (contenedorFlechas) {
//                     contenedorFlechas.style.height = "";
//                     contenedorFlechas.style.minHeight = "";
//                     const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
//                     flechasExistentes.forEach((flecha) => {
//                       (flecha as HTMLElement).style.transform = "translateY(0px)";
//                     });
//                   }

//                   const contenedorCurvas = document.getElementById("contenedor_flechas_curvas");
//                   if (contenedorCurvas) {
//                     contenedorCurvas.style.height = "";
//                     contenedorCurvas.style.minHeight = "";
//                   }

//                   // 3. Purgamos los inline styles residuales de los nodos de Fila 1 (Evita lefts molestos)
//                   const nodosRestantes = Array.from(getNodos() as HTMLElement[]);
//                   nodosRestantes.forEach(nodo => {
//                     nodo.style.transition = "none";
//                     nodo.style.alignSelf = "";
//                     nodo.style.marginTop = ""; 
//                     nodo.style.left = "";
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
//       } else {
//         document.removeEventListener("click", handler, true);
//         DOM.agregarComienzo.disabled = false;
//         DOM.agregarFinal.disabled = false;
//       }

   


//     finalUl.removeEventListener("transitionend", fpu);
//   });
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

  // =========================================================================
  // 🟢 CASO 1: BORRADO CON REACOMODO DE FILAS (totalNodos === 4)
  // =========================================================================
  if (totalNodos === 4) {
    finalUl?.addEventListener("transitionend", function fpu() {
      finalUl.removeEventListener("transitionend", fpu);

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
          s1 = ((DOM.contenedorNodos.offsetWidth - (2) * nodoUltimo.offsetWidth) / (2 + 1));
          s2 = (DOM.contenedorNodos.offsetWidth - (2 - 1) * nodoUltimo.offsetWidth) / (2);

          // Disparamos la animación que vamos a arreglar ahora
          setFlechasNodos5(1, 0, s1, s2, 2);

          const primerNodoFila2 = DOM.contenedorNodos.querySelectorAll(".caja-nodo")[2] as HTMLElement;
          if (!primerNodoFila2) return;

          primerNodoFila2.addEventListener("transitionend", function g() {
            primerNodoFila2.removeEventListener("transitionend", g);

            sacarNodo(data);
            for (let i = 2; i < nodos.length; i++) {
              nodos[i].classList.add("no-mover");
              nodos[i].style.left = '0px';
            }

            // const flechas = getFlechas() as HTMLDivElement[];

            // console.log("Como está el contenedor flechas antes de borrar la ultima flecha: ");
            // console.log(DOM.conen);
            // console.log("La longitud del contenedor flechas es: ",flechas);
            // console.log("La ultima flecha es: ", flechas[flechas.length-1]);
            console.log(DOM.contenedorFlechas);
            const cantidadDeElementos = DOM.contenedorFlechas.childElementCount;
            const flechas = DOM.contenedorFlechas.querySelectorAll(".arrow");
            const cantidadFlechas = flechas.length;
            console.log("La longitud del contenedor_flechas es: ",cantidadDeElementos);
            console.log("El indice de la ultima flecha en contenedor_flechas es es: ",cantidadDeElementos-1);
            console.log(DOM.contenedorFlechas);
            // sacarFlecha(cantidadDeElementos-1);
            sacarFlecha(cantidadFlechas-1);
            DOM.contenedorFlechas.querySelector(".salto-flex")?.remove();

            setTimeout(() => {
              // for (let i = 0; i < flechas.length; i++) {
              //   flechas.forEach.style.marginTop = "150px"; // Ajustar según diseño
              // }
               flechas.forEach((flecha) => {
                      (flecha as HTMLElement).style.marginTop = "150px";
                    });
            }, 100);

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
    });
    return; // Fin absoluto del caso 4
  }

  // =========================================================================
  // 🟡 CASO 2: BORRADO FILA SIMPLE (totalNodos < 4 o <= 3)
  // =========================================================================
  if (totalNodos < 3) {
    finalUl?.addEventListener("transitionend", function fpu() {
      finalUl.removeEventListener("transitionend", fpu);

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
      }, 100);

      ul.addEventListener("transitionend", function fu() {
        ul.removeEventListener("transitionend", fu);

        const ultimoHijo = DOM.contenedorNodos.lastElementChild as HTMLElement;
        if (!ultimoHijo) return;

        ultimoHijo.classList.remove("inmediato-nodo");
        ultimoHijo.style.opacity = "0";

        ultimoHijo.addEventListener("transitionend", function fn() {
          ultimoHijo.removeEventListener("transitionend", fn);

          const listaNodos = DOM.contenedorNodos.children;
          const nodoUltimo = DOM.contenedorNodos.lastElementChild as HTMLElement;

          s1 = ((DOM.contenedorNodos.offsetWidth - (listaNodos.length) * nodoUltimo.offsetWidth) / (listaNodos.length + 1));
          s2 = (DOM.contenedorNodos.offsetWidth - (listaNodos.length - 1) * nodoUltimo.offsetWidth) / (listaNodos.length);

          setFlechaInicial(true, necesitaTransicion, s2);
          setFlechasNodos(1, 0, s1, s2); // Tu función original horizontal

          finalUl?.classList.add("no-desplazar");

          const primerHijoNodo = DOM.contenedorNodos.firstElementChild as HTMLElement;
          primerHijoNodo?.addEventListener("transitionend", function fnf() {
            primerHijoNodo.removeEventListener("transitionend", fnf);

            sacarNodo(data);
            sacarFlecha(flechas.length - 1);

            setTimeout(() => {
              setFlechaFinal(true, necesitaTransicion);
            }, 100);

            const finalLi = DOM.finalLi();
            finalLi?.addEventListener("transitionend", function g() {
              finalLi.removeEventListener("transitionend", g);
              document.removeEventListener("click", handler, true);
              DOM.agregarComienzo.disabled = false;
              DOM.agregarFinal.disabled = false;
              finalUl?.classList.remove("no-desplazar");
            });
          });
        });
      });
    });
    return;
  }


  // =========================================================================
      // 🔵 CAMINO MULTI-FILA (TOTALMENTE AISLADO)
      // =========================================================================
      console.log("Iniciando reversión: Desvaneciendo punta de flecha curva...");
      document.documentElement.style.setProperty('--punta-flecha-curva-opacity', '0');

      const pathCurva = document.getElementById("flecha_curva_dinamica") as SVGPathElement | null;

      if (pathCurva) {
        const largoTotal = pathCurva.getTotalLength();
        
        const animacionContraccion = pathCurva.animate(
          [
            { strokeDashoffset: 0 }, 
            { strokeDashoffset: largoTotal }
          ], 
          {
            duration: 2000,
            easing: "ease-in-out",
            fill: "forwards"
          }
        );

        animacionContraccion.onfinish = () => {
          console.log("La animación del path terminó. Eliminando contenedor SVG...");
          const svgContenedor = pathCurva.closest(".svg-flecha-interfila");
          svgContenedor?.remove();

          const ultimoNodo = DOM.contenedorNodos.lastElementChild as HTMLElement | null;
          
          if (ultimoNodo) {
            console.log("Paso 1: Achicando el Wrapper externo a 400px (2 segundos)...");
            ultimoNodo.style.transition = "opacity 0.8s ease-in-out";
            ultimoNodo.style.opacity = "0";

            ultimoNodo.addEventListener('transitionend', function desvanecerNodo(e) {
              if (e.propertyName === 'opacity') {
                ultimoNodo.removeEventListener('transitionend', desvanecerNodo);
                
                console.log("Nodo invisible. Iniciando contracción coordinada del Wrapper.");

                // Forzamos el reflotamiento del NULL de inmediato usando base estática de 400px
                root.style.setProperty('--nulo-top', `${DOM.str.offsetTop}px`);
                root.style.setProperty('--linea-flecha-final-top', `${400 / 2 - 2.5}px`);
                root.style.setProperty('--punta-flecha-final-top', `${DOM.str.offsetTop + DOM.nulo.offsetHeight}px`);

                if (DOM.principalWrapper) {
                  DOM.principalWrapper.style.transition = "height 2s ease-in-out, min-height 2s ease-in-out, max-height 2s ease-in-out";
                  DOM.principalWrapper.style.height = "400px";
                  DOM.principalWrapper.style.minHeight = "400px";
                  DOM.principalWrapper.style.maxHeight = "400px";
                }

                setTimeout(() => {
                  console.log("Paso 2: Wrapper cerrado. Limpiando el DOM en bloque.");

                  // 1. Borrado físico del DOM
                  sacarNodo(data);
                  DOM.contenedorNodos.querySelector(".salto-flex")?.remove();

                  // 2. Reseteamos las cajas internas barriendo estilos en línea
                  document.documentElement.style.setProperty('--principal-height', '400px');
                  
                  if (DOM.principal) {
                    DOM.principal.style.height = "";
                    DOM.principal.style.minHeight = "";
                  }
                  if (DOM.contenedorNodos) {
                    DOM.contenedorNodos.style.height = "";
                    DOM.contenedorNodos.style.minHeight = "";
                    DOM.contenedorNodos.style.flexWrap = "";
                    DOM.contenedorNodos.style.alignContent = "";
                    DOM.contenedorNodos.style.alignItems = "";
                  }
                  if (DOM.inicializador) DOM.inicializador.style.height = "";

                  const contenedorFlechas = document.getElementById("contenedor_flechas");
                  if (contenedorFlechas) {
                    contenedorFlechas.style.height = "";
                    contenedorFlechas.style.minHeight = "";
                    const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
                    flechasExistentes.forEach((flecha) => {
                      (flecha as HTMLElement).style.transform = "translateY(0px)";
                    });
                  }

                  const contenedorCurvas = document.getElementById("contenedor_flechas_curvas");
                  if (contenedorCurvas) {
                    contenedorCurvas.style.height = "";
                    contenedorCurvas.style.minHeight = "";
                  }

                  // 3. Purgamos los inline styles residuales de los nodos de Fila 1 (Evita lefts molestos)
                  const nodosRestantes = Array.from(getNodos() as HTMLElement[]);
                  nodosRestantes.forEach(nodo => {
                    nodo.style.transition = "none";
                    nodo.style.alignSelf = "";
                    nodo.style.marginTop = ""; 
                    nodo.style.left = "";
                  });

                  // 4. Revivimos la flecha final recta original
                  setFlechaFinal(true, necesitaTransicion);

                  // 5. Liberamos la aplicación
                  document.removeEventListener("click", handler, true);
                  DOM.agregarComienzo.disabled = false;
                  DOM.agregarFinal.disabled = false;

                  console.log("Reversión multi-fila completada con éxito.");
                }, 2000);
              }
            });
          }
        };
      } else {
        document.removeEventListener("click", handler, true);
        DOM.agregarComienzo.disabled = false;
        DOM.agregarFinal.disabled = false;
      }
  // =========================================================================
  // 🔵 CASO 3: REVERSIÓN MULTI-FILA MAYOR (totalNodos > 4)
  // =========================================================================
  // Tu bloque original de animación de SVGPathElement, contracción de Wrapper, etc.
  // ... (El código que tenías abajo se ejecuta acá directo de forma limpia)
}