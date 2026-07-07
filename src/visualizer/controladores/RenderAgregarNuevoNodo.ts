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
    console.log("entro aqui?");
    finalUl?.classList.remove("flecha_puntero__lista-vacia");
    finalUl.removeEventListener("transitionend", f);
    document.removeEventListener("click", handler, true);
    

    


  
    
    
    DOM.inicializador.removeAttribute("style");
    DOM.str.removeAttribute("style");
    DOM.nulo.removeAttribute("style");

    DOM.str.classList.add("inmediato_reacomodo");
    DOM.nulo.classList.add("inmediato_reacomodo");
    root.style.setProperty('--nulo-left', `${100  - (3 + (DOM.nulo.offsetWidth / DOM.principal.offsetWidth)*100)}%`);
    root.style.setProperty('--str-top', `${100-DOM.str.offsetHeight/2}px`);
    root.style.setProperty('--nulo-top', `${100-DOM.nulo.offsetHeight/2}px`);
    root.style.setProperty('--linea-flecha-inicial-top', `${DOM.str.offsetTop + DOM.str.offsetHeight/2}px`);
    root.style.setProperty('--punta-flecha-inicial-top', `${DOM.principal.offsetHeight/2 -2.5}px`);
    root.style.setProperty('--linea-flecha-final-top', `${DOM.principal.offsetHeight/2 - 2.5}px`);
    root.style.setProperty('--punta-flecha-final-top', `${DOM.nulo.offsetTop + DOM.nulo.offsetHeight}px`);
    DOM.agregarComienzo.disabled = false;
    DOM.agregarFinal.disabled = false;
  
  setTimeout(() => {
    DOM.str.classList.remove("inmediato_reacomodo");
    DOM.nulo.classList.remove("inmediato_reacomodo");
    inicialUl?.classList.remove("cambio_top");
   }, 100);

   


  

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


  const finalUl = DOM.finalUl();

  // finalUl?.addEventListener("transitionend", function nfpf_aC() {
  //   const ultimo = DOM.contenedorNodos.lastElementChild as HTMLElement;
  //   s1 = (DOM.contenedorNodos.offsetWidth - nodos.length * ultimo.offsetWidth) / (nodos.length + 1);
  //   s2 = (DOM.contenedorNodos.offsetWidth - (nodos.length + 1) * ultimo.offsetWidth) / (nodos.length + 2);

  //   setFlechaInicial(true, necesitaTransicion, s2);
  //   setFlechasNodos(necesitaTransicion, 0, s1, s2);

  //   finalUl.classList.add("no-desplazar");
  //   finalUl.removeEventListener("transitionend", nfpf_aC);
  // });

