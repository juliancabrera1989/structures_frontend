

import { 
  agregarNodoAlComienzo, 
  agregarNodoIntermedio, 
  agregarNodoAlFinal, 
  agregarPrimerNodo 
} from "./RenderAgregarNuevoNodo.ts";
import { 
  borrarNodoAlComienzo, 
  borrarNodoAlFinal, 
  borrarUltimoNodo
} from "./RenderSacarNodo.ts";
import { inicializarPuntero, setFlechaInicial, setFlechaFinal } from "./ControladorInicializador.ts";
import * as DOM from "../utils/elementosDOM.ts";
import { setFlechasNodos } from "./RenderFlechasNodos.ts";


// 📦 IMPORTAMOS TUS CLASES DEL CORE
import { BaseStructure } from "../../structures/BaseStructure.ts";
import { LinkedList } from "../../structures/LinkedList.ts";
import { Deque } from "../../structures/Deque.ts";
import { Stack } from "../../structures/Stack.ts"; // Asumo que se llama así
import { Queue } from "../../structures/Queue.ts"; // Asumo que se llama así



import { estructuraService } from "../../services/estructuraService.ts";






export const MAPA_CONFIG_ESTRUCTURAS: Record<string, any> = {
  linkedlist: {
    etiquetaHead: "StrPtr",
    etiquetaTail: "NULL",
    mostrarAgregarPrimerNodo: true,
    mostrarAgregarComienzo: true,
    etiquetaAgregarComienzo: "Agregar al Comienzo",
    mostrarAgregarFinal: true,
    etiquetaAgregarFinal: "Agregar al Final",
    mostrarAgregarIntermedio: true,
    mostrarBorrarComienzo: true,
    etiquetaBorrarComienzo: "Borrar al Comienzo",
    mostrarBorrarFinal: true,
    etiquetaBorrarFinal: "Borrar al Final",
  },
  stack: {
    etiquetaHead: "TOP",
    etiquetaTail: "NULL",
    mostrarAgregarPrimerNodo: true,
    mostrarAgregarComienzo: true,
    etiquetaAgregarComienzo: "Push (Apilar)",
    mostrarAgregarFinal: false,
    etiquetaAgregarFinal: "",
    mostrarAgregarIntermedio: false,
    mostrarBorrarComienzo: true,
    etiquetaBorrarComienzo: "Pop (Desapilar)",
    mostrarBorrarFinal: false,
    etiquetaBorrarFinal: "",
  },
  queue: {
    etiquetaHead: "HEAD",
    etiquetaTail: "TAIL",
    mostrarAgregarPrimerNodo: true,
    mostrarAgregarComienzo: false,
    etiquetaAgregarComienzo: "",
    mostrarAgregarFinal: true,
    etiquetaAgregarFinal: "Enqueue (Encolar)",
    mostrarAgregarIntermedio: false,
    mostrarBorrarComienzo: true,
    etiquetaBorrarComienzo: "Dequeue (Desencolar)",
    mostrarBorrarFinal: false,
    etiquetaBorrarFinal: "",
  },
  deque: {
    etiquetaHead: "BEGIN",
    etiquetaTail: "END",
    mostrarAgregarPrimerNodo: true,
    mostrarAgregarComienzo: true,
    etiquetaAgregarComienzo: "Add Begin",
    mostrarAgregarFinal: true,
    etiquetaAgregarFinal: "Add End",
    mostrarAgregarIntermedio: false,
    mostrarBorrarComienzo: true,
    etiquetaBorrarComienzo: "Remove Begin",
    mostrarBorrarFinal: true,
    etiquetaBorrarFinal: "Remove End",
  },
};






const root = document.documentElement;

// Variable global interna del módulo para recordar qué estructura estamos emulando
let estructuraActiva: BaseStructure<any> | null = null;

declare global {
  interface Window {
    banderaFlechaInicial: number;
    banderaFlechaFinal: number;
    banderaFlecha: number;
  }
}

window.banderaFlechaInicial = 0;
window.banderaFlechaFinal = 0;
window.banderaFlecha = 0;

export function initControladorBarraSuperior(): void {
  DOM.actualizarElementosDOM();

  if (!DOM.verificarDOM()) {
    console.error("No se pudo inicializar la barra superior: Elementos del DOM ausentes.");
    return;
  }

  // Vincular el botón de creación principal
  DOM.inic.addEventListener("click", inicializar);
  
   

  DOM.botonAgregar1erNodo?.addEventListener("click", ejecutarAgregarPrimerNodo); 
  DOM.agregarComienzo?.addEventListener("click", ejecutarAgregarNodoAlComienzo);
  DOM.agregarFinal?.addEventListener("click", ejecutarAgregarNodoAlFinal);
  DOM.agregarIntermedio?.addEventListener("click", ejecutarAgregarNodoIntermedio);


// 🔴 NUEVOS: Listeners de Borrado
  DOM.borrarComienzo?.addEventListener("click", ejecutarBorrarNodoAlComienzo);
  DOM.borrarFinal?.addEventListener("click", ejecutarBorrarNodoAlFinal);  

  DOM.guardarEstructura?.addEventListener("click",ejecutarGuardarEstructura);



  window.addEventListener("resize", renderizar);
  console.log("✅ ControladorBarraSuperior dinámico asignado.");
}

