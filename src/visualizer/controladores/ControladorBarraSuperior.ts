
// // src/visualizer/controladores/ControladorBarraSuperior.ts
// import { 
//   agregarNodoAlComienzo, 
//   agregarNodoIntermedio, 
//   agregarNodoAlFinal, 
//   agregarPrimerNodo 
// } from "./RenderAgregarNuevoNodo.ts";
// import { inicializarPuntero, setFlechaInicial, setFlechaFinal } from "./ControladorInicializador.ts";
// import * as DOM from "../elementosDOM.ts";
// import { setFlechasNodos  } from "./RenderFlechasNodos.ts";

// const root = document.documentElement;

// declare global {
//   interface Window {
//     banderaFlechaInicial: number;
//     banderaFlechaFinal: number;
//     banderaFlecha: number;
//   }
// }

// window.banderaFlechaInicial = 0;
// window.banderaFlechaFinal = 0;
// window.banderaFlecha = 0;

// /**
//  * Función que despierta el controlador una vez que React montó los elementos.
//  */
// export function initControladorBarraSuperior(): void {
//   // 1. Primero forzamos la captura de elementos reales del DOM
//   DOM.actualizarElementosDOM();

//   // 2. Validamos que todo se haya cargado bien
//   if (!DOM.verificarDOM()) {
//     console.error("No se pudo inicializar la barra superior: Elementos del DOM ausentes.");
//     return;
//   }

//   // 3. Asignamos listeners con nombres normales directos sin funciones intermedias
//   DOM.inic.addEventListener("click", inicializar);
//   DOM.botonAgregar1erNodo.addEventListener("click", agregarPrimerNodo);
//   DOM.agregarComienzo.addEventListener("click", agregarNodoAlComienzo);
//   DOM.agregarIntermedio.addEventListener("click", agregarNodoIntermedio);
//   DOM.agregarFinal.addEventListener("click", agregarNodoAlFinal);
  
//   window.addEventListener("resize", renderizar);
//   console.log("✅ ControladorBarraSuperior asignado correctamente.");
// }

// function inicializar(): void {
//   if (!DOM.verificarDOM()) return;

//   console.log("¡Entró a inicializar con éxito!");

//   // Remoción física usando variables planas
//   if (DOM.inic && DOM.barraSuperior) {
//     DOM.barraSuperior.removeChild(DOM.inic);
//   }

//   // Modificación de estados con nombres limpios
//   DOM.inic.setAttribute("hidden", "hidden");
//   DOM.texto.removeAttribute("hidden");
//   DOM.inputNodo.removeAttribute("hidden");
//   DOM.botonAgregar1erNodo.removeAttribute("hidden");
//   DOM.str.removeAttribute("hidden");
//   DOM.nulo.removeAttribute("hidden");

//   inicializarPuntero(1);

//   const necesitaTransicion = 1;
//   setTimeout(() => {
//     setFlechaInicial(true, necesitaTransicion);
//   }, 100);
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

// function renderizar(): void {
//   if (!DOM.verificarDOM()) return;

//   if (!DOM.principalWrapper || !DOM.flechaPunteroInicial || !DOM.str || !DOM.contenedorNodos) return;

//   const estiloWrapper = DOM.principalWrapper.getAttribute("style");
  
//   if (estiloWrapper === null || estiloWrapper === '') {
//     setContainer();
    
//     let necesitaTransicion = 1;
//     if (DOM.flechaPunteroInicial()?.childElementCount !== 0) {
//       necesitaTransicion = 0;
//     }

//     if (DOM.str.getAttribute("hidden") !== "hidden") {
//       setFlechaInicial(true, necesitaTransicion);
//     }
    
//     if (DOM.contenedorNodos.children.length !== 0) {
//       setFlechaFinal(true, necesitaTransicion);
//       setFlechasNodos(necesitaTransicion,-1,0,0);
//     }
//   }
// }

// export { renderizar };