finalUl?.addEventListener("transitionend", function nfpf_aC() {
  const ultimo = DOM.contenedorNodos.lastElementChild as HTMLElement;
  const totalNodosActuales = nodos.length; // Cuántos hay antes de meter el nuevo

  if (totalNodosActuales < 5) {
    // 🟢 CAMINO ORIGINAL: De 1 a 4 nodos (el próximo entra en la Fila 1)
    s1 = (DOM.contenedorNodos.offsetWidth - totalNodosActuales * ultimo.offsetWidth) / (totalNodosActuales + 1);
    s2 = (DOM.contenedorNodos.offsetWidth - (totalNodosActuales + 1) * ultimo.offsetWidth) / (totalNodosActuales + 2);

    setFlechaInicial(true, necesitaTransicion, s2);
    setFlechasNodos(necesitaTransicion, 0, s1, s2);
} else {
  console.log("Paso 1: Expansión escalable a 600px con contra-desplazamiento interno.");

  DOM.agregarComienzo.disabled = true;
  DOM.agregarFinal.disabled = true;

  // =========================================================================
  // FASE A: EXPANSIÓN DEL WRAPPER (ANIMACIÓN SUAVE DE 2 SEGUNDOS)
  // =========================================================================
  // if (DOM.principalWrapper) {
  //   DOM.principalWrapper.style.transition = "height 2s ease-in-out, min-height 2s ease-in-out";
  //   DOM.principalWrapper.style.overflow = "hidden"; 
  //   DOM.principalWrapper.style.height = "600px";
  //   DOM.principalWrapper.style.minHeight = "600px";
  // }


  if (DOM.principalWrapper) {
  // 1. Le agregamos 'max-height' a la transición para que también se suavice
  DOM.principalWrapper.style.transition = "height 2s ease-in-out, min-height 2s ease-in-out, max-height 2s ease-in-out";
  DOM.principalWrapper.style.overflow = "hidden"; 
  
  // 2. Expandimos las tres cotas en paralelo para anular el tope del CSS
  DOM.principalWrapper.style.height = "600px";
  DOM.principalWrapper.style.minHeight = "600px";
  DOM.principalWrapper.style.maxHeight = "600px"; // 👈 Sumamos esto para romper el techo del CSS
}

  // Esperamos los 2 segundos de la transición del Wrapper
  setTimeout(() => {

    // =========================================================================
    // FASE B: TODAS LAS CAJAS FÍSICAS CRECEN A 600PX (ESCALABLE)
    // =========================================================================
    document.documentElement.style.setProperty('--principal-height', '600px');

    if (DOM.principal) {
      DOM.principal.style.transition = "none";
      DOM.principal.style.height = "600px";
      DOM.principal.style.minHeight = "600px";
    }

    if (DOM.contenedorNodos) {
      DOM.contenedorNodos.style.transition = "none";
      DOM.contenedorNodos.style.height = "600px";
      DOM.contenedorNodos.style.minHeight = "600px";
      DOM.contenedorNodos.style.flexWrap = "wrap";
      DOM.contenedorNodos.style.alignContent = "flex-start";
      DOM.contenedorNodos.style.alignItems = "flex-start";
    }

    if (DOM.inicializador) {
      DOM.inicializador.style.transition = "none";
      DOM.inicializador.style.height = "600px"; 
    }

    const contenedorFlechas = document.getElementById("contenedor_flechas");
    if (contenedorFlechas) {
      contenedorFlechas.style.transition = "none";
      contenedorFlechas.style.height = "600px";
      contenedorFlechas.style.minHeight = "600px";
    }


    const contenedorCurvas = document.getElementById("contenedor_flechas_curvas");
if (contenedorCurvas) {
  contenedorCurvas.style.height = "600px";
  contenedorCurvas.style.minHeight = "600px";
}

    // =========================================================================
    // FASE C: CONTRA-DESPLAZAMIENTO PARA MANTENER LA FILA 1 INMÓVIL
    // =========================================================================
    const desvioCentro = (600 - 400) / 2; // = 100px

    // const divStr = document.getElementById("str");
    // if (divStr) {
    //   divStr.style.transform = `translateY(-${desvioCentro}px)`;
    // }

    // const flechaInicial = document.getElementById("flecha_puntero_inicial");
    // if (flechaInicial) {
    //   flechaInicial.style.transform = `translateY(-${desvioCentro}px)`;
    // }

    if (contenedorFlechas) {
      const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
      flechasExistentes.forEach((flecha) => {
        (flecha as HTMLElement).style.transform = `translateY(-${desvioCentro}px)`;
      });
    }

    // =========================================================================
    // FASE D: TU FÓRMULA DEL NULL (SE MUEVE A SU POSICIÓN REAL)
    // =========================================================================
    // const divNulo = document.getElementById("nulo");
    // if (divNulo) {
    //   divNulo.style.transition = "transform 1.5s ease-in-out";
      
    //   const posicionInicialDOM = divNulo.offsetTop || 92;
    //   const offsetHeightNulo = divNulo.offsetHeight || 16; 
    //   const cantidadFilas = 2;
    //   const alturaContenedor = 600;

    //   const posicionAbsolutaDeseada = (300 * (cantidadFilas - 1)) + ((alturaContenedor / cantidadFilas) / 4) - (offsetHeightNulo / 2);
    //   const trasladarY = posicionAbsolutaDeseada - posicionInicialDOM;

    //   divNulo.style.transform = `translateY(${trasladarY}px)`;
    // }

        root.style.setProperty('--nulo-top', `${DOM.str.offsetTop+(DOM.principal.offsetHeight/2)}px`);
        root.style.setProperty('--linea-flecha-final-top', `${DOM.principal.offsetHeight*3/4 - 5}px`);
        root.style.setProperty('--punta-flecha-final-top', `${DOM.nulo.offsetTop+DOM.nulo.offsetHeight+DOM.principal.offsetHeight/2}px`);

    

    // =========================================================================
    // FASE E: REACOMODO DE NODOS EXISTENTES
    // =========================================================================
    const nodosActuales = Array.from(getNodos() as HTMLElement[]);
    nodosActuales.forEach(nodo => {
      nodo.style.transition = "none";
      nodo.style.alignSelf = "flex-start";
      nodo.style.marginTop = "150px"; 
    });

    const saltoDeLinea = document.createElement("div");
    saltoDeLinea.className = "salto-flex";
    saltoDeLinea.style.flexBasis = "100%";
    saltoDeLinea.style.height = "0";
    DOM.contenedorNodos.appendChild(saltoDeLinea);

   setTimeout(() => {
      // 1. Capturamos el último nodo real de la Fila 1 antes de romper índices
      const nodosAntesDeAgregar = Array.from(getNodos() as HTMLElement[]);
      const nodoOrigenReal = nodosAntesDeAgregar[nodosAntesDeAgregar.length - 1]; // Tu nodoCinco (A)

      // 2. Inyectamos el nodo nuevo en la Fila 2
      agregarNodo(DOM.inputNodo.value, 0);

      const todosLosNodos = Array.from(getNodos() as HTMLElement[]);
      const nodoNuevo = todosLosNodos[todosLosNodos.length - 1]; // Tu nodoSeis (G)

      if (nodoNuevo) {
        nodoNuevo.style.alignSelf = "flex-start";
        nodoNuevo.style.marginTop = "150px"; 

        nodoNuevo.style.opacity = "0";
        nodoNuevo.style.transition = "opacity 0.8s ease-in-out";
        void nodoNuevo.offsetWidth; 
        nodoNuevo.style.opacity = "1";

        nodoNuevo.addEventListener('transitionend', function dispararFlechaCurva(e) {
          if (e.propertyName === 'opacity') {
            nodoNuevo.removeEventListener('transitionend', dispararFlechaCurva);

            // Apuntamos al contenedor aislado que ya tiene position: relative arriba
            const contenedorCurvas = document.getElementById("contenedor_flechas_curvas");
            if (!contenedorCurvas) {
              DOM.agregarComienzo.disabled = false;
              DOM.agregarFinal.disabled = false;
              return;
            }

            const nodoCinco = nodoOrigenReal;
            const nodoSeis = nodoNuevo;

            if (nodoCinco && nodoSeis) {
              const contRect = DOM.contenedorNodos.getBoundingClientRect();
              const emisorRect = nodoCinco.getBoundingClientRect();
              const receptorRect = nodoSeis.getBoundingClientRect();
              const radioRulo = 130; 

              // TU MATEMÁTICA EXACTA DE ANCLAJES Y PUNTOS DE CONTROL
              const x1 = emisorRect.left - contRect.left + (emisorRect.width * 0.75);
              const y1 = emisorRect.top - contRect.top + (emisorRect.height / 2);
              const x2 = receptorRect.left - contRect.left;
              const y2 = receptorRect.top - contRect.top + (receptorRect.height / 2);
              const y_pasillo = y1 + ((y2 - y1) / 2);

              const de_x1_borde = emisorRect.right - contRect.left;
              const de_cpx1 = de_x1_borde + radioRulo;
              const de_cpy1 = y1;
              const de_cpx2 = de_x1_borde + radioRulo;
              const de_cpy2 = y_pasillo;

              const a_cpx1 = x2 - radioRulo;
              const a_cpy1 = y_pasillo;
              const a_cpx2 = x2 - radioRulo;
              const a_cpy2 = y2;

              // Tu dAttribute original con rulo de salida, recta y rulo de entrada
              const d = `
                M ${x1} ${y1} 
                C ${de_cpx1} ${de_cpy1}, ${de_cpx2} ${de_cpy2}, ${de_x1_borde} ${y_pasillo}
                L ${x2} ${y_pasillo}
                C ${a_cpx1} ${a_cpy1}, ${a_cpx2} ${a_cpy2}, ${x2} ${y2}
              `.replace(/\s+/g, ' ').trim();

              const svgCurva = document.createElementNS("http://www.w3.org/2000/svg", "svg");
              svgCurva.setAttribute("style", "position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10;");
              svgCurva.setAttribute("class", "svg-flecha-interfila");

              const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
              path.setAttribute("id", "flecha_curva_dinamica");
              path.setAttribute("d", d);
              path.setAttribute("stroke", "red");
              path.setAttribute("stroke-width", "4");
              path.setAttribute("fill", "none");

              svgCurva.appendChild(path);
              
              // Lo inyectamos en tu contenedor aislado para que no herede problemas elásticos
              contenedorCurvas.appendChild(svgCurva);

              // Tu animación nativa por .animate() que funcionaba impecable
              const largoTotal = path.getTotalLength();
              path.style.strokeDasharray = `${largoTotal}`;
              path.style.strokeDashoffset = `${largoTotal}`;

              const animacionFlecha = path.animate([{ strokeDashoffset: largoTotal }, { strokeDashoffset: 0 }], {
                duration: 2000,
                easing: "ease-in-out",
                fill: "forwards"
              });

              // // Activación de la punta al finalizar los 2000ms del trazado
              // setTimeout(() => {
              //   document.documentElement.style.setProperty('--punta-flecha-curva-left', `${x2}px`);
              //   document.documentElement.style.setProperty('--punta-flecha-curva-top', `${y2}px`);
              //   document.documentElement.style.setProperty('--punta-flecha-curva-opacity', '1');

              //   DOM.agregarComienzo.disabled = false;
              //   DOM.agregarFinal.disabled = false;
              //   console.log("Tu verdadera flecha curva se renderizó y animó de forma nativa.");
              // }, 2000);
              animacionFlecha.onfinish = () => {
                console.log("La animación del path terminó. Seteando flecha final...");
                
                // Suponiendo que 'necesitaTransicion' es un booleano que ya tenés en el scope
                // o que determina si la punta o el siguiente paso entran con fade
                // const necesitaTransicion = true; 
                setFlechaFinal(true, necesitaTransicion);

                // Render de la punta física en el DOM/CSS custom properties
                document.documentElement.style.setProperty('--punta-flecha-curva-left', `${x2}px`);
                document.documentElement.style.setProperty('--punta-flecha-curva-top', `${y2}px`);
                document.documentElement.style.setProperty('--punta-flecha-curva-opacity', '1');

                // Liberamos los controles de la app
                DOM.agregarComienzo.disabled = false;
                DOM.agregarFinal.disabled = false;
              };
            } else {
              DOM.agregarComienzo.disabled = false;
              DOM.agregarFinal.disabled = false;
            }
          }
        });
      }
    }, 100);
  }, 2000); 
}


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