function inicializar(): void {
  if (!DOM.verificarDOM()) return;

  // 1. CAPTURAMOS LOS DATOS DEL FORMULARIO USANDO EL DOM
  const inputName = (document.getElementById("structure_name") as HTMLInputElement)?.value || "Estructura sin nombre";
  const selectType = (document.getElementById("structure_type") as HTMLSelectElement)?.value;
  const selectDataType = (document.getElementById("data_type") as HTMLSelectElement)?.value;

  console.log(`Inicializando: ${inputName} de tipo ${selectType}`);

  // 2. POLIMORFISMO: Instanciamos tu clase lógica de TS correspondiente
  if (selectType === "linkedlist") {
    estructuraActiva = new LinkedList<any>(inputName, selectDataType);
  } else if (selectType === "deque") {
    estructuraActiva = new Deque<any>(inputName, selectDataType);
  } else if (selectType === "stack") {
    estructuraActiva = new Stack<any>(inputName, selectDataType);
  } else if (selectType === "queue") {
    estructuraActiva = new Queue<any>(inputName, selectDataType);
  }

  // 3. ADAPTAMOS LA INTERFAZ SEGÚN LA ESTRUCTURA SELECCIONADA
  configurarBotonesSegunEstructura(selectType, false);

  // Ocultamos formulario de creación y mostramos operaciones (Tu lógica original)
  DOM.inic.setAttribute("hidden", "hidden");
  DOM.texto.removeAttribute("hidden");
  DOM.inputNodo.removeAttribute("hidden");
  DOM.str.removeAttribute("hidden");
  DOM.nulo.removeAttribute("hidden");
  DOM.guardarEstructura.removeAttribute("hidden");
  DOM.botonAgregar1erNodo.removeAttribute("hidden");



  if (DOM.inicializador) {
    DOM.inicializador.style.display = "flex";
    DOM.inicializador.style.justifyContent = "space-between";
    DOM.inicializador.style.alignItems = "center";

  }
  DOM.str.style.position = "relative";
  DOM.nulo.style.position = "relative";

  inicializarPuntero(1);

  const necesitaTransicion = 1;
  setTimeout(() => {
    setFlechaInicial(true, necesitaTransicion);
  }, 100);
}






// ... Las funciones setContainer y renderizar quedan EXACTAMENTE IGUALES a como las tenías





// function configurarBotonesSegunEstructura(tipo: string): void {
//   1. Validamos que el DOM esté disponible por las dudas
//   if (!DOM.verificarDOM()) return;

//   2. Reseteamos TODOS tus botones reales a oculto por seguridad antes de decidir cuáles prender
//   DOM.botonAgregar1erNodo?.setAttribute("hidden", "hidden");
//   DOM.agregarComienzo?.setAttribute("hidden", "hidden");
//   DOM.agregarFinal?.setAttribute("hidden", "hidden");
//   DOM.agregarIntermedio?.setAttribute("hidden", "hidden");
  
//   Asumo que estos son los nombres en tu archivo elementosDOM.ts (ajustalos si difieren un poquito)
//   DOM.textoSelector?.setAttribute("hidden", "hidden"); 
//   DOM.selectorPares?.setAttribute("hidden", "hidden");

//   3. Prendemos solo los botones que corresponden a la estructura elegida
//   if (tipo === "linkedlist" || tipo === "doublylinkedlist") {
//     Las listas usan absolutamente todo
//     DOM.botonAgregar1erNodo?.removeAttribute("hidden");
//     DOM.agregarComienzo?.removeAttribute("hidden");
//     DOM.agregarFinal?.removeAttribute("hidden");
//     DOM.agregarIntermedio?.removeAttribute("hidden");
//     DOM.textoSelector?.removeAttribute("hidden");
//     DOM.selectorPares?.removeAttribute("hidden");
//   } 
  
//   else if (tipo === "stack") {
//     REGLA DE LA PILA: Operás solo por un extremo (por ejemplo, el comienzo)
//     DOM.botonAgregar1erNodo?.removeAttribute("hidden"); // Para el primer elemento
//     DOM.agregarComienzo?.removeAttribute("hidden");     // Las inserciones van al comienzo (Top)
    
//     El botón de agregar_final y el intermedio se quedan ocultos
//   } 
  
//   else if (tipo === "queue") {
//     REGLA DE LA COLA: Insertás siempre por el final (Rear)
//     DOM.botonAgregar1erNodo?.removeAttribute("hidden"); // Para el primer elemento
//     DOM.agregarFinal?.removeAttribute("hidden");        // Las inserciones van al final
    
//     El botón de agregar_comienzo y el intermedio se quedan ocultos
//   } 
  
//   else if (tipo === "deque") {
//     REGLA DE LA DOBLE COLA: Podés insertar tanto al comienzo como al final
//     DOM.botonAgregar1erNodo?.removeAttribute("hidden");
//     DOM.agregarComienzo?.removeAttribute("hidden");
//     DOM.agregarFinal?.removeAttribute("hidden");
    
//     El intermedio se queda oculto
//   }
// }

// function configurarBotonesSegunEstructura(tipo: string): void {
//   if (!DOM.verificarDOM()) return;

//   const config = MAPA_CONFIG_ESTRUCTURAS[tipo] || MAPA_CONFIG_ESTRUCTURAS.linkedlist;

//   // 1. Re-etiquetar punteros visuales
//   if (DOM.str) DOM.str.textContent = config.etiquetaHead;
//   if (DOM.nulo) DOM.nulo.textContent = config.etiquetaTail;

//   // 2. Controlar Visibilidad y Etiquetas de Botones de Inserción
//   gestionarBoton(DOM.botonAgregar1erNodo, config.mostrarAgregarPrimerNodo, "Agregar 1er Nodo");
//   gestionarBoton(DOM.agregarComienzo, config.mostrarAgregarComienzo, config.etiquetaAgregarComienzo);
//   gestionarBoton(DOM.agregarFinal, config.mostrarAgregarFinal, config.etiquetaAgregarFinal);
//   gestionarBoton(DOM.agregarIntermedio, config.mostrarAgregarIntermedio, "Agregar Intermedio");