import { 
  agregarNodoAlComienzo, 
  agregarNodoIntermedio, 
  agregarNodoAlFinal, 
  agregarPrimerNodo 
} from "./RenderAgregarNuevoNodo.ts";
import { inicializarPuntero, setFlechaInicial, setFlechaFinal } from "./ControladorInicializador.ts";
import * as DOM from "../elementosDOM.ts";
import { setFlechasNodos } from "./RenderFlechasNodos.ts";


// 📦 IMPORTAMOS TUS CLASES DEL CORE
import { BaseStructure } from "../../structures/BaseStructure.ts";
import { LinkedList } from "../../structures/LinkedList.ts";
import { Deque } from "../../structures/Deque.ts";
import { Stack } from "../../structures/Stack.ts"; // Asumo que se llama así
import { Queue } from "../../structures/Queue.ts"; // Asumo que se llama así



import { estructuraService } from "../../services/estructuraService.ts";

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
  
  // Vincular los tres botones genéricos que pusimos en ControlsBar.js
  // const btnAccion1 = document.getElementById("btn_accion_1");
  // const btnAccion2 = document.getElementById("btn_accion_2");
  // const btnAccion3 = document.getElementById("btn_accion_3");
  // const btnIntermedio = document.getElementById("btn_accion_intermedia");

  // Mapeamos los clicks a tus funciones de Render existentes


  
  // DOM.botonAgregar1erNodo?.addEventListener("click", agregarPrimerNodo); 
  // DOM.agregarComienzo?.addEventListener("click", agregarNodoAlComienzo);
  // DOM.agregarFinal?.addEventListener("click", agregarNodoAlFinal);
  // DOM.agregarIntermedio?.addEventListener("click", agregarNodoIntermedio);
  

  DOM.botonAgregar1erNodo?.addEventListener("click", ejecutarAgregarPrimerNodo); 
  DOM.agregarComienzo?.addEventListener("click", ejecutarAgregarNodoAlComienzo);
  DOM.agregarFinal?.addEventListener("click", ejecutarAgregarNodoAlFinal);
  DOM.agregarIntermedio?.addEventListener("click", ejecutarAgregarNodoIntermedio);


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
  configurarBotonesSegunEstructura(selectType);

  // Ocultamos formulario de creación y mostramos operaciones (Tu lógica original)
  DOM.inic.setAttribute("hidden", "hidden");
  DOM.texto.removeAttribute("hidden");
  DOM.inputNodo.removeAttribute("hidden");
  DOM.str.removeAttribute("hidden");
  DOM.nulo.removeAttribute("hidden");
  DOM.guardarEstructura.removeAttribute("hidden");

  inicializarPuntero(1);

  const necesitaTransicion = 1;
  setTimeout(() => {
    setFlechaInicial(true, necesitaTransicion);
  }, 100);
}

/**
 * Función encargada de prender, apagar y renombrar los botones genéricos
 * según las reglas de juego de cada estructura de datos.
 */
// function configurarBotonesSegunEstructura(tipo: string): void {
//   const btn1 = document.getElementById("btn_accion_1");
//   const btn2 = document.getElementById("btn_accion_2");
//   const btn3 = document.getElementById("btn_accion_3");
//   const txtSelector = document.getElementById("texto-selector");
//   const selPares = document.getElementById("selector-pares");
//   const btnIntermedio = document.getElementById("btn_accion_intermedia");

//   // Reseteamos todos a oculto por seguridad
//   [btn1, btn2, btn3, txtSelector, selPares, btnIntermedio].forEach(el => el?.setAttribute("hidden", "hidden"));

//   if (tipo === "linkedlist" || tipo === "doublylinkedlist") {
//     // Las listas tienen libertad total
//     if (btn1) { btn1.innerText = "Agregar Primer Nodo"; btn1.removeAttribute("hidden"); }
//     if (btn2) { btn2.innerText = "Agregar al Comienzo"; btn2.removeAttribute("hidden"); }
//     if (btn3) { btn3.innerText = "Agregar al Final"; btn3.removeAttribute("hidden"); }
//     txtSelector?.removeAttribute("hidden");
//     selPares?.removeAttribute("hidden");
//     btnIntermedio?.removeAttribute("hidden");
//     if (btnIntermedio) btnIntermedio.innerText = "Agregar Intermedio";

