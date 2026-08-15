// import React, { useState } from 'react';
// import CreateStructureForm from '../components/logged/CreateStructureForm';
// import VisualizationTool from '../components/logged/VisualizationTool';
// import ElementManager from '../components/logged/ElementManager';
// import SaveStructureButton from '../components/logged/SaveStructureButton';

// const InteractiveTutorial = () => {
//     const [dataStructure, setDataStructure] = useState([]);

//     const handleCreate = (name) => {
//         // Logic to create a new structure
//         console.log(`Created structure: ${name}`);
//     };

//     const handleAddElement = (element) => {
//         setDataStructure([...dataStructure, element]);
//     };

//     const handleRemoveElement = (element) => {
//         setDataStructure(dataStructure.filter(el => el !== element));
//     };

//     const handleSave = () => {
//         // Logic to save the structure
//         console.log('Structure saved:', dataStructure);
//     };

//     return (
//         <div>
//             <h1>Interactive Tutorial</h1>
//             <CreateStructureForm onCreate={handleCreate} />
//             <VisualizationTool dataStructure={dataStructure} />
//             <ElementManager 
//                 dataStructure={dataStructure} 
//                 onAdd={handleAddElement} 
//                 onRemove={handleRemoveElement} 
//             />
//             <SaveStructureButton onSave={handleSave} />
//         </div>
//     );
// };

// export default InteractiveTutorial;


// import { useRef, useState } from "react";
// import CreateStructureForm from '../components/logged/interactiveTutorial/controls/CreateStructureForm';
// import VisualizationTool from '../components/logged/interactiveTutorial/VisualizationTool';
// import ElementManager from '../components/logged/interactiveTutorial/controls/ElementManager';
// import SaveStructureButton from '../components/logged/interactiveTutorial/controls/SaveStructureButton';


// export default function InteractiveTutorial() {
//   const visualizerRef = useRef(null); // holds the vanilla JS visualizer instance
//   const [structureType, setStructureType] = useState("linkedlist");

//   // Called when a node is clicked in the visualizer
//   const handleNodeClick = (nodeId) => {
//     if (structureType === "linkedlist" || structureType === "doublylinkedlist") {
//       if (visualizerRef.current) {
//         visualizerRef.current.removeNode(nodeId);
//       }
//     }
//   };

//   return (
//     <div>
//       <h1>Interactive Tutorial</h1>

//       {/* Select which data structure to create */}
//       <CreateStructureForm onSelect={setStructureType} />

//       {/* Visualization area */}
//       <VisualizationTool
//         onNodeClick={handleNodeClick}
//         setVisualizerRef={visualizerRef}
//       />

//       {/* Controls: initialize structure, add first node, add/remove nodes */}
//       <ElementManager
//         structureType={structureType}
//         visualizerRef={visualizerRef}
//       />

//       {/* Save the structure to DB */}
//       <SaveStructureButton />
//     </div>
//   );
// }





// // src/views/InteractiveTutorial.js
// import React, { useRef } from 'react';
// import CreateStructureForm from '../components/logged/interactiveTutorial/controls/CreateStructureForm';
// import VisualizationTool from '../components/logged/interactiveTutorial/VisualizationTool';
// import ElementManager from '../components/logged/interactiveTutorial/controls/ElementManager';
// import SaveStructureButton from '../components/logged/interactiveTutorial/controls/SaveStructureButton';


// // import CreateStructureForm from '../components/CreateStructureForm';
// // import ElementManager from '../components/ElementManager';
// // import SaveStructureButton from '../components/SaveStructureButton';
// // import VisualizationTool from '../components/VisualizationTool';

// const InteractiveTutorial = () => {

//    const [initialized, setInitialized] = useState(false);
//   // const visualizerRef = useRef();

//   // // Called when structure is created
//   // const handleCreateStructure = ({ name, type, dataType }) => {
//   //   // Store metadata in React state if needed
//   //   // Initialize vanilla visualizer
//   //   visualizerRef.current.initVisualizer();
//   // };

//   // // Called when adding/removing nodes
//   // const handleAddNode = (value) => {
//   //   visualizerRef.current.addFirstNode(value); // or other functions depending on type
//   // };

//   // const handleRemoveNode = (value) => {
//   //   visualizerRef.current.removeNode(value);
//   // };

//   // // Called when saving structure
//   // const handleSaveStructure = () => {
//   //   visualizerRef.current.collectStructureData(); // optional
//   //   // send data to backend API
//   // };

//   return (
//     <div>

