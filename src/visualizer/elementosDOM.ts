// // elementosDOM.ts

// // Usamos querySelector especificando la etiqueta (div o button) 
// // para que TS sepa el tipo exacto de forma automática, sin usar "as"
// export const contenedorFlechas = document.querySelector("div#contenedor_flechas");
// export const contenedorNodos   = document.querySelector("div#contenedor_nodos");
// export const str               = document.querySelector("div#str");
// export const nulo              = document.querySelector("div#nulo");
// export const inicializador     = document.querySelector("section#inicializador"); // o la etiqueta que sea

// // Nuevos elementos de la Barra Superior y Estructura
// export const barraSuperior         = document.querySelector("div#barra_superior");
// export const inic                  = document.querySelector("div#inicializar");
// export const texto                 = document.querySelector("div#texto");
// export const inputNodo             = document.querySelector("input#nodo"); // Tipado específico como input
// export const botonAgregar1erNodo   = document.querySelector("button#agregar_1er_nodo");
// export const agregarComienzo       = document.querySelector("button#agregar_comienzo");
// export const agregarIntermedio     = document.querySelector("button#agregar_intermedio");
// export const agregarFinal          = document.querySelector("button#agregar_final");
// export const principalWrapper      = document.querySelector("div#principal_wrapper");
// export const flechaPunteroInicial  = document.querySelector("div#flecha_puntero_inicial");

// // Función centralizada para chequear que todo exista antes de arrancar la app
// export function verificarDOM(): boolean {
//   if (!contenedorNodos  || !contenedorFlechas || !str || !nulo || !inicializador ||
//     !barraSuperior || !texto || !inputNodo || !botonAgregar1erNodo ||
//     !agregarComienzo || !agregarIntermedio || !agregarFinal || !principalWrapper || !flechaPunteroInicial
//   ) {
//     console.error("Error crítico: Faltan elementos esenciales en el HTML.");
//     return false;
//   }
//   return true;
// }











// // elementosDOM.ts

// // Contenedores estructurales (Todos son DIVs, tipados como HTMLDivElement)
// export const principal              = document.getElementById("principal") as HTMLDivElement;
// export const principalWrapper       = document.getElementById("principal_wrapper") as HTMLDivElement;
// export const contenedorNodos        = document.getElementById("contenedor_nodos") as HTMLDivElement;
// export const contenedorFlechas      = document.getElementById("contenedor_flechas") as HTMLDivElement;
// export const inicializador          = document.getElementById("inicializador") as HTMLDivElement;
// export const str                    = document.getElementById("str") as HTMLDivElement;
// export const nulo                   = document.getElementById("nulo") as HTMLDivElement;
// export const flechaPunteroInicial   = document.getElementById("flecha_puntero_inicial") as HTMLDivElement;
// export const flechaPunteroFinal     = document.getElementById("flecha_puntero_final") as HTMLDivElement;
// // Controles de la Barra Superior (Tipados con su elemento específico)
// export const barraSuperior         = document.getElementById("barra_superior") as HTMLDivElement;
// export const inic                  = document.getElementById("inicializar") as HTMLButtonElement;
// export const inputNodo             = document.getElementById("nodo") as HTMLInputElement;
// export const botonAgregar1erNodo   = document.getElementById("agregar_1er_nodo") as HTMLButtonElement;
// export const agregarComienzo       = document.getElementById("agregar_comienzo") as HTMLButtonElement;
// export const agregarFinal          = document.getElementById("agregar_final") as HTMLButtonElement;
// export const agregarIntermedio     = document.getElementById("agregar_intermedio") as HTMLButtonElement;
// export const selectorPares         = document.getElementById("selector-pares") as HTMLSelectElement;

// // Elementos de Texto genéricos (Siguen siendo HTMLElement)
// export const textoSelector     = document.getElementById("texto-selector") as HTMLElement;
// export const texto             = document.getElementById("texto") as HTMLElement;

// /**
//  * Verifica si el árbol crítico del DOM está montado en React.
//  */
// export function verificarDOM(): boolean {
//   return !!(principal && principalWrapper && contenedorNodos && inicializador && inputNodo);
// }





// // src/visualizer/elementosDOM.ts

// // Transformamos los elementos fijos en funciones dinámicas (getters) para que busquen en el DOM real al momento de usarlos
// export const getPrincipal = () => document.getElementById("principal") as HTMLDivElement | null;
// export const getPrincipalWrapper = () => document.getElementById("principal_wrapper") as HTMLDivElement | null;
// export const getContenedorNodos = () => document.getElementById("contenedor_nodos") as HTMLDivElement | null;
// export const getContenedorFlechas = () => document.getElementById("contenedor_flechas") as HTMLDivElement | null;
// export const getInicializador = () => document.getElementById("inicializador") as HTMLDivElement | null;
// export const getStr = () => document.getElementById("str") as HTMLDivElement | null;
// export const getNulo = () => document.getElementById("nulo") as HTMLDivElement | null;
// export const getFlechaPunteroInicial = () => document.getElementById("flecha_puntero_inicial") as HTMLDivElement | null;
// export const getFlechaPunteroFinal = () => document.getElementById("flecha_puntero_final") as HTMLDivElement | null;