//   // 3. Controlar Visibilidad y Etiquetas de Botones de Borrado (si los tenés en el DOM)
//   gestionarBoton(DOM.borrarComienzo, config.mostrarBorrarComienzo, config.etiquetaBorrarComienzo);
//   gestionarBoton(DOM.borrarFinal, config.mostrarBorrarFinal, config.etiquetaBorrarFinal);


//   // 4. Selectores opcionales para listas
//   if (config.mostrarAgregarIntermedio) {
//     DOM.textoSelector?.removeAttribute("hidden");
//     DOM.selectorPares?.removeAttribute("hidden");
//   } else {
//     DOM.textoSelector?.setAttribute("hidden", "hidden");
//     DOM.selectorPares?.setAttribute("hidden", "hidden");
//   }
// }

export function configurarBotonesSegunEstructura(
  tipo: string,
  tieneNodos: boolean = false
): void {
  if (!DOM.verificarDOM()) return;

  const config = MAPA_CONFIG_ESTRUCTURAS[tipo] || MAPA_CONFIG_ESTRUCTURAS.linkedlist;

  // 1. Re-etiquetar punteros visuales (HEAD/TAIL, TOP/NULL, etc.)
  if (DOM.str) DOM.str.textContent = config.etiquetaHead;
  if (DOM.nulo) DOM.nulo.textContent = config.etiquetaTail;

  if (!tieneNodos) {
    // ESTADO VACÍO (0 Nodos): Solo mostramos el botón inicial verde
    gestionarBoton(DOM.botonAgregar1erNodo, true, "Agregar 1er Nodo");

    gestionarBoton(DOM.agregarComienzo, false, "");
    gestionarBoton(DOM.agregarFinal, false, "");
    gestionarBoton(DOM.agregarIntermedio, false, "");
    gestionarBoton(DOM.borrarComienzo, false, "");
    gestionarBoton(DOM.borrarFinal, false, "");

    DOM.textoSelector?.setAttribute("hidden", "hidden");
    DOM.selectorPares?.setAttribute("hidden", "hidden");
  } else {
    // ESTADO CON NODOS (>= 1 Nodo): Ocultamos botón inicial y mostramos la botonera propia
    gestionarBoton(DOM.botonAgregar1erNodo, false, "");

    gestionarBoton(DOM.agregarComienzo, config.mostrarAgregarComienzo, config.etiquetaAgregarComienzo);
    gestionarBoton(DOM.agregarFinal, config.mostrarAgregarFinal, config.etiquetaAgregarFinal);
    gestionarBoton(DOM.agregarIntermedio, config.mostrarAgregarIntermedio, "Agregar Intermedio");
    gestionarBoton(DOM.borrarComienzo, config.mostrarBorrarComienzo, config.etiquetaBorrarComienzo);
    gestionarBoton(DOM.borrarFinal, config.mostrarBorrarFinal, config.etiquetaBorrarFinal);

    if (config.mostrarAgregarIntermedio) {
      DOM.textoSelector?.removeAttribute("hidden");
      DOM.selectorPares?.removeAttribute("hidden");
    } else {
      DOM.textoSelector?.setAttribute("hidden", "hidden");
      DOM.selectorPares?.setAttribute("hidden", "hidden");
    }
  }
}


// Función auxiliar simple para evitar repetición
function gestionarBoton(
  elemento: HTMLElement | null,
  visible: boolean,
  etiqueta: string
): void {
  if (!elemento) return;

  if (visible) {
    elemento.removeAttribute("hidden");
    elemento.textContent = etiqueta;
  } else {
    elemento.setAttribute("hidden", "hidden");
  }
}







// export function bloquearInterfaz(): void {
//   if (!DOM.verificarDOM()) return;

//   const botones = [
//     DOM.botonAgregar1erNodo,
//     DOM.agregarComienzo,
//     DOM.agregarFinal,
//     DOM.agregarIntermedio,
//     DOM.borrarComienzo,
//     DOM.borrarFinal,
//     DOM.guardarEstructura
//   ];

//   botones.forEach((boton) => {
//     if (boton) boton.disabled = true;
//   });
// }

// // Reactiva los botones respetando el mapa de la estructura activa
// export function liberarInterfaz(): void {
//   if (!DOM.verificarDOM()) return;

//   // 1. Nos aseguramos de sincronizar qué botones van visibles/ocultos según el tipo de estructura
//   if (estructuraActiva) {
//     configurarBotonesSegunEstructura(estructuraActiva.type);
//   }

//   // 2. A todos los botones que NO estén ocultos les quitamos el disabled
//   const botones = [
//     DOM.botonAgregar1erNodo,
//     DOM.agregarComienzo,
//     DOM.agregarFinal,
//     DOM.agregarIntermedio,
//     DOM.borrarComienzo,
//     DOM.borrarFinal,
//     DOM.guardarEstructura
//   ];

//   botones.forEach((boton) => {
//     if (boton) {
//       const estaOculto = boton.hasAttribute("hidden") || boton.style.display === "none";
//       boton.disabled = estaOculto; // Si está visible -> disabled = false. Si está oculto -> disabled = true.
//     }
//   });
// }


