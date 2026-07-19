// RenderFlechasNodos.ts
import { getNodos } from "../contenedores/ContenedorNodos.ts";
import { getFlechas } from "../contenedores/ContenedorFlechas.ts";
import * as DOM from "../elementosDOM.ts"; // Core centralizado

// Extendemos la interfaz global de Window para que TypeScript no tire error al leer tus banderas
declare global {
  interface Window {
    banderaFlecha: number;
    banderaFlechaInicial: number;
    banderaFlechaFinal: number;
  }
}


/* ==========================================================================
   1. SET FLECHAS NODOS (Manejo de transiciones para Comienzo y Final)
   ========================================================================== */
export function setFlechasNodos(necesitaTransicion: number, metodo: number, s1: number, s2Input: number): void {
  if (!DOM.verificarDOM() || DOM.contenedorNodos.childElementCount === 0) return;


  const flechas = getFlechas() as HTMLDivElement[];
  const nodos = getNodos() as HTMLDivElement[];

  const root = document.documentElement;
  let s2 = s2Input; // Permitimos la reasignación interna que requiere tu lógica del switch

  // Aseguramos que las variables de ventana tengan un valor por defecto numérico
  const bFlecha = window.banderaFlecha ?? 0;
  const resultado = 2 * necesitaTransicion + 1 * bFlecha;

  const primerNodo = DOM.contenedorNodos.firstElementChild as HTMLElement;
  console.log("el resultado dentro de flechasnodos es "+resultado);
  switch (resultado) {
    case 0: {
      let i = 0;
      if (nodos[i]) {
        nodos[i].classList.remove("no-mover");
        nodos[i].classList.add("inmediato-nodo");
      }
      console.log(flechas);
      for (const flecha of flechas) {
        flecha.classList.add("no-mover__flecha");
        console.log("para saber vis");
        const elementos = Array.from(flecha.children) as HTMLElement[];
        for (const elemento of elementos) {
          elemento.classList.add("inmediato");
          console.log("para saber si entra vis");
        }

        i++;
        if (nodos[i]) {
          nodos[i].classList.add("inmediato-nodo");
          nodos[i].classList.remove("no-mover");
        }
      }

      const cantidadNodos = flechas.length + 1;
      s2 = (DOM.contenedorNodos.offsetWidth - (cantidadNodos * primerNodo.offsetWidth)) / (cantidadNodos + 1);
      
      window.banderaFlechaInicial = 1;
      break;
    }

    case 1: {
      const cantidadNodos = flechas.length + 1;
      s2 = (DOM.contenedorNodos.offsetWidth - (cantidadNodos * primerNodo.offsetWidth)) / (cantidadNodos + 1);
      break;
    }

    default: {
      let i = 0;
      if (nodos[i]) {
        nodos[i].classList.remove("no-mover");
        nodos[i].classList.remove("inmediato-nodo");
        if (metodo === 1) {
          nodos[i].style.left = (nodos.length - i) * (s1 - s2) + 'px';
        } else {
          nodos[i].style.left = (i + 1) * (s2 - s1) + 'px';
        }
      }

      if (flechas) {
        for (const flecha of flechas) {
          flecha.classList.remove("no-mover__flecha");
          const elementos = Array.from(flecha.children) as HTMLElement[];
          for (const elemento of elementos) {
            elemento.classList.remove("inmediato");
          }

          i++;
          if (nodos[i]) {
            nodos[i].classList.remove("no-mover");
            nodos[i].classList.remove("inmediato-nodo");
            if (metodo === 1) {
              nodos[i].style.left = (nodos.length - i) * (s1 - s2) + 'px';
            } else {
              nodos[i].style.left = (i + 1) * (s2 - s1) + 'px';
            }
          }
        }
      }

      let flecha_left = 0;
      if (metodo === 1) {
        flecha_left = ((flechas.length + 2) / 2) * (s1 - s2);
      } else {
        flecha_left = ((flechas.length + 2) / 2) * (s2 - s1);
      }
      
      root.style.setProperty('--flecha-left', `${flecha_left - 25}px`);
      window.banderaFlecha = 0;
      window.banderaFlechaInicial = 0;
      break;
    }
  }

  const flecha_width = s2 + primerNodo.offsetWidth / 4;
  root.style.setProperty('--linea-flecha-width', `${flecha_width}px`);
  root.style.setProperty('--punta-flecha-width', `20px`);
}