// export const getBarraSuperior = () => document.getElementById("barra_superior") as HTMLDivElement | null;
// export const getInic = () => document.getElementById("inicializar") as HTMLButtonElement | null;
// export const getInputNodo = () => document.getElementById("nodo") as HTMLInputElement | null;
// export const getBotonAgregar1erNodo = () => document.getElementById("agregar_1er_nodo") as HTMLButtonElement | null;
// export const getAgregarComienzo = () => document.getElementById("agregar_comienzo") as HTMLButtonElement | null;
// export const getAgregarFinal = () => document.getElementById("agregar_final") as HTMLButtonElement | null;
// export const getAgregarIntermedio = () => document.getElementById("agregar_intermedio") as HTMLButtonElement | null;
// export const getSelectorPares = () => document.getElementById("selector-pares") as HTMLSelectElement | null;

// export const getTextoSelector = () => document.getElementById("texto-selector") as HTMLElement | null;
// export const getTexto = () => document.getElementById("texto") as HTMLElement | null;

// /**
//  * Verifica si todos los elementos requeridos realmente existen en la pantalla.
//  */
// export function verificarDOM(): boolean {
//   return !!(
//     getPrincipal() && 
//     getPrincipalWrapper() && 
//     getContenedorNodos() && 
//     getInic() && 
//     getInputNodo() &&
//     getBotonAgregar1erNodo() &&
//     getAgregarComienzo() &&
//     getAgregarFinal()
//   );
// }






// // src/visualizer/elementosDOM.ts

// /**
//  * Usamos Object.defineProperty para que las variables busquen en el DOM 
//  * en tiempo real cada vez que alguien las invoque, manteniendo sus nombres intactos.
//  */

// export const principal = {} as HTMLDivElement;
// export const principalWrapper = {} as HTMLDivElement;
// export const contenedorNodos = {} as HTMLDivElement;
// export const contenedorFlechas = {} as HTMLDivElement;
// export const inicializador = {} as HTMLDivElement;
// export const str = {} as HTMLDivElement;
// export const nulo = {} as HTMLDivElement;
// export const flechaPunteroInicial = {} as HTMLDivElement;
// export const flechaPunteroFinal = {} as HTMLDivElement;
// export const barraSuperior = {} as HTMLDivElement;
// export const inic = {} as HTMLButtonElement;
// export const inputNodo = {} as HTMLInputElement;
// export const botonAgregar1erNodo = {} as HTMLButtonElement;
// export const agregarComienzo = {} as HTMLButtonElement;
// export const agregarFinal = {} as HTMLButtonElement;
// export const agregarIntermedio = {} as HTMLButtonElement;
// export const selectorPares = {} as HTMLSelectElement;
// export const textoSelector = {} as HTMLElement;
// export const texto = {} as HTMLElement;

// // Mapeamos los IDs reales del HTML a las constantes exportadas
// const domMapping: Record<string, string> = {
//   principal: "principal",
//   principalWrapper: "principal_wrapper",
//   contenedorNodos: "contenedor_nodos",
//   contenedorFlechas: "contenedor_flechas",
//   inicializador: "inicializador",
//   str: "str",
//   nulo: "nulo",
//   flechaPunteroInicial: "flecha_puntero_inicial",
//   flechaPunteroFinal: "flecha_puntero_final",
//   barraSuperior: "barra_superior",
//   inic: "inicializar",
//   inputNodo: "nodo",
//   botonAgregar1erNodo: "agregar_1er_nodo",
//   agregarComienzo: "agregar_comienzo",
//   agregarFinal: "agregar_final",
//   agregarIntermedio: "agregar_intermedio",
//   selectorPares: "selector-pares",
//   textoSelector: "texto-selector",
//   texto: "texto",
// };

// // Vinculamos cada export con su búsqueda en caliente en el documento
// Object.keys(domMapping).forEach((key) => {
//   Object.defineProperty(exports, key, {
//     get: () => document.getElementById(domMapping[key]),
//     configurable: true,
//     enumerable: true,
//   });
// });

// /**
//  * Verifica si el árbol crítico del DOM está realmente montado.
//  * Ahora dará "true" porque evalúa los elementos en tiempo de ejecución (dentro del useEffect).
//  */
// export function verificarDOM(): boolean {
//   return !!(
//     document.getElementById("principal") &&
//     document.getElementById("principal_wrapper") &&
//     document.getElementById("contenedor_nodos") &&
//     document.getElementById("inicializar") &&
//     document.getElementById("nodo")
//   );
// }




