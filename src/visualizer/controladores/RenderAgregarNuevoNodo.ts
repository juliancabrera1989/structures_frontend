import { setFlechasNodos, setFlechasNodos2 } from "./RenderFlechasNodos.ts";
import { agregarNodo, agregarNodoN,  getNodos } from "../contenedores/ContenedorNodos.ts";
import { agregarFlecha, agregarFlechaN, getFlechas } from "../contenedores/ContenedorFlechas.ts";
import { inicializarPuntero, setPuntero, setFlechaInicial, setFlechaFinal } from "./ControladorInicializador.ts";
import { renderizar } from "./ControladorBarraSuperior.ts";
import * as DOM from "../elementosDOM.ts";

const root = document.documentElement;
let necesitaTransicion: number;
let s1: number;
let s2: number;

// Tipamos correctamente el manejador de eventos global para congelar la pantalla
function handler(e: Event): void {
  e.stopPropagation();
  e.preventDefault();
}

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

    const inicialUl = DOM.inicialUl();
    const inicialLs = DOM.inicialLs();
    const inicialLi = DOM.inicialLi();

    const finalUl = DOM.finalUl();

    inicialUl?.classList.remove("flecha_puntero__lista-vacia", "inmediato");
    inicialLs?.classList.remove("inmediato");
    inicialLi?.classList.remove("inmediato");
  // }

  setTimeout(() => {
    setPuntero(1);
  }, 100);

  setTimeout(() => {
    if (nodos[0]) nodos[0].style.opacity = "1";
  }, 1000);

  if (nodos[0]) {
    nodos[0].addEventListener("transitionend", function f1() {
      root.style.setProperty('--linea-flecha-inicial-transform-origin', `left`);
      root.style.setProperty('--linea-flecha-inicial-width', `0px`);
      root.style.setProperty('--punta-flecha-inicial-width', `0px`);

        inicialUl?.classList.add("arrowend-first-ul");
        inicialLs?.classList.add("arrowend-first");
        inicialLi?.classList.add("arrowend-first");

        // const underline = flecha_puntero_inicial.querySelector(".underline") as HTMLElement;
        inicialUl?.addEventListener("transitionend", function f2() {
          inicialUl.classList.remove("arrowend-first-ul");
          inicialLs?.classList.remove("arrowend-first");
          inicialLi?.classList.remove("arrowend-first");
          // const finalUnderline = flecha_puntero_final?.querySelector(".underline") as HTMLElement | null;

          
          const val = finalUl ? finalUl.offsetWidth : 0;

          if (!DOM.flechaPunteroInicial()?.offsetWidth && !val) {
            necesitaTransicion = 1;
            window.banderaFlechaInicial = 0;
            setFlechaInicial(true, necesitaTransicion);
            setFlechaFinal(true, necesitaTransicion);
          }

          inicialUl.removeEventListener("transitionend", f2);
        });
      // }
      nodos[0].removeEventListener("transitionend", f1);
    });
  }

  DOM.agregarComienzo.removeAttribute("hidden");
  DOM.agregarComienzo.disabled = true;
  DOM.agregarFinal.removeAttribute("hidden");
  DOM.agregarFinal.disabled = true;

  // const primerHijoFinal = flecha_puntero_final?.firstElementChild as HTMLElement | null;
  finalUl?.addEventListener("transitionend", function f() {
    finalUl?.classList.remove("flecha_puntero__lista-vacia");
    finalUl.removeEventListener("transitionend", f);
    document.removeEventListener("click", handler, true);

    DOM.agregarComienzo.disabled = false;
    DOM.agregarFinal.disabled = false;

    if (window.innerWidth !== (DOM.principalWrapper.offsetWidth + 33)) {
      DOM.principalWrapper.removeAttribute("style");
      renderizar();
      setFlechaInicial(true, 0);
      setFlechaFinal(true, 0);
    } else {
      DOM.principalWrapper.removeAttribute("style");
    }
  });
}

