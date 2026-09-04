import React, { useState } from "react";
import HelpModal from "./HelpModal"; // Crearemos este componente abajo

const ControlsBar = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div id="barra_superior" className="bg-dark text-light p-3 border-bottom border-secondary d-flex flex-column gap-2">
      {/* Botón de Ayuda Flotante / Superior */}
      <div className="d-flex justify-content-between align-items-center">
        <span className="fw-bold text-info">Visualizer Control Panel</span>
        <button 
          type="button" 
          className="btn btn-outline-info btn-sm"
          onClick={() => setShowHelp(true)}
        >
          ❓ ¿How to use the canvas?
        </button>
      </div>

      {/* SECCIÓN A: Configuración y Creación de la Estructura */}
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

      {/* SECCIÓN B: Gestión Dinámica */}
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

      {/* Modal Emergente de Ayuda */}
      <HelpModal show={showHelp} onHide={() => setShowHelp(false)} />
    </div>
  );
};

export default ControlsBar;