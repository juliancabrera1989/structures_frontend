import { calcularPathCurvaInterfila } from "../controladores/RenderFlechasCurvas.ts";




/**
 * Genera y anima una flecha curva (Bézier) inter-fila entre dos nodos.
 * @param emisor El elemento HTML del nodo de origen (ej: fin de fila anterior).
 * @param receptor El elemento HTML del nodo de destino (ej: inicio de nueva fila).
 * @param contenedorCurvas El contenedor del DOM donde se insertará el SVG.
 * @param contenedorNodos El contenedor macro de los nodos para calcular los offsets relativos.
 */
export function crearFlechaCurvaInterfila (
  emisor: HTMLElement,
  receptor: HTMLElement,
  contenedorCurvas: HTMLElement,
  contenedorNodos: HTMLElement
): Animation{
  const contRect = contenedorNodos.getBoundingClientRect();
  const emisorRect = emisor.getBoundingClientRect();
  const receptorRect = receptor.getBoundingClientRect();

  // 1. Coordenadas base iniciales
  const x1 = emisorRect.left - contRect.left + emisorRect.width * 0.75;
  const y1 = emisorRect.top - contRect.top + emisorRect.height / 2;
  const x2 = receptorRect.left - contRect.left;
  const y2 = receptorRect.top - contRect.top + receptorRect.height / 2;

  // 2. 🔥 REUTILIZAMOS LA FUNCIÓN DE UTILIDAD ACÁ TAMBIÉN
  const d = calcularPathCurvaInterfila(x1, y1, x2, y2, emisorRect.width);

  // 3. El resto del setup del DOM queda idéntico...
  const svgCurva = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgCurva.setAttribute("style", "position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10;");
  svgCurva.setAttribute("class", "svg-flecha-interfila");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("id", "flecha_curva_dinamica");
  path.setAttribute("d", d); // <--- Inyectamos el string calculado
  path.setAttribute("stroke", "red");
  path.setAttribute("stroke-width", "4");
  path.setAttribute("fill", "none");

  svgCurva.appendChild(path);
  contenedorCurvas.appendChild(svgCurva);

  const largoTotal = path.getTotalLength();
  path.style.strokeDasharray = `${largoTotal}`;
  path.style.strokeDashoffset = `${largoTotal}`;

  const animacion = path.animate(
    [{ strokeDashoffset: largoTotal }, { strokeDashoffset: 0 }], 
    {
      duration: 2000,
      easing: "ease-in-out",
      fill: "forwards",
    }
  );

  return animacion;
}