//       <CreateStructureForm onInitialize={() => setInitialized(true)} />
//       {/* <CreateStructureForm onCreate={handleCreateStructure} /> */}

//       <ElementManager onAdd={handleAddNode} onRemove={handleRemoveNode} />

//       <VisualizationTool shouldInit={initialized} />
//       {/* <VisualizationTool ref={visualizerRef} /> */}

//       <SaveStructureButton onSave={handleSaveStructure} />
//     </div>
//   );
// };

// export default InteractiveTutorial;








// import React, { useState, useRef } from "react";
// import CreateStructureForm from "../components/logged/interactiveTutorial/controls/CreateStructureForm";
// import VisualizationTool from "../components/logged/interactiveTutorial/VisualizationTool";
// import ElementManager from "../components/logged/interactiveTutorial/controls/ElementManager";
// import SaveStructureButton from "../components/logged/interactiveTutorial/controls/SaveStructureButton";

// const InteractiveTutorial = () => {
//   const [initialized, setInitialized] = useState(false);

//   const handleAddNode = (value) => {
//     console.log("Add node:", value);
//     // later: call RenderAgregarNuevoNodo here
//   };

//   const handleRemoveNode = () => {
//     console.log("Remove node");
//     // later: call RenderSacarNodo here
//   };

//   const handleSaveStructure = () => {
//     console.log("Save structure");
//     // later: call API to persist structure + nodes
//   };

//   return (
//     <div>
//       {/* Inicializar maps to CreateStructureForm */}
//       <CreateStructureForm onInitialize={() => setInitialized(true)} />

//       {/* Manage nodes */}
//       {initialized && (
//         <ElementManager
//           onAdd={handleAddNode}
//           onRemove={handleRemoveNode}
//         />
//       )}

//       {/* Visualization tool */}
//       <VisualizationTool shouldInit={initialized} />

//       {/* Save to DB */}
//       {initialized && (
//         <SaveStructureButton onSave={handleSaveStructure} />
//       )}
//     </div>
//   );
// };

// export default InteractiveTutorial;





// import  { useState } from 'react';
// import CreateStructureForm from '../components/logged/interactiveTutorial/controls/CreateStructureForm';
// import VisualizationTool from '../components/logged/interactiveTutorial/VisualizationTool';
// import ElementManager from '../components/logged/interactiveTutorial/controls/ElementManager';
// import SaveStructureButton from '../components/logged/interactiveTutorial/controls/SaveStructureButton';

// const InteractiveTutorial = () => {
//   const [initialized, setInitialized] = useState(false);

//   const handleAddNode = (value) => {
//     // Call your vanilla controller for adding node
//     window.agregarNodo && window.agregarNodo(value);
//   };

//   const handleRemoveNode = (index) => {
//     window.sacarNodo && window.sacarNodo(index);
//   };

//   const handleSaveStructure = () => {
//     // Save structure logic
//     console.log("Save structure clicked");
//   };

//   return (
//     <div>
//       {/* <CreateStructureForm onInitialize={() => setInitialized(true)} />
//       <ElementManager onAdd={handleAddNode} onRemove={handleRemoveNode} />
//       <VisualizationTool shouldInit={initialized} />
//       <SaveStructureButton onSave={handleSaveStructure} /> */}
//       <CreateStructureForm onInitialize={() => setInitialized(true)} />
//       <ElementManager />
//       <VisualizationTool shouldInit={initialized} />
//       <SaveStructureButton onSave={handleSaveStructure} />
//     </div>
//   );
// };

// export default InteractiveTutorial;






// import { useState } from "react";
// import CreateStructureForm from "../components/logged/interactiveTutorial/controls/CreateStructureForm";
// import VisualizationTool from "../components/logged/interactiveTutorial/VisualizationTool";
// import ElementManager from "../components/logged/interactiveTutorial/controls/ElementManager";
// import SaveStructureButton from "../components/logged/interactiveTutorial/controls/SaveStructureButton";

// const InteractiveTutorial = () => {
//   const [initialized, setInitialized] = useState(false);

//   const handleAddNode = (value) => {
//     window.agregarNodo && window.agregarNodo(value);
//   };

//   const handleRemoveNode = (indexOrPos) => {
//     window.sacarNodo && window.sacarNodo(indexOrPos);
//   };

//   const handleSaveStructure = () => {
//     console.log("Save structure clicked");
//   };

//   return (
//     <div>
//       {/* Parent controls the initialize action */}
//       <CreateStructureForm onInitialize={() => setInitialized(true)} />