/* ==========================================================================
   2. SET FLECHAS NODOS 2 (Manejo de transiciones para borrado Intermedio)
   ========================================================================== */
export function setFlechasNodos2(indice: number, s1: number, s2: number): void {
  if (!DOM.verificarDOM() || DOM.contenedorNodos.childElementCount === 0) return;


  const flechas = getFlechas() as HTMLDivElement[];
  const nodos = getNodos() as HTMLDivElement[];


  const root = document.documentElement;
  const primerNodo = DOM.contenedorNodos.firstElementChild as HTMLElement;

  let i = 0;
  if (nodos[i]) {
    nodos[i].classList.remove("no-mover");
    nodos[i].classList.remove("inmediato-nodo");
    nodos[i].style.left = (i + 1) * (s2 - s1) + 'px';
  }

  if (flechas) {
    for (const flecha of flechas) {
      if (flechas.length > 1 && i < (indice - 2)) {
        flechas[i].style.left = `${(((flechas.length + 2) / 2) * (s2 - s1)) - 25}px`;
      }
      if (flechas.length > 1 && i >= (indice - 1)) {
        flechas[i].style.left = `${(((flechas.length + 2) / 2) * (s1 - s2)) - 25}px`;
      }

      flecha.classList.remove("no-mover__flecha");
      const elementos = Array.from(flecha.children) as HTMLElement[];
      for (const elemento of elementos) {
        elemento.classList.remove("inmediato");
      }

      i++;
      if (nodos[i]) {
        nodos[i].classList.remove("no-mover");
        nodos[i].classList.remove("inmediato-nodo");

        if (i < (indice - 1)) {
          nodos[i].style.left = (i + 1) * (s2 - s1) + 'px';
        } else {
          nodos[i].style.left = (nodos.length - i) * (s1 - s2) + 'px';
        }
      }
    }
  }

  window.banderaFlecha = 0;
  window.banderaFlechaInicial = 0;
  window.banderaFlechaFinal = 0;

  const flecha_width = s2 + primerNodo.offsetWidth / 4;
  root.style.setProperty('--linea-flecha-width', `${flecha_width}px`);
  root.style.setProperty('--punta-flecha-width', `20px`);
}



