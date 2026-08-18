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

// Helper que pausa la ejecución hasta que TypeScript dispare el evento 'animacion_nodo_completada'
// const esperarFinAnimacion = () => {
//   return new Promise((resolve) => {
//     const alTerminar = () => {
//       document.removeEventListener("animacion_nodo_completada", alTerminar);
//       resolve();
//     };
//     document.addEventListener("animacion_nodo_completada", alTerminar);
//   });
// };

function InteractiveTutorial() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    // 1. Inicializa los listeners y eventos Vanilla del lienzo
    initControladorBarraSuperior();

    // 2. A: Datos provenientes del Dashboard (state de React Router)
    const savedType = location.state?.type;
    const savedNodes = location.state?.nodes;

    // 2. B: Datos provenientes del Overview (parámetro URL)
    const typeParam = searchParams.get("type");

    setTimeout(() => {
      if (savedType && savedNodes) {
        // Redirección futura desde el Dashboard
        cargarEstructuraEnLienzo(savedType, savedNodes);
      } else if (typeParam) {
        // Redirección desde el Overview
        const template = structuresData.find(
          (item) => item.type.toLowerCase() === typeParam.toLowerCase()
        );
        if (template && template.defaultNodes) {
          cargarEstructuraEnLienzo(template.type, template.defaultNodes);
        }
      }
    }, 150);
  }, [searchParams, location.state]);
//   useEffect(() => {
//   initControladorBarraSuperior();

//   const savedType = location.state?.type;
//   const savedNodes = location.state?.nodes;
//   const typeParam = searchParams.get("type");

//   if (savedType && savedNodes) {
//     cargarEstructuraEnLienzo(savedType, savedNodes);
//   } else if (typeParam) {
//     const template = structuresData.find(
//       (item) => item.id.toLowerCase() === typeParam.toLowerCase() ||
//                 item.type.toLowerCase() === typeParam.toLowerCase()
//     );
//     if (template && template.defaultNodes) {
//       cargarEstructuraEnLienzo(template.type, template.defaultNodes);
//     }
//   }

//   // 🧹 CLEANUP FUNCTION: Se dispara automáticamente al salir de la vista (navegar al Catálogo)
//   return () => {
//     reiniciarVisualizador();
//   };
// }, [searchParams, location.state]);

  // Función asíncrona determinista
  // const cargarEstructuraEnLienzo = async (tipo, nodos) => {
  //   const selectType = document.getElementById("structure_type");
  //   const btnInicializar = document.getElementById("inicializar");

  //   if (!selectType || !btnInicializar) return;

  //   // A. Seleccionar el tipo de estructura e inicializar
  //   selectType.value = tipo.toLowerCase().replace(/[- ]/g, "");
  //   selectType.dispatchEvent(new Event("change"));
  //   btnInicializar.click();

  //   if (!nodos || nodos.length === 0) return;

  //   // B. Recorrer nodos en secuencia sincronizada por eventos
  //   for (let i = 0; i < nodos.length; i++) {
  //     const inputNodo = document.getElementById("nodo");
  //     const btnPrimerNodo = document.getElementById("agregar_1er_nodo");
  //     const btnAgregarFinal = document.getElementById("agregar_final");

  //     const btnAUsar = i === 0 ? btnPrimerNodo : btnAgregarFinal;

  //     if (inputNodo && btnAUsar) {
  //       inputNodo.value = nodos[i];
  //       inputNodo.dispatchEvent(new Event("input"));

  //       // Dispara la acción de insertar
  //       btnAUsar.click();

  //       // EL BUCLE SE PAUSA AQUÍ hasta que tu TypeScript emita 'animacion_nodo_completada'
  //       await esperarFinAnimacion();
  //     }
  //   }
  // };





//   const cargarEstructuraEnLienzo = async (tipoRaw, nodos) => {
//   const selectType = document.getElementById("structure_type");
//   const btnInicializar = document.getElementById("inicializar");
//   const inputNodo = document.getElementById("nodo");