// src/visualizer/elementosDOM.ts

// 1. Declaramos las variables con sus tipos y nombres normales
export let principal: HTMLDivElement = null!;
export let principalWrapper: HTMLDivElement = null!;
export let contenedorNodos: HTMLDivElement = null!;
export let contenedorFlechas: HTMLDivElement = null!;
export let inicializador: HTMLDivElement = null!;
export let str: HTMLDivElement = null!;
export let nulo: HTMLDivElement = null!;
export let flechaPunteroInicial: HTMLDivElement = null!;
export let flechaPunteroFinal: HTMLDivElement = null!;
export let barraSuperior: HTMLDivElement = null!;
export let inic: HTMLButtonElement = null!;
export let inputNodo: HTMLInputElement = null!;
export let botonAgregar1erNodo: HTMLButtonElement = null!;
export let agregarComienzo: HTMLButtonElement = null!;
export let agregarFinal: HTMLButtonElement = null!;
export let agregarIntermedio: HTMLButtonElement = null!;
export let selectorPares: HTMLSelectElement = null!;
export let textoSelector: HTMLElement = null!;
export let texto: HTMLElement = null!;


export let inicialUl: HTMLDivElement = null!;
export let inicialLs: HTMLDivElement = null!;
export let inicialLi: HTMLElement = null!;

export let finalUl: HTMLDivElement = null!;
export let finalLs: HTMLDivElement = null!;
export let finalLi: HTMLDivElement = null!;

/**
 * Captura en caliente los elementos del DOM real. 
 * Se llamará adentro del useEffect una vez montado React.
 */
export function actualizarElementosDOM(): void {
  principal = document.getElementById("principal") as HTMLDivElement;
  principalWrapper = document.getElementById("principal_wrapper") as HTMLDivElement;
  contenedorNodos = document.getElementById("contenedor_nodos") as HTMLDivElement;
  contenedorFlechas = document.getElementById("contenedor_flechas") as HTMLDivElement;
  inicializador = document.getElementById("inicializador") as HTMLDivElement;
  str = document.getElementById("str") as HTMLDivElement;
  nulo = document.getElementById("nulo") as HTMLDivElement;
  flechaPunteroInicial = document.getElementById("flecha_puntero_inicial") as HTMLDivElement;
  flechaPunteroFinal = document.getElementById("flecha_puntero_final") as HTMLDivElement;
  barraSuperior = document.getElementById("barra_superior") as HTMLDivElement;
  inic = document.getElementById("inicializar") as HTMLButtonElement;
  inputNodo = document.getElementById("nodo") as HTMLInputElement;
  botonAgregar1erNodo = document.getElementById("agregar_1er_nodo") as HTMLButtonElement;
  agregarComienzo = document.getElementById("agregar_comienzo") as HTMLButtonElement;
  agregarFinal = document.getElementById("agregar_final") as HTMLButtonElement;
  agregarIntermedio = document.getElementById("agregar_intermedio") as HTMLButtonElement;
  selectorPares = document.getElementById("selector-pares") as HTMLSelectElement;
  textoSelector = document.getElementById("texto-selector") as HTMLElement;
  texto = document.getElementById("texto") as HTMLElement;


  if (flechaPunteroInicial) {
    inicialUl = flechaPunteroInicial.querySelector(".underline") as HTMLDivElement;
    inicialLs = flechaPunteroInicial.querySelector(".linea-s") as HTMLDivElement;
    inicialLi = flechaPunteroInicial.querySelector(".linea-i") as HTMLDivElement;
  }



    // Partes de la Flecha Final
  if (flechaPunteroFinal) {
    finalUl = flechaPunteroFinal.querySelector(".underline") as HTMLDivElement;
    finalLs = flechaPunteroFinal.querySelector(".linea-s") as HTMLDivElement;
    finalLi = flechaPunteroFinal.querySelector(".linea-i") as HTMLDivElement;
  }
}

/**
 * Verifica si el árbol crítico del DOM está realmente montado.
 */
export function verificarDOM(): boolean {
  return !!(
    principal &&
    principalWrapper &&
    contenedorNodos &&
    contenedorFlechas &&
    inicializador &&
    str &&
    nulo &&
    flechaPunteroInicial &&
    flechaPunteroFinal &&
    barraSuperior &&
    inic &&
    inputNodo &&
    botonAgregar1erNodo &&
    agregarComienzo &&
    agregarFinal &&
    agregarIntermedio &&
    selectorPares &&
    textoSelector &&
    texto
  );
}


