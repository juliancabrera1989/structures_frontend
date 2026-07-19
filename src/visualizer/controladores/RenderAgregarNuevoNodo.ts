import { setFlechasNodos, setFlechasNodos2, setFlechasNodos3, setFlechasNodos4 } from "./RenderFlechasNodos.ts";
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

  document.addEventListener("click", handler, true);
  DOM.agregarComienzo.disabled = true;
  DOM.agregarFinal.disabled = true;

  necesitaTransicion = 1;
  setFlechaInicial(false, necesitaTransicion);

  const inicialUl = DOM.inicialUl();
  inicialUl?.addEventListener("transitionend", function nfpi_aC() {
    inicialUl.removeEventListener("transitionend", nfpi_aC);


     if (nodos.length === 3) {


        const primero = DOM.contenedorNodos.firstElementChild as HTMLElement;


  s1 = (DOM.contenedorNodos.offsetWidth - 1 * primero.offsetWidth) / (1 + 1);
  s2 = (DOM.contenedorNodos.offsetWidth - (1 + 1) * primero.offsetWidth) / (1 + 2);


setFlechasNodos4(necesitaTransicion, 1, s1, s2, 0);


 primero.addEventListener("transitionend", function nald() {
    agregarNodo(DOM.inputNodo.value, 1);

    const nuevosNodos = getNodos() as HTMLElement[];


        for (let i = 1; i < nuevosNodos.length; i++) {
          nuevosNodos[i].classList.add("no-mover");
          nuevosNodos[i].style.left = '0px';
        }



          const nodoNuevo = nuevosNodos[0];

          if (nodoNuevo) {
            nodoNuevo.style.alignSelf = "flex-start";
            nodoNuevo.style.marginTop = "150px";
            nodoNuevo.style.opacity = "0";
            nodoNuevo.style.setProperty("margin-top", "150px", "important"); // Altura de Fila 2
            // nodoNuevo.style.transition = "opacity 0.8s ease-in-out";
            // void nodoNuevo.offsetWidth;
            // nodoNuevo.style.opacity = "1";
            setTimeout(() => {
              nodoNuevo.style.opacity = "1";
            }, 100);
          }

          nodoNuevo.addEventListener("transitionend", function na() {

          if (DOM.contenedorFlechas) {
          const flechasExistentes = DOM.contenedorFlechas.querySelectorAll(".arrow");
          flechasExistentes.forEach((flecha) => {
            const hFlecha = flecha as HTMLElement;
            hFlecha.style.transition = "none";
            hFlecha.style.alignSelf = "flex-start"; // 👈 Igual que el nodo
            hFlecha.style.marginTop = "150px";       // 👈 Igual que el nodo
            // hFlecha.style.transform = "";           // Eliminamos el translateY manual viejo
          });
        }  
        
          agregarFlecha(1);

          if (DOM.contenedorFlechas) {
            DOM.contenedorFlechas.style.alignContent = "flex-start";
            DOM.contenedorFlechas.style.alignItems = "flex-start";
          }

          const flechasActuales = getFlechas() as HTMLElement[];
          const primeraFlecha = flechasActuales[0];
          const ultimoHijoFlecha = primeraFlecha?.lastElementChild as HTMLElement | null;


          primeraFlecha.style.setProperty("margin-top","150px");


        if (DOM.contenedorFlechas &&  primeraFlecha) {
          const saltoDeLineaFlechas = document.createElement("div");
          saltoDeLineaFlechas.className = "salto-flex";
          saltoDeLineaFlechas.style.flexBasis = "100%";
          saltoDeLineaFlechas.style.height = "0";
          DOM.contenedorFlechas.insertBefore(saltoDeLineaFlechas, primeraFlecha.nextSibling);
        }
          ultimoHijoFlecha?.addEventListener("transitionend", function fl() {
            setFlechaInicial(true, necesitaTransicion);

            const primerFlecha = DOM.contenedorFlechas.firstElementChild as HTMLElement | null;
            primerFlecha?.addEventListener("transitionend", function g() {
              document.removeEventListener("click", handler, true);
              DOM.agregarComienzo.disabled = false;
              DOM.agregarFinal.disabled = false;

              actualizarSelectoresIntermedios();

            
              primerFlecha.removeEventListener("transitionend", g);
            });


            ultimoHijoFlecha.removeEventListener("transitionend", fl);
          });

          });





    primero.removeEventListener("transitionend", nald);
  });



return ;
     }


    if (nodos.length < 2)  {
      console.log("🟢 Ejecutando flujo horizontal...");

      const nodosActualizados = getNodos() as HTMLElement[];
      const ultimo = DOM.contenedorNodos.lastElementChild as HTMLElement;
      s1 = (DOM.contenedorNodos.offsetWidth - nodosActualizados.length * ultimo.offsetWidth) / (nodosActualizados.length + 1);
      s2 = (DOM.contenedorNodos.offsetWidth - (nodosActualizados.length + 1) * ultimo.offsetWidth) / (nodosActualizados.length + 2);

      setFlechaFinal(true, necesitaTransicion, s2);
      setFlechasNodos(necesitaTransicion, 1, s1, s2);

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

      return;
    }

      console.log("🔵 FASE 1: Bajada suave del Wrapper y Nodos por transform.");

      // 1. Estiramos el búnker exterior suavemente
      if (DOM.principalWrapper) {
        DOM.principalWrapper.style.transition = "height 2s ease-in-out, min-height 2s ease-in-out, max-height 2s ease-in-out";
        DOM.principalWrapper.style.height = "600px";
        DOM.principalWrapper.style.minHeight = "600px";
        DOM.principalWrapper.style.maxHeight = "600px";
      }

      if (DOM.principal) DOM.principal.style.transition = "none";
      if (DOM.contenedorNodos) DOM.contenedorNodos.style.transition = "none";

      // 2. Bajada con tu valor corregido de transform
      const nodosActuales = Array.from(getNodos() as HTMLElement[]);
      nodosActuales.forEach(nodo => {
        nodo.classList.remove("inmediato-nodo", "inmediato", "inmediato_reacomodo", "no-mover");
        nodo.style.transition = "transform 2s ease-in-out";
        nodo.style.transform = "translateY(250px)"; // 🔥 Tu corrección
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
          flecha.style.transition = "transform 2s ease-in-out";
          flecha.style.transform = "translateY(250px)";
        });
      }




      // B. Mover el nodo NULL (DOM.nulo)
      if (DOM.nulo) {
        DOM.nulo.style.transition = "transform 2s ease-in-out";
        DOM.nulo.style.transform = "translateY(250px)";
      }

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
      // const finalUl = DOM.finalUl();
      // if (finalUl) {
      //   finalUl.style.transition = "transform 2s ease-in-out";
      //   finalUl.style.transform = "translateY(250px)";
      // }

      // =========================================================================
      // FASE 2: RETENCIÓN (A los 2000ms, clavamos los nodos en el fondo)
      // =========================================================================
      setTimeout(() => {
        console.log("⚡ FASE 2: Retención instantánea en contenedor de una fila.");

        document.documentElement.style.setProperty('--principal-height', '600px');
        if (DOM.principal) DOM.principal.style.height = "600px";
        if (DOM.contenedorNodos) DOM.contenedorNodos.style.height = "600px";
        if (DOM.contenedorFlechas) DOM.contenedorFlechas.style.height = "600px";
        if (DOM.inicializador) DOM.inicializador.style.height = "600px";

        nodosActuales.forEach(nodo => {
          nodo.style.transition = "none";
          nodo.style.transform = "none";
          nodo.style.setProperty("margin-top", "300px", "important"); // 🔥 Tu corrección
        });


        const contenedorFlechas = document.getElementById("contenedor_flechas");
        if (contenedorFlechas) {

          const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
          flechasExistentes.forEach((flecha) => {
            (flecha as HTMLElement).style.transition = "none";
            (flecha as HTMLElement).style.transform = "none";
            // Aplicamos el desfase vertical estático para que calcen con los nodos en margin-top 300px
            // (flecha as HTMLElement).style.transform = "translateY(150px)";
            (flecha as HTMLElement).style.setProperty("margin-top","300px","important");
          });






        }

        const flecha_puntero_final = document.getElementById("flecha_puntero_final");
        if (!flecha_puntero_final) return;
        const hijos = flecha_puntero_final.children;

                for (const hijo of hijos) {
                  (hijo as HTMLElement).removeAttribute("style");
                }

        if (DOM.nulo) {
          DOM.nulo.style.transition = "none";
          DOM.nulo.style.transform = "none";
          // Actualizamos su variable CSS o top si lo requiere tu layout para congelarlo abajo
          //  root.style.setProperty('--nulo-top', `${DOM.str.offsetTop+(DOM.principal.offsetHeight/2)}px`);
          const ultimoNodo = DOM.contenedorNodos.lastElementChild;
          const topUN = (ultimoNodo as HTMLElement).offsetTop;
          root.style.setProperty('--linea-flecha-final-top', `${DOM.principal.offsetHeight*3/4 - 2.5}px`);
          root.style.setProperty('--nulo-top', `${( topUN - 50 - DOM.nulo.offsetHeight/2)}px`);
          root.style.setProperty('--punta-flecha-final-top', `${( topUN + DOM.nulo.offsetHeight/2 - 50)}px`);

          // root.style.setProperty('--punta-flecha-final-top', `${DOM.str.offsetTop+DOM.nulo.offsetHeight+DOM.principal.offsetHeight/2}px`);
        // root.style.setProperty('--punta-flecha-final-top', `${DOM.principal.offsetHeight*2/3 - (DOM.str.offsetTop - DOM.nulo.offsetHeight)}px`);
        }



       // =========================================================================
        // 🛠️ FASE 3: Pasando a modo multi-fila e insertando elementos.
        // =========================================================================
        setTimeout(() => {
          console.log("🛠️ FASE 3: Pasando a modo multi-fila e insertando elementos.");

          // 1. Convertimos el contenedor a dos filas (Wrap) justo en este frame
          if (DOM.contenedorNodos) {
            DOM.contenedorNodos.style.flexWrap = "wrap";
            DOM.contenedorNodos.style.alignContent = "flex-start";
            DOM.contenedorNodos.style.alignItems = "flex-start";
          }





          // 2. Tu función pura mete el nuevo nodo al principio (índice 0)
          agregarNodo(DOM.inputNodo.value, 1);

          const todosLosNodos = Array.from(getNodos() as HTMLElement[]);
          const nodoNuevo = todosLosNodos[0]; // El recién inyectado arriba

          // 🔥 Identificamos al nodo que antes estaba primero y ahora bajó a la segunda fila
          const nodoOrigenReal = todosLosNodos[1];

          // 🟢 Seteamos la opacidad en 0 e iniciamos la transición justo acá, antes del salto
          // if (nodoNuevo) {
          //   nodoNuevo.style.opacity = "0";
          //   nodoNuevo.style.transition = "opacity 0.8s ease-in-out";
          // }

          // // 3. Creamos el bloque divisor
          // const saltoDeLinea = document.createElement("div");
          // saltoDeLinea.className = "salto-flex";
          // saltoDeLinea.style.flexBasis = "100%";
          // saltoDeLinea.style.height = "0";

          // // 4. Lo insertamos exactamente DESPUÉS del nuevo nodo para partir la grilla
          // if (DOM.contenedorNodos && nodoNuevo) {
          //   DOM.contenedorNodos.insertBefore(saltoDeLinea, nodoNuevo.nextSibling);
          // }


                // 3. Insertamos el salto flex en ambos lados en la misma posición
        const saltoDeLineaNodos = document.createElement("div");
        saltoDeLineaNodos.className = "salto-flex";
        saltoDeLineaNodos.style.flexBasis = "100%";
        saltoDeLineaNodos.style.height = "0";

            if (DOM.contenedorNodos && nodoNuevo) {
            DOM.contenedorNodos.insertBefore(saltoDeLineaNodos, nodoNuevo.nextSibling);
          }

        // if (contenedorFlechas) {
        //   const saltoDeLineaFlechas = document.createElement("div");
        //   saltoDeLineaFlechas.className = "salto-flex";
        //   saltoDeLineaFlechas.style.flexBasis = "100%";
        //   saltoDeLineaFlechas.style.height = "0";
        //   contenedorFlechas.prepend(saltoDeLineaFlechas);
        // }










          // 5. Con las dos filas armadas por el salto, pasamos todo al layout final
          todosLosNodos.forEach(nodo => {
            nodo.style.alignSelf = "flex-start";
            nodo.style.setProperty("margin-top", "150px", "important");
          });

          // // Forzamos el reflow y disparamos la animación suave hacia 1
          // if (nodoNuevo) {
          //   void nodoNuevo.offsetWidth; // Truco mecánico
          //   nodoNuevo.style.opacity = "1";
           if (nodoNuevo) {
            // nodoNuevo.style.alignSelf = "flex-start";
            // nodoNuevo.style.marginTop = "150px";
            nodoNuevo.style.opacity = "0";
            // nodoNuevo.style.transition = "opacity 0.8s ease-in-out";
            // void nodoNuevo.offsetWidth;
            // nodoNuevo.style.opacity = "1";
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
                  const contRect = DOM.contenedorNodos.getBoundingClientRect();
                  const emisorRect = nodoNuevo.getBoundingClientRect();
                  const receptorRect = nodoOrigenReal.getBoundingClientRect();
                  const radioRulo = 130;

                  // Coordenadas calculadas en base a la posición real en pantalla
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
                  contenedorCurvas.appendChild(svgCurva);

                  // Animación por strokeDashoffset (Efecto de dibujado óptico progresivo)
                  const largoTotal = path.getTotalLength();
                  path.style.strokeDasharray = `${largoTotal}`;
                  path.style.strokeDashoffset = `${largoTotal}`;

                  const animacionFlecha = path.animate([{ strokeDashoffset: largoTotal }, { strokeDashoffset: 0 }], {
                    duration: 2000,
                    easing: "ease-in-out",
                    fill: "forwards"
                  });

                  animacionFlecha.onfinish = () => {
                    console.log("La animación del path terminó. Seteando flecha final...");


                    setFlechaInicial(true, necesitaTransicion);

                    // Aseguramos las variables CSS de la punta de la flecha curva en su destino exacto
                    document.documentElement.style.setProperty('--punta-flecha-curva-left', `${x2}px`);
                    document.documentElement.style.setProperty('--punta-flecha-curva-top', `${y2}px`);
                    document.documentElement.style.setProperty('--punta-flecha-curva-opacity', '1');


                    // Liberamos los controles de la UI al terminar la secuencia completa
                    document.removeEventListener("click", handler, true);
                    DOM.agregarComienzo.disabled = false;
                    DOM.agregarFinal.disabled = false;

                    actualizarSelectoresIntermedios();
                  };
                }
              }
            });
          }

          console.log("🛑 Estructura DOM armada y escuchador de flecha curva activo.");

        }, 100);
      }, 2000);





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


    if (nodos.length === 3) {
  console.log("🧪 [TEST] Ejecutando flujo de reacomodo en Fila 2 (Nodo 3 -> Nodo 4)");

  // 1. Calculamos s1 y s2 para la última fila
  // NOTA: Acá usamos la misma matemática de espaciado, pero pensando en la Fila 2.
  const nodosActualizados = getNodos() as HTMLElement[];
  const ultimo = DOM.contenedorNodos.lastElementChild as HTMLElement;

  // Calculamos el espacio para cuando haya 2 nodos abajo (el actual + el nuevo)
  s1 = (DOM.contenedorNodos.offsetWidth - 1 * ultimo.offsetWidth) / (1 + 1);
  s2 = (DOM.contenedorNodos.offsetWidth - (1 + 1) * ultimo.offsetWidth) / (1 + 2);

  // 2. Ejecutamos tu setFlechasNodos RENOVADO pasando el índice de inicio (2)
  // Le pasamos el índice 2 para que solo actúe sobre el Nodo 3 (el de la Fila 2)


  setFlechasNodos3(necesitaTransicion, 0, s1, s2, 2);

  // 3. Al terminar la animación del Nodo 3, inyectamos el Nodo 4
  ultimo.addEventListener("transitionend", function nald() {
    agregarNodo(DOM.inputNodo.value, 0);

    const nuevosNodos = getNodos() as HTMLElement[];


        for (let i = 0; i < (nuevosNodos.length - 1); i++) {
          nuevosNodos[i].classList.add("no-mover");
          nuevosNodos[i].style.left = '0px';
        }



          const nodoNuevo = nuevosNodos[nuevosNodos.length - 1];

          if (nodoNuevo) {
            nodoNuevo.style.alignSelf = "flex-start";
            nodoNuevo.style.marginTop = "150px";
            nodoNuevo.style.opacity = "0";
            nodoNuevo.style.setProperty("margin-top", "150px", "important"); // Altura de Fila 2
            // nodoNuevo.style.transition = "opacity 0.8s ease-in-out";
            // void nodoNuevo.offsetWidth;
            // nodoNuevo.style.opacity = "1";
            setTimeout(() => {
              nodoNuevo.style.opacity = "1";
            }, 100);
          }

          nodoNuevo.addEventListener("transitionend", function na() {
             
          nodoNuevo.removeEventListener("transitionend", na);
        if (DOM.contenedorFlechas) {
          const flechasExistentes = DOM.contenedorFlechas.querySelectorAll(".arrow");
          flechasExistentes.forEach((flecha) => {
            const hFlecha = flecha as HTMLElement;
            hFlecha.style.transition = "none";
            hFlecha.style.alignSelf = "flex-start"; // 👈 Igual que el nodo
            hFlecha.style.marginTop = "150px";       // 👈 Igual que el nodo
            // hFlecha.style.transform = "";           // Eliminamos el translateY manual viejo
          });
        }

          agregarFlecha(0);

          if (DOM.contenedorFlechas) {
            DOM.contenedorFlechas.style.alignContent = "flex-start";
            DOM.contenedorFlechas.style.alignItems = "flex-start";
          }
          const flechasActuales = getFlechas() as HTMLElement[];
          const ultimaFlecha = flechasActuales[flechasActuales.length - 1];
          const ultimoHijoFlecha = ultimaFlecha?.lastElementChild as HTMLElement | null;

          ultimaFlecha.style.setProperty("margin-top","150px");


        if (DOM.contenedorFlechas) {
          const saltoDeLineaFlechas = document.createElement("div");
          saltoDeLineaFlechas.className = "salto-flex";
          saltoDeLineaFlechas.style.flexBasis = "100%";
          saltoDeLineaFlechas.style.height = "0";
          DOM.contenedorFlechas.insertBefore(saltoDeLineaFlechas, ultimaFlecha);
        }



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





    ultimo.removeEventListener("transitionend", nald);
  });

  return; // 🔥 Cortamos acá para que no siga con el resto del código
}



    if (totalNodosActuales < 2) {
      // =========================================================================
      // 🟢 CAMINO ORIGINAL: ENCAPSULADO POR COMPLETO AQUÍ DENTRO
      // =========================================================================
      s1 = (DOM.contenedorNodos.offsetWidth - totalNodosActuales * ultimo.offsetWidth) / (totalNodosActuales + 1);
      s2 = (DOM.contenedorNodos.offsetWidth - (totalNodosActuales + 1) * ultimo.offsetWidth) / (totalNodosActuales + 2);

      setFlechaInicial(true, necesitaTransicion, s2);
      setFlechasNodos(necesitaTransicion, 0, s1, s2);

      // MUDAMOS AQUÍ TODO LO QUE ANTES ESTABA SUELTO ABAJO:
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
            // Liberación del camino original
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

    finalUl.classList.add("no-desplazar");
     return;
    }
      // =========================================================================
      // 🔵 TU NUEVO CAMINO ELSE (TOTALMENTE AISLADO)
      // =========================================================================
      console.log("Paso 1: Expansión escalable a 600px con contra-desplazamiento interno.");

      if (DOM.principalWrapper) {
        DOM.principalWrapper.style.transition = "height 2s ease-in-out, min-height 2s ease-in-out, max-height 2s ease-in-out";
        DOM.principalWrapper.style.overflow = "hidden";
        DOM.principalWrapper.style.height = "600px";
        DOM.principalWrapper.style.minHeight = "600px";
        DOM.principalWrapper.style.maxHeight = "600px";
      }

      setTimeout(() => {
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
          // DOM.contenedorNodos.style.flexWrap = "wrap";
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
          contenedorFlechas.style.alignContent = "flex-start";
        }

        const contenedorCurvas = document.getElementById("contenedor_flechas_curvas");
        if (contenedorCurvas) {
          contenedorCurvas.style.height = "600px";
          contenedorCurvas.style.minHeight = "600px";
        }

        // const desvioCentro = (600 - 400) / 2;
        // if (contenedorFlechas) {
        //   const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
        //   flechasExistentes.forEach((flecha) => {
        //     (flecha as HTMLElement).style.transform = `translateY(-${desvioCentro}px)`;
        //   });
        // }

        // 2. Aplicamos a las flechas el mismo comportamiento individual que a los nodos
        // if (contenedorFlechas) {
        //   const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
        //   flechasExistentes.forEach((flecha) => {
        //     const hFlecha = flecha as HTMLElement;
        //     hFlecha.style.transition = "none";
        //     hFlecha.style.alignSelf = "flex-start"; // 👈 Igual que el nodo
        //     hFlecha.style.marginTop = "150px";       // 👈 Igual que el nodo
        //     // hFlecha.style.transform = "";           // Eliminamos el translateY manual viejo
        //   });
        // }

        if (contenedorFlechas) {

          const flechasExistentes = contenedorFlechas.querySelectorAll(".arrow");
          flechasExistentes.forEach((flecha) => {
            (flecha as HTMLElement).style.transition = "none";
            (flecha as HTMLElement).style.transform = "none";
            // Aplicamos el desfase vertical estático para que calcen con los nodos en margin-top 300px
            // (flecha as HTMLElement).style.transform = "translateY(150px)";
            (flecha as HTMLElement).style.setProperty("margin-top","150px","important");
          });

        }


          const ultimoNodo = DOM.contenedorNodos.lastElementChild;
          const topUN = (ultimoNodo as HTMLElement).offsetTop;
          root.style.setProperty('--linea-flecha-final-top', `${DOM.principal.offsetHeight*3/4 - 2.5}px`);
          root.style.setProperty('--nulo-top', `${( 400 - 50 - DOM.nulo.offsetHeight/2)}px`);
          root.style.setProperty('--punta-flecha-final-top', `${( 400 + DOM.nulo.offsetHeight/2 - 50)}px`);

        const nodosActuales = Array.from(getNodos() as HTMLElement[]);
        nodosActuales.forEach(nodo => {
          nodo.style.transition = "none";
          nodo.style.alignSelf = "flex-start";
          nodo.style.marginTop = "150px";
        });

        // 3. Insertamos el salto flex en ambos lados en la misma posición
        const saltoDeLineaNodos = document.createElement("div");
        saltoDeLineaNodos.className = "salto-flex";
        saltoDeLineaNodos.style.flexBasis = "100%";
        saltoDeLineaNodos.style.height = "0";
        DOM.contenedorNodos.appendChild(saltoDeLineaNodos);

        // if (contenedorFlechas) {
        //   const saltoDeLineaFlechas = document.createElement("div");
        //   saltoDeLineaFlechas.className = "salto-flex";
        //   saltoDeLineaFlechas.style.flexBasis = "100%";
        //   saltoDeLineaFlechas.style.height = "0";
        //   contenedorFlechas.appendChild(saltoDeLineaFlechas);
        // }

        setTimeout(() => {
          const nodosAntesDeAgregar = Array.from(getNodos() as HTMLElement[]);
          const nodoOrigenReal = nodosAntesDeAgregar[nodosAntesDeAgregar.length - 1];

          agregarNodo(DOM.inputNodo.value, 0);

          const todosLosNodos = Array.from(getNodos() as HTMLElement[]);
          const nodoNuevo = todosLosNodos[todosLosNodos.length - 1];

          if (nodoNuevo) {
            nodoNuevo.style.alignSelf = "flex-start";
            nodoNuevo.style.marginTop = "150px";
            nodoNuevo.style.opacity = "0";
            // nodoNuevo.style.transition = "opacity 0.8s ease-in-out";
            // void nodoNuevo.offsetWidth;
            // nodoNuevo.style.opacity = "1";
            setTimeout(() => {
              nodoNuevo.style.opacity = "1";
            }, 100);

            nodoNuevo.addEventListener('transitionend', function dispararFlechaCurva(e) {
              if (e.propertyName === 'opacity') {
                nodoNuevo.removeEventListener('transitionend', dispararFlechaCurva);

                const contenedorCurvas = document.getElementById("contenedor_flechas_curvas");
                if (!contenedorCurvas) {
                  document.removeEventListener("click", handler, true); // 👈 Seguridad
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
                  contenedorCurvas.appendChild(svgCurva);

                  const largoTotal = path.getTotalLength();
                  path.style.strokeDasharray = `${largoTotal}`;
                  path.style.strokeDashoffset = `${largoTotal}`;

                  const animacionFlecha = path.animate([{ strokeDashoffset: largoTotal }, { strokeDashoffset: 0 }], {
                    duration: 2000,
                    easing: "ease-in-out",
                    fill: "forwards"
                  });

                  animacionFlecha.onfinish = () => {
                    console.log("La animación del path terminó. Seteando flecha final...");
                    setFlechaFinal(true, necesitaTransicion);

                    document.documentElement.style.setProperty('--punta-flecha-curva-left', `${x2}px`);
                    document.documentElement.style.setProperty('--punta-flecha-curva-top', `${y2}px`);
                    document.documentElement.style.setProperty('--punta-flecha-curva-opacity', '1');

                    // 💥 LIBERACIÓN DEL ELSE: Removemos el handler global del principio
                    document.removeEventListener("click", handler, true);
                    DOM.agregarComienzo.disabled = false;
                    DOM.agregarFinal.disabled = false;

                    actualizarSelectoresIntermedios();

                    // Rematamos limpiando cualquier rastro elástico del Ul original
                    // finalUl?.classList.remove("no-desplazar");
                  };
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