//   if (!selectType || !btnInicializar || !inputNodo) return;

//   // Normalización directa del tipo
//   const tipoLimpio = tipoRaw.toLowerCase();
//   const tipoFinal = tipoLimpio.includes("stack") ? "stack" :
//                     tipoLimpio.includes("queue") && !tipoLimpio.includes("deque") ? "queue" :
//                     tipoLimpio.includes("deque") ? "deque" : "linkedlist";

//   selectType.value = tipoFinal;
//   selectType.dispatchEvent(new Event("change"));
//   btnInicializar.click();

//   if (!nodos || nodos.length === 0) return;

//   // Animación secuencial automática por función directa
//   for (let i = 0; i < nodos.length; i++) {
//     inputNodo.value = nodos[i];

//     if (i === 0) {
//       await ejecutarAgregarPrimerNodo();
//     } else {
//       if (tipoFinal === "stack") {
//         await ejecutarAgregarNodoAlComienzo();
//       } else {
//         await ejecutarAgregarNodoAlFinal();
//       }
//     }
//   }

//   inputNodo.value = "";
// };



// const cargarEstructuraEnLienzo = async (tipoRaw, nodos) => {
//   const selectType = document.getElementById("structure_type");
//   const btnInicializar = document.getElementById("inicializar");
//   const inputNodo = document.getElementById("nodo");

//   if (!selectType || !btnInicializar || !inputNodo) return;

//   // 1. NORMALIZACIÓN DEL TIPO
//   const tipoLimpio = tipoRaw.toLowerCase();
//   const tipoFinal = tipoLimpio.includes("stack") ? "stack" :
//                     tipoLimpio.includes("queue") && !tipoLimpio.includes("deque") ? "queue" :
//                     tipoLimpio.includes("deque") ? "deque" : "linkedlist";

//   // 2. CICLO DE VIDA - FASE 1: Selección e Inicialización en el DOM
//   selectType.value = tipoFinal;
//   selectType.dispatchEvent(new Event("change"));
  
//   // Ejecuta la inicialización lógica y visual (dibuja la flecha inicial)
//   btnInicializar.click();

//   if (!nodos || nodos.length === 0) return;

//   // 3. CICLO DE VIDA - FASE 2: Esperar a que el canvas y el DOM asienten la flecha inicial
//   await new Promise((resolve) => setTimeout(resolve, 200));

//   // 4. CICLO DE VIDA - FASE 3: Inserción Secuencial
//   for (let i = 0; i < nodos.length; i++) {
//     inputNodo.value = nodos[i];
//     inputNodo.dispatchEvent(new Event("input"));

//     if (i === 0) {
//       // Agrega el primer nodo (oculta la flecha inicial y acomoda el layout)
//       await ejecutarAgregarPrimerNodo();
//       await esperarFinAnimacion();
//     } else {
//       // Agrega nodos subsiguientes según el tipo de estructura
//       if (tipoFinal === "stack") {
//         await ejecutarAgregarNodoAlComienzo();
//       } else {
//         await ejecutarAgregarNodoAlFinal();
//       }
//       await esperarFinAnimacion();
//     }
//   }

//   // Limpieza final
//   inputNodo.value = "";
// };


// const cargarEstructuraEnLienzo = async (tipoRaw, nodos) => {
//   const selectType = document.getElementById("structure_type");
//   const btnInicializar = document.getElementById("inicializar");
//   const inputNodo = document.getElementById("nodo");

//   if (!selectType || !btnInicializar || !inputNodo) return;

//   // 1. Normalización del tipo
//   const tipoLimpio = tipoRaw.toLowerCase();
//   const tipoFinal = tipoLimpio.includes("stack") ? "stack" :
//                     tipoLimpio.includes("queue") && !tipoLimpio.includes("deque") ? "queue" :
//                     tipoLimpio.includes("deque") ? "deque" : "linkedlist";