//   } else if (tipo === "stack") {
//     // Las Pilas solo permiten Push (Agregar al final de la pantalla gráfica)
//     if (btn1) { btn1.innerText = "Push (Agregar)"; btn1.removeAttribute("hidden"); }
//     // Nota: El botón de Pop (Sacar) lo vas a mapear después con tu RenderSacarNodo

//   } else if (tipo === "queue") {
//     // Las Colas solo permiten Enqueue (Agregar al final de la pantalla gráfica)
//     if (btn1) { btn1.innerText = "Enqueue (Agregar)"; btn1.removeAttribute("hidden"); }

//   } else if (tipo === "deque") {
//     // Doble cola permite insertar en ambas puntas
//     if (btn1) { btn1.innerText = "Add Front (Comienzo)"; btn1.removeAttribute("hidden"); }
//     if (btn2) { btn2.innerText = "Add Back (Final)"; btn2.removeAttribute("hidden"); }
//   }
// }

// ... Las funciones setContainer y renderizar quedan EXACTAMENTE IGUALES a como las tenías


function configurarBotonesSegunEstructura(tipo: string): void {
  // 1. Validamos que el DOM esté disponible por las dudas
  if (!DOM.verificarDOM()) return;

  // 2. Reseteamos TODOS tus botones reales a oculto por seguridad antes de decidir cuáles prender
  DOM.botonAgregar1erNodo?.setAttribute("hidden", "hidden");
  DOM.agregarComienzo?.setAttribute("hidden", "hidden");
  DOM.agregarFinal?.setAttribute("hidden", "hidden");
  DOM.agregarIntermedio?.setAttribute("hidden", "hidden");
  
  // Asumo que estos son los nombres en tu archivo elementosDOM.ts (ajustalos si difieren un poquito)
  DOM.textoSelector?.setAttribute("hidden", "hidden"); 
  DOM.selectorPares?.setAttribute("hidden", "hidden");

  // 3. Prendemos solo los botones que corresponden a la estructura elegida
  if (tipo === "linkedlist" || tipo === "doublylinkedlist") {
    // Las listas usan absolutamente todo
    DOM.botonAgregar1erNodo?.removeAttribute("hidden");
    DOM.agregarComienzo?.removeAttribute("hidden");
    DOM.agregarFinal?.removeAttribute("hidden");
    DOM.agregarIntermedio?.removeAttribute("hidden");
    DOM.textoSelector?.removeAttribute("hidden");
    DOM.selectorPares?.removeAttribute("hidden");
  } 
  
  else if (tipo === "stack") {
    // REGLA DE LA PILA: Operás solo por un extremo (por ejemplo, el comienzo)
    DOM.botonAgregar1erNodo?.removeAttribute("hidden"); // Para el primer elemento
    DOM.agregarComienzo?.removeAttribute("hidden");     // Las inserciones van al comienzo (Top)
    
    // El botón de agregar_final y el intermedio se quedan ocultos
  } 
  
  else if (tipo === "queue") {
    // REGLA DE LA COLA: Insertás siempre por el final (Rear)
    DOM.botonAgregar1erNodo?.removeAttribute("hidden"); // Para el primer elemento
    DOM.agregarFinal?.removeAttribute("hidden");        // Las inserciones van al final
    
    // El botón de agregar_comienzo y el intermedio se quedan ocultos
  } 
  
  else if (tipo === "deque") {
    // REGLA DE LA DOBLE COLA: Podés insertar tanto al comienzo como al final
    DOM.botonAgregar1erNodo?.removeAttribute("hidden");
    DOM.agregarComienzo?.removeAttribute("hidden");
    DOM.agregarFinal?.removeAttribute("hidden");
    
    // El intermedio se queda oculto
  }
}

