// src/visualizer/elementosDOM.ts

// ==========================================
// 1. VARIABLES ESTRUCTURALES FIJAS (Variables fijas)
// ==========================================
export let principal: HTMLDivElement = null!;
export let principalWrapper: HTMLDivElement = null!;
export let contenedorNodos: HTMLDivElement = null!;
export let contenedorFlechas: HTMLDivElement = null!;
export let contenedorFlechasCurvas: HTMLDivElement = null!;
export let inicializador: HTMLDivElement = null!;
export let barraSuperior: HTMLDivElement = null!;
export let inic: HTMLButtonElement = null!;
export let inputNodo: HTMLInputElement = null!;
export let botonAgregar1erNodo: HTMLButtonElement = null!;
export let agregarComienzo: HTMLButtonElement = null!;
export let agregarFinal: HTMLButtonElement = null!;
export let borrarComienzo: HTMLButtonElement = null!;
export let borrarFinal: HTMLButtonElement = null!;
export let agregarIntermedio: HTMLButtonElement = null!;
export let selectorPares: HTMLSelectElement = null!;
export let textoSelector: HTMLElement = null!;
export let texto: HTMLElement = null!;
export let str: HTMLDivElement = null!;
export let nulo: HTMLDivElement = null!;
export let guardarEstructura : HTMLButtonElement = null!;

export function actualizarElementosDOM(): void {
  principal = document.getElementById("principal") as HTMLDivElement;
  principalWrapper = document.getElementById("principal_wrapper") as HTMLDivElement;
  contenedorNodos = document.getElementById("contenedor_nodos") as HTMLDivElement;
  contenedorFlechas = document.getElementById("contenedor_flechas") as HTMLDivElement;
  inicializador = document.getElementById("inicializador") as HTMLDivElement;
  contenedorFlechasCurvas = document.getElementById("contenedor_flechas_curvas") as HTMLDivElement;
  barraSuperior = document.getElementById("barra_superior") as HTMLDivElement;
  inic = document.getElementById("inicializar") as HTMLButtonElement;
  inputNodo = document.getElementById("nodo") as HTMLInputElement;
  botonAgregar1erNodo = document.getElementById("agregar_1er_nodo") as HTMLButtonElement;
  agregarComienzo = document.getElementById("agregar_comienzo") as HTMLButtonElement;
  agregarFinal = document.getElementById("agregar_final") as HTMLButtonElement;
  borrarComienzo = document.getElementById("borrar_comienzo") as HTMLButtonElement;
  borrarFinal = document.getElementById("borrar_final") as HTMLButtonElement;
  agregarIntermedio = document.getElementById("agregar_intermedio") as HTMLButtonElement;
  selectorPares = document.getElementById("selector-pares") as HTMLSelectElement;
  textoSelector = document.getElementById("texto-selector") as HTMLElement;
  texto = document.getElementById("texto") as HTMLElement;
  str = document.getElementById("str") as HTMLDivElement;
  nulo = document.getElementById("nulo") as HTMLDivElement;

  guardarEstructura = document.getElementById("guardar") as HTMLButtonElement;
}

// ==========================================
// 2. ELEMENTOS DINÁMICOS DE ANIMACIÓN (Búsqueda en caliente)
// ==========================================
export const flechaPunteroInicial = () => document.getElementById("flecha_puntero_inicial") as HTMLDivElement | null;
export const flechaPunteroFinal = () => document.getElementById("flecha_puntero_final") as HTMLDivElement | null;
export const flechaPunteroActual = () => document.getElementById("flecha_puntero_actual") as HTMLDivElement | null;
export const flechaPunteroPrevio = () => document.getElementById("flecha_puntero_previo") as HTMLDivElement | null;
export const flechaPunteroNuevo = () => document.getElementById("flecha_puntero_nuevo") as HTMLDivElement | null;

// Accesos directos ultra limpios para los componentes de las flechas clave
export const inicialUl = () => document.getElementById("flecha_puntero_inicial")?.querySelector(".underline") as HTMLElement | null;
export const inicialLs = () => document.getElementById("flecha_puntero_inicial")?.querySelector(".linea-s") as HTMLElement | null;
export const inicialLi = () => document.getElementById("flecha_puntero_inicial")?.querySelector(".linea-i") as HTMLElement | null;

export const finalUl = () => document.getElementById("flecha_puntero_final")?.querySelector(".underline") as HTMLElement | null;
export const finalLs = () => document.getElementById("flecha_puntero_final")?.querySelector(".linea-s") as HTMLElement | null;
export const finalLi = () => document.getElementById("flecha_puntero_final")?.querySelector(".linea-i") as HTMLElement | null;

// ==========================================
// 3. CONTROL DE CALIDAD
// ==========================================
export function verificarDOM(): boolean {
  return !!(
    principal && principalWrapper && contenedorNodos && contenedorFlechas &&
    inicializador && barraSuperior && inic && inputNodo && botonAgregar1erNodo &&
    agregarComienzo && agregarFinal && agregarIntermedio && selectorPares &&
    textoSelector && texto && str && nulo && guardarEstructura &&
    document.getElementById("flecha_puntero_inicial") &&
    document.getElementById("flecha_puntero_final")
  );
}