//   // 2. Selección e Inicialización
//   selectType.value = tipoFinal;
//   selectType.dispatchEvent(new Event("change"));
//   btnInicializar.click();

//   if (!nodos || nodos.length === 0) return;

//   // Pausa mínima para estabilizar la flecha inicial en el DOM
//   await new Promise((resolve) => setTimeout(resolve, 200));

//   // 3. Inserción Secuencial Limpia
//   for (let i = 0; i < nodos.length; i++) {
//     inputNodo.value = nodos[i];
//     inputNodo.dispatchEvent(new Event("input"));

//     if (i === 0) {
//       // Solamente el await de la función ejecutora
//       await ejecutarAgregarPrimerNodo();
//     } else {
//       if (tipoFinal === "stack") {
//         await ejecutarAgregarNodoAlComienzo();
//       } else {
//         await ejecutarAgregarNodoAlFinal();
//       }
//     }
//   }

//   // Limpieza del input al finalizar la secuencia
//   inputNodo.value = "";
// };


// const cargarEstructuraEnLienzo = async (tipoRaw, nodos) => {
//   const selectType = document.getElementById("structure_type");
//   const btnInicializar = document.getElementById("inicializar");
//   const inputNodo = document.getElementById("nodo");

//   if (!selectType || !btnInicializar || !inputNodo) return;

//   // 1. Normalización del tipo
//   const tipoLimpio = tipoRaw.toLowerCase();
//   const tipoFinal = tipoLimpio.includes("stack") ? "stack" :
//                     tipoLimpio.includes("queue") && !tipoLimpio.includes("deque") ? "queue" :
//                     tipoLimpio.includes("deque") ? "deque" : "linkedlist";

//   // 2. Selección e Inicialización
//   selectType.value = tipoFinal;
//   selectType.dispatchEvent(new Event("change"));
//   btnInicializar.click();

//   if (!nodos || nodos.length === 0) return;

//   // Pausa inicial para el render del lienzo
//   await new Promise((res) => setTimeout(res, 300));

//   // Helper para forzar una espera de X milisegundos entre nodos
//   const pausar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//   // 3. Inserción Secuencial con Pausa Garantizada
//   for (let i = 0; i < nodos.length; i++) {
//     inputNodo.value = nodos[i];
//     inputNodo.dispatchEvent(new Event("input"));

//     if (i === 0) {
//       await ejecutarAgregarPrimerNodo();
//     } else {
//       if (tipoFinal === "stack") {
//         await ejecutarAgregarNodoAlComienzo();
//       } else {
//         await ejecutarAgregarNodoAlFinal();
//       }
//     }

//     // 🛑 TIEMPO DE ESPERA OBLIGATORIO: Ajusta los milisegundos (ej. 1200ms) 
//     // al tiempo real que tarda tu animación completa en dibujarse.
//     await pausar(1200);
//   }

//   inputNodo.value = "";
// };


// const cargarEstructuraEnLienzo = async (tipoRaw, nodos) => {
//   const selectType = document.getElementById("structure_type");
//   const btnInicializar = document.getElementById("inicializar");
//   const inputNodo = document.getElementById("nodo");

//   if (!selectType || !btnInicializar || !inputNodo) return;

//   const tipoLimpio = tipoRaw.toLowerCase();
//   const tipoFinal = tipoLimpio.includes("stack") ? "stack" :
//                     tipoLimpio.includes("queue") && !tipoLimpio.includes("deque") ? "queue" :
//                     tipoLimpio.includes("deque") ? "deque" : "linkedlist";

//   selectType.value = tipoFinal;
//   selectType.dispatchEvent(new Event("change"));
//   btnInicializar.click();

//   if (!nodos || nodos.length === 0) return;

//   // Pausa inicial para que se dibuje la flecha inicial
//   await new Promise((resolve) => setTimeout(resolve, 300));

