

import { crearNodo } from "../elementosGraficos/Nodo.ts";

import { nodoSeleccionado } from "../controladores/ControladorEventosNodos.ts";
import { contenedorNodos, verificarDOM } from "../elementosDOM.ts";

/**
 * Obtiene la colección actualizada de nodos en el DOM.
 */
function getNodos(): HTMLCollectionOf<Element> | Element[] {
  if (!verificarDOM() || !contenedorNodos) return [];
  return contenedorNodos.getElementsByClassName("caja-nodo");
}

/**
 * Encuentra el índice de un nodo basándose en su valor de texto interno.
 */
function indexOf(valor: string): number {
  const nodos = getNodos();
  for (let i = 0; i < nodos.length; i++) {
    const contenedorValor = nodos[i].getElementsByClassName("valor-nodo")[0] as HTMLElement | undefined;
    const aux = contenedorValor?.innerText;

    if (aux === valor) {
      return i;
    }
  }
  return -1; // Retornamos -1 si no se encuentra (estándar en JS/TS)
}

function agregarNodoN(valor: string, indice: number): void {
  console.log("Entró en la función para agregar un nodo intermedio");
   const elemento = crearNodo(valor);

  // Evento con tipado correcto y seguro
  elemento.addEventListener('click', () => {
    nodoSeleccionado(valor);
  });


  const nodos = getNodos();
  console.log("El nuevo nodo es :");
  console.log(elemento);
  console.log("El indice será: "+indice);
  // Validación de rango seguro antes de insertar
  if (indice < nodos.length && nodos[indice]) {
    nodos[indice].insertAdjacentElement("beforebegin", elemento);
  }
}


function agregarNodo(valor: string, metodo: number): void {
  if (!verificarDOM() || !contenedorNodos) return;

  const elemento = crearNodo(valor);

  // Evento con tipado correcto y seguro
  elemento.addEventListener('click', () => {
    nodoSeleccionado(valor);
  });

  switch (metodo) {
    case 0: {
      contenedorNodos.append(elemento);
      break;
    }
    case 1: {
      contenedorNodos.prepend(elemento);
      break;
    }

  }
}

function sacarNodo(data: string): void {
  if (!verificarDOM() || !contenedorNodos) return;

  const nodos = getNodos();
  
  // Recorremos al revés al eliminar elementos de una colección en vivo 
  // para evitar problemas con la mutación de los índices
  for (let i = nodos.length - 1; i >= 0; i--) {
    const contenedorValor = nodos[i].getElementsByClassName("valor-nodo")[0] as HTMLElement | undefined;
    const valor = contenedorValor?.innerHTML;

    if (valor === data) {
      contenedorNodos.removeChild(nodos[i]);
    }
  }
}

export { agregarNodo, agregarNodoN, sacarNodo, getNodos, indexOf };