//       {/* Controls exposed to vanilla controllers */}
//       <ElementManager />

//       {/* Visualization canvas: only renders the visual DOM and initializers */}
//       <VisualizationTool shouldInit={initialized} />

//       <SaveStructureButton onSave={handleSaveStructure} />
//     </div>
//   );
// };

// export default InteractiveTutorial;





// import { useState } from "react";
// import CreateStructureForm from "../components/logged/interactiveTutorial/controls/CreateStructureForm";
// import VisualizationTool from "../components/logged/interactiveTutorial/VisualizationTool";
// import ElementManager from "../components/logged/interactiveTutorial/controls/ElementManager";
// import SaveStructureButton from "../components/logged/interactiveTutorial/controls/SaveStructureButton";

// const InteractiveTutorial = () => {
//   const [initialized, setInitialized] = useState(false);

//   // const handleAddNode = (value) => {
//   //   window.agregarNodo && window.agregarNodo(value);
//   // };

//   // const handleRemoveNode = (index) => {
//   //   window.sacarNodo && window.sacarNodo(index);
//   // };

//   const handleSaveStructure = () => {
//     console.log("Save structure clicked");
//   };

//   return (
//     <div>
//       {/* Handles the behavior of the Initialize button */}
//       <CreateStructureForm onInitialize={() => setInitialized(true)} />

//       {/* Button wrappers */}
//       <ElementManager />

//       {/* Visualization containers, only DOM references */}
//       <VisualizationTool initialized={initialized} />

//       <SaveStructureButton onSave={handleSaveStructure} />
//     </div>
//   );
// };

// export default InteractiveTutorial;


// import {useEffect} from "react";
// import CreateStructureForm from "../components/logged/interactiveTutorial/controls/CreateStructureForm";
// import ElementManager from "../components/logged/interactiveTutorial/controls/ElementManager";
// import VisualizationTool from "../components/logged/interactiveTutorial/VisualizationTool";
// import SaveStructureButton from "../components/logged/interactiveTutorial/controls/SaveStructureButton";


// import { initControladorBarraSuperior } from "../visualizer/controladores/ControladorBarraSuperior";


// const InteractiveTutorial = () => {


//    useEffect(() => {
//     initControladorBarraSuperior();
//   }, []);

//   return (
//     <div>
//       {/* Keep CreateStructureForm and ElementManager here (once each) */}
//       <CreateStructureForm />
//       <ElementManager />

//       {/* VisualizationTool must be present once so containers exist for vanilla code */}
//       <VisualizationTool />

//       <SaveStructureButton />
//     </div>
//   );
// };

// export default InteractiveTutorial;





// import { useEffect } from "react";
// import CreateStructureForm from "../components/interactiveTutorial/controls/CreateStructureForm";
// import ElementManager from "../components/interactiveTutorial/controls/ElementManager";
// import VisualizationTool from "../components/interactiveTutorial/VisualizationTool";
// import { initControladorBarraSuperior } from "../visualizer/controladores/ControladorBarraSuperior.ts";

// function InteractiveTutorial() {
//   useEffect(() => {
//     // run the controller AFTER React has mounted the Buttons + Containers
//     initControladorBarraSuperior();
//   }, []);

//   return (
//     <div>
//       <CreateStructureForm />
//       <ElementManager />
//       <VisualizationTool />
//     </div>
//   );
// }

// export default InteractiveTutorial;





// import { useEffect } from "react";
// import ControlsBar from "../components/interactiveTutorial/controls/ControlsBar";
// import VisualizationTool from "../components/interactiveTutorial/VisualizationTool";
// import { initControladorBarraSuperior } from "../visualizer/controladores/ControladorBarraSuperior.ts";

// function InteractiveTutorial() {
//   useEffect(() => {
//     // Inicializa el controlador cuando TODO el HTML de los controles ya exista en el DOM
//     initControladorBarraSuperior();
//   }, []);

//   return (
//     <div>
//       <ControlsBar />
//       <VisualizationTool />
//     </div>
//   );
// }

// export default InteractiveTutorial;







// import { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import ControlsBar from "../components/interactiveTutorial/controls/ControlsBar";
// import VisualizationTool from "../components/interactiveTutorial/VisualizationTool";
// import { initControladorBarraSuperior } from "../visualizer/controladores/ControladorBarraSuperior.ts";
// import structuresData from "../data/structuresOverviewData.json";

// function InteractiveTutorial() {
//   const [searchParams] = useSearchParams();

