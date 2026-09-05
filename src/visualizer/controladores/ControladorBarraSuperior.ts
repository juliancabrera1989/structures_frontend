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
    etiquetaAgregarComienzo: "Add at start",
    mostrarAgregarFinal: true,
    etiquetaAgregarFinal: "Add at end",
    mostrarAgregarIntermedio: true,
    mostrarBorrarComienzo: true,
    etiquetaBorrarComienzo: "Delete from start",
    mostrarBorrarFinal: true,
    etiquetaBorrarFinal: "Delete from end",
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
    etiquetaAgregarFinal: "Enqueue",
    mostrarAgregarIntermedio: false,
    mostrarBorrarComienzo: true,
    etiquetaBorrarComienzo: "Dequeue",
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
export let estructuraActiva: BaseStructure<any> | null = null;

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

// function inicializar(): void {
//   if (!DOM.verificarDOM()) return;

//   // 1. CAPTURAMOS LOS DATOS DEL FORMULARIO USANDO EL DOM
//   const inputName = (document.getElementById("structure_name") as HTMLInputElement)?.value || "Estructura sin nombre";
//   const selectType = (document.getElementById("structure_type") as HTMLSelectElement)?.value;
//   const selectDataType = (document.getElementById("data_type") as HTMLSelectElement)?.value;

//   console.log(`Inicializando: ${inputName} de tipo ${selectType}`);

//   // 2. POLIMORFISMO: Instanciamos tu clase lógica de TS correspondiente
//   if (selectType === "linkedlist") {
//     estructuraActiva = new LinkedList<any>(inputName, selectDataType);
//   } else if (selectType === "deque") {
//     estructuraActiva = new Deque<any>(inputName, selectDataType);
//   } else if (selectType === "stack") {
//     estructuraActiva = new Stack<any>(inputName, selectDataType);
//   } else if (selectType === "queue") {
//     estructuraActiva = new Queue<any>(inputName, selectDataType);
//   }

//   // 3. ADAPTAMOS LA INTERFAZ SEGÚN LA ESTRUCTURA SELECCIONADA
//   configurarBotonesSegunEstructura(selectType, false);

//   // Ocultamos formulario de creación y mostramos operaciones (Tu lógica original)
//   DOM.inic.setAttribute("hidden", "hidden");
//   DOM.texto.removeAttribute("hidden");
//   DOM.inputNodo.removeAttribute("hidden");
//   DOM.str.removeAttribute("hidden");
//   DOM.nulo.removeAttribute("hidden");
//   DOM.guardarEstructura.removeAttribute("hidden");
//   DOM.botonAgregar1erNodo.removeAttribute("hidden");



//   if (DOM.inicializador) {
//     DOM.inicializador.style.display = "flex";
//     DOM.inicializador.style.justifyContent = "space-between";
//     DOM.inicializador.style.alignItems = "center";

//   }
//   DOM.str.style.position = "relative";
//   DOM.nulo.style.position = "relative";

//   inicializarPuntero(1);

//   const necesitaTransicion = 1;
//   setTimeout(() => {
//     setFlechaInicial(true, necesitaTransicion);
//   }, 100);
// }