//   for (let i = 0; i < nodos.length; i++) {
//     inputNodo.value = nodos[i];
//     inputNodo.dispatchEvent(new Event("input"));

//     // Preparamos la promesa que se resolverá ÚNICAMENTE cuando termine la animación visual
//     const promesaAnimacion = new Promise((resolve) => {
//       const handler = () => {
//         document.removeEventListener("animacion_nodo_completada", handler);
//         resolve();
//       };
//       document.addEventListener("animacion_nodo_completada", handler);
//     });

//     // Disparamos la acción de agregar
//     if (i === 0) {
//       ejecutarAgregarPrimerNodo(); // Sin await aquí
//     } else {
//       if (tipoFinal === "stack") {
//         ejecutarAgregarNodoAlComienzo();
//       } else {
//         ejecutarAgregarNodoAlFinal();
//       }
//     }

//     // 🛑 EL BUCLE SE DETIENE ACÁ HASTA QUE SE DISPARE 'animacion_nodo_completada'
//     await promesaAnimacion;
//   }

//   inputNodo.value = "";
// };




// //Este es el 6to y anda bien
// const cargarEstructuraEnLienzo = async (tipoRaw, nodos) => {
//   const selectType = document.getElementById("structure_type");
//   const btnInicializar = document.getElementById("inicializar");
//   const inputNodo = document.getElementById("nodo");

//   if (!selectType || !btnInicializar || !inputNodo) return;

//   // 1. Normalización del tipo
//   const tipoLimpio = tipoRaw.toLowerCase();
//   const tipoFinal = tipoLimpio.includes("stack") ? "stack" :
//                     tipoLimpio.includes("queue") && !tipoLimpio.includes("deque") ? "queue" :
//                     tipoLimpio.includes("deque") ? "deque" : "linkedlist";

//   // 2. Seteo del tipo e inicialización del lienzo
//   selectType.value = tipoFinal;
//   btnInicializar.click();

//   if (!nodos || nodos.length === 0) return;

//   // Pausa para asentamiento inicial del DOM
//   await new Promise((res) => setTimeout(res, 250));

//   // 3. Inserción secuencial directa sobre tus controladores
//   for (let i = 0; i < nodos.length; i++) {
//     // Asignación directa de valor al campo (sin dispatchEvent)
//     inputNodo.value = nodos[i];

//     if (i === 0) {
//       await ejecutarAgregarPrimerNodo();
//     } else {
//       if (tipoFinal === "stack") {
//         await ejecutarAgregarNodoAlComienzo();
//       } else {
//         await ejecutarAgregarNodoAlFinal();
//       }
//     }
//   }

//   // Limpieza del campo
//   inputNodo.value = "";
// };











//Este es el ultimo que agregué, y el de arriba es el 6to creo, y anda bien, ahora este es el 7mo es actualizado.
const cargarEstructuraEnLienzo = async (tipoRaw, nodos) => {
  const selectType = document.getElementById("structure_type");
  const btnInicializar = document.getElementById("inicializar");
  const inputNodo = document.getElementById("nodo");

  if (!selectType || !btnInicializar || !inputNodo) return;

  // 1. Resetear variables CSS y geométrica de :root de forma instantánea
  if (typeof prepararDOMParaEstado1 === "function") {
    prepararDOMParaEstado1();
  }

  // 2. Normalización del tipo
  const tipoLimpio = (tipoRaw || "").toLowerCase();
  const tipoFinal = tipoLimpio.includes("stack") ? "stack" :
                    tipoLimpio.includes("queue") && !tipoLimpio.includes("deque") ? "queue" :
                    tipoLimpio.includes("deque") ? "deque" : "linkedlist";

  // 3. Seteo del tipo e inicialización del lienzo
  selectType.value = tipoFinal;
  btnInicializar.click();

  if (!nodos || nodos.length === 0) return;

  // Pausa para asentamiento inicial del DOM
  await new Promise((res) => setTimeout(res, 250));

  // 4. Inserción secuencial respetando tus promesas de animación
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

  // Limpieza del campo
  inputNodo.value = "";
};






