export function setFlechasNodos3(
  necesitaTransicion: number, 
  metodo: number, 
  s1: number, 
  s2Input: number,
  indiceInicio: number = 0 // 👈 Agregamos esto con valor por defecto 0
): void {
  if (!DOM.verificarDOM() || DOM.contenedorNodos.childElementCount === 0) return;

  // const flechas = getFlechas() as HTMLDivElement[];
  const nodos = getNodos() as HTMLDivElement[];
  const root = document.documentElement;
  let s2 = s2Input;

  const bFlecha = window.banderaFlecha ?? 0;
  const resultado = 2 * necesitaTransicion + 1 * bFlecha;
  const primerNodo = DOM.contenedorNodos.firstElementChild as HTMLElement;

  switch (resultado) {
    // ... tus casos 0 y 1 se quedan igual ...

    default: {
      // 🎯 MODIFICACIÓN CLAVE: "i" ahora arranca en el índice que le pasamos
      // let i = indiceInicio; 

      // // Si el nodo de inicio existe, lo movemos
      // if (nodos[i]) {
      //   nodos[i].classList.remove("no-mover", "inmediato-nodo");
      //   // nodos[i].classList.remove("")
      //   if (metodo === 1) {
      //     nodos[i].style.left = (nodos.length - 0) * (s1 - s2) + 'px';
      //   } else {
      //     nodos[i].style.left = (0 + 1) * (s2 - s1) + 'px';
      //   }
      // }

      let i = indiceInicio; 


function resolverEase(t: number): number {
  if (t === 0 || t === 1) return t;
  
  // Método de Newton-Raphson para encontrar el tiempo paramétrico de la curva
  let x = t;
  for (let step = 0; step < 8; step++) {
    // Evaluación de la curva de Bezier en X para (0.25, 0.25)
    const currentX = 3 * 0.25 * x * (1 - x) * (1 - x) + 3 * 0.25 * x * x * (1 - x) + x * x * x;
    // Derivada de X respecto a x
    const derivativeX = 3 * 0.25 * (1 - x) * (1 - 3 * x) + 3 * 0.25 * x * (2 - 3 * x) + 3 * x * x;
    
    if (Math.abs(derivativeX) < 1e-6) break;
    x -= (currentX - t) / derivativeX;
  }
  
  // Evaluamos en Y con los puntos (0.1, 1.0) correspondientes al 'ease'
  return 3 * 0.1 * x * (1 - x) * (1 - x) + 3 * 1.0 * x * x * (1 - x) + x * x * x;
}


// Si el nodo de inicio existe, lo movemos
if (nodos[i]) {
  nodos[i].classList.remove("no-mover", "inmediato-nodo");

  // 1. Buscamos el Path de la flecha en el DOM tipándolo como path de SVG
  const path = document.getElementById("flecha_curva_dinamica") as SVGPathElement | null;
  
  // Condición segura: ¿este es el receptor de la curva?
  const esElReceptorDeLaCurva = (path !== null && i === 2); 
  
  let x2_inicial = 0;
  let desplazamiento = 0;

  if (esElReceptorDeLaCurva) {
    // Buscamos el contenedor directamente
    const contenedorNodos = (document.getElementById("contenedor_nodos") || DOM.contenedorNodos) as HTMLElement;
    if (contenedorNodos) {
      const contRect = contenedorNodos.getBoundingClientRect();
      const receptorRect = nodos[i].getBoundingClientRect();
      x2_inicial = receptorRect.left - contRect.left;
    }
  }

  // 2. Tu lógica original para aplicar el nuevo left al nodo
  if (metodo === 1) {
    desplazamiento = (nodos.length - 0) * (s1 - s2);
    nodos[i].style.left = desplazamiento + 'px';
  } else {
    desplazamiento = (0 + 1) * (s2 - s1);
    nodos[i].style.left = desplazamiento + 'px';
  }

  // 3. Si era el receptor, corremos la animación
// 3. Si era el receptor, corremos la animación de desplazamiento
  if (esElReceptorDeLaCurva && path) {
    path.style.transition = "none"; // Apagamos transiciones CSS en el path para que el JS tome el control libre

    const contenedorNodos = (document.getElementById("contenedor_nodos") || DOM.contenedorNodos) as HTMLElement;
    const emisor = document.querySelectorAll(".caja-nodo")[1] as HTMLElement; // Nodo A (arriba derecha)

    if (contenedorNodos && emisor) {
      const contRect = contenedorNodos.getBoundingClientRect();
      const emisorRect = emisor.getBoundingClientRect(); 
      const radioRulo = 130;

      // Coordenadas fijas de la fila superior (Emisor)
      const x1 = emisorRect.left - contRect.left + (emisorRect.width * 0.75);
      const y1 = emisorRect.top - contRect.top + (emisorRect.height / 2);
      const de_x1_borde = emisorRect.right - contRect.left;
      
      // La altura de destino (Y2) la sacamos midiendo el Nodo C receptor
      const receptorRect = nodos[i].getBoundingClientRect();
      const y2 = receptorRect.top - contRect.top + (receptorRect.height / 2);
      const y_pasillo = y1 + ((y2 - y1) / 2);

      const de_cpx1 = de_x1_borde + radioRulo;
      const de_cpy1 = y1;
      const de_cpx2 = de_x1_borde + radioRulo;
      const de_cpy2 = y_pasillo;

      // Destino final del movimiento
      const x2_final = x2_inicial + desplazamiento;

      const duracion = 2000; // 2 segundos (lo que tarda el nodo en moverse)
      let startTime: number | null = null;

      // Bucle de animación cuadro por cuadro
      const animarPaso = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        const tiempoTranscurrido = timestamp - startTime;
        
        // Progreso lineal
        const progresoLineal = Math.min(tiempoTranscurrido / duracion, 1);

        // 🔥 Curva matemática exacta para el 'ease' que leíste en la consola de DevTools:
        // cubic-bezier(0.25, 0.1, 0.25, 1)

       const progresoSuave = resolverEase(progresoLineal);

        // Interpolamos el extremo de la flecha
        const x2_actual = x2_inicial + (x2_final - x2_inicial) * progresoSuave;
        const control_x = x2_actual - radioRulo;

        // Redibujamos la geometría rígida de la curva acompañando al nodo
        path.setAttribute("d", `
          M ${x1} ${y1} 
          C ${de_cpx1} ${de_cpy1}, ${de_cpx2} ${de_cpy2}, ${de_x1_borde} ${y_pasillo}
          L ${x2_actual} ${y_pasillo}
          C ${control_x} ${y_pasillo}, ${control_x} ${y2}, ${x2_actual} ${y2}
        `.replace(/\s+/g, ' ').trim());

        // Aseguramos que la flecha siga viéndose completa (totalmente dibujada)
        const nuevoLargo = path.getTotalLength();
        path.style.strokeDasharray = `${nuevoLargo}`;
        path.style.strokeDashoffset = "0"; // Fijo en 0 porque ya "nació" antes

        if (progresoLineal < 1) {
          requestAnimationFrame(animarPaso);
        }
      };

      // Sincronizamos el inicio con el render del navegador
      requestAnimationFrame(() => {
        requestAnimationFrame(animarPaso);
      });
    }
  }
}

      // if (flechas) {
      //   // Recorremos las flechas pero solo aplicando estilos a partir de nuestro índice
      //   for (let fIndex = 0; fIndex < flechas.length; fIndex++) {
      //     const flecha = flechas[fIndex];
          
      //     // Omitimos las flechas que pertenecen a las filas de arriba
      //     if (fIndex < indiceInicio) continue; 

      //     flecha.classList.remove("no-mover__flecha");
      //     const elementos = Array.from(flecha.children) as HTMLElement[];
      //     for (const elemento of elementos) {
      //       elemento.classList.remove("inmediato");
      //     }

      //     // Avanzamos el puntero de nodos de forma sincronizada con la fila activa
      //     i = fIndex + 1; 
      //     if (nodos[i]) {
      //       nodos[i].classList.remove("no-mover", "inmediato-nodo");
      //       if (metodo === 1) {
      //         nodos[i].style.left = (1 - i) * (s1 - s2) + 'px';
      //       } else {
      //         nodos[i].style.left = (i + 1) * (s2 - s1) + 'px';
      //       }
      //     }
      //   }
      // }




      // Cálculos de variables CSS globales (los dejamos igual por ahora para el test)
      let flecha_left = 0;
      // if (metodo === 1) {
      //   flecha_left = ((0 + 2) / 2) * (s1 - s2);
      // } else {
      //   flecha_left = ((0 + 2) / 2) * (s2 - s1);
      // }
      
      root.style.setProperty('--flecha-left', `${flecha_left - 25}px`);
      window.banderaFlecha = 0;
      window.banderaFlechaInicial = 0;
      break;
    }
  }

  const flecha_width = s2 + primerNodo.offsetWidth / 4;
  root.style.setProperty('--linea-flecha-width', `${flecha_width}px`);
  root.style.setProperty('--punta-flecha-width', `20px`);
}