export function bloquearInterfaz(): void {
  if (!DOM.verificarDOM()) return;

  const elementos = [
    DOM.botonAgregar1erNodo,
    DOM.agregarComienzo,
    DOM.agregarFinal,
    DOM.agregarIntermedio,
    DOM.borrarComienzo,
    DOM.borrarFinal,
    DOM.guardarEstructura,
    DOM.inputNodo
  ];

  elementos.forEach((el) => {
    if (el) el.disabled = true;
  });
}

export function liberarInterfaz(): void {
  if (!DOM.verificarDOM()) return;

  const elementos = [
    DOM.botonAgregar1erNodo,
    DOM.agregarComienzo,
    DOM.agregarFinal,
    DOM.agregarIntermedio,
    DOM.borrarComienzo,
    DOM.borrarFinal,
    DOM.guardarEstructura,
    DOM.inputNodo
  ];

  elementos.forEach((el) => {
    if (el) el.disabled = false;
  });
}

// export function desocultarBotonesEstructura(): void {
//   if (!DOM.verificarDOM()) return;
//   // Ocultamos el botón de 1er nodo y desocultamos según la estructura activa
//   DOM.botonAgregar1erNodo?.setAttribute("hidden", "hidden");
//   if (estructuraActiva) {
//     configurarBotonesSegunEstructura(estructuraActiva.type);
//   }
// }

// export function ocultarBotonesEstructura(): void {
//   if (!DOM.verificarDOM()) return;
//   // Ocultamos los botones operativos y volvemos a desocultar el del 1er nodo
//   gestionarBoton(DOM.agregarComienzo, false, "");
//   gestionarBoton(DOM.agregarFinal, false, "");
//   gestionarBoton(DOM.agregarIntermedio, false, "");
//   gestionarBoton(DOM.borrarComienzo, false, "");
//   gestionarBoton(DOM.borrarFinal, false, "");

//   gestionarBoton(DOM.botonAgregar1erNodo, true, "Agregar primer nodo");
// }









// function setContainer(): void {
//   if (!DOM.contenedorNodos) return;

//   const x = window.innerWidth;
//   const y = root.style.getPropertyValue('--principal-height');
//   const menorSeisNodos = DOM.contenedorNodos.childElementCount < 6;

//   if (menorSeisNodos) {
//     if (x < 500) {
//       if (y !== '250px') {
//         root.style.setProperty('--principal-width', `1000px`);
//         root.style.setProperty('--principal-height', `250px`);
//       }
//     } else {
//       if (y !== '400px') {
//         root.style.setProperty('--principal-width', `100%`);
//         root.style.setProperty('--principal-height', `400px`);
//       }
//     }
//   }
// }


// function setContainer(): void {
//   if (!DOM.contenedorNodos) return;

//   const cantidadNodos = DOM.contenedorNodos.childElementCount;

//   // El ancho se queda siempre al 100% para congelar el scroll horizontal
//   root.style.setProperty('--principal-width', `100%`);

//   // Si hay 5 nodos o menos, mantenés tu pantalla clásica de 400px
//   if (cantidadNodos <= 5) {
//     root.style.setProperty('--principal-height', `400px`);
//     root.style.setProperty('--wrapper-height', `400px`);
//   } 
//   // Si entra el 6to (y hasta el 10), el lienzo crece al doble hacia abajo
//   else if (cantidadNodos > 5 && cantidadNodos <= 10) {
//     root.style.setProperty('--principal-height', `800px`);
//     root.style.setProperty('--wrapper-height', `800px`);
//   }
// }


// function setContainer(): void {
//   if (!DOM.contenedorNodos) return;

//   const totalNodos = DOM.contenedorNodos.childElementCount;
  
//   // Calculamos cuántas filas de 5 nodos necesitamos (mínimo 1 fila)
//   const filasNecesarias = Math.max(1, Math.ceil(totalNodos / 5)); 
  
//   // Cada fila le añade 400px de altura al lienzo principal
//   const nuevaAltura = filasNecesarias * 400;

//   // Modificamos las variables CSS del root de forma dinámica hacia abajo
//   root.style.setProperty('--principal-width', `100%`); // Siempre 100% del ancho
//   root.style.setProperty('--principal-height', `${nuevaAltura}px`);
  
//   console.log(`Lienzo adaptado: ${filasNecesarias} fila(s). Altura: ${nuevaAltura}px`);
// }



// function setContainer(): void {
//   if (!DOM.contenedorNodos) return;

//   const totalNodos = DOM.contenedorNodos.childElementCount;
  
//   // 1. Calculamos cuántas filas reales ocupan los nodos en base 5
//   const filasReales = Math.ceil(totalNodos / 5); 
  
//   // 2. Establecemos la altura base (400px para la primera fila).
//   // Si hay más de una fila (6 nodos o más), le sumamos 200px por cada fila extra.
//   const nuevaAltura = filasReales <= 1 
//     ? 400 
//     : 400 + (filasReales - 1) * 200;

//   // 3. Modificamos la variable CSS del root de forma dinámica
//   root.style.setProperty('--principal-width', `100%`); 
//   root.style.setProperty('--principal-height', `${nuevaAltura}px`);
  
//   console.log(`Lienzo adaptado: ${filasReales} fila(s). Altura: ${nuevaAltura}px`);
// }
export function desocultarBotonesEstructura(): void {
  const tipo = estructuraActiva?.type || "linkedlist";
  configurarBotonesSegunEstructura(tipo, true); // tieneNodos = true
}

export function ocultarBotonesEstructura(): void {
  const tipo = estructuraActiva?.type || "linkedlist";
  configurarBotonesSegunEstructura(tipo, false); // tieneNodos = false
}