//   useEffect(() => {
//     // 1. Inicializa los listeners y eventos Vanilla de la barra superior
//     initControladorBarraSuperior();

//     // 2. Lee el parámetro de la URL
//     const typeParam = searchParams.get("type");

//     if (typeParam) {
//       const template = structuresData.find(
//         (item) => item.type.toLowerCase() === typeParam.toLowerCase()
//       );

//       if (template) {
//         // Le damos un pequeño timeout para asegurar que el DOM y los listeners de TS estén listos
//         setTimeout(() => {
//           cargarPlantillaEnDOM(template);
//         }, 100);
//       }
//     }
//   }, [searchParams]);

//   const cargarPlantillaEnDOM = (template) => {
//     const selectType = document.getElementById("structure_type");
//     const btnInicializar = document.getElementById("inicializar");

//     if (selectType && btnInicializar) {
//       // Setea el tipo de estructura en el select HTML
//       selectType.value = template.id.replace("-", ""); // Alinea 'linked-list' -> 'linkedlist'
//       selectType.dispatchEvent(new Event("change"));

//       // Dispara el evento del botón "Crear Estructura"
//       btnInicializar.click();

//       // Si hay nodos por defecto en la plantilla, los agrega en secuencia
//       if (template.defaultNodes && template.defaultNodes.length > 0) {
//         template.defaultNodes.forEach((valorNodo, index) => {
//           setTimeout(() => {
//             const inputNodo = document.getElementById("nodo");
//             const btnPrimerNodo = document.getElementById("agregar_1er_nodo");
//             const btnAgregarFinal = document.getElementById("agregar_final");

//             if (inputNodo) {
//               inputNodo.value = valorNodo;
//               inputNodo.dispatchEvent(new Event("input"));

//               if (index === 0 && btnPrimerNodo && !btnPrimerNodo.hidden) {
//                 btnPrimerNodo.click();
//               } else if (btnAgregarFinal && !btnAgregarFinal.hidden) {
//                 btnAgregarFinal.click();
//               }
//             }
//           }, (index + 1) * 300); // 300ms de delay entre nodo y nodo para que las animaciones de TS no colisionen
//         }, 200);
//       }
//     }
//   };

//   return (
//     <div>
//       <ControlsBar />
//       <VisualizationTool />
//     </div>
//   );
// }

// export default InteractiveTutorial;




import { useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import ControlsBar from "../components/interactiveTutorial/controls/ControlsBar";
import VisualizationTool from "../components/interactiveTutorial/VisualizationTool";
import { initControladorBarraSuperior } from "../visualizer/controladores/ControladorBarraSuperior.ts";
import structuresData from "../data/structuresOverviewData.json";

// Helper que pausa la ejecución hasta que TypeScript dispare el evento 'animacion_nodo_completada'
const esperarFinAnimacion = () => {
  return new Promise((resolve) => {
    const alTerminar = () => {
      document.removeEventListener("animacion_nodo_completada", alTerminar);
      resolve();
    };
    document.addEventListener("animacion_nodo_completada", alTerminar);
  });
};

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

  // Función asíncrona determinista
  const cargarEstructuraEnLienzo = async (tipo, nodos) => {
    const selectType = document.getElementById("structure_type");
    const btnInicializar = document.getElementById("inicializar");

    if (!selectType || !btnInicializar) return;

    // A. Seleccionar el tipo de estructura e inicializar
    selectType.value = tipo.toLowerCase().replace(/[- ]/g, "");
    selectType.dispatchEvent(new Event("change"));
    btnInicializar.click();

    if (!nodos || nodos.length === 0) return;

    // B. Recorrer nodos en secuencia sincronizada por eventos
    for (let i = 0; i < nodos.length; i++) {
      const inputNodo = document.getElementById("nodo");
      const btnPrimerNodo = document.getElementById("agregar_1er_nodo");
      const btnAgregarFinal = document.getElementById("agregar_final");

      const btnAUsar = i === 0 ? btnPrimerNodo : btnAgregarFinal;

      if (inputNodo && btnAUsar) {
        inputNodo.value = nodos[i];
        inputNodo.dispatchEvent(new Event("input"));

        // Dispara la acción de insertar
        btnAUsar.click();

        // EL BUCLE SE PAUSA AQUÍ hasta que tu TypeScript emita 'animacion_nodo_completada'
        await esperarFinAnimacion();
      }
    }
  };

  return (
    <div>
      <ControlsBar />
      <VisualizationTool />
    </div>
  );
}

export default InteractiveTutorial;