export function setFlechasNodos4(
  necesitaTransicion: number, 
  metodo: number, 
  s1: number, 
  s2Input: number,
  indiceInicio: number = 0 // 👈 Agregamos esto con valor por defecto 0
): void {
  if (!DOM.verificarDOM() || DOM.contenedorNodos.childElementCount === 0) return;

  const nodos = getNodos() as HTMLDivElement[];
  const root = document.documentElement;
  let s2 = s2Input;

  const bFlecha = window.banderaFlecha ?? 0;
  const resultado = 2 * necesitaTransicion + 1 * bFlecha;
  const primerNodo = DOM.contenedorNodos.firstElementChild as HTMLElement;

  switch (resultado) {
    // ... tus casos 0 y 1 se quedan igual ...

    default: {
      let i = indiceInicio; 

      function resolverEase(t: number): number {
        if (t === 0 || t === 1) return t;
        
        let x = t;
        for (let step = 0; step < 8; step++) {
          const currentX = 3 * 0.25 * x * (1 - x) * (1 - x) + 3 * 0.25 * x * x * (1 - x) + x * x * x;
          const derivativeX = 3 * 0.25 * (1 - x) * (1 - 3 * x) + 3 * 0.25 * x * (2 - 3 * x) + 3 * x * x;
          
          if (Math.abs(derivativeX) < 1e-6) break;
          x -= (currentX - t) / derivativeX;
        }
        
        return 3 * 0.1 * x * (1 - x) * (1 - x) + 3 * 1.0 * x * x * (1 - x) + x * x * x;
      }

      // Si el nodo de inicio existe, lo movemos
      if (nodos[i]) {
        nodos[i].classList.remove("no-mover", "inmediato-nodo");

        // 1. Buscamos el Path de la flecha en el DOM
        const path = document.getElementById("flecha_curva_dinamica") as SVGPathElement | null;
        
        // 🔥 AHORA el que se mueve y gatilla la curva es el EMISOR (Nodo 0)
        const esElEmisorDeLaCurva = (path !== null && i === 0); 
        
        let x1_inicial = 0;
        let desplazamiento = 0;

        // Obtenemos la coordenada de partida del emisor (Nodo 0) antes de desplazarlo
        if (esElEmisorDeLaCurva) {
          const contenedorNodos = (document.getElementById("contenedor_nodos") || DOM.contenedorNodos) as HTMLElement;
          if (contenedorNodos) {
            const contRect = contenedorNodos.getBoundingClientRect();
            const emisorRect = nodos[i].getBoundingClientRect();
            // X1 inicial (salida de la flecha en el lateral derecho del Nodo 0)
            x1_inicial = emisorRect.left - contRect.left + (emisorRect.width * 0.75);
          }
        }

        // 2. Tu lógica original para aplicar el nuevo left al nodo
        if (metodo === 1) {
          desplazamiento = (1 - 0) * (s1 - s2);
          nodos[i].style.left = desplazamiento + 'px';
        } else {
          desplazamiento = (0 + 1) * (s2 - s1);
          nodos[i].style.left = desplazamiento + 'px';
        }

        // 3. Animación de la curva: ahora se mueve la parte superior (Emisor) y la inferior se queda quieta
        if (esElEmisorDeLaCurva && path) {
          path.style.transition = "none"; // Control total en JS

          const contenedorNodos = (document.getElementById("contenedor_nodos") || DOM.contenedorNodos) as HTMLElement;
          // El receptor de la curva abajo está quieto (por ejemplo, el nodo de la segunda fila)
          const receptor = nodos[1] as HTMLElement; 

          if (contenedorNodos && receptor) {
            const contRect = contenedorNodos.getBoundingClientRect();
            const emisorRect = nodos[i].getBoundingClientRect(); // Nodo 0 (emisor)
            const receptorRect = receptor.getBoundingClientRect(); // Nodo quieto abajo
            const radioRulo = 130;

            // Alturas verticales (Y) fijas durante la animación
            const y1 = emisorRect.top - contRect.top + (emisorRect.height / 2);
            const y2 = receptorRect.top - contRect.top + (receptorRect.height / 2);
            const y_pasillo = y1 + ((y2 - y1) / 2);

            // Destino final del emisor (X1 inicial + el desplazamiento que va a hacer)
            const x1_final = x1_inicial + desplazamiento;

            // El receptor abajo se queda quieto en su coordenada real en pantalla
            const x2_estatico = receptorRect.left - contRect.left;
            const control_x_receptor = x2_estatico - radioRulo;

            const duracion = 2000; // 2 segundos
            let startTime: number | null = null;

            const animarPaso = (timestamp: number) => {
              if (startTime === null) startTime = timestamp;
              const tiempoTranscurrido = timestamp - startTime;
              
              const progresoLineal = Math.min(tiempoTranscurrido / duracion, 1);
              const progresoSuave = resolverEase(progresoLineal);

              // 🔥 Interpolamos la salida de la curva arriba junto con el movimiento del nodo emisor
              const x1_actual = x1_inicial + (x1_final - x1_inicial) * progresoSuave;
              
              // El borde derecho del emisor para calcular el rulo
              const de_x1_borde_actual = x1_actual + (emisorRect.width * 0.25); 
              const de_cpx1 = de_x1_borde_actual + radioRulo;
              const de_cpy1 = y1;
              const de_cpx2 = de_x1_borde_actual + radioRulo;
              const de_cpy2 = y_pasillo;

              // Redibujamos la curva estirándose hacia la derecha desde el origen móvil
              path.setAttribute("d", `
                M ${x1_actual} ${y1} 
                C ${de_cpx1} ${de_cpy1}, ${de_cpx2} ${de_cpy2}, ${de_x1_borde_actual} ${y_pasillo}
                L ${x2_estatico} ${y_pasillo}
                C ${control_x_receptor} ${y_pasillo}, ${control_x_receptor} ${y2}, ${x2_estatico} ${y2}
              `.replace(/\s+/g, ' ').trim());

              const nuevoLargo = path.getTotalLength();
              path.style.strokeDasharray = `${nuevoLargo}`;
              path.style.strokeDashoffset = "0";

              if (progresoLineal < 1) {
                requestAnimationFrame(animarPaso);
              }
            };

            requestAnimationFrame(() => {
              requestAnimationFrame(animarPaso);
            });
          }
        }
      }
      
      let flecha_left = 0;
      
      root.style.setProperty('--flecha-left', `${flecha_left - 25}px`);
      window.banderaFlecha = 0;
      window.banderaFlechaInicial = 0;
      break;
    }
  }

  const flecha_width = s2 + primerNodo.offsetWidth / 4;
  root.style.setProperty('--linea-flecha-width', `${flecha_width}px`);
  root.style.setProperty('--punta-flecha-width', `20px`);
}



