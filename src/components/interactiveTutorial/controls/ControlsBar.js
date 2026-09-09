// import React, { useState } from "react";
// import HelpModal from "./HelpModal"; // Crearemos este componente abajo

// const ControlsBar = () => {
//   const [showHelp, setShowHelp] = useState(false);

//   return (
//     <div id="barra_superior" className="bg-dark text-light p-3 border-bottom border-secondary d-flex flex-column gap-2">
//       {/* Botón de Ayuda Flotante / Superior */}
//       <div className="d-flex justify-content-between align-items-center">
//         <span className="fw-bold text-info">Visualizer Control Panel</span>
//         <button 
//           type="button" 
//           className="btn btn-outline-info btn-sm"
//           onClick={() => setShowHelp(true)}
//         >
//           ❓ ¿How to use the canvas?
//         </button>
//       </div>

//       {/* SECCIÓN A: Configuración y Creación de la Estructura */}
//       <div id="seccion_creacion" className="d-flex align-items-center gap-2 flex-wrap">
//         <label className="mb-0">Name:</label>
//         <input type="text" id="structure_name" placeholder="Ej: Mi Pila" className="form-control form-control-sm w-auto bg-dark text-light border-secondary" />

//         <label className="mb-0">Type:</label>
//         <select id="structure_type" className="form-select form-select-sm w-auto bg-dark text-light border-secondary">
//           <option value="linkedlist">Linked List</option>
//           <option value="doublylinkedlist">Doubly Linked List</option>
//           <option value="stack">Stack</option>
//           <option value="queue">Queue</option>
//           <option value="deque">Double-Ended Queue</option>
//         </select>

//         <label className="mb-0">Data Type:</label>
//         <select id="data_type" className="form-select form-select-sm w-auto bg-dark text-light border-secondary">
//           <option value="number">Numbers</option>
//           <option value="letter">Letters</option>
//           <option value="string">Strings</option>
//         </select>

//         <button type="button" id="inicializar" className="btn btn-info btn-sm fw-bold">Create Structure</button>
//       </div>

//       <hr className="border-secondary my-1" />

//       {/* SECCIÓN B: Gestión Dinámica */}
//       <div id="seccion_operaciones" className="d-flex align-items-center gap-2 flex-wrap">
//         <span hidden id="texto">Enter the node value: </span>
//         <input type="text" name="nodo" id="nodo" hidden className="form-control form-control-sm w-auto bg-dark text-light border-secondary" />
        
//         <button type="button" id="agregar_1er_nodo" hidden className="btn btn-success btn-sm">Add 1st node</button>
//         <button type="button" id="agregar_comienzo" hidden className="btn btn-primary btn-sm">Add at start</button>
//         <button type="button" id="agregar_final" hidden className="btn btn-primary btn-sm">Add at end</button>
        
//         <button type="button" id="borrar_comienzo" hidden className="btn btn-danger btn-sm">Remove at start</button>
//         <button type="button" id="borrar_final" hidden className="btn btn-danger btn-sm">Remove at end</button>


//         <span id="texto-selector" hidden>Select position: </span>
//         <select id="selector-pares" hidden className="form-select form-select-sm w-auto bg-dark text-light border-secondary"></select>
//         <button type="button" id="agregar_intermedio" hidden className="btn btn-warning btn-sm">Run</button>
//         <button type="button" id="guardar" hidden className="btn btn-outline-success btn-sm">Save on Cloud</button>
//       </div>

//       {/* Modal Emergente de Ayuda */}
//       <HelpModal show={showHelp} onHide={() => setShowHelp(false)} />
//     </div>
//   );
// };

// export default ControlsBar;






// import React, { useState } from "react";
// import HelpModal from "./HelpModal";
// import html2canvas from "html2canvas";

// const ControlsBar = () => {
//   const [showHelp, setShowHelp] = useState(false);
//   const [capturing, setCapturing] = useState(false);

