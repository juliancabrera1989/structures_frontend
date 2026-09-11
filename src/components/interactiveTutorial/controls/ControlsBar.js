import { useState } from "react";
import HelpModal from "./HelpModal";
import html2canvas from "html2canvas";

const ControlsBar = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [capturing, setCapturing] = useState(false);

  
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