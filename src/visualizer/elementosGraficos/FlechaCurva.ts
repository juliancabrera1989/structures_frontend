import { calcularPathCurvaInterfila } from "../controladores/RenderFlechasCurvas.ts";





export function crearFlechaCurvaInterfila(
  emisor: HTMLElement,
  receptor: HTMLElement,
  contenedorNodos: HTMLElement
): SVGElement {
  const contRect = contenedorNodos.getBoundingClientRect();
  const emisorRect = emisor.getBoundingClientRect();
  const receptorRect = receptor.getBoundingClientRect();

  // 1. Coordenadas base reales respecto al contenedor
  const x1 = emisorRect.left - contRect.left + emisorRect.width * 0.75;
  const y1 = emisorRect.top - contRect.top + emisorRect.height / 2;
  const x2 = receptorRect.left - contRect.left;
  const y2 = receptorRect.top - contRect.top + receptorRect.height / 2;

  const minY = Math.min(y1, y2);

  // 🎯 MARGENES DE RESGUARDO (Padding para que la punta de 20px no se recorte)
  const PADDING_Y = 25; // Subimos de 10px a 25px (da espacio abajo para la patita inferior)
  const PADDING_X = 25; // Nuevo margen a la izquierda (evita el recorte si la curva o la punta tocan el borde izquierdo)

  const altoSVG = 300; // Extendemos la altura total de la caja del SVG

  // 2. CONVERSIÓN A COORDENADAS RELATIVAS DENTRO DEL SVG
  // Le sumamos los paddings para desplazar el dibujo adentro de la caja sin mover su posición real
  const relY1 = (y1 - minY) + PADDING_Y; 
  const relY2 = (y2 - minY) + PADDING_Y;

  // Si la curva pancea mucho hacia la izquierda, trasladamos X dentro del SVG
  const relX1 = x1 + PADDING_X;
  const relX2 = x2 + PADDING_X;

  // 3. Calculamos el path con las coordenadas relativas holgadas
  const d = calcularPathCurvaInterfila(relX1, relY1, relX2, relY2, emisorRect.width);

  const svgCurva = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  
  // 🎯 Compensamos el 'top' y 'left' del SVG con los mismos paddings para que el origen y final coincidan perfecto con los nodos
  svgCurva.setAttribute(
    "style", 
    `position: absolute; top: ${minY - PADDING_Y}px; left: ${-PADDING_X}px; width: calc(100% + ${PADDING_X * 2}px); height: ${altoSVG}px; pointer-events: none; z-index: 10; overflow: visible;`
  );
  svgCurva.setAttribute("class", "svg-flecha-interfila");

  // --- TRAZO ROJO ---
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("id", "flecha_curva_dinamica");
  path.setAttribute("d", d);
  path.setAttribute("stroke", "red");
  path.setAttribute("stroke-width", "4");
  path.setAttribute("fill", "none");

  const largoTotal = path.getTotalLength();
  path.style.strokeDasharray = `${largoTotal}`;
  path.style.strokeDashoffset = `${largoTotal}`;

  // --- PUNTA AZUL ---
  const gPunta = document.createElementNS("http://www.w3.org/2000/svg", "g");
  gPunta.setAttribute("class", "punta-flecha-curva");
  // La punta se ubica en las coordenadas relativas con padding
  gPunta.setAttribute("transform", `translate(${relX2}, ${relY2})`);

  const largoPunta = 20;

  const lineaSuperior = document.createElementNS("http://www.w3.org/2000/svg", "line");
  lineaSuperior.setAttribute("class", "patita-punta");
  lineaSuperior.setAttribute("x1", "0");
  lineaSuperior.setAttribute("y1", "0");
  lineaSuperior.setAttribute("x2", "-15");
  lineaSuperior.setAttribute("y2", "-13");
  lineaSuperior.setAttribute("stroke", "blue");
  lineaSuperior.setAttribute("stroke-width", "5");
  lineaSuperior.setAttribute("stroke-linecap", "round");
  lineaSuperior.style.strokeDasharray = `${largoPunta}`;
  lineaSuperior.style.strokeDashoffset = `${largoPunta}`;

  const lineaInferior = document.createElementNS("http://www.w3.org/2000/svg", "line");
  lineaInferior.setAttribute("class", "patita-punta");
  lineaInferior.setAttribute("x1", "0");
  lineaInferior.setAttribute("y1", "0");
  lineaInferior.setAttribute("x2", "-15");
  lineaInferior.setAttribute("y2", "13");
  lineaInferior.setAttribute("stroke", "blue");
  lineaInferior.setAttribute("stroke-width", "5");
  lineaInferior.setAttribute("stroke-linecap", "round");
  lineaInferior.style.strokeDasharray = `${largoPunta}`;
  lineaInferior.style.strokeDashoffset = `${largoPunta}`;

  gPunta.appendChild(lineaSuperior);
  gPunta.appendChild(lineaInferior);

  svgCurva.appendChild(path);
  svgCurva.appendChild(gPunta);

  return svgCurva;
}


export function animarPath(path : SVGPathElement, dibujar?: boolean){

const largoTotal = path.getTotalLength();
    
 const orientacion = dibujar ? [{ strokeDashoffset: largoTotal }, { strokeDashoffset: 0 }]
  :           [
            { strokeDashoffset: 0 }, 
            { strokeDashoffset: largoTotal }
          ];

  const animacion = path.animate(

    orientacion, 
    {
      duration: 2000,
      easing: "ease-in-out",
      fill: "forwards",
    }
  );

  return animacion;
}


export function animarPuntaAzul(svgCurva: SVGElement, dibujar: boolean): Animation[] {
  const patitas = svgCurva.querySelectorAll(".patita-punta") as NodeListOf<SVGLineElement>;
  const largoPunta = 20;

  const orientacion = dibujar
    ? [{ strokeDashoffset: largoPunta }, { strokeDashoffset: 0 }]
    : [{ strokeDashoffset: 0 }, { strokeDashoffset: largoPunta }];

  const animaciones: Animation[] = [];

  patitas.forEach((patita) => {
    const anim = patita.animate(orientacion, {
      duration: 300, // Es un despliegue rápido desde el punto de llegada
      easing: "ease-out",
      fill: "forwards",
    });
    animaciones.push(anim);
  });

  return animaciones;
}