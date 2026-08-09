

import { 
  agregarNodoAlComienzo, 
  agregarNodoIntermedio, 
  agregarNodoAlFinal, 
  agregarPrimerNodo 
} from "./RenderAgregarNuevoNodo.ts";
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