function agregarNodoAlComienzo(): void {
  if (!DOM.verificarDOM()) return;

  const nodos = getNodos() as HTMLElement[];
  const ultimoNodo = DOM.contenedorNodos.lastElementChild as HTMLElement | null;
  if (!ultimoNodo) return;

  s1 = (DOM.contenedorNodos.offsetWidth - nodos.length * ultimoNodo.offsetWidth) / (nodos.length + 1);
  s2 = (DOM.contenedorNodos.offsetWidth - (nodos.length + 1) * ultimoNodo.offsetWidth) / (nodos.length + 2);

  const x = s2 - DOM.str.offsetWidth - DOM.str.offsetLeft;
  const y = DOM.contenedorNodos.offsetHeight / 2 - DOM.str.offsetTop - DOM.str.offsetHeight;
  const relacion = y / x;

  if (relacion > 1.192 || relacion < 0) {
    const nuevo_ancho = (ultimoNodo.offsetWidth * (nodos.length + 1) + (y / 1.192 + DOM.str.offsetWidth) * (nodos.length + 2)) / 0.91;
    root.style.setProperty('--principal-width-min', `${nuevo_ancho}px`);
    renderizar();
    setTimeout(() => {
      DOM.principalWrapper.style.minWidth = `${nuevo_ancho}px`;
      DOM.principalWrapper.style.maxWidth = `${nuevo_ancho}px`;
    }, 1000);
  }

  if (root.style.getPropertyValue("--principal-height") === '50vw') {
    root.style.setProperty("--principal-height", `${DOM.principal.offsetHeight}px`);
  }

  document.addEventListener("click", handler, true);
  DOM.agregarComienzo.disabled = true;
  DOM.agregarFinal.disabled = true;

  necesitaTransicion = 1;
  setFlechaInicial(false, necesitaTransicion);

  
  const inicialUl = DOM.inicialUl();

  inicialUl?.addEventListener("transitionend", function nfpi_aC() {
    const nodosActualizados = getNodos() as HTMLElement[];
    const ultimo = DOM.contenedorNodos.lastElementChild as HTMLElement;
    s1 = (DOM.contenedorNodos.offsetWidth - nodosActualizados.length * ultimo.offsetWidth) / (nodosActualizados.length + 1);
    s2 = (DOM.contenedorNodos.offsetWidth - (nodosActualizados.length + 1) * ultimo.offsetWidth) / (nodosActualizados.length + 2);

    setFlechaFinal(true, necesitaTransicion, s2);


    console.log("Necesita transicion antes de entrar en setflechasnodos :");
    console.log(necesitaTransicion);
    setFlechasNodos(necesitaTransicion, 1, s1, s2);

    inicialUl.removeEventListener("transitionend", nfpi_aC);
  });

  ultimoNodo.addEventListener("transitionend", function nald() {
    agregarNodo(DOM.inputNodo.value, 1);
    const nuevosNodos = getNodos() as HTMLElement[];

    for (let i = 1; i < nuevosNodos.length; i++) {
      nuevosNodos[i].classList.add("no-mover");
      nuevosNodos[i].style.left = '0px';
    }

    setTimeout(() => {
      const primerHijo = DOM.contenedorNodos.firstElementChild as HTMLElement | null;
      if (primerHijo) primerHijo.style.opacity = "1";
    }, 100);

    const primerHijo = DOM.contenedorNodos.firstElementChild as HTMLElement | null;
    primerHijo?.addEventListener("transitionend", function na() {
      window.banderaFlechaInicial = 0;
      setFlechaInicial(true, necesitaTransicion);
      
      const inicialLi = DOM.inicialLi();
      inicialLi?.addEventListener("transitionend", function af() {
        agregarFlecha(1);

        const primerFlecha = DOM.contenedorFlechas.firstElementChild as HTMLElement | null;
        primerFlecha?.addEventListener("transitionend", function g() {
          document.removeEventListener("click", handler, true);
          DOM.agregarComienzo.disabled = false;
          DOM.agregarFinal.disabled = false;

          actualizarSelectoresIntermedios();

          if (window.innerWidth !== (DOM.principal.offsetWidth + 33)) {
            DOM.principalWrapper.removeAttribute("style");
            renderizar();
            setFlechaInicial(true, 0);
            setFlechaFinal(true, 0);
          } else {
            DOM.principalWrapper.removeAttribute("style");
          }

          primerFlecha.removeEventListener("transitionend", g);
        });

        inicialLi.removeEventListener("transitionend", af);
      });

      primerHijo.removeEventListener("transitionend", na);
    });

    ultimoNodo.removeEventListener("transitionend", nald);
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
  // const flechas = getFlechas() as HTMLElement[];
  const ancho = DOM.principal.offsetWidth;
  
  DOM.principal.style.width = `${ancho}px`;
  if (root.style.getPropertyValue("--principal-height") === '50vw') {
    root.style.setProperty("--principal-height", `${DOM.principal.offsetHeight}px`);
  }

  document.addEventListener("click", handler, true);
  DOM.agregarComienzo.disabled = true;
  DOM.agregarFinal.disabled = true;

  necesitaTransicion = 1;
  setFlechaFinal(false, necesitaTransicion);

  // const flecha_puntero_final = document.getElementById("flecha_puntero_final");
  // const primerHijoFinal = flecha_puntero_final?.firstElementChild as HTMLElement | null;

  const finalUl = DOM.finalUl();

  finalUl?.addEventListener("transitionend", function nfpf_aC() {
    const ultimo = DOM.contenedorNodos.lastElementChild as HTMLElement;
    s1 = (DOM.contenedorNodos.offsetWidth - nodos.length * ultimo.offsetWidth) / (nodos.length + 1);
    s2 = (DOM.contenedorNodos.offsetWidth - (nodos.length + 1) * ultimo.offsetWidth) / (nodos.length + 2);

    setFlechaInicial(true, necesitaTransicion, s2);
    setFlechasNodos(necesitaTransicion, 0, s1, s2);

    finalUl.classList.add("no-desplazar");
    finalUl.removeEventListener("transitionend", nfpf_aC);
  });

  const primerNodo = DOM.contenedorNodos.firstElementChild as HTMLElement | null;
  primerNodo?.addEventListener("transitionend", function nald() {
    agregarNodo(DOM.inputNodo.value, 0);
    const nuevosNodos = getNodos() as HTMLElement[];

    for (let i = 0; i < (nuevosNodos.length - 1); i++) {
      nuevosNodos[i].classList.add("no-mover");
      nuevosNodos[i].style.left = '0px';
    }

    setTimeout(() => {
      const ultimo = DOM.contenedorNodos.lastElementChild as HTMLElement | null;
      if (ultimo) ultimo.style.opacity = "1";
    }, 100);

    const ultimoNodo = DOM.contenedorNodos.lastElementChild as HTMLElement | null;
    ultimoNodo?.addEventListener("transitionend", function na() {
      agregarFlecha(0);
      const flechasActuales = getFlechas() as HTMLElement[];

      const ultimaFlecha = flechasActuales[flechasActuales.length - 1];
      const ultimoHijoFlecha = ultimaFlecha?.lastElementChild as HTMLElement | null;

      ultimoHijoFlecha?.addEventListener("transitionend", function fl() {
        setFlechaFinal(true, necesitaTransicion);
        ultimoHijoFlecha.removeEventListener("transitionend", fl);
      });

      const finalLi = DOM.finalLi();
      finalLi?.addEventListener("transitionend", function g() {
        document.removeEventListener("click", handler, true);
        DOM.agregarComienzo.disabled = false;
        DOM.agregarFinal.disabled = false;

        actualizarSelectoresIntermedios();

        if (window.innerWidth !== (DOM.principal.offsetWidth + 33)) {
          DOM.principal.removeAttribute("style");
          renderizar();
          setFlechaInicial(true, 0);
          setFlechaFinal(true, 0);
        } else {
          DOM.principal.removeAttribute("style");
        }

        finalUl?.classList.remove("no-desplazar");
        finalLi?.removeEventListener("transitionend", g);
      });

      ultimoNodo.removeEventListener("transitionend", na);
    });

    primerNodo.removeEventListener("transitionend", nald);
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