function setContainer(): void {
  if (!DOM.contenedorNodos) return;

  const x = window.innerWidth;
  const y = root.style.getPropertyValue('--principal-height');
  const menorSeisNodos = DOM.contenedorNodos.childElementCount < 6;

  if (menorSeisNodos) {
    if (x < 500) {
      if (y !== '250px') {
        root.style.setProperty('--principal-width', `1000px`);
        root.style.setProperty('--principal-height', `250px`);
      }
    } else {
      if (y !== '400px') {
        root.style.setProperty('--principal-width', `100%`);
        root.style.setProperty('--principal-height', `400px`);
      }
    }
  }
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










function ejecutarAgregarPrimerNodo(): void {
  const valor = DOM.inputNodo?.value;
  if (!valor) return;

  if (estructuraActiva) {
    if (estructuraActiva instanceof LinkedList) {
      estructuraActiva.add(valor); // El método add ya maneja si head está vacío
    } else if (estructuraActiva instanceof Deque) {
      estructuraActiva.addFront(valor); // O addBack, el que prefieras para el primero
    }
    // ... Tu Stack o Queue usarían su método push / enqueue respectivo
  }
  console.log(estructuraActiva);
  // Llama a tu función visual nativa
  agregarPrimerNodo();
}

function ejecutarAgregarNodoAlComienzo(): void {
  const valor = DOM.inputNodo?.value;
  if (!valor) return;

  if (estructuraActiva) {
    if (estructuraActiva instanceof LinkedList) {
      estructuraActiva.add(valor); // El método add ya maneja si head está vacío
    } else if (estructuraActiva instanceof Deque) {
      estructuraActiva.addFront(valor); // O addBack, el que prefieras para el primero
    }
    // ... Tu Stack o Queue usarían su método push / enqueue respectivo
  }
  console.log(estructuraActiva);
  // Llama a tu función visual nativa
  agregarNodoAlComienzo();
}

function ejecutarAgregarNodoIntermedio(): void {
  const valor = DOM.inputNodo?.value;
  if (!valor) return;

  if (estructuraActiva) {
    if (estructuraActiva instanceof LinkedList) {
      estructuraActiva.add(valor); // El método add ya maneja si head está vacío
    } 
    // ... Tu Stack o Queue usarían su método push / enqueue respectivo
  }
  console.log(estructuraActiva);
  // Llama a tu función visual nativa
  agregarNodoIntermedio();
}


function ejecutarAgregarNodoAlFinal(): void {
  const valor = DOM.inputNodo?.value;
  if (!valor) return;

  if (estructuraActiva) {
    if (estructuraActiva instanceof LinkedList) {
      estructuraActiva.add(valor); // El método add ya maneja si head está vacío
    } else if (estructuraActiva instanceof Deque) {
      estructuraActiva.addBack(valor); // O addBack, el que prefieras para el primero
    }
    // ... Tu Stack o Queue usarían su método push / enqueue respectivo
  }
  console.log(estructuraActiva);
  // Llama a tu función visual nativa
  agregarNodoAlFinal();
}




// Importamos el servicio arriba de todo


// Esta función la vinculás al click de un botón "Guardar"
async function ejecutarGuardarEstructura(): Promise<void> {
  if (!estructuraActiva) {
    alert("Primero tenés que inicializar una estructura.");
    return;
  }

  // Extraemos los datos lógicos de tu clase de TS actual
  const nombre = estructuraActiva.name;
  const tipo = estructuraActiva.type;
  const tipoDato = estructuraActiva.dataType;
  const valores = estructuraActiva.values; // ¡Tu array plano de datos lógicos! (Ej: [10, 20, 30])

  try {
    console.log("Enviando datos al backend...");
    const resultado = await estructuraService.guardar(nombre, tipo, tipoDato, valores);
    console.log("¡Guardado con éxito en el backend!", resultado);
    alert("Estructura guardada correctamente.");
  } catch (error) {
    alert("No se pudo guardar la estructura.");
  }
}






export { renderizar };