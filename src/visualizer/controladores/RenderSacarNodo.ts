// RenderSacarNodo.ts
import { setPuntero, setFlechaFinal, setFlechaInicial } from "./ControladorInicializador.ts";
import { sacarNodo, getNodos } from "../contenedores/ContenedorNodos.ts";
import { sacarFlecha, getFlechas } from "../contenedores/ContenedorFlechas.ts";
import { setFlechasNodos, setFlechasNodos2 } from "./RenderFlechasNodos.ts";
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

  const ultimoHijo = DOM.contenedorNodos.lastElementChild as HTMLElement;
  s1 = ((DOM.contenedorNodos.offsetWidth - (nodos.length) * ultimoHijo.offsetWidth) / (nodos.length + 1));
  s2 = ((DOM.contenedorNodos.offsetWidth - (nodos.length + 1) * ultimoHijo.offsetWidth) / (nodos.length + 2));

  if (DOM.contenedorNodos.childElementCount >= 5) {
    document.body.removeAttribute("style");
    renderizar();
  }

  const ancho = DOM.principal.offsetWidth;
  DOM.principal.style.width = ancho + 'px';

  document.addEventListener("click", handler, true);
  DOM.agregarComienzo.disabled = true;
  DOM.agregarFinal.disabled = true;

  necesitaTransicion = 1;

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
export function borrarNodoAlFinal(data: string): void {
  if (!DOM.verificarDOM()) return;

  const nodos = getNodos() as HTMLDivElement[];
  const flechas = getFlechas() as HTMLDivElement[];

  document.addEventListener("click", handler, true);
  DOM.agregarComienzo.disabled = true;
  DOM.agregarFinal.disabled = true;

  necesitaTransicion = 1;
  setFlechaFinal(false, necesitaTransicion);

  const finalUl = DOM.finalUl();
      
  finalUl?.addEventListener("transitionend", function fpu() {
    const totalNodos = (getNodos() as HTMLElement[]).length;

    if (totalNodos === 3) { // O la condición exacta que uses para identificar multi-fila
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

    } else {
      // =========================================================================
      // 🟢 CAMINO ORIGINAL: BORRADO EN UNA SOLA FILA
      // =========================================================================
      const flechaUltima = flechas[flechas.length - 1];
      if (flechaUltima) {
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

        ul.addEventListener("transitionend", function fu() {
          setTimeout(() => {
            const ultimoHijo = DOM.contenedorNodos.lastElementChild as HTMLElement;
            if (ultimoHijo) {
              ultimoHijo.classList.remove("inmediato-nodo");
              ultimoHijo.style.opacity = "0";
            }
          }, 1100);
          ul.removeEventListener("transitionend", fu);
        });
      }

      // 🌟 LOS LISTENERS DE DESPLAZAMIENTO HORIZONTAL AHORA VIVEN EXCLUSIVAMENTE ACÁ ADENTRO
      const ultimoHijoNodo = DOM.contenedorNodos.lastElementChild as HTMLElement;
      if (ultimoHijoNodo) {
        ultimoHijoNodo.addEventListener("transitionend", function fn() {
          const listaNodos = DOM.contenedorNodos.children;
          const nodoUltimo = DOM.contenedorNodos.lastElementChild as HTMLElement;

          s1 = ((DOM.contenedorNodos.offsetWidth - (listaNodos.length) * nodoUltimo.offsetWidth) / (listaNodos.length + 1));
          s2 = (DOM.contenedorNodos.offsetWidth - (listaNodos.length - 1) * nodoUltimo.offsetWidth) / (listaNodos.length);

          setFlechaInicial(true, necesitaTransicion, s2);
          setFlechasNodos(1, 0, s1, s2);

          finalUl?.classList.add("no-desplazar");
          ultimoHijoNodo.removeEventListener("transitionend", fn);
        });
      }

      const primerHijoNodo = DOM.contenedorNodos.firstElementChild as HTMLElement;
      if (primerHijoNodo) {
        primerHijoNodo.addEventListener("transitionend", function fnf() {
          sacarNodo(data);
          for (let i = 0; i < nodos.length; i++) {
            nodos[i].classList.add("no-mover");
            nodos[i].style.left = '0px';
          }

          sacarFlecha(flechas.length - 1);

          setTimeout(() => {
            setFlechaFinal(true, necesitaTransicion);
            for (let i = 0; i < nodos.length; i++) {
              nodos[i].classList.remove("no-mover");
            }
          }, 100);

          const finalLi = DOM.finalLi();
          finalLi?.addEventListener("transitionend", function g() {
            document.removeEventListener("click", handler, true);
            DOM.agregarComienzo.disabled = false;
            DOM.agregarFinal.disabled = false;

            finalUl?.classList.remove("no-desplazar");

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
            finalLi.removeEventListener("transitionend", g);
          });
          primerHijoNodo.removeEventListener("transitionend", fnf);
        });
      }
    }
    finalUl.removeEventListener("transitionend", fpu);
  });
}