//   // 📸 Capturar el contenedor de nodos y guardarlo
//   const handleTakeSnapshot = async () => {
//     const canvasContainer = document.getElementById("contenedor_nodos") || document.getElementById("principal_wrapper");
//     if (!canvasContainer) {
//       alert("Canvas wrapper not found.");
//       return;
//     }

//     try {
//       setCapturing(true);
//       const canvas = await html2canvas(canvasContainer, { backgroundColor: "#121212" });
//       const imageBase64 = canvas.toDataURL("image/png");
      
//       // Guardamos la captura para usarla en PostForm.js
//       localStorage.setItem("pending_canvas_snapshot", imageBase64);
//       alert("Snapshot captured! You can now attach it when creating a new Post in Community.");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to capture canvas.");
//     } finally {
//       setCapturing(false);
//     }
//   };

//   return (
//     <div id="barra_superior" className="bg-dark text-light p-3 border-bottom border-secondary d-flex flex-column gap-2">
//       <div className="d-flex justify-content-between align-items-center">
//         <span className="fw-bold text-info">Visualizer Control Panel</span>
//         <div className="d-flex gap-2">
//           <button 
//             type="button" 
//             className="btn btn-outline-warning btn-sm"
//             onClick={handleTakeSnapshot}
//             disabled={capturing}
//           >
//             📸 {capturing ? "Capturing..." : "Snapshot Canvas"}
//           </button>
//           <button 
//             type="button" 
//             className="btn btn-outline-info btn-sm"
//             onClick={() => setShowHelp(true)}
//           >
//             ❓ ¿How to use the canvas?
//           </button>
//         </div>
//       </div>

//       {/* SECCIÓN A */}
//       <div id="seccion_creacion" className="d-flex align-items-center gap-2 flex-wrap">
//         <label className="mb-0">Name:</label>
//         <input type="text" id="structure_name" placeholder="Ej: Mi Pila" className="form-control form-control-sm w-auto bg-dark text-light border-secondary" />

//         <label className="mb-0">Type:</label>
//         <select id="structure_type" className="form-select form-select-sm w-auto bg-dark text-light border-secondary">
//           <option value="linkedlist">Linked List</option>
//           <option value="doublylinkedlist">Doubly Linked List</option>
//           <option value="stack">Stack</option>
//           <option value="queue">Queue</option>
//           <option value="deque">Double-Ended Queue</option>
//         </select>

//         <label className="mb-0">Data Type:</label>
//         <select id="data_type" className="form-select form-select-sm w-auto bg-dark text-light border-secondary">
//           <option value="number">Numbers</option>
//           <option value="letter">Letters</option>
//           <option value="string">Strings</option>
//         </select>

//         <button type="button" id="inicializar" className="btn btn-info btn-sm fw-bold">Create Structure</button>
//       </div>

//       <hr className="border-secondary my-1" />

//       {/* SECCIÓN B */}
//       <div id="seccion_operaciones" className="d-flex align-items-center gap-2 flex-wrap">
//         <span hidden id="texto">Enter the node value: </span>
//         <input type="text" name="nodo" id="nodo" hidden className="form-control form-control-sm w-auto bg-dark text-light border-secondary" />
        
//         <button type="button" id="agregar_1er_nodo" hidden className="btn btn-success btn-sm">Add 1st node</button>
//         <button type="button" id="agregar_comienzo" hidden className="btn btn-primary btn-sm">Add at start</button>
//         <button type="button" id="agregar_final" hidden className="btn btn-primary btn-sm">Add at end</button>
        
//         <button type="button" id="borrar_comienzo" hidden className="btn btn-danger btn-sm">Remove at start</button>
//         <button type="button" id="borrar_final" hidden className="btn btn-danger btn-sm">Remove at end</button>

//         <span id="texto-selector" hidden>Select position: </span>
//         <select id="selector-pares" hidden className="form-select form-select-sm w-auto bg-dark text-light border-secondary"></select>
//         <button type="button" id="agregar_intermedio" hidden className="btn btn-warning btn-sm">Run</button>
//         <button type="button" id="guardar" hidden className="btn btn-outline-success btn-sm">Save on Cloud</button>
//       </div>

