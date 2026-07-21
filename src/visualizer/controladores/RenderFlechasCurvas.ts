/**
 * Resuelve el tiempo paramétrico utilizando Newton-Raphson para emular cubic-bezier(0.25, 0.1, 0.25, 1)
 */
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
  
  // El rulo de salida arriba a la derecha depende del borde real del emisor
  // En tus cálculos, la distancia al borde derecho es x1 + el 25% restante del ancho si entraste al 75%
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



export interface PuntosCurva {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
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

  return {
    x1: emisorRect.left - contRect.left + (emisorRect.width * 0.75),
    y1: emisorRect.top - contRect.top + (emisorRect.height / 2),
    x2: receptorRect.left - contRect.left,
    y2: receptorRect.top - contRect.top + (receptorRect.height / 2),
    anchoEmisor: emisorRect.width
  };
}





// export function animarDesplazamientoCurva(
//   path: SVGPathElement,
//   puntos: PuntosCurva,
//   x2_final: number,
//   duracion: number = 2000
// ): void {
//   let startTime: number | null = null;
//   const x2_inicial = puntos.x2;

//   const animarPaso = (timestamp: number) => {
//     if (startTime === null) startTime = timestamp;
//     const tiempoTranscurrido = timestamp - startTime;
//     const progresoLineal = Math.min(tiempoTranscurrido / duracion, 1);

//     const progresoSuave = resolverEase(progresoLineal);
//     const x2_actual = x2_inicial + (x2_final - x2_inicial) * progresoSuave;

//     // Redibujamos usando tu función geométrica
//     const dUnificado = calcularPathCurvaInterfila(
//       puntos.x1, 
//       puntos.y1, 
//       x2_actual, 
//       puntos.y2, 
//       puntos.anchoEmisor
//     );
//     path.setAttribute("d", dUnificado);

//     const nuevoLargo = path.getTotalLength();
//     path.style.strokeDasharray = `${nuevoLargo}`;
//     path.style.strokeDashoffset = "0";

//     if (progresoLineal < 1) {
//       requestAnimationFrame(animarPaso);
//     }
//   };

//   requestAnimationFrame(() => requestAnimationFrame(animarPaso));
// }


export function animarDesplazamientoCurva(
  path: SVGPathElement,
  puntos: PuntosCurva,
  x_final: number,
  quienSeMueve: "emisor" | "receptor" = "receptor",
  duracion: number = 2000
): void {
  let startTime: number | null = null;
  const x1_inicial = puntos.x1;
  const x2_inicial = puntos.x2;

  const animarPaso = (timestamp: number) => {
    if (startTime === null) startTime = timestamp;
    const tiempoTranscurrido = timestamp - startTime;
    const progresoLineal = Math.min(tiempoTranscurrido / duracion, 1);
    const progresoSuave = resolverEase(progresoLineal);

    // Si se mueve el emisor, interpolamos x1. Si es el receptor, interpolamos x2.
    const x1_actual = (quienSeMueve === "emisor") 
      ? x1_inicial + (x_final - x1_inicial) * progresoSuave 
      : x1_inicial;

    const x2_actual = (quienSeMueve === "receptor") 
      ? x2_inicial + (x_final - x2_inicial) * progresoSuave 
      : x2_inicial;

    // Tu función geométrica pura redibuja todo perfectamente en ambos casos
    const dUnificado = calcularPathCurvaInterfila(
      x1_actual, 
      puntos.y1, 
      x2_actual, 
      puntos.y2, 
      puntos.anchoEmisor
    );
    path.setAttribute("d", dUnificado);

    const nuevoLargo = path.getTotalLength();
    path.style.strokeDasharray = `${nuevoLargo}`;
    path.style.strokeDashoffset = "0";

    if (progresoLineal < 1) {
      requestAnimationFrame(animarPaso);
    }
  };

  requestAnimationFrame(() => requestAnimationFrame(animarPaso));
}