function setContainer(): void {
  // if (!DOM.contenedorNodos) return;

  // const totalNodos = DOM.contenedorNodos.childElementCount;
  // const filasReales = Math.ceil(totalNodos / 5); 
  
  // // Tu matemática exacta de carriles de 200px
  // const nuevaAltura = filasReales <= 1 
  //   ? 400 
  //   : 400 + (filasReales - 1) * 200;

  // // 1. Actualizamos la altura del lienzo principal
  // root.style.setProperty('--principal-height', `${nuevaAltura}px`);
  
  // // 2. ¡CLAVE! Actualizamos también la variable del wrapper para que no asfixie al contenedor
  // root.style.setProperty('--wrapper-height', `${nuevaAltura}px`);
  
  // // Si no usás variable para el wrapper y lo hacías directo por ID, meté esto:
  // // const wrapper = document.getElementById('principal_wrapper');
  // // if (wrapper) wrapper.style.height = `${nuevaAltura}px`;

  // console.log(`Lienzo y Wrapper adaptados a: ${nuevaAltura}px`);
}




function renderizar(): void {
  if (!DOM.verificarDOM()) return;

  if (!DOM.principalWrapper || !DOM.flechaPunteroInicial || !DOM.str || !DOM.contenedorNodos) return;

  const estiloWrapper = DOM.principalWrapper.getAttribute("style");
  
  if (estiloWrapper === null || estiloWrapper === '') {
     setContainer();
    
    let necesitaTransicion = 1;
    if (DOM.flechaPunteroInicial()?.childElementCount !== 0) {
      necesitaTransicion = 0;
    }

    if (DOM.str.getAttribute("hidden") !== "hidden") {
      setFlechaInicial(true, necesitaTransicion);
    }
    
    if (DOM.contenedorNodos.children.length !== 0) {
      setFlechaFinal(true, necesitaTransicion);
      setFlechasNodos(necesitaTransicion,-1,0,0);
    }
  }
}








// function ejecutarAgregarPrimerNodo(): void {
//   const valor = DOM.inputNodo?.value;
//   if (!valor) return;

//   if (estructuraActiva) {
//     if (estructuraActiva instanceof LinkedList) {
//       estructuraActiva.add(valor); // El método add ya maneja si head está vacío
//     } else if (estructuraActiva instanceof Deque) {
//       estructuraActiva.addFront(valor); // O addBack, el que prefieras para el primero
//     }
//     // ... Tu Stack o Queue usarían su método push / enqueue respectivo
//   }
//   console.log(estructuraActiva);
//   // Llama a tu función visual nativa
//   agregarPrimerNodo();
// }


export async function ejecutarAgregarPrimerNodo(): Promise<void> {
  const valor = DOM.inputNodo?.value;
  if (!valor) return;

  bloquearInterfaz();

  // Actualizamos la estructura lógica TS
  if (estructuraActiva) {
    if (estructuraActiva instanceof LinkedList) estructuraActiva.addFirst(valor);
    else if (estructuraActiva instanceof Stack) estructuraActiva.push(valor);
    else if (estructuraActiva instanceof Queue) estructuraActiva.enqueue(valor);
    else if (estructuraActiva instanceof Deque) estructuraActiva.addFront(valor);
  }

  // Cambiamos visibilidad (desocultamos los botones de la estructura)
  desocultarBotonesEstructura();

  // Ejecutamos la animación visual
  await agregarPrimerNodo();

  liberarInterfaz();
}


export async function ejecutarAgregarNodoAlComienzo(): Promise<void> {
  const valor = DOM.inputNodo?.value;
  if (!valor) return;

  bloquearInterfaz();

  if (estructuraActiva) {
    if (estructuraActiva instanceof LinkedList) estructuraActiva.addFirst(valor);
    else if (estructuraActiva instanceof Stack) estructuraActiva.push(valor);
    else if (estructuraActiva instanceof Deque) estructuraActiva.addFront(valor);
  }

  await agregarNodoAlComienzo();
  liberarInterfaz();
}

export async function ejecutarAgregarNodoAlFinal(): Promise<void> {
  const valor = DOM.inputNodo?.value;
  if (!valor) return;

  bloquearInterfaz();

  if (estructuraActiva) {
    if (estructuraActiva instanceof LinkedList) estructuraActiva.addLast(valor);
    else if (estructuraActiva instanceof Queue) estructuraActiva.enqueue(valor);
    else if (estructuraActiva instanceof Deque) estructuraActiva.addBack(valor);
  }

  await agregarNodoAlFinal();
  liberarInterfaz();
}



export async function ejecutarBorrarNodoAlComienzo(): Promise<void> {
  bloquearInterfaz();

  let estaVacia = false;
  if (estructuraActiva) {
    if (estructuraActiva instanceof LinkedList) estructuraActiva.removeFirst();
    else if (estructuraActiva instanceof Stack) estructuraActiva.pop();
    else if (estructuraActiva instanceof Queue) estructuraActiva.dequeue();
    else if (estructuraActiva instanceof Deque) estructuraActiva.removeFront();

    estaVacia = estructuraActiva.nodesCount === 0;
  }

  await borrarNodoAlComienzo();

  if (estaVacia) {
    ocultarBotonesEstructura();
  }

  liberarInterfaz();
}

export async function ejecutarBorrarNodoAlFinal(): Promise<void> {
  bloquearInterfaz();

  let estaVacia = false;
  if (estructuraActiva) {
    if (estructuraActiva instanceof LinkedList) estructuraActiva.removeLast();
    else if (estructuraActiva instanceof Deque) estructuraActiva.removeBack();

    estaVacia = estructuraActiva.nodesCount === 0;
  }

  await borrarNodoAlFinal();

  if (estaVacia) {
    ocultarBotonesEstructura();
  }

  liberarInterfaz();
}