//       <HelpModal show={showHelp} onHide={() => setShowHelp(false)} />
//     </div>
//   );
// };

// export default ControlsBar;



// import React, { useState } from "react";
// import HelpModal from "./HelpModal";
// import html2canvas from "html2canvas";

// const ControlsBar = () => {
//   const [showHelp, setShowHelp] = useState(false);
//   const [capturing, setCapturing] = useState(false);

//   // 📸 Capturar el lienzo completo (Nodos + Flechas + Punteros)
//   const handleTakeSnapshot = async () => {
//     // 🎯 Priorizamos el contenedor global del lienzo que envuelve:
//     // - contenedor_nodos
//     // - contenedor_flechas / capas SVG
//     // - contenedor_inicializador / punteros cabeza y cola
//     const canvasContainer = 
//       document.getElementById("principal_wrapper") || 
//       document.getElementById("lienzo_principal") || 
//       document.getElementById("contenedor_nodos");

//     if (!canvasContainer) {
//       alert("Canvas wrapper not found.");
//       return;
//     }

//     try {
//       setCapturing(true);
//       const canvas = await html2canvas(canvasContainer, { 
//         backgroundColor: "#121212",
//         useCORS: true,      // Permite capturar elementos gráficos/SVG
//         allowTaint: true,   // Asegura captura de fuentes e íconos renderizados
//         scale: 2,           // Doble resolución para que las flechas y textos se vean nítidos
//         logging: false
//       });

//       const imageBase64 = canvas.toDataURL("image/png");
      
//       // Guardamos la captura para usarla en PostForm.js
//       localStorage.setItem("pending_canvas_snapshot", imageBase64);
//       alert("Snapshot captured! You can now attach it when creating a new Post in Community.");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to capture canvas.");
//     } finally {
//       setCapturing(false);
//     }
//   };

//   return (
//     <div id="barra_superior" className="bg-dark text-light p-3 border-bottom border-secondary d-flex flex-column gap-2">
//       <div className="d-flex justify-content-between align-items-center">
//         <span className="fw-bold text-info">Visualizer Control Panel</span>
//         <div className="d-flex gap-2">
//           <button 
//             type="button" 
//             className="btn btn-outline-warning btn-sm"
//             onClick={handleTakeSnapshot}
//             disabled={capturing}
//           >
//             📸 {capturing ? "Capturing..." : "Snapshot Canvas"}
//           </button>
//           <button 
//             type="button" 
//             className="btn btn-outline-info btn-sm"
//             onClick={() => setShowHelp(true)}
//           >
//             ❓ ¿How to use the canvas?
//           </button>
//         </div>
//       </div>

//       {/* SECCIÓN A */}
//       <div id="seccion_creacion" className="d-flex align-items-center gap-2 flex-wrap">
//         <label className="mb-0">Name:</label>
//         <input type="text" id="structure_name" placeholder="Ej: Mi Pila" className="form-control form-control-sm w-auto bg-dark text-light border-secondary" />

//         <label className="mb-0">Type:</label>
//         <select id="structure_type" className="form-select form-select-sm w-auto bg-dark text-light border-secondary">
//           <option value="linkedlist">Linked List</option>
//           <option value="doublylinkedlist">Doubly Linked List</option>
//           <option value="stack">Stack</option>
//           <option value="queue">Queue</option>
//           <option value="deque">Double-Ended Queue</option>
//         </select>

//         <label className="mb-0">Data Type:</label>
//         <select id="data_type" className="form-select form-select-sm w-auto bg-dark text-light border-secondary">
//           <option value="number">Numbers</option>
//           <option value="letter">Letters</option>
//           <option value="string">Strings</option>
//         </select>

//         <button type="button" id="inicializar" className="btn btn-info btn-sm fw-bold">Create Structure</button>
//       </div>

//       <hr className="border-secondary my-1" />

//       {/* SECCIÓN B */}
//       <div id="seccion_operaciones" className="d-flex align-items-center gap-2 flex-wrap">
//         <span hidden id="texto">Enter the node value: </span>
//         <input type="text" name="nodo" id="nodo" hidden className="form-control form-control-sm w-auto bg-dark text-light border-secondary" />
        
