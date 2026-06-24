import { crearFlecha } from "../elementosGraficos/Flecha.ts";
import { contenedorFlechas, verificarDOM } from "../elementosDOM.ts";

const root = document.documentElement;

/**
 * Obtiene la colección actualizada de flechas en el DOM.
 * Retorna un HTMLCollectionOf<Element> o un array vacío simulado si el DOM no está listo.
 */
function getFlechas(): HTMLCollectionOf<Element> | Element[] {
  if (!verificarDOM() || !contenedorFlechas) {
    return [];
  }
  return contenedorFlechas.getElementsByClassName("arrow");
}

function agregarFlechaN(indice: number): void {
  
  const flecha = crearFlecha();
  
  root.style.setProperty('--flecha-left', `-25px`);
  
   
  const flechas = getFlechas();
   
  // Si el índice es válido dentro del rango actual de flechas
  if (indice < flechas.length && flechas[indice]) {
    flechas[indice].insertAdjacentElement("afterend", flecha);
  }



        for (let i = 0; i < flechas.length; i++) {
        // if (i !== (indice - 2)) {
        if (i !== (indice)) {
          flechas[i].classList.add("no-mover__flecha");
        }
      }

      setTimeout(() => {
        const objetivo = flechas[indice+1];
        if (objetivo) {
          for (const elemento of objetivo.children) {
            (elemento as HTMLElement).removeAttribute("style");
          }
        }
      }, 100);
}

function agregarFlecha(metodo: number): void {
  if (!verificarDOM() || !contenedorFlechas) return;

  let n = 0;
  let m = 1;
  const flecha = crearFlecha();
  
  root.style.setProperty('--flecha-left', `-25px`);

  // 1. Inserción en el DOM según el método
  switch (metodo) {
    case 0: {
      contenedorFlechas.append(flecha);
      break;
    }
    case 1: {
      contenedorFlechas.prepend(flecha);
      n = 1;
      m = contenedorFlechas.childElementCount;
      break;
    }
  }

  const flechas = getFlechas();

  // 2. Aplicación de clases de animación/estado según el método
  switch (metodo) {
    case 0:
    case 1: {
      for (let i = (0 + n); i < (flechas.length - (1 - n)); i++) {
        flechas[i].classList.add("no-mover__flecha");
      }

      setTimeout(() => {
        const objetivo = flechas[flechas.length - m];
        if (objetivo) {
          for (const elemento of objetivo.children) {
            (elemento as HTMLElement).removeAttribute("style");
          }
        }
      }, 100);
      break;
    }

  }
}

function sacarFlecha(indice: number): void {
  if (!verificarDOM() || !contenedorFlechas) return;

  const flechasAntes = getFlechas();
  const flechaAEliminar = flechasAntes[indice];

  if (flechaAEliminar) {
    contenedorFlechas.removeChild(flechaAEliminar);
  }

  // Volvemos a consultar la lista actualizada post-eliminación
  const flechasDespues = getFlechas();
  if (flechasDespues.length > 0) {
    root.style.setProperty('--flecha-left', `-25px`);
    for (let i = 0; i < flechasDespues.length; i++) {
      flechasDespues[i].classList.add("no-mover__flecha");
    }
  }
}

export { agregarFlecha, agregarFlechaN, sacarFlecha, getFlechas };