// function ejecutarAgregarNodoAlComienzo(): void {
//   const valor = DOM.inputNodo?.value;
//   if (!valor) return;

//   if (estructuraActiva) {
//     if (estructuraActiva instanceof LinkedList) {
//       estructuraActiva.add(valor); // El método add ya maneja si head está vacío
//     } else if (estructuraActiva instanceof Deque) {
//       estructuraActiva.addFront(valor); // O addBack, el que prefieras para el primero
//     }
//     // ... Tu Stack o Queue usarían su método push / enqueue respectivo
//   }
//   console.log(estructuraActiva);
//   // Llama a tu función visual nativa
//   agregarNodoAlComienzo();
// }




// function ejecutarAgregarNodoAlFinal(): void {
//   const valor = DOM.inputNodo?.value;
//   if (!valor) return;

//   if (estructuraActiva) {
//     if (estructuraActiva instanceof LinkedList) {
//       estructuraActiva.add(valor); // El método add ya maneja si head está vacío
//     } else if (estructuraActiva instanceof Deque) {
//       estructuraActiva.addBack(valor); // O addBack, el que prefieras para el primero
//     }
//     // ... Tu Stack o Queue usarían su método push / enqueue respectivo
//   }
//   console.log(estructuraActiva);
//   // Llama a tu función visual nativa
//   agregarNodoAlFinal();
// }


// async function ejecutarBorrarNodoAlComienzo(): Promise<void> {
//   if (estructuraActiva) {
//     estructuraActiva.remove(); // Actualiza la clase lógica TS (Queue/Deque/LinkedList/Stack)
//   }
//   await borrarNodoAlComienzo(); // Ejecuta tu animación monolítica limpia
// }

// async function ejecutarBorrarNodoAlFinal(): Promise<void> {
//   if (estructuraActiva) {
//     // Si tu estructura es Deque o LinkedList y borra al final:
//     if (typeof (estructuraActiva as any).removeBack === "function") {
//       (estructuraActiva as any).removeBack();
//     } else {
//       estructuraActiva.remove();
//     }
//   }
//   await borrarNodoAlFinal(); // Ejecuta tu animación monolítica limpia
// }



// function ejecutarAgregarNodoIntermedio(): void {
//   const valor = DOM.inputNodo?.value;
//   if (!valor) return;

//   if (estructuraActiva) {
//     if (estructuraActiva instanceof LinkedList) {
//       estructuraActiva.add(valor); // El método add ya maneja si head está vacío
//     } 
//     // ... Tu Stack o Queue usarían su método push / enqueue respectivo
//   }
//   console.log(estructuraActiva);
//   // Llama a tu función visual nativa
//   agregarNodoIntermedio();
// }

// function ejecutarAgregarNodoIntermedio(): void {
//   const valor = DOM.inputNodo?.value;
//   if (!valor) return;

//   if (estructuraActiva) {
//     if (estructuraActiva instanceof LinkedList) {
//       estructuraActiva.insertAt(valor); // El método add ya maneja si head está vacío
//     } 
//     // ... Tu Stack o Queue usarían su método push / enqueue respectivo
//   }
//   console.log(estructuraActiva);
//   // Llama a tu función visual nativa
//   agregarNodoIntermedio();
// }
export async function ejecutarAgregarNodoIntermedio(): Promise<void> {
  const valor = DOM.inputNodo?.value;
  if (!valor) return;

  // 1. Leemos la posición seleccionada en la UI
  const posicion = Number(DOM.selectorPares?.value || 0);

  bloquearInterfaz();

  // 2. Actualizamos la estructura de datos en memoria (Back-end)
  if (estructuraActiva && estructuraActiva instanceof LinkedList) {
    (estructuraActiva as LinkedList<string>).insertAt(posicion, valor);
  }

  // 3. Ejecutamos la animación de la interfaz (Front-end)
  await agregarNodoIntermedio();

  liberarInterfaz();
}

// Importamos el servicio arriba de todo


// Esta función la vinculás al click de un botón "Guardar"
// async function ejecutarGuardarEstructura(): Promise<void> {
//   if (!estructuraActiva) {
//     alert("Primero tenés que inicializar una estructura.");
//     return;
//   }

//   // Extraemos los datos lógicos de tu clase de TS actual
//   const nombre = estructuraActiva.name;
//   const tipo = estructuraActiva.type;
//   const tipoDato = estructuraActiva.dataType;
//   const valores = estructuraActiva.values; // ¡Tu array plano de datos lógicos! (Ej: [10, 20, 30])

//   try {
//     console.log("Enviando datos al backend...");
//     const resultado = await estructuraService.guardar(nombre, tipo, tipoDato, valores);
//     console.log("¡Guardado con éxito en el backend!", resultado);
//     alert("Estructura guardada correctamente.");
//   } catch (error) {
//     alert("No se pudo guardar la estructura.");
//   }
// }

async function ejecutarGuardarEstructura(): Promise<void> {
  if (!estructuraActiva) {
    alert("Primero tenés que inicializar una estructura.");
    return;
  }

  // const nombre = DOM.inputNombre?.value || "Mi Estructura";
  // const tipo = DOM.selectTipo?.value || "linkedlist";
  // const tipoDato = DOM.selectDataType?.value || "number";
     const nombre = estructuraActiva.name;
     const tipo = estructuraActiva.type;
     const tipoDato = estructuraActiva.dataType;

  // 🎯 Obtenemos los valores legibles directo de la pantalla
  const valores = Array.from(document.querySelectorAll(".valor-nodo"))
                       .map(div => div.textContent?.trim() || "");

  try {
    console.log("Enviando datos al backend...", valores);
    const resultado = await estructuraService.guardar(nombre, tipo, tipoDato, valores);
    console.log("¡Guardado con éxito en el backend!", resultado);
    alert("Estructura guardada correctamente.");
  } catch (error) {
    alert("No se pudo guardar la estructura.");
  }
}