//         <button type="button" id="agregar_1er_nodo" hidden className="btn btn-success btn-sm">Add 1st node</button>
//         <button type="button" id="agregar_comienzo" hidden className="btn btn-primary btn-sm">Add at start</button>
//         <button type="button" id="agregar_final" hidden className="btn btn-primary btn-sm">Add at end</button>
        
//         <button type="button" id="borrar_comienzo" hidden className="btn btn-danger btn-sm">Remove at start</button>
//         <button type="button" id="borrar_final" hidden className="btn btn-danger btn-sm">Remove at end</button>

//         <span id="texto-selector" hidden>Select position: </span>
//         <select id="selector-pares" hidden className="form-select form-select-sm w-auto bg-dark text-light border-secondary"></select>
//         <button type="button" id="agregar_intermedio" hidden className="btn btn-warning btn-sm">Run</button>
//         <button type="button" id="guardar" hidden className="btn btn-outline-success btn-sm">Save on Cloud</button>
//       </div>

//       <HelpModal show={showHelp} onHide={() => setShowHelp(false)} />
//     </div>
//   );
// };

// export default ControlsBar;



import React, { useState } from "react";
import HelpModal from "./HelpModal";
import html2canvas from "html2canvas";

const ControlsBar = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [capturing, setCapturing] = useState(false);

  // 📸 Capturar el contenedor real del lienzo (#principal) completo
  // const handleTakeSnapshot = async () => {
  //   // 🎯 Apuntamos directamente a #principal (que contiene nodos, punteros y flechas)
  //   const canvasContainer = document.getElementById("principal");

  //   if (!canvasContainer) {
  //     alert("Canvas container (#principal) not found.");
  //     return;
  //   }

  //   try {
  //     setCapturing(true);

  //     // Leemos el tamaño total real del lienzo (incluso si excede la pantalla con scroll)
  //     const fullWidth = canvasContainer.scrollWidth;
  //     const fullHeight = canvasContainer.scrollHeight;

  //     const canvas = await html2canvas(canvasContainer, {
  //       backgroundColor: "#121212",
  //       useCORS: true,        // Renderiza flechas y elementos gráficos externos/SVG
  //       allowTaint: true,     // Asegura fuentes y estilos
  //       scale: 2,             // Alta resolución/nitidez
  //       logging: false,
  //       width: fullWidth,     // Ancho completo real
  //       height: fullHeight,   // Alto completo real
  //       windowWidth: fullWidth,
  //       windowHeight: fullHeight,
  //       x: 0,
  //       y: 0,
  //       scrollX: 0,
  //       scrollY: 0
  //     });

  //     const imageBase64 = canvas.toDataURL("image/png");

  //     // Guardamos la captura para usarla en PostForm.js
  //     localStorage.setItem("pending_canvas_snapshot", imageBase64);
  //     alert("Snapshot captured! You can now attach it when creating a new Post in Community.");
  //   } catch (err) {
  //     console.error("Error capturing canvas:", err);
  //     alert("Failed to capture canvas.");
  //   } finally {
  //     setCapturing(false);
  //   }
  // };

  // const handleTakeSnapshot = async () => {
  //   const canvasContainer = document.getElementById("principal");

  //   if (!canvasContainer) {
  //     alert("Canvas container (#principal) not found.");
  //     return;
  //   }

  //   try {
  //     setCapturing(true);

  //     const fullWidth = canvasContainer.scrollWidth;
  //     const fullHeight = canvasContainer.scrollHeight;

  //     const canvas = await html2canvas(canvasContainer, {
  //       backgroundColor: "#121212",
  //       useCORS: true,
  //       allowTaint: true,
  //       scale: 1, // 👈 Reducimos scale a 1 para no satura la memoria
  //       logging: false,
  //       width: fullWidth,
  //       height: fullHeight,
  //       windowWidth: fullWidth,
  //       windowHeight: fullHeight,
  //       x: 0,
  //       y: 0,
  //       scrollX: 0,
  //       scrollY: 0
  //     });

  //     // 🎯 IMPORTANTE: Guardamos en JPEG con compresión 0.75 en vez de PNG pesado
  //     const imageBase64 = canvas.toDataURL("image/jpeg", 0.75);

  //     try {
  //       localStorage.setItem("pending_canvas_snapshot", imageBase64);
  //       alert("Snapshot captured! You can now attach it when creating a new Post in Community.");
  //     } catch (storageErr) {
  //       console.error("Storage full error:", storageErr);
  //       alert("The image is too large to save in local storage. Try a smaller canvas.");
  //     }

  //   } catch (err) {
  //     console.error("Error capturing canvas:", err);
  //     alert("Failed to capture canvas.");
  //   } finally {
  //     setCapturing(false);
  //   }
  // };


  // const handleTakeSnapshot = async () => {
  //   const canvasContainer = document.getElementById("principal");

  //   if (!canvasContainer) {
  //     alert("Canvas container (#principal) not found.");
  //     return;
  //   }

  //   try {
  //     setCapturing(true);

  //     // 1️⃣ Guardar la posición actual del scroll para restaurarla después
  //     const originalScrollLeft = canvasContainer.scrollLeft;
  //     const originalScrollTop = canvasContainer.scrollTop;

  //     // Resetear scroll temporalmente para que html2canvas no descalibre flechas/posiciones SVG
  //     canvasContainer.scrollLeft = 0;
  //     canvasContainer.scrollTop = 0;

  //     const fullWidth = canvasContainer.scrollWidth;
  //     const fullHeight = canvasContainer.scrollHeight;

  //     const canvas = await html2canvas(canvasContainer, {
  //       backgroundColor: "#121212",
  //       useCORS: true,
  //       allowTaint: true,
  //       scale: 1.5, // 👈 Subimos a 1.5 para mejor definición visual sin saturar el peso
  //       logging: false,
  //       width: fullWidth,
  //       height: fullHeight,
  //       windowWidth: fullWidth,
  //       windowHeight: fullHeight,
  //       x: 0,
  //       y: 0,
  //       scrollX: 0,
  //       scrollY: 0
  //     });

  //     // Restaurar el scroll original del usuario
  //     canvasContainer.scrollLeft = originalScrollLeft;
  //     canvasContainer.scrollTop = originalScrollTop;

  //     // 🎯 Guardamos en JPEG con compresión 0.75 para mantenerlo ligero en localStorage
  //     const imageBase64 = canvas.toDataURL("image/jpeg", 0.75);

  //     try {
  //       localStorage.setItem("pending_canvas_snapshot", imageBase64);
  //       alert("Snapshot captured! You can now attach it when creating a new Post in Community.");
  //     } catch (storageErr) {
  //       console.error("Storage full error:", storageErr);
  //       alert("The image is too large to save in local storage. Try a smaller canvas.");
  //     }

  //   } catch (err) {
  //     console.error("Error capturing canvas:", err);
  //     alert("Failed to capture canvas.");
  //   } finally {
  //     setCapturing(false);
  //   }
  // };


  const handleTakeSnapshot = async () => {
    const canvasContainer = document.getElementById("principal");

    if (!canvasContainer) {
      alert("Canvas container (#principal) not found.");
      return;
    }

    try {
      setCapturing(true);

      // Guardar scroll original y resetear
      const originalScrollLeft = canvasContainer.scrollLeft;
      const originalScrollTop = canvasContainer.scrollTop;
      canvasContainer.scrollLeft = 0;
      canvasContainer.scrollTop = 0;

      // Pequeña pausa para que los divs se recalculen sin scroll
      await new Promise((resolve) => setTimeout(resolve, 50));

      const canvas = await html2canvas(canvasContainer, {
        backgroundColor: "#121212",
        useCORS: true,
        allowTaint: true,
        scale: 1, // 👈 OBLIGATORIO: Evita que html2canvas deforme las matrices de rotación de los divs
        logging: false,
        scrollX: 0,
        scrollY: 0,
        foreignObjectRendering: false
      });

      // Restaurar el scroll original
      canvasContainer.scrollLeft = originalScrollLeft;
      canvasContainer.scrollTop = originalScrollTop;

      const imageBase64 = canvas.toDataURL("image/jpeg", 0.80);

      try {
        localStorage.setItem("pending_canvas_snapshot", imageBase64);
        alert("Snapshot captured! You can now attach it when creating a new Post in Community.");
      } catch (storageErr) {
        console.error("Storage full error:", storageErr);
        alert("The image is too large to save in local storage. Try a smaller canvas.");
      }

    } catch (err) {
      console.error("Error capturing canvas:", err);
      alert("Failed to capture canvas.");
    } finally {
      setCapturing(false);
    }
  };
  return (
    <div id="barra_superior" className="bg-dark text-light p-3 border-bottom border-secondary d-flex flex-column gap-2">
      <div className="d-flex justify-content-between align-items-center">
        <span className="fw-bold text-info">Visualizer Control Panel</span>
        <div className="d-flex gap-2">
          <button 
            type="button" 
            className="btn btn-outline-warning btn-sm"
            onClick={handleTakeSnapshot}
            disabled={capturing}
          >
            📸 {capturing ? "Capturing..." : "Snapshot Canvas"}
          </button>
          <button 
            type="button" 
            className="btn btn-outline-info btn-sm"
            onClick={() => setShowHelp(true)}
          >
            ❓ ¿How to use the canvas?
          </button>
        </div>
      </div>

      {/* SECCIÓN A */}
      <div id="seccion_creacion" className="d-flex align-items-center gap-2 flex-wrap">
        <label className="mb-0">Name:</label>
        <input type="text" id="structure_name" placeholder="Ej: Mi Pila" className="form-control form-control-sm w-auto bg-dark text-light border-secondary" />

        <label className="mb-0">Type:</label>
        <select id="structure_type" className="form-select form-select-sm w-auto bg-dark text-light border-secondary">
          <option value="linkedlist">Linked List</option>
          <option value="doublylinkedlist">Doubly Linked List</option>
          <option value="stack">Stack</option>
          <option value="queue">Queue</option>
          <option value="deque">Double-Ended Queue</option>
        </select>

        <label className="mb-0">Data Type:</label>
        <select id="data_type" className="form-select form-select-sm w-auto bg-dark text-light border-secondary">
          <option value="number">Numbers</option>
          <option value="letter">Letters</option>
          <option value="string">Strings</option>
        </select>

        <button type="button" id="inicializar" className="btn btn-info btn-sm fw-bold">Create Structure</button>
      </div>

      <hr className="border-secondary my-1" />

      {/* SECCIÓN B */}
      <div id="seccion_operaciones" className="d-flex align-items-center gap-2 flex-wrap">
        <span hidden id="texto">Enter the node value: </span>
        <input type="text" name="nodo" id="nodo" hidden className="form-control form-control-sm w-auto bg-dark text-light border-secondary" />
        
        <button type="button" id="agregar_1er_nodo" hidden className="btn btn-success btn-sm">Add 1st node</button>
        <button type="button" id="agregar_comienzo" hidden className="btn btn-primary btn-sm">Add at start</button>
        <button type="button" id="agregar_final" hidden className="btn btn-primary btn-sm">Add at end</button>
        
        <button type="button" id="borrar_comienzo" hidden className="btn btn-danger btn-sm">Remove at start</button>
        <button type="button" id="borrar_final" hidden className="btn btn-danger btn-sm">Remove at end</button>

        <span id="texto-selector" hidden>Select position: </span>
        <select id="selector-pares" hidden className="form-select form-select-sm w-auto bg-dark text-light border-secondary"></select>
        <button type="button" id="agregar_intermedio" hidden className="btn btn-warning btn-sm">Run</button>
        <button type="button" id="guardar" hidden className="btn btn-outline-success btn-sm">Save on Cloud</button>
      </div>

      <HelpModal show={showHelp} onHide={() => setShowHelp(false)} />
    </div>
  );
};

export default ControlsBar;