export function setFlechasNodos5(
  necesitaTransicion: number, 
  metodo: number, 
  s1: number, 
  s2Input: number,
  indiceInicio: number = 0
): void {
  if (!DOM.verificarDOM() || DOM.contenedorNodos.childElementCount === 0) return;

  const nodos = getNodos() as HTMLDivElement[];
  const root = document.documentElement;
  let s2 = s2Input;

  const bFlecha = window.banderaFlecha ?? 0;
  const resultado = 2 * necesitaTransicion + 1 * bFlecha;
  const primerNodo = DOM.contenedorNodos.firstElementChild as HTMLElement;

  switch (resultado) {
    default: {
      let i = indiceInicio; 

      function resolverEase(t: number): number {
        if (t === 0 || t === 1) return t;
        let x = t;
        for (let step = 0; step < 8; step++) {
          const currentX = 3 * 0.25 * x * (1 - x) * (1 - x) + 3 * 0.25 * x * x * (1 - x) + x * x * x;
          const derivativeX = 3 * 0.25 * (1 - x) * (1 - 3 * x) + 3 * 0.25 * x * (2 - 3 * x) + 3 * x * x;
          if (Math.abs(derivativeX) < 1e-6) break;
          x -= (currentX - t) / derivativeX;
        }
        return 3 * 0.1 * x * (1 - x) * (1 - x) + 3 * 1.0 * x * x * (1 - x) + x * x * x;
      }

      if (nodos[i]) {
        nodos[i].classList.remove("no-mover", "inmediato-nodo");

        const path = document.getElementById("flecha_curva_dinamica") as SVGPathElement | null;
        const esElReceptorDeLaCurva = (path !== null && i === 2); 
        
        let x2_inicial = 0;
        let desplazamiento = 0;

        if (esElReceptorDeLaCurva) {
          const contenedorNodos = (document.getElementById("contenedor_nodos") || DOM.contenedorNodos) as HTMLElement;
          if (contenedorNodos) {
            const contRect = contenedorNodos.getBoundingClientRect();
            const receptorRect = nodos[i].getBoundingClientRect();
            x2_inicial = receptorRect.left - contRect.left;
          }
        }

        if (metodo === 1) {
          desplazamiento = (nodos.length - 0) * (s1 - s2);
          nodos[i].style.left = desplazamiento + 'px';
        } else {
          desplazamiento = (0 + 1) * (s2 - s1);
          nodos[i].style.left = desplazamiento + 'px';
        }

        if (esElReceptorDeLaCurva && path) {
          path.style.transition = "none";

          const contenedorNodos = (document.getElementById("contenedor_nodos") || DOM.contenedorNodos) as HTMLElement;
          const emisor = document.querySelectorAll(".caja-nodo")[1] as HTMLElement; 

          if (contenedorNodos && emisor) {
            const contRect = contenedorNodos.getBoundingClientRect();
            const emisorRect = emisor.getBoundingClientRect(); 
            const radioRulo = 130;

            const x1 = emisorRect.left - contRect.left + (emisorRect.width * 0.75);
            const y1 = emisorRect.top - contRect.top + (emisorRect.height / 2);
            const de_x1_borde = emisorRect.right - contRect.left;
            
            const receptorRect = nodos[i].getBoundingClientRect();
            const y2 = receptorRect.top - contRect.top + (receptorRect.height / 2);
            const y_pasillo = y1 + ((y2 - y1) / 2);

            const de_cpx1 = de_x1_borde + radioRulo;
            const de_cpy1 = y1;
            const de_cpx2 = de_x1_borde + radioRulo;
            const de_cpy2 = y_pasillo;

            // En la reversión, el destino final regresa a la posición inicial calculada por el layout
            const x2_final = x2_inicial + desplazamiento;

            const duracion = 2000; 
            let startTime: number | null = null;

            const animarPaso = (timestamp: number) => {
              if (startTime === null) startTime = timestamp;
              const tiempoTranscurrido = timestamp - startTime;
              
              const progresoLineal = Math.min(tiempoTranscurrido / duracion, 1);
              const progresoSuave = resolverEase(progresoLineal);

              // Calco exacto de tu interpolación de x2 de la función 3
              const x2_actual = x2_inicial + (x2_final - x2_inicial) * progresoSuave;
              const control_x = x2_actual - radioRulo;

              path.setAttribute("d", `
                M ${x1} ${y1} 
                C ${de_cpx1} ${de_cpy1}, ${de_cpx2} ${de_cpy2}, ${de_x1_borde} ${y_pasillo}
                L ${x2_actual} ${y_pasillo}
                C ${control_x} ${y_pasillo}, ${control_x} ${y2}, ${x2_actual} ${y2}
              `.replace(/\s+/g, ' ').trim());

              const nuevoLargo = path.getTotalLength();
              path.style.strokeDasharray = `${nuevoLargo}`;
              path.style.strokeDashoffset = "0";

              if (progresoLineal < 1) {
                requestAnimationFrame(animarPaso);
              }
            };

            requestAnimationFrame(() => {
              requestAnimationFrame(animarPaso);
            });
          }
        }
      }

      let flecha_left = 0;
      // root.style.setProperty('--flecha-left', `${flecha_left - 25}px`);
      window.banderaFlecha = 0;
      window.banderaFlechaInicial = 0;
      break;
    }
  }

  // const flecha_width = s2 + primerNodo.offsetWidth / 4;
  // root.style.setProperty('--linea-flecha-width', `${flecha_width}px`);
  root.style.setProperty('--punta-flecha-width', `20px`);
}