// // En tu controlador de Vanilla TS
// export function reiniciarVisualizador(): void {
//   // 1. Destruir nodos y flechas del DOM
//   if (DOM.contenedorNodos) DOM.contenedorNodos.innerHTML = "";
//   if (DOM.contenedorFlechas) DOM.contenedorFlechas.innerHTML = "";
//   if (DOM.contenedorFlechasCurvas) DOM.contenedorFlechasCurvas.innerHTML = "";

//   // 2. Resetear clases y atributos de los contenedores principales
//   if (DOM.str) DOM.str.removeAttribute("style");
//   if (DOM.nulo) DOM.nulo.removeAttribute("style");
//   if (DOM.inicializador) DOM.inicializador.removeAttribute("style");

//   // 3. Resetear modelo lógico en memoria
//   estructuraActiva = null;

//   // 4. Resetear campos de entrada
//   if (DOM.inputNodo) DOM.inputNodo.value = "";
// }

// let cancelAnimacionActual = false;

// export function reiniciarVisualizador(): void {
//   // 1. Marcar cancelación para frenar bucles o pausas activas
//   cancelAnimacionActual = true;

//   // 2. Limpieza absoluta de los contenedores
//   if (DOM.contenedorNodos) DOM.contenedorNodos.innerHTML = "";
//   if (DOM.contenedorFlechas) DOM.contenedorFlechas.innerHTML = "";
//   if (DOM.contenedorFlechasCurvas) DOM.contenedorFlechasCurvas.innerHTML = "";

//   // 3. Resetear estilos aplicados al wrapper principal
//   if (DOM.principalWrapper) DOM.principalWrapper.removeAttribute("style");
//   if (DOM.principal) DOM.principal.removeAttribute("style");

//   // 4. Limpiar la referencia lógica
//   estructuraActiva = null;
// }


// export function reiniciarVisualizador(): void {
//   // 1. Vaciar contenedores de nodos y flechas dinámicas
//   if (DOM.contenedorNodos) DOM.contenedorNodos.innerHTML = "";
//   if (DOM.contenedorFlechas) DOM.contenedorFlechas.innerHTML = "";
//   if (DOM.contenedorFlechasCurvas) DOM.contenedorFlechasCurvas.innerHTML = "";

//   // 2. Resetear las clases y estilos de las flechas de puntero iniciales/finales
//   const inicialUl = DOM.inicialUl();
//   const inicialLs = DOM.inicialLs();
//   const inicialLi = DOM.inicialLi();

//   if (inicialUl) {
//     inicialUl.className = ""; // Limpia todas las clases acumuladas
//     inicialUl.removeAttribute("style");
//   }
//   if (inicialLs) {
//     inicialLs.className = "";
//     inicialLs.removeAttribute("style");
//   }
//   if (inicialLi) {
//     inicialLi.className = "";
//     inicialLi.removeAttribute("style");
//   }

//   // 3. Resetear el puntero StrPtr / TailPtr a su posición de inicio
//   if (DOM.str) DOM.str.removeAttribute("style");
//   if (DOM.nulo) DOM.nulo.removeAttribute("style");

//   // 4. Limpiar modelo en memoria
//   estructuraActiva = null;
// }

// export function reiniciarVisualizador(): void {
//   // 1. Vaciar contenedores dinámicos de nodos y flechas
//   if (DOM.contenedorNodos) DOM.contenedorNodos.innerHTML = "";
//   if (DOM.contenedorFlechas) DOM.contenedorFlechas.innerHTML = "";
//   if (DOM.contenedorFlechasCurvas) DOM.contenedorFlechasCurvas.innerHTML = "";

//   // 2. Limpiar estilos inline y clases de los punteros iniciales/finales
//   // (Ajustá las referencias según las funciones que uses en tu DOM helper)
//   const elementosPunteros = [
//     DOM.str,
//     DOM.nulo,
//     DOM.inicializador,
//     DOM.inicialUl?.(),
//     DOM.inicialLs?.(),
//     DOM.inicialLi?.()
//   ];

//   elementosPunteros.forEach((el) => {
//     if (el) {
//       el.removeAttribute("style"); // Elimina tops/lefts calculados
//       el.className = "";            // Remueve clases de animación previas
//     }
//   });

//   // 3. Resetear el modelo lógico global
//   estructuraActiva = null;

//   // 4. Volver a llamar a tu inicializador base de UI (si existe)
//   // Esto restablece la flecha inicial al estado "lista vacía" original
//   if (typeof inicializar === "function") {
//     inicializar();
//   }
// }


// export function hardResetPunterosYFlechas() {
//   // 1. Limpiar variables de estado global que recuerden posiciones viejas
//   // (Ajustá los nombres según tus variables globales reales)
//   // ej: posicionesCache = {}; 
//   // ej: listaFlechas = [];

//   // 2. Seleccionar todos los elementos de punteros e inicializadores
//   // Si usás IDs o Clases específicas, agregalas acá:
//   const elementosAClarear = document.querySelectorAll(
//     '#str, #nulo, #inicializador, .puntero-head, .puntero-tail, .puntero-top, .flecha-inicial, .flecha-puntero, [id*="puntero"], [id*="flecha"]'
//   );

