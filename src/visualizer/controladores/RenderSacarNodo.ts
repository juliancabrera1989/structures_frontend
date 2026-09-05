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
    sacarNodo();
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









export async function borrarNodoAlComienzo(): Promise<void> {
// export async function borrarNodoAlComienzo(data: string): Promise<void> {
  if (!DOM.verificarDOM() || DOM.contenedorNodos.childElementCount === 0) return;

  const nodos = getNodos() as HTMLDivElement[];
  const flechas = getFlechas() as HTMLDivElement[];

  document.addEventListener("click", handler, true);
  DOM.agregarComienzo.disabled = true;
  DOM.agregarFinal.disabled = true;

  necesitaTransicion = 1;

  const M = 5; // Límite configurado por fila
  const layout = obtenerInfoLayout(M);
  const nodosPrimeraFila = getCantidadNodosFila(layout, 0);

  if (nodosPrimeraFila > 1) {
    // =========================================================================
    // RAMA A: Eliminación en Primera Fila (nodosPrimeraFila > 1)
    // =========================================================================
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

      await esperar(100);
      ul.style.width = "0px";
      ls.style.width = "0px";
      li.style.width = "0px";

      await esperarTransicion(ul);

      necesitaTransicion = 1;
      setFlechaInicial(false, necesitaTransicion);

      const inicialUl = DOM.inicialUl();
      await esperarTransicion(inicialUl);

      await esperar(1100);

      const primerHijo = DOM.contenedorNodos.firstElementChild as HTMLElement;
      if (primerHijo) {
        primerHijo.classList.remove("inmediato-nodo");
        primerHijo.style.opacity = "0";

        await esperarTransicion(primerHijo);

        const nodoUltimo = DOM.contenedorNodos.lastElementChild as HTMLElement;
        s1 = (DOM.contenedorNodos.offsetWidth - nodosPrimeraFila * nodoUltimo.offsetWidth) / (nodosPrimeraFila + 1);
        s2 = (DOM.contenedorNodos.offsetWidth - (nodosPrimeraFila - 1) * nodoUltimo.offsetWidth) / nodosPrimeraFila;

        if (layout.totalFilas === 1) {
          setFlechaFinal(true, necesitaTransicion, s2);
        }
        setFlechasNodosDefinitiva(necesitaTransicion, 1, s1, s2, "emisor", layout);

        const unicoNodoFila1 = DOM.contenedorNodos.querySelectorAll(".caja-nodo")[1] as HTMLElement;
        await esperarTransicion(unicoNodoFila1);

        if (layout.totalFilas > 1 && layout.nodosPorFila.get(0)! === 2) {
          const spacer = document.createElement("div");
          spacer.classList.add("flecha-spacer-fila");
          DOM.contenedorFlechas.prepend(spacer);
          if (layout.totalFilas >= 2) {
            DOM.contenedorFlechas.classList.remove("margin-flex");
          }
        }

        sacarNodo(1);
        for (let i = 0; i < nodosPrimeraFila - 1; i++) {
          nodos[i].classList.add("no-mover");
          nodos[i].style.left = "0px";
          flechas[i].classList.remove("flecha-animando");
        }

        sacarFlecha(0);

        if (layout.totalFilas === 1 && flechas.length !== 0) {
          const listaFlechas = Array.from(flechas);
          listaFlechas.forEach((flecha) => {
            (flecha as HTMLElement).classList.remove("flecha-animando");
          });
        }

        await esperar(1000);
        setFlechaInicial(true, 1);

        const inicialLi = DOM.inicialLi();
        await esperarTransicion(inicialLi);

        document.removeEventListener("click", handler, true);
        DOM.agregarComienzo.disabled = false;
        DOM.agregarFinal.disabled = false;
      }
    }

    return;
  } else {
    // =========================================================================
    // RAMA B: Reversión Multi-fila (Eliminar primer nodo cuando era único en Fila 1)
    // =========================================================================
    console.log("Iniciando reversión: Desvaneciendo punta de flecha curva...");
    const flechaCurva = DOM.contenedorFlechasCurvas?.firstElementChild as SVGElement;
    const pathCurva = flechaCurva?.firstElementChild as SVGPathElement | null;

    if (pathCurva) {
      // 1. Encoger las patitas azules
      const animsPunta = animarPuntaAzul(flechaCurva, false);
      await new Promise<void>((resolve) => {
        animsPunta[0].onfinish = () => resolve();
      });

      // 2. Retroceder curva roja
      const animacionCurva = animarPath(pathCurva, false);
      await new Promise<void>((resolve) => {
        animacionCurva.onfinish = () => resolve();
      });

      console.log("La animación del path terminó. Eliminando contenedor SVG...");
      const svgContenedor = pathCurva.closest(".svg-flecha-interfila");
      svgContenedor?.remove();

      // 3. Contraer flecha inicial (StrPtr)
      necesitaTransicion = 1;
      setFlechaInicial(false, necesitaTransicion);

      const inicialUl = DOM.inicialUl();
      await esperarTransicion(inicialUl);

      // 4. Ocultar el primer nodo
      const primerNodo = nodos[0];
      if (primerNodo) {
        primerNodo.classList.remove("inmediato-nodo");
        primerNodo.style.opacity = "0"; // Corregido: asigna opacidad 0 para desvanecer

        await esperarTransicion(primerNodo);

        console.log("🚀 PASO 3 Terminado: El nodo es invisible. Listo para congelar abajo (Paso 4).");

        const auxAltura = DOM.principal.offsetHeight;
        root.style.setProperty(
          "--principal-height",
          `${DOM.principal.offsetHeight - 200 - 50 * (layout.totalFilas > 2 ? 1 : 0)}px`
        );

        await esperar(100);
        const altoDeseado = auxAltura - 200 - 50 * (layout.totalFilas > 2 ? 1 : 0);
        const puedeAchicarse =  altoDeseado < DOM.principalWrapper.offsetHeight;
        if (puedeAchicarse || window.alturaDeVentana !== window.innerHeight) {
          window.alturaDeVentana = window.innerHeight;
          const maxPermitido = window.alturaDeVentana - 8 - DOM.principalWrapper.offsetTop;
          // const altoDeseado = auxAltura - 200 - 50 * (layout.totalFilas > 2 ? 1 : 0);
       
          console.log("El alto deseado es: ", altoDeseado);
          console.log("El max permitido es: ", maxPermitido);
          const altoFinal = Math.min(altoDeseado, maxPermitido);

          if (altoFinal !== maxPermitido) {
            DOM.principalWrapper.style.removeProperty("max-height");
          }

          root.style.setProperty("--wrapper-height", `${altoFinal}px`);
        }

        const nodosRestantes = Array.from(getNodos() as HTMLElement[]);
        nodosRestantes.forEach((nodo) => {
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
          (flecha as HTMLElement).classList.add("transicion-flechas-negativa");
        });

        const flecha_puntero_final = document.getElementById("flecha_puntero_final");
        if (flecha_puntero_final) {
          const hijos = flecha_puntero_final.children;
          for (const hijo of hijos) {
            (hijo as HTMLElement).style.transition = "top 2s ease-out";
          }
        }

        root.style.setProperty("--linea-flecha-final-top", `${DOM.finalUl()!.offsetTop - 250}px`);
        root.style.setProperty("--nulo-top", `${DOM.nulo.offsetTop - 250}px`);
        root.style.setProperty(
          "--punta-flecha-final-top",
          `${DOM.nulo.offsetTop + DOM.nulo.offsetHeight - 250}px`
        );

        const ultimoElementoNodo = DOM.contenedorNodos.lastElementChild as HTMLElement;
        if (ultimoElementoNodo) {
          await esperarTransicion(ultimoElementoNodo);
        }

        if (layout.totalFilas === 2) {
          DOM.contenedorNodos?.classList.remove("cambio-flex", "margin-flex");
          DOM.contenedorFlechas?.classList.remove("cambio-flex");
        } else if (layout.totalFilas >= 2) {
          DOM.contenedorFlechas?.classList.add("margin-flex");
        }

        const saltoNodos = DOM.contenedorNodos.querySelectorAll(".salto-flex")[0];
        if (saltoNodos) saltoNodos.remove();

        const saltoFlechas = DOM.contenedorFlechas.querySelectorAll(".salto-flex")[0];
        if (saltoFlechas) saltoFlechas.remove();

        DOM.contenedorFlechas.querySelector(".flecha-spacer-fila")?.remove();

        const nodosLimpios = Array.from(getNodos() as HTMLElement[]);
        nodosLimpios.forEach((nodo) => {
          nodo.classList.remove("transicion-nodos-negativa");
        });

        const contenedorFlechasDiv = document.getElementById("contenedor_flechas");
        if (contenedorFlechasDiv) {
          const flechasExistentes = contenedorFlechasDiv.querySelectorAll(".arrow");
          flechasExistentes.forEach((flecha) => {
            (flecha as HTMLElement).classList.remove("transicion-flechas-negativa");
          });
        }

        const flechasCurvasLimpio = DOM.contenedorFlechasCurvas.querySelectorAll(".svg-flecha-interfila");
        flechasCurvasLimpio.forEach((flecha) => {
          (flecha as HTMLElement).classList.remove("transicion-flechas-negativa");
          const alturaFC = (flecha as HTMLElement).style.getPropertyValue("top");
          (flecha as HTMLElement).style.setProperty("top", `calc(${alturaFC} - 250px)`);
        });

        sacarNodo(1);

        setFlechaInicial(true, necesitaTransicion);

        document.removeEventListener("click", handler, true);
        DOM.agregarComienzo.disabled = false;
        DOM.agregarFinal.disabled = false;
      }
    }
  }
}




