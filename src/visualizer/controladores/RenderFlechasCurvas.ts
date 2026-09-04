

export function resolverEase(t: number): number {
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

/**
 * Calcula la geometría de la flecha inter-fila y devuelve el string para el atributo 'd' del path.
 */
export function calcularPathCurvaInterfila(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  anchoEmisor: number,
  radioRulo: number = 130
): string {
  const y_pasillo = y1 + (y2 - y1) / 2;
  
  const de_x1_borde = x1 + (anchoEmisor * 0.25); 
  
  const de_cpx1 = de_x1_borde + radioRulo;
  const de_cpy1 = y1;
  const de_cpx2 = de_x1_borde + radioRulo;
  const de_cpy2 = y_pasillo;

  const control_x_receptor = x2 - radioRulo;

  return `
    M ${x1} ${y1} 
    C ${de_cpx1} ${de_cpy1}, ${de_cpx2} ${de_cpy2}, ${de_x1_borde} ${y_pasillo}
    L ${x2} ${y_pasillo}
    C ${control_x_receptor} ${y_pasillo}, ${control_x_receptor} ${y2}, ${x2} ${y2}
  `.replace(/\s+/g, ' ').trim();
}




// 🎯 PADDING DE RESGUARDO DENTRO DEL SVG
const PADDING_Y = 25;
const PADDING_X = 25;

export interface PuntosCurva {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  minY: number;
  anchoEmisor: number;
}

export function obtenerPuntosExtremos(
  emisor: HTMLElement,
  receptor: HTMLElement,
  contenedor: HTMLElement
): PuntosCurva {
  const contRect = contenedor.getBoundingClientRect();
  const emisorRect = emisor.getBoundingClientRect();
  const receptorRect = receptor.getBoundingClientRect();

  // Coordenadas absolutas reales de los nodos en la pantalla
  const absX1 = emisorRect.left - contRect.left + (emisorRect.width * 0.75);
  const absY1 = emisorRect.top - contRect.top + (emisorRect.height / 2);
  const absX2 = receptorRect.left - contRect.left;
  const absY2 = receptorRect.top - contRect.top + (receptorRect.height / 2);

  const minY = Math.min(absY1, absY2);

  return {
    x1: absX1, // 🎯 Coordenadas PURAS sin padding agregado
    y1: (absY1 - minY) + PADDING_Y, 
    x2: absX2, // 🎯 Coordenadas PURAS sin padding agregado
    y2: (absY2 - minY) + PADDING_Y,
    minY: minY,
    anchoEmisor: emisorRect.width
  };
}

export function animarDesplazamientoCurva(
  path: SVGPathElement,
  puntos: PuntosCurva,
  x_final_real: number, // La coordenada destino real del nodo sin padding
  quienSeMueve: "emisor" | "receptor",
  duracion: number = 2000
) {
  let startTime: number | null = null;

  const x1_inicial = puntos.x1;
  const x2_inicial = puntos.x2;

  const svgPadre = path.ownerSVGElement;
  const gPunta = svgPadre?.querySelector(".punta-flecha-curva") as SVGGElement | null;

  const animarPaso = (timestamp: number) => {
    if (startTime === null) startTime = timestamp;
    const tiempoTranscurrido = timestamp - startTime;
    const progresoLineal = Math.min(tiempoTranscurrido / duracion, 1);
    const progresoSuave = resolverEase(progresoLineal);

    // Calculamos la posición X REAL en este frame
    const x1_real = (quienSeMueve === "emisor") 
      ? x1_inicial + (x_final_real - x1_inicial) * progresoSuave 
      : x1_inicial;

    const x2_real = (quienSeMueve === "receptor") 
      ? x2_inicial + (x_final_real - x2_inicial) * progresoSuave 
      : x2_inicial;

    // 🎯 SUMAMOS EL PADDING_X SOLAMENTE ACÁ PARA EL DIBUJO DEL SVG
    const x1_svg = x1_real + PADDING_X;
    const x2_svg = x2_real + PADDING_X;

    // 1. Redibujamos el trazo con las coordenadas relativas del lienzo
    const dUnificado = calcularPathCurvaInterfila(
      x1_svg, 
      puntos.y1, 
      x2_svg, 
      puntos.y2, 
      puntos.anchoEmisor
    );
    path.setAttribute("d", dUnificado);

    const nuevoLargo = path.getTotalLength();
    path.style.strokeDasharray = `${nuevoLargo}`;
    path.style.strokeDashoffset = "0";

    // 2. Desplazamos la punta azul usando la X del SVG
    if (gPunta) {
      gPunta.setAttribute("transform", `translate(${x2_svg}, ${puntos.y2})`);
    }

    if (progresoLineal < 1) {
      requestAnimationFrame(animarPaso);
    }
  };

  requestAnimationFrame(() => requestAnimationFrame(animarPaso));
}