export function setFlechasNodos6(
  necesitaTransicion: number, 
  metodo: number, 
  s1: number, 
  s2Input: number,
  indiceInicio: number = 0
): void {
  if (!DOM.verificarDOM() || DOM.contenedorNodos.childElementCount === 0) return;

  const nodos = getNodos() as HTMLDivElement[];
  const root = document.documentElement;
  let s2 = s2Input;

  const bFlecha = window.banderaFlecha ?? 0;
  const resultado = 2 * necesitaTransicion + 1 * bFlecha;
  const primerNodo = DOM.contenedorNodos.firstElementChild as HTMLElement;

  switch (resultado) {
    default: {
      let i = indiceInicio; 

      function resolverEase(t: number): number {
        if (t === 0 || t === 1) return t;
        let x = t;
        for (let step = 0; step < 8; step++) {
          const currentX = 3 * 0.25 * x * (1 - x) * (1 - x) + 3 * 0.25 * x * x * (1 - x) + x * x * x;
          const derivativeX = 3 * 0.25 * (1 - x) * (1 - 3 * x) + 3 * 0.25 * x * (2 - 3 * x) + 3 * x * x;
          if (Math.abs(derivativeX) < 1e-6) break;
          x -= (currentX - t) / derivativeX;
        }
        return 3 * 0.1 * x * (1 - x) * (1 - x) + 3 * 1.0 * x * x * (1 - x) + x * x * x;
      }

      if (nodos[i]) {
        nodos[i].classList.remove("no-mover", "inmediato-nodo");

        const path = document.getElementById("flecha_curva_dinamica") as SVGPathElement | null;
        const esElEmisorDeLaCurva = (path !== null && i === 1); 
        
        let x1_inicial = 0;
        let desplazamiento = 0;

        // Variables que persistirán para la animación
        let y1 = 0, y2 = 0, y_pasillo = 0, x2_estatico = 0, emisorWidth = 0;
        const contenedorNodos = (document.getElementById("contenedor_nodos") || DOM.contenedorNodos) as HTMLElement;
        const receptor = nodos[2] as HTMLElement;
        const emisor = nodos[1] as HTMLElement;

        // --- ÚNICA CAPTURA DE DATOS (Antes de mover nada) ---
        if (esElEmisorDeLaCurva && contenedorNodos && emisor && receptor) {
          const contRect = contenedorNodos.getBoundingClientRect();
          const emisorRect = emisor.getBoundingClientRect();
          const receptorRect = receptor.getBoundingClientRect();

          emisorWidth = emisorRect.width;
          x1_inicial = emisorRect.left - contRect.left + (emisorRect.width * 0.75);
          x2_estatico = receptorRect.left - contRect.left;

          y1 = emisorRect.top - contRect.top + (emisorRect.height / 2);
          y2 = receptorRect.top - contRect.top + (receptorRect.height / 2);
          y_pasillo = y1 + ((y2 - y1) / 2);
        }

        // --- APLICACIÓN DEL MOVIMIENTO FÍSICO ---
        if (metodo === 1) {
          desplazamiento = (2 - 1) * (s1 - s2);
          nodos[i].style.left = desplazamiento + 'px';
        } else {
          desplazamiento = (0 + 1) * (s2 - s1);
          nodos[i].style.left = desplazamiento + 'px';
        }

        // --- ANIMACIÓN BASADA EN LOS DATOS ARRIBA GUARDADOS ---
        if (esElEmisorDeLaCurva && path && contenedorNodos && receptor) {
          path.style.transition = "none"; 

          const radioRulo = 130;
          const x1_final = x1_inicial + desplazamiento;
          const control_x_receptor = x2_estatico - radioRulo;

          const duracion = 2000; 
          let startTime: number | null = null;

          const animarPaso = (timestamp: number) => {
            if (startTime === null) startTime = timestamp;
            const tiempoTranscurrido = timestamp - startTime;
            
            const progresoLineal = Math.min(tiempoTranscurrido / duracion, 1);
            const progresoSuave = resolverEase(progresoLineal);

            const x1_actual = x1_inicial + (x1_final - x1_inicial) * progresoSuave;
            
            // Usamos emisorWidth que guardamos de forma segura antes de la mutación
            const de_x1_borde_actual = x1_actual + (emisorWidth * 0.25); 
            const de_cpx1 = de_x1_borde_actual + radioRulo;
            const de_cpy1 = y1;
            const de_cpx2 = de_x1_borde_actual + radioRulo;
            const de_cpy2 = y_pasillo;

            path.setAttribute("d", `
              M ${x1_actual} ${y1} 
              C ${de_cpx1} ${de_cpy1}, ${de_cpx2} ${de_cpy2}, ${de_x1_borde_actual} ${y_pasillo}
              L ${x2_estatico} ${y_pasillo}
              C ${control_x_receptor} ${y_pasillo}, ${control_x_receptor} ${y2}, ${x2_estatico} ${y2}
            `.replace(/\s+/g, ' ').trim());

            const nuevoLargo = path.getTotalLength();
            path.style.strokeDasharray = `${nuevoLargo}`;
            path.style.strokeDashoffset = "0";

            if (progresoLineal < 1) {
              requestAnimationFrame(animarPaso);
            }
          };

          requestAnimationFrame(() => {
            requestAnimationFrame(animarPaso);
          });
        }
      }
      
      let flecha_left = 0;
      // root.style.setProperty('--flecha-left', `${flecha_left - 25}px`);
      window.banderaFlecha = 0;
      window.banderaFlechaInicial = 0;
      break;
    }
  }

  // const flecha_width = s2 + primerNodo.offsetWidth / 4;
  // root.style.setProperty('--linea-flecha-width', `${flecha_width}px`);
  root.style.setProperty('--punta-flecha-width', `20px`);
}