// const cargarEstructuraEnLienzo = async (tipoRaw, nodos) => {
//   // 🧹 0. Resetear el lienzo a estado cero antes de dibujar la nueva estructura
//   reiniciarVisualizador();

//   const selectType = document.getElementById("structure_type");
//   const btnInicializar = document.getElementById("inicializar");
//   const inputNodo = document.getElementById("nodo");

//   if (!selectType || !btnInicializar || !inputNodo) return;

//   // 1. Normalización del tipo
//   const tipoLimpio = tipoRaw.toLowerCase();
//   const tipoFinal = tipoLimpio.includes("stack") ? "stack" :
//                     tipoLimpio.includes("queue") && !tipoLimpio.includes("deque") ? "queue" :
//                     tipoLimpio.includes("deque") ? "deque" : "linkedlist";

//   // 2. Seteo del tipo e inicialización del lienzo
//   selectType.value = tipoFinal;
//   btnInicializar.click();

//   if (!nodos || nodos.length === 0) return;

//   // Pausa para asentamiento inicial del DOM
//   await new Promise((res) => setTimeout(res, 250));

//   // 3. Inserción secuencial directa sobre tus controladores
//   for (let i = 0; i < nodos.length; i++) {
//     inputNodo.value = nodos[i];

//     if (i === 0) {
//       await ejecutarAgregarPrimerNodo();
//     } else {
//       if (tipoFinal === "stack") {
//         await ejecutarAgregarNodoAlComienzo();
//       } else {
//         await ejecutarAgregarNodoAlFinal();
//       }
//     }
//   }

//   // Limpieza del campo
//   inputNodo.value = "";
// };



// const cargarEstructuraEnLienzo = async (tipoRaw, nodos) => {
//   // 1. Reset estricto de CSS y variables en TS
//   hardResetPunterosYFlechas();

//   // 2. Esperar 1 frame de animación para que el navegador aplique la quita de estilos inline
//   await new Promise((resolve) => requestAnimationFrame(resolve));

//   const selectType = document.getElementById("structure_type");
//   const btnInicializar = document.getElementById("inicializar");
//   const inputNodo = document.getElementById("nodo");

//   if (!selectType || !btnInicializar || !inputNodo) return;

//   const tipoLimpio = tipoRaw.toLowerCase();
//   const tipoFinal = tipoLimpio.includes("stack") ? "stack" :
//                     tipoLimpio.includes("queue") && !tipoLimpio.includes("deque") ? "queue" :
//                     tipoLimpio.includes("deque") ? "deque" : "linkedlist";

//   selectType.value = tipoFinal;
  
//   // Disparar inicializar para que la UI cree el contenedor e instancie los punteros de cero
//   btnInicializar.click();

//   // 3. Esperar a que el navegador procese los estilos iniciales del DOM (Reflow)
//   await new Promise((resolve) => setTimeout(resolve, 100));

//   if (!nodos || nodos.length === 0) return;

//   // 4. Dibujar los nodos
//   for (let i = 0; i < nodos.length; i++) {
//     inputNodo.value = nodos[i];

//     if (i === 0) {
//       const promesaAnimacion = esperarFinAnimacion();
//       await ejecutarAgregarPrimerNodo();
//       await promesaAnimacion;
//     } else {
//       const promesaAnimacion = esperarFinAnimacion();
//       if (tipoFinal === "stack") {
//         await ejecutarAgregarNodoAlComienzo();
//       } else {
//         await ejecutarAgregarNodoAlFinal();
//       }
//       await promesaAnimacion;
//     }
//     await new Promise((res) => setTimeout(res, 50));
//   }

//   inputNodo.value = "";
// };
  return (
    <div>
      <ControlsBar />
      <VisualizationTool />
    </div>
  );
}

export default InteractiveTutorial;