export async function borrarNodoAlFinal(): Promise<void> {
  if (!DOM.verificarDOM()) return;

  const nodos = getNodos() as HTMLDivElement[];
  const flechas = getFlechas() as HTMLDivElement[];
  const totalNodos = nodos.length;

  console.log("Entro a borrar nodo al final. Total nodos actuales:", totalNodos);

  // Bloqueo de UI inicial estándar
  document.addEventListener("click", handler, true);
  DOM.agregarComienzo.disabled = true;
  DOM.agregarFinal.disabled = true;

  necesitaTransicion = 1;
  setFlechaFinal(false, necesitaTransicion);

  const finalUl = DOM.finalUl();
  const M = 5; // Límite configurado por fila

  const layout = obtenerInfoLayout(M);
  const n = layout.nodosUltimaFila;

  // 1. Esperamos que la flecha final termine de ocultarse
  await esperarTransicion(finalUl);

  if (n > 1) {
    // =========================================================================
    // RAMA A: Eliminación en la misma fila (n > 1)
    // =========================================================================
    const flechaUltima = flechas[flechas.length - 1];
    if (!flechaUltima) return;

    const ul = obtenerSubElemento(flechaUltima, "underline");
    const ls = obtenerSubElemento(flechaUltima, "linea-s");
    const li = obtenerSubElemento(flechaUltima, "linea-i");

    ul.classList.remove("inmediato");

    await esperar(100);

    ul.style.width = '0px';
    ls.style.width = '0px';
    li.style.width = '0px';
    ul.classList.add("arrowend-first-ul");
    ls.classList.add("arrowend-first");
    li.classList.add("arrowend-first");

    // Congelamos el Ul síncronamente antes de esperar que se achique la última flecha
    finalUl?.classList.add("no-desplazar");

    // 2. Esperamos que la última flecha se achique por completo
    await esperarTransicion(ul);

    const ultimoHijo = DOM.contenedorNodos.lastElementChild as HTMLElement;
    if (!ultimoHijo) return;

    ultimoHijo.classList.remove("inmediato-nodo");
    ultimoHijo.style.opacity = "0";

    // 3. Esperamos que el nodo desaparezca (opacidad 0)
    await esperarTransicion(ultimoHijo);

    const nodoUltimo = DOM.contenedorNodos.lastElementChild as HTMLElement;

    s1 = ((DOM.contenedorNodos.offsetWidth - (n) * nodoUltimo.offsetWidth) / (n + 1));
    s2 = (DOM.contenedorNodos.offsetWidth - (n - 1) * nodoUltimo.offsetWidth) / (n);

    if (layout.totalFilas === 1) {
      setFlechaInicial(true, necesitaTransicion, s2);
      setFlechasNodos(1, 0, s1, s2);
    }

    setFlechasNodosDefinitiva(1, 0, s1, s2, "receptor", layout);

    const primeroNodoUltimaFila = nodos[layout.indiceInicioUltimaFila];
    if (!primeroNodoUltimaFila) return;

    // 4. Esperamos que los nodos se reacomoden
    await esperarTransicion(primeroNodoUltimaFila);

    sacarNodo(0);

    for (let i = layout.indiceInicioUltimaFila; i < layout.indiceInicioUltimaFila + layout.nodosUltimaFila - 1; i++) {
      nodos[i].classList.add("no-mover");
      nodos[i].style.left = '0px';
    }

    if (layout.nodosUltimaFila === 2) {
      const spacer = document.createElement("div");
      spacer.classList.add("flecha-spacer-fila");
      DOM.contenedorFlechas.appendChild(spacer);
    }

    const flechasSub = DOM.contenedorFlechas.querySelectorAll(".arrow");
    const cantidadFlechas = flechasSub.length;

    sacarFlecha(cantidadFlechas - 1);

    if (layout.totalFilas >= 2) {
      flechasSub.forEach((flecha) => {
        (flecha as HTMLElement).classList.remove("flecha-animando");
      });

      const haySpacer = DOM.contenedorFlechas.querySelectorAll(".flecha-spacer-fila").length === 1 && 
                        DOM.contenedorFlechas.lastElementChild?.classList.contains(".flechas-spacer-fila");
      
      if (haySpacer) {
        DOM.contenedorFlechas?.classList.add("margin-flex");
      }
    } else if (layout.totalFilas === 1 && DOM.contenedorFlechas.hasChildNodes()) {
      flechasSub.forEach((flecha) => {
        (flecha as HTMLElement).classList.remove("flecha-animando");
      });
    }

    setFlechaFinal(true, 1);

    const finalLi = DOM.finalLi();
    await esperarTransicion(finalLi);

    document.removeEventListener("click", handler, true);
    DOM.agregarComienzo.disabled = false;
    DOM.agregarFinal.disabled = false;
    finalUl?.classList.remove("no-desplazar");

  } else {
    // =========================================================================
    // RAMA B: Reversión Multi-fila (Eliminación que hace perder una fila)
    // =========================================================================
    console.log("Iniciando reversión: Desvaneciendo punta de flecha curva...");

    const flechaCurva = DOM.contenedorFlechasCurvas?.lastElementChild as SVGElement;
    const pathCurva = flechaCurva?.firstElementChild as SVGPathElement | null;

    if (pathCurva) {
      // 1. Encoger patitas azules
      const animsPunta = animarPuntaAzul(flechaCurva, false);
      await new Promise<void>((resolve) => {
        animsPunta[0].onfinish = () => resolve();
      });

      // 2. Retroceder curva roja
      const animacionCurva = animarPath(pathCurva, false);
      await new Promise<void>((resolve) => {
        animacionCurva.onfinish = () => resolve();
      });

      console.log("La animación del path terminó. Eliminando contenedor SVG...");
      const svgContenedor = pathCurva.closest(".svg-flecha-interfila");
      svgContenedor?.remove();

      const ultimoNodo = DOM.contenedorNodos.lastElementChild as HTMLElement | null;

      if (ultimoNodo) {
        console.log("Paso 1: Achicando el Wrapper externo a 400px (2 segundos)...");
        ultimoNodo.style.removeProperty("opacity");
        ultimoNodo.style.opacity = "0";

        // Aplica congelamiento síncrono del Ul antes de aguardar la opacidad
        finalUl?.classList.add("no-desplazar");

        await esperarTransicion(ultimoNodo);

        console.log("Nodo invisible. Iniciando contracción coordinada del Wrapper.");
        const auxAltura = DOM.principal.offsetHeight;

        root.style.setProperty('--linea-flecha-final-top', `${DOM.finalUl()!.offsetTop - 250}px`);
        root.style.setProperty('--nulo-top', `${DOM.nulo.offsetTop - 250}px`);
        root.style.setProperty('--punta-flecha-final-top', `${DOM.finalLi()!.offsetTop - 250}px`);

        const altoDeseado = auxAltura - 200 - 50 * (layout.totalFilas > 2 ? 1 : 0);
        const puedeAchicarse = altoDeseado < DOM.principalWrapper.offsetHeight;

        if (puedeAchicarse || window.alturaDeVentana !== window.innerHeight) {
          window.alturaDeVentana = window.innerHeight;
          const maxPermitido = window.alturaDeVentana - 8 - DOM.principalWrapper.offsetTop;

          console.log("El alto deseado es: ", altoDeseado);
          console.log("El max permitido es: ", maxPermitido);
          const altoFinal = Math.min(altoDeseado, maxPermitido);

          if (altoFinal !== maxPermitido) {
            DOM.principalWrapper.style.removeProperty('max-height');
          }

          root.style.setProperty('--wrapper-height', `${altoFinal}px`);
        }

        DOM.contenedorFlechas.lastElementChild?.remove();

        // 3. Esperar la contracción del Wrapper (2000ms)
        await esperar(2000);

        console.log("Paso 2: Wrapper cerrado. Limpiando el DOM en bloque.");

        sacarNodo(0);

        root.style.setProperty('--principal-height', `${DOM.principal.offsetHeight - 200 - 50 * (layout.totalFilas > 2 ? 1 : 0)}px`);

        const saltoNodos = DOM.contenedorNodos.querySelectorAll(".salto-flex")[layout.totalFilas - 2];
        if (saltoNodos) saltoNodos.remove();

        const saltoFlechas = DOM.contenedorFlechas.querySelectorAll(".salto-flex")[layout.totalFilas - 2];
        if (saltoFlechas) saltoFlechas.remove();

        if (layout.totalFilas === 2) {
          DOM.contenedorNodos.classList.remove("cambio-flex", "margin-flex");
          DOM.contenedorFlechas?.classList.remove("cambio-flex", "margin-flex");
        }

        const contenedorFlechasDiv = document.getElementById("contenedor_flechas");
        if (contenedorFlechasDiv) {
          const flechasExistentes = contenedorFlechasDiv.querySelectorAll(".arrow");
          if (layout.totalFilas === 2) {
            flechasExistentes.forEach((flecha) => {
              (flecha as HTMLElement).classList.remove("no_mover__flecha");
              (flecha as HTMLElement).style.removeProperty("margin-top");
            });
          }
        }

        const nodosRestantes = Array.from(getNodos() as HTMLElement[]);
        nodosRestantes.forEach(nodo => {
          nodo.style.removeProperty("transition");
          nodo.style.removeProperty("margin-top");
        });

        setFlechaFinal(true, necesitaTransicion);

        document.removeEventListener("click", handler, true);
        DOM.agregarComienzo.disabled = false;
        DOM.agregarFinal.disabled = false;

        await esperar(100);
        finalUl?.classList.remove("no-desplazar");

        console.log("Reversión multi-fila completada con éxito.");
      }
    } else {
      document.removeEventListener("click", handler, true);
      DOM.agregarComienzo.disabled = false;
      DOM.agregarFinal.disabled = false;
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
      sacarNodo(-1,data);
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