function inicializar(): void {
  if (!DOM.verificarDOM()) return;

  // 1. CAPTURAMOS ELEMENTOS DESDE EL DOM
  const inputNameEl = document.getElementById("structure_name") as HTMLInputElement;
  const selectTypeEl = document.getElementById("structure_type") as HTMLSelectElement;
  const selectDataTypeEl = document.getElementById("data_type") as HTMLSelectElement;

  const inputName = inputNameEl?.value.trim() || "Estructura sin nombre";
  const selectType = selectTypeEl?.value;
  const selectDataType = selectDataTypeEl?.value;

  console.log(`Inicializando: ${inputName} de tipo ${selectType}`);

  // 2. INSTANCIAMOS LA ESTRUCTURA
  if (selectType === "linkedlist") {
    estructuraActiva = new LinkedList<any>(inputName, selectDataType);
  } else if (selectType === "deque") {
    estructuraActiva = new Deque<any>(inputName, selectDataType);
  } else if (selectType === "stack") {
    estructuraActiva = new Stack<any>(inputName, selectDataType);
  } else if (selectType === "queue") {
    estructuraActiva = new Queue<any>(inputName, selectDataType);
  }

  // 3. DESHABILITAMOS LOS CAMPOS Y EL BOTÓN
  if (inputNameEl) inputNameEl.disabled = true;
  if (selectTypeEl) selectTypeEl.disabled = true;
  if (selectDataTypeEl) selectDataTypeEl.disabled = true;

  // Si tenés el botón guardado en DOM (ej. DOM.botonCrear), deshabilitar también:
  const btnCrear = document.getElementById("create_button") as HTMLButtonElement;
  if (btnCrear) btnCrear.disabled = true;

  // 4. ADAPTAMOS LA INTERFAZ
  configurarBotonesSegunEstructura(selectType, false);

  // NOTA: Si DOM.inic contiene a los inputs y le ponés "hidden", los oculta por completo.
  // Si querés que SE VEAN pero DESHABILITADOS, no le pongas hidden a DOM.inic.
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

// export function configurarBotonesSegunEstructura(
//   tipo: string,
//   tieneNodos: boolean = false
// ): void {
//   if (!DOM.verificarDOM()) return;

//   const config = MAPA_CONFIG_ESTRUCTURAS[tipo] || MAPA_CONFIG_ESTRUCTURAS.linkedlist;

//   // 1. Re-etiquetar punteros visuales (HEAD/TAIL, TOP/NULL, etc.)
//   if (DOM.str) DOM.str.textContent = config.etiquetaHead;
//   if (DOM.nulo) DOM.nulo.textContent = config.etiquetaTail;

//   if (!tieneNodos) {
//     // ESTADO VACÍO (0 Nodos): Solo mostramos el botón inicial verde
//     gestionarBoton(DOM.botonAgregar1erNodo, true, "Add first node");

//     gestionarBoton(DOM.agregarComienzo, false, "");
//     gestionarBoton(DOM.agregarFinal, false, "");
//     gestionarBoton(DOM.agregarIntermedio, false, "");
//     gestionarBoton(DOM.borrarComienzo, false, "");
//     gestionarBoton(DOM.borrarFinal, false, "");

//     DOM.textoSelector?.setAttribute("hidden", "hidden");
//     DOM.selectorPares?.setAttribute("hidden", "hidden");
//   } else {
//     // ESTADO CON NODOS (>= 1 Nodo): Ocultamos botón inicial y mostramos la botonera propia
//     gestionarBoton(DOM.botonAgregar1erNodo, false, "");

//     gestionarBoton(DOM.agregarComienzo, config.mostrarAgregarComienzo, config.etiquetaAgregarComienzo);
//     gestionarBoton(DOM.agregarFinal, config.mostrarAgregarFinal, config.etiquetaAgregarFinal);
//     gestionarBoton(DOM.agregarIntermedio, config.mostrarAgregarIntermedio, "Agregar Intermedio");
//     gestionarBoton(DOM.borrarComienzo, config.mostrarBorrarComienzo, config.etiquetaBorrarComienzo);
//     gestionarBoton(DOM.borrarFinal, config.mostrarBorrarFinal, config.etiquetaBorrarFinal);

//     if (config.mostrarAgregarIntermedio) {
//       DOM.textoSelector?.removeAttribute("hidden");
//       DOM.selectorPares?.removeAttribute("hidden");
//     } else {
//       DOM.textoSelector?.setAttribute("hidden", "hidden");
//       DOM.selectorPares?.setAttribute("hidden", "hidden");
//     }
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
    gestionarBoton(DOM.botonAgregar1erNodo, true, "Add first node");

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





function validarYFormatearValor(valor: string, tipoDato: string): string | null {
  const v = valor.trim();
  if (!v) return null;

  if (tipoDato === "number") {
    if (isNaN(Number(v))) {
      alert("Error: This structure only accepts numbers.");
      return null;
    }
    return v;
  }

  if (tipoDato === "letter") {
    // Valida que sea exactamente un carácter y que sea una letra
    if (v.length !== 1 || !/^[a-zA-Z]$/.test(v)) {
      alert("Error: This structures only accepts one letter (A-Z).");
      return null;
    }
    return v;
  }

  // Si es 'string' o cualquier otro tipo, pasa directo
  return v;
}



// 1. Helper para comprobar duplicados en el DOM real
function esValorDuplicado(nuevoValor: string): boolean {
  const nodosExistentes = Array.from(DOM.contenedorNodos.children) as HTMLElement[];
  
  return nodosExistentes.some((nodo) => {
    // Buscamos el texto interno del nodo (se omite la etiqueta del puntero si la hay)
    const textoNodo = nodo.querySelector(".valor-nodo")?.textContent?.trim() || nodo.textContent?.trim();
    return textoNodo === nuevoValor;
  });
}

export async function ejecutarAgregarPrimerNodo(): Promise<void> {
  const rawValor = DOM.inputNodo?.value;
  if (!rawValor) return;

  
  const tipoDato = estructuraActiva?.dataType || "string";
  
  // Validamos según la regla configurada
  const valorFormateado = validarYFormatearValor(rawValor, tipoDato);
  if (!valorFormateado) return; // Corta si el formato es inválido

  // Paso 2: Validar que NO esté duplicado
  if (esValorDuplicado(valorFormateado)) {
    alert(`Error: Value "${valorFormateado}" already exists on this structure.`);
    return; // Corta si el valor está repetido
  }

  bloquearInterfaz();

  // Actualizamos la estructura lógica TS
  if (estructuraActiva) {
    if (estructuraActiva instanceof LinkedList) estructuraActiva.addFirst(valorFormateado);
    else if (estructuraActiva instanceof Stack) estructuraActiva.push(valorFormateado);
    else if (estructuraActiva instanceof Queue) estructuraActiva.enqueue(valorFormateado);
    else if (estructuraActiva instanceof Deque) estructuraActiva.addFront(valorFormateado);
  }

  // Cambiamos visibilidad (desocultamos los botones de la estructura)
  desocultarBotonesEstructura();

  // Ejecutamos la animación visual
  await agregarPrimerNodo();

  liberarInterfaz();
}


export async function ejecutarAgregarNodoAlComienzo(): Promise<void> {
  const rawValor = DOM.inputNodo?.value;
  if (!rawValor) return;

  
  const tipoDato = estructuraActiva?.dataType || "string";
  
  // Validamos según la regla configurada
  const valorFormateado = validarYFormatearValor(rawValor, tipoDato);
  if (!valorFormateado) return; // Corta si el formato es inválido

  // Paso 2: Validar que NO esté duplicado
  if (esValorDuplicado(valorFormateado)) {
    alert(`Error: Value "${valorFormateado}" already exists on this structure.`);
    return; // Corta si el valor está repetido
  }
  
  bloquearInterfaz();

  if (estructuraActiva) {
    if (estructuraActiva instanceof LinkedList) estructuraActiva.addFirst(valorFormateado);
    else if (estructuraActiva instanceof Stack) estructuraActiva.push(valorFormateado);
    else if (estructuraActiva instanceof Deque) estructuraActiva.addFront(valorFormateado);
  }

  await agregarNodoAlComienzo();
  liberarInterfaz();
}

export async function ejecutarAgregarNodoAlFinal(): Promise<void> {
  const rawValor = DOM.inputNodo?.value;
  if (!rawValor) return;

  
  const tipoDato = estructuraActiva?.dataType || "string";
  
  // Validamos según la regla configurada
  const valorFormateado = validarYFormatearValor(rawValor, tipoDato);
  if (!valorFormateado) return; // Corta si el formato es inválido

  // Paso 2: Validar que NO esté duplicado
  if (esValorDuplicado(valorFormateado)) {
    alert(`Error: Value "${valorFormateado}" already exists on this structure.`);
    return; // Corta si el valor está repetido
  }
  bloquearInterfaz();

  if (estructuraActiva) {
    if (estructuraActiva instanceof LinkedList) estructuraActiva.addLast(valorFormateado);
    else if (estructuraActiva instanceof Queue) estructuraActiva.enqueue(valorFormateado);
    else if (estructuraActiva instanceof Deque) estructuraActiva.addBack(valorFormateado);
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


export async function ejecutarAgregarNodoIntermedio(): Promise<void> {
  const rawValor = DOM.inputNodo?.value;
  if (!rawValor) return;

  
  const tipoDato = estructuraActiva?.dataType || "string";
  
  // Validamos según la regla configurada
  const valorFormateado = validarYFormatearValor(rawValor, tipoDato);
  if (!valorFormateado) return; // Corta si el formato es inválido

  // Paso 2: Validar que NO esté duplicado
  if (esValorDuplicado(valorFormateado)) {
    alert(`Error: Value "${valorFormateado}" already exists on this structure.`);
    return; // Corta si el valor está repetido
  }
  // 1. Leemos la posición seleccionada en la UI
  const posicion = Number(DOM.selectorPares?.value || 0);

  bloquearInterfaz();

  // 2. Actualizamos la estructura de datos en memoria (Back-end)
  if (estructuraActiva && estructuraActiva instanceof LinkedList) {
    (estructuraActiva as LinkedList<string>).insertAt(posicion, valorFormateado);
  }

  // 3. Ejecutamos la animación de la interfaz (Front-end)
  await agregarNodoIntermedio();

  liberarInterfaz();
}



async function ejecutarGuardarEstructura(): Promise<void> {
  if (!estructuraActiva) {
    alert("First you need to initialize a structure");
    return;
  }


     const nombre = estructuraActiva.name;
     const tipo = estructuraActiva.type;
     const tipoDato = estructuraActiva.dataType;

  // 🎯 Obtenemos los valores legibles directo de la pantalla
  const valores = Array.from(document.querySelectorAll(".valor-nodo"))
                       .map(div => div.textContent?.trim() || "");

  try {
    console.log("Sending data to backend...", valores);
    const resultado = await estructuraService.guardar(nombre, tipo, tipoDato, valores);
    console.log("¡Successfully saved at backend!", resultado);
    alert("Structure saved correctly.");
  } catch (error) {
    alert("Structure could not be saved.");
  }
}



export { renderizar };