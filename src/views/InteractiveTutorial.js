import { useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import ControlsBar from "../components/interactiveTutorial/controls/ControlsBar";
import VisualizationTool from "../components/interactiveTutorial/VisualizationTool";
import { initControladorBarraSuperior , 
         ejecutarAgregarPrimerNodo,
         ejecutarAgregarNodoAlComienzo,
         ejecutarAgregarNodoAlFinal,
        // reiniciarVisualizador } from "../visualizer/controladores/ControladorBarraSuperior.ts";
        } from "../visualizer/controladores/ControladorBarraSuperior.ts";
import {prepararDOMParaEstado1 } from "../visualizer/controladores/ControladorInicializador.ts";
import structuresData from "../data/structuresOverviewData.json";


function InteractiveTutorial() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

useEffect(() => {
  // 1. Inicializa los listeners y eventos Vanilla del lienzo
  initControladorBarraSuperior();

  // 2. Extraer parámetros
  const savedType = location.state?.type;
  const savedNodes = location.state?.nodes;

  const typeParam = searchParams.get("type");
  const dataParam = searchParams.get("data"); // <--- Leemos los nodos de la URL

  // setTimeout(() => {
  //   // Caso A: Navegación interna con React Router State
  //   if (savedType && savedNodes) {
  //     cargarEstructuraEnLienzo(savedType, savedNodes);
  //   } 
  if (typeof prepararDOMParaEstado1 === "function") {
    prepararDOMParaEstado1();
  }

  setTimeout(() => {
    // Caso A: Navegación interna con React Router State
    if (savedType && savedNodes) {
      cargarEstructuraEnLienzo(savedType, savedNodes);
    }
    // Caso B: Redirección desde Dashboard usando URL (?type=...&data=A,CD,CG)
    else if (typeParam && dataParam) {
      const nodesArray = dataParam.split(",");
      cargarEstructuraEnLienzo(typeParam, nodesArray);
    } 
    // Caso C: Carga desde Structure Overview (Plantillas por defecto)
    else if (typeParam) {
      const template = structuresData.find(
        (item) => item.type.toLowerCase() === typeParam.toLowerCase()
      );
      if (template && template.defaultNodes) {
        cargarEstructuraEnLienzo(template.type, template.defaultNodes);
      }
    }
  }, 150);
}, [searchParams, location.state]);


const cargarEstructuraEnLienzo = async (tipoRaw, nodos, dataTypeParam) => {
  const selectType = document.getElementById("structure_type");
  const selectDataType = document.getElementById("data_type"); // Selector de tipo de dato en UI
  const btnInicializar = document.getElementById("inicializar");
  const inputNodo = document.getElementById("nodo");

  if (!selectType || !btnInicializar || !inputNodo) return;

  if (typeof prepararDOMParaEstado1 === "function") {
    prepararDOMParaEstado1();
  }

  const tipoLimpio = (tipoRaw || "").toLowerCase();
  const tipoFinal = tipoLimpio.includes("stack") ? "stack" :
                    tipoLimpio.includes("queue") && !tipoLimpio.includes("deque") ? "queue" :
                    tipoLimpio.includes("deque") ? "deque" : "linkedlist";

  selectType.value = tipoFinal;

  // 1. Detectar o forzar el dataType antes de inicializar
  // Si no viene dataType, comprobamos si los nodos tienen letras para forzar 'string' o 'letter'
  const tieneLetras = nodos?.some(n => isNaN(Number(n)));
  const dataTypeFinal = dataTypeParam || (tieneLetras ? "string" : "number");

  if (selectDataType) {
    selectDataType.value = dataTypeFinal;
  }

  // 2. Inicializar el lienzo (esto creará estructuraActiva con el dataType correcto)
  btnInicializar.click();

  if (!nodos || nodos.length === 0) return;

  // Si por alguna razón la UI no sincronizó el dataType, lo ajustamos en el modelo lógico
  if (window.estructuraActiva) {
    window.estructuraActiva.dataType = dataTypeFinal;
  }

  await new Promise((res) => setTimeout(res, 250));

  // 3. Inserción de nodos
  for (let i = 0; i < nodos.length; i++) {
    inputNodo.value = nodos[i];

    if (i === 0) {
      await ejecutarAgregarPrimerNodo();
    } else {
      if (tipoFinal === "stack") {
        await ejecutarAgregarNodoAlComienzo();
      } else {
        await ejecutarAgregarNodoAlFinal();
      }
    }
  }

  inputNodo.value = "";
};

  return (
    <div>
      <ControlsBar />
      <VisualizationTool />
    </div>
  );
}

export default InteractiveTutorial;