//   elementosAClarear.forEach((el) => {
//     const htmlEl = el as HTMLElement;
//     // Remueve todos los estilos inline (top, left, transform, width, height, position, etc.)
//     htmlEl.removeAttribute("style");
//     // Remueve clases de animación/posicionamiento que se hayan agregado
//     htmlEl.className = htmlEl.className
//       .split(" ")
//       .filter((c) => !c.includes("anim") && !c.includes("posic"))
//       .join(" ");
//   });

//   // 3. Limpiar contenedores de SVG o canvas de flechas si existen
//   const contenedorFlechas = document.getElementById("contenedor-flechas"); // Cambiá por tu ID real
//   if (contenedorFlechas) {
//     contenedorFlechas.innerHTML = "";
//   }
// }



// export function reiniciarVisualizador() {
//   // 1. Limpiar contenedores dinámicos de flechas
//   const contFlechas = document.getElementById("contenedor_flechas");
//   if (contFlechas) contFlechas.innerHTML = "";

//   const contFlechasCurvas = document.getElementById("contenedor_flechas_curvas");
//   if (contFlechasCurvas) contFlechasCurvas.innerHTML = "";

//   // 2. Limpiar el contenedor principal de nodos
//   const canvas = document.getElementById("canvas") || document.getElementById("lienzo");
//   if (canvas) canvas.innerHTML = "";

//   // 3. RESTAURAR EL CONTENEDOR INICIALIZADOR A SU ESTADO VIRGEN EXACTO
//   const inicializador = document.getElementById("inicializador");
//   if (inicializador) {
//     // Restablecer estilos inline del contenedor principal
//     inicializador.setAttribute(
//       "style",
//       "display: flex; justify-content: space-between; align-items: center;"
//     );

//     // Inyectar el HTML limpio exacto de la imagen
//     inicializador.innerHTML = `
//       <div id="str" style="position: relative;">StrPtr</div>
//       <div class="arrow" id="flecha_puntero_inicial" style="height: 0px;">
//         <div class="underline cambio_top flecha_puntero_lista-vacia"></div>
//         <div class="linea-s"></div>
//         <div class="linea-i"></div>
//       </div>
//       <div id="flecha_puntero_previo"></div>
//       <div id="flecha_puntero_actual"></div>
//       <div id="flecha_puntero_nuevo"></div>
//       <div id="flecha_puntero_final"></div>
//       <div id="nulo" style="position: relative;">NULL</div>
//     `;
//   }

//   // 4. Resetear cualquier variable global de TS/JS que recuerde referencias a elementos viejos
//   // (Si tenés arreglos globales como 'nodos = []', 'flechas = []', resetealos acá)
// }


// export function reiniciarVisualizador(): void {
//   DOM.actualizarElementosDOM();

//   // 1. Limpiar los contenedores SVG / HTML de flechas dinámicas y nodos
//   if (DOM.contenedorFlechas) DOM.contenedorFlechas.innerHTML = "";
//   if (DOM.contenedorFlechasCurvas) DOM.contenedorFlechasCurvas.innerHTML = "";
//   if (DOM.contenedorNodos) DOM.contenedorNodos.innerHTML = "";

//   // Helper local para vaciar elementos de forma segura (soporta getters o funciones)
//   const vaciarElemento = (el: HTMLElement | (() => HTMLElement | null) | null) => {
//     const nodo = typeof el === "function" ? el() : el;
//     if (nodo) nodo.innerHTML = "";
//   };

//   // 2. Limpiar las flechas del contenedor inicializador
//   vaciarElemento(DOM.flechaPunteroInicial);
//   vaciarElemento(DOM.flechaPunteroFinal);
//   vaciarElemento(DOM.flechaPunteroPrevio);
//   vaciarElemento(DOM.flechaPunteroActual);
//   vaciarElemento(DOM.flechaPunteroNuevo);

//   // 3. Resetear banderas globales de TypeScript
//   window.banderaFlechaInicial = 0;
//   window.banderaFlechaFinal = 0;
//   window.banderaFlecha = 0;

//   // 4. Volver la UI al Estado 0 (Contenedor Vacío / Formulario visible)
//   if (DOM.inic) DOM.inic.removeAttribute("hidden");
  
//   DOM.texto?.setAttribute("hidden", "hidden");
//   DOM.inputNodo?.setAttribute("hidden", "hidden");
//   DOM.str?.setAttribute("hidden", "hidden");
//   DOM.nulo?.setAttribute("hidden", "hidden");
//   DOM.guardarEstructura?.setAttribute("hidden", "hidden");
//   DOM.botonAgregar1erNodo?.setAttribute("hidden", "hidden");
//   DOM.agregarComienzo?.setAttribute("hidden", "hidden");
//   DOM.agregarFinal?.setAttribute("hidden", "hidden");
//   DOM.agregarIntermedio?.setAttribute("hidden", "hidden");
//   DOM.borrarComienzo?.setAttribute("hidden", "hidden");
//   DOM.borrarFinal?.setAttribute("hidden", "hidden");
//   DOM.textoSelector?.setAttribute("hidden", "hidden");
//   DOM.selectorPares?.setAttribute("hidden", "hidden");

//   // 5. Reiniciar estilos del contenedor inicializador
//   if (DOM.inicializador) {
//     DOM.inicializador.style.display = "flex";
//     DOM.inicializador.style.justifyContent = "space-between";
//     DOM.inicializador.style.alignItems = "center";
//   }

//   // Desvincular instancia lógica anterior
//   estructuraActiva = null;
// }



export { renderizar };