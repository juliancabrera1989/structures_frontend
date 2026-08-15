// import React, { useState } from 'react';

// const ElementManager = ({ dataStructure, onAdd, onRemove }) => {
//     const [element, setElement] = useState('');

//     const handleAdd = () => {
//         onAdd(element);
//         setElement('');
//     };

//     const handleRemove = () => {
//         onRemove(element);
//         setElement('');
//     };

//     return (
//         <div>
//             <h3>Manage Elements</h3>
//             <input 
//                 type="text" 
//                 value={element} 
//                 onChange={(e) => setElement(e.target.value)} 
//             />
//             <button onClick={handleAdd}>Add Element</button>
//             <button onClick={handleRemove}>Remove Element</button>
//         </div>
//     );
// };

// export default ElementManager;






// import React from 'react';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';

// const ElementManager = ({ structure, onAddNode, onRemoveNode }) => {
//   return (
//     <Container className="mt-4">
//       <h4 className="text-center mb-4">Structure Manipulation Tool</h4>
//       <Form>
//         <Row>
//           <Col xs={12} md={8}>
//             <Form.Group controlId="addNode">
//               <Form.Label>Node Value</Form.Label>
//               <Form.Control type="text" placeholder="Enter node value" />
//             </Form.Group>
//           </Col>
//           <Col xs={12} md={4}>
//             <Button variant="primary" onClick={onAddNode} className="mt-md-4">
//               Add Node
//             </Button>
//           </Col>
//         </Row>
//         <Button variant="danger" onClick={onRemoveNode} className="mt-3">
//           Remove Node
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default ElementManager;





// import React, { useState } from "react";

// export default function ElementManager({ structureType, visualizerRef }) {
//   const [initialized, setInitialized] = useState(false);
//   const [firstNodeValue, setFirstNodeValue] = useState("");
//   const [newNodeValue, setNewNodeValue] = useState("");

//   // Initialize empty structure with pointers
//   const handleInitialize = () => {
//     if (visualizerRef.current) {
//       visualizerRef.current.inicializar();
//       setInitialized(true); // switch buttons
//     }
//   };

//   // Add first node
//   const handleAddFirstNode = () => {
//     if (!firstNodeValue) return;
//     if (visualizerRef.current) {
//       visualizerRef.current.addNode(firstNodeValue);
//       setFirstNodeValue("");
//     }
//   };

//   // Add subsequent nodes (stack/queue/general)
//   const handleAddNode = () => {
//     if (!newNodeValue) return;
//     if (visualizerRef.current) {
//       visualizerRef.current.addNode(newNodeValue);
//       setNewNodeValue("");
//     }
//   };

//   // Remove node (for stack/queue/deque)
//   const handleRemoveNode = () => {
//     if (visualizerRef.current) {
//       visualizerRef.current.removeNode();
//     }
//   };

//   return (
//     <div style={{ marginTop: "20px" }}>
//       {!initialized && (
//         <button onClick={handleInitialize}>Inicializar lista enlazada</button>
//       )}

//       {initialized && (
//         <>
//           {/* First node input */}
//           <input
//             type="text"
//             value={firstNodeValue}
//             onChange={(e) => setFirstNodeValue(e.target.value)}
//             placeholder="Valor del primer nodo"
//           />
//           <button onClick={handleAddFirstNode}>Agregar primer nodo</button>

//           {/* After first node is added, show input for new nodes (stacks/queues) */}
//           {(structureType === "stack" ||
//             structureType === "queue" ||
//             structureType === "deque") && (
//             <>
//               <input
//                 type="text"
//                 value={newNodeValue}
//                 onChange={(e) => setNewNodeValue(e.target.value)}
//                 placeholder="Valor del nodo"
//               />
//               <button onClick={handleAddNode}>Agregar nodo</button>
//               <button onClick={handleRemoveNode}>Eliminar nodo</button>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// }


// import React, { useState } from "react";

// const ElementManager = ({ structureType, onAddNode, onRemoveNode }) => {
//   const [nodeValue, setNodeValue] = useState("");

//   const handleAdd = () => {
//     if (!nodeValue) return;
//     onAddNode(nodeValue);
//     setNodeValue("");
//   };

//   const handleRemove = () => {
//     if (!nodeValue) return;
//     onRemoveNode(nodeValue);
//     setNodeValue("");
//   };

//   return (
//     <div style={{ marginTop: "1rem" }}>
//       <h3>Manage Nodes</h3>
//       <input
//         type="text"
//         placeholder="Enter node value"
//         value={nodeValue}
//         onChange={(e) => setNodeValue(e.target.value)}
//       />

//       {/* Stack / Queue: single add/remove */}
//       {(structureType === "stack" || structureType === "queue") && (
//         <>
//           <button onClick={handleAdd}>Add</button>
//           <button onClick={handleRemove}>Remove</button>
//         </>
//       )}

//       {/* Deque: add/remove at beginning/end */}
//       {structureType === "deque" && (
//         <>
//           <button onClick={() => onAddNode(nodeValue, "start")}>Add Start</button>
//           <button onClick={() => onAddNode(nodeValue, "end")}>Add End</button>
//           <button onClick={() => onRemoveNode("start")}>Remove Start</button>
//           <button onClick={() => onRemoveNode("end")}>Remove End</button>
//         </>
//       )}

//       {/* Linked List: click node to remove */}
//       {structureType === "linkedlist" && (
//         <p>Click a node in the visualizer to remove it.</p>
//       )}
//     </div>
//   );
// };

// export default ElementManager;


// import React, { useRef, useEffect } from "react";

// const ElementManager = ({ structureType }) => {
//   // Refs to buttons
//   const agregar1erNodoRef = useRef(null);
//   const agregarComienzoRef = useRef(null);
//   const agregarFinalRef = useRef(null);

//   // Optional: you can expose them globally for vanilla controllers
//   useEffect(() => {
//     window.agregar_1er_nodo = agregar1erNodoRef.current;
//     window.agregar_comienzo = agregarComienzoRef.current;
//     window.agregar_final = agregarFinalRef.current;
//   }, []);

//   return (
//     <div id="barra_superior">
//       <button type="submit" id="inicializar">Inicializar lista enlazada</button>

//       <input type="text" id="nodo" hidden />

//       <button type="submit" id="agregar_1er_nodo" ref={agregar1erNodoRef} hidden>
//         Agregar primer nodo
//       </button>

//       <button type="submit" id="agregar_comienzo" ref={agregarComienzoRef} hidden>
//         Agregar al comienzo
//       </button>

//       <button type="submit" id="agregar_final" ref={agregarFinalRef} hidden>
//         Agregar al final
//       </button>
//     </div>
//   );
// };

// export default ElementManager;


// import React, { useRef, useEffect } from "react";

// const ElementManager = ({ structureType, onInitialize }) => {
//   const agregar1erNodoRef = useRef(null);
//   const agregarComienzoRef = useRef(null);
//   const agregarFinalRef = useRef(null);

//   // Export to window for vanilla controllers
//   useEffect(() => {
//     window.agregar_1er_nodo = agregar1erNodoRef.current;
//     window.agregar_comienzo = agregarComienzoRef.current;
//     window.agregar_final = agregarFinalRef.current;
//   }, []);

//   return (
//     <div id="barra_superior">


//       <input type="text" id="nodo" hidden />

//       <button type="submit" id="agregar_1er_nodo" ref={agregar1erNodoRef} hidden>
//         Agregar primer nodo
//       </button>

//       <button type="submit" id="agregar_comienzo" ref={agregarComienzoRef} hidden>
//         Agregar al comienzo
//       </button>

//       <button type="submit" id="agregar_final" ref={agregarFinalRef} hidden>
//         Agregar al final
//       </button>
//     </div>
//   );
// };

// export default ElementManager;


// import React, { useRef, useEffect } from "react";

// const ElementManager = ({ structureType }) => {
//   const agregar1erNodoRef = useRef(null);
//   const agregarComienzoRef = useRef(null);
//   const agregarFinalRef = useRef(null);

//   // Expose buttons to window for vanilla controllers
//   useEffect(() => {
//     window.agregar_1er_nodo = agregar1erNodoRef.current;
//     window.agregar_comienzo = agregarComienzoRef.current;
//     window.agregar_final = agregarFinalRef.current;
//   }, []);

//   return (
//     <div id="barra_superior">
//       <input type="text" id="nodo" hidden />

//       <button type="button" id="agregar_1er_nodo" ref={agregar1erNodoRef} hidden>
//         Agregar primer nodo
//       </button>

//       <button type="button" id="agregar_comienzo" ref={agregarComienzoRef} hidden>
//         Agregar al comienzo
//       </button>

//       <button type="button" id="agregar_final" ref={agregarFinalRef} hidden>
//         Agregar al final
//       </button>
//     </div>
//   );
// };

// export default ElementManager;


// // ElementManager.js
// import React, { useRef, useEffect } from "react";

// const ElementManager = ({ structureType }) => {
//   const agregar1erNodoRef = useRef(null);
//   const agregarComienzoRef = useRef(null);
//   const agregarFinalRef = useRef(null);

//   useEffect(() => {
//     // Expose buttons to vanilla controllers
//     window.agregar_1er_nodo = agregar1erNodoRef.current;
//     window.agregar_comienzo = agregarComienzoRef.current;
//     window.agregar_final = agregarFinalRef.current;
//   }, []);

//   return (
//     <div id="barra_superior">
//       <input type="text" id="nodo" hidden />

//       <button
//         type="button"
//         id="agregar_1er_nodo"
//         ref={agregar1erNodoRef}
//         hidden
//         onClick={() => {
//           if (window.agregarPrimerNodo) window.agregarPrimerNodo();
//         }}
//       >
//         Agregar primer nodo
//       </button>

//       <button type="button" id="agregar_comienzo" ref={agregarComienzoRef} hidden>
//         Agregar al comienzo
//       </button>

//       <button type="button" id="agregar_final" ref={agregarFinalRef} hidden>
//         Agregar al final
//       </button>
//     </div>
//   );
// };

// export default ElementManager;





// import React, { useRef, useEffect } from "react";

// const ElementManager = () => {
//   const agregar1erNodoRef = useRef(null);
//   const agregarComienzoRef = useRef(null);
//   const agregarFinalRef = useRef(null);

//   // Expose buttons to vanilla controllers
//   useEffect(() => {
//     window.agregar_1er_nodo = agregar1erNodoRef.current;
//     window.agregar_comienzo = agregarComienzoRef.current;
//     window.agregar_final = agregarFinalRef.current;
//   }, []);

//   return (
//     <div id="barra_superior">
//       <input type="text" id="nodo" hidden />

//       {/* <button type="submit" id="agregar_1er_nodo" ref={agregar1erNodoRef} hidden>
//         Agregar primer nodo
//       </button> */}

//       <button
//         type="button"
//         id="agregar_1er_nodo"
//         ref={agregar1erNodoRef}
//         onClick={() => {
//           try {
//             if (window.agregarPrimerNodo) {
//               window.agregarPrimerNodo();
//             } else {
//               console.error("agregarPrimerNodo is not available on window");
//             }
//           } catch (err) {
//             console.error("Error running agregarPrimerNodo:", err);
//           }
//         }}
//         hidden
//       >
//         Agregar primer nodo
//       </button>

      
//       <button type="submit" id="agregar_comienzo" ref={agregarComienzoRef} hidden>
//         Agregar al comienzo
//       </button>

//       <button type="submit" id="agregar_final" ref={agregarFinalRef} hidden>
//         Agregar al final
//       </button>
//     </div>
//   );
// };

// export default ElementManager;



// import React, { useRef, useEffect } from "react";

// const ElementManager = () => {
//   const agregar1erNodoRef = useRef(null);
//   const agregarComienzoRef = useRef(null);
//   const agregarFinalRef = useRef(null);

//   useEffect(() => {
//     // expose DOM buttons for vanilla controllers
//     window.agregar_1er_nodo = agregar1erNodoRef.current;
//     window.agregar_comienzo = agregarComienzoRef.current;
//     window.agregar_final = agregarFinalRef.current;
//   }, []);

//   return (
//     <div id="barra_superior">
//       <input type="text" id="nodo" hidden />

//       <button
//         type="button"
//         id="agregar_1er_nodo"
//         ref={agregar1erNodoRef}
//         hidden
//         onClick={() => {
//           try {
//             if (window.agregarPrimerNodo) {
//               window.agregarPrimerNodo();
//             } else {
//               console.error("window.agregarPrimerNodo not available yet");
//             }
//           } catch (err) {
//             console.error("Error calling agregarPrimerNodo:", err);
//           }
//         }}
//       >
//         Agregar primer nodo
//       </button>
// {/* 
//       <button type="button" id="agregar_comienzo" ref={agregarComienzoRef} hidden>
//         Agregar al comienzo
//       </button>

//       <button type="button" id="agregar_final" ref={agregarFinalRef} hidden>
//         Agregar al final
//       </button> */}

//       <button
//         type="button"
//         id="agregar_comienzo"
//         ref={agregarComienzoRef}
//         hidden
//         onClick={() => {
//           try {
//             if (window.agregarNodoAlComienzo) {
//               window.agregarNodoAlComienzo();
//             } else {
//               console.error("window.agregarNodoAlComienzo not available yet");
//             }
//           } catch (err) {
//             console.error("Error calling agregarNodoAlComienzo:", err);
//           }
//         }}
//         >
//           Agregar al comienzo
//         </button>

//         <button
//           type="button"
//           id="agregar_final"
//           ref={agregarFinalRef}
//           hidden
//           onClick={() => {
//             try {
//               if (window.agregarNodoAlFinal) {
//                 window.agregarNodoAlFinal();
//               } else {
//                 console.error("window.agregarNodoAlFinal not available yet");
//               }
//             } catch (err) {
//               console.error("Error calling agregarNodoAlFinal:", err);
//             }
//           }}
//         >
//           Agregar al final
//         </button>




//     </div>
//   );
// };

// export default ElementManager;




// import React, { useRef, useEffect } from "react";

// const ElementManager = () => {
//   const agregar1erNodoRef = useRef(null);
//   const agregarComienzoRef = useRef(null);
//   const agregarFinalRef = useRef(null);

//   useEffect(() => {
//     // Expose buttons to vanilla controllers
//     window.agregar_1er_nodo = agregar1erNodoRef.current;
//     window.agregar_comienzo = agregarComienzoRef.current;
//     window.agregar_final = agregarFinalRef.current;
//   }, []);

//   return (
//     <div id="barra_superior">
//       <input type="text" id="nodo" hidden />

//       <button
//         type="button"
//         id="agregar_1er_nodo"
//         ref={agregar1erNodoRef}
//         hidden
//         onClick={() => {
//           if (window.agregarPrimerNodo) window.agregarPrimerNodo();
//         }}
//       >
//         Agregar primer nodo
//       </button>

//       <button
//         type="button"
//         id="agregar_comienzo"
//         ref={agregarComienzoRef}
//         hidden
//         onClick={() => {
//           if (window.agregarNodoAlComienzo) window.agregarNodoAlComienzo();
//         }}
//       >
//         Agregar al comienzo
//       </button>

//       <button
//         type="button"
//         id="agregar_final"
//         ref={agregarFinalRef}
//         hidden
//         onClick={() => {
//           if (window.agregarNodoAlFinal) window.agregarNodoAlFinal();
//         }}
//       >
//         Agregar al final
//       </button>
//     </div>
//   );
// };

// export default ElementManager;





// import React, { useRef, useEffect } from "react";

// const ElementManager = () => {
//   const agregar1erNodoRef = useRef(null);
//   const agregarComienzoRef = useRef(null);
//   const agregarFinalRef = useRef(null);

//   const inicializarBtnRef = useRef(null);

//   useEffect(() => {
//     // Expose buttons to vanilla scripts
//     window.agregar_1er_nodo = agregar1erNodoRef.current;
//     window.agregar_comienzo = agregarComienzoRef.current;
//     window.agregar_final = agregarFinalRef.current;
//     window.inicializar_btn = inicializarBtnRef.current;
//   }, []);

//   return (
//     <div id="barra_superior">
//       <input type="text" id="nodo" hidden />

//       <button type="button" ref={inicializarBtnRef} id="inicializar">
//         Inicializar
//       </button>

//       <button type="button" id="agregar_1er_nodo" ref={agregar1erNodoRef} hidden>
//         Agregar primer nodo
//       </button>

//       <button type="button" id="agregar_comienzo" ref={agregarComienzoRef} hidden>
//         Agregar al comienzo
//       </button>

//       <button type="button" id="agregar_final" ref={agregarFinalRef} hidden>
//         Agregar al final
//       </button>
//     </div>
//   );
// };

// export default ElementManager;


// import React, { useEffect } from "react";

// export let textoSpan, nodo, barraSup, inicializarBtn, agregar_1er_nodo, agregar_comienzo, agregar_final;

// const ElementManager = () => {

 
//   useEffect(() => {
//     // Expose DOM nodes to window so vanilla controllers can find them.
//     // The vanilla controller (ControladorBarraSuperior.js) will call:
//     // document.getElementById("inicializar") etc. — but also exposing here helps.
//     window.inicializarBtn = document.getElementById("inicializar")
//     window.barraSup =  document.getElementById("barra_superior")
//     window.textoSpan =  document.getElementById("texto")
//     window.nodo = document.getElementById("nodo")
//     window.agregar_1er_nodo =  document.getElementById("agregar_1er_nodo")
//     window.agregar_comienzo =  document.getElementById("agregar_comienzo")
//     window.agregar_final =  document.getElementById("agregar_final")



    
    
//   }, []);

//   return (
//     <div id="barra_superior">
//       <button type="button" id="inicializar" >
//         Inicializar lista enlazada
//       </button>

//       <span id="texto"  hidden>
//         Elija el id del siguiente nodo de la lista a agregar ----&gt;
//       </span>

//       <input type="text" name="nodo" id="nodo" hidden />

//       <button
//         type="button"
//         id="agregar_1er_nodo"
//         hidden
//       >
//         Agregar primer nodo
//       </button>

//       <button type="button" id="agregar_comienzo"  hidden>
//         Agregar al comienzo
//       </button>

//       <button type="button" id="agregar_final"  hidden>
//         Agregar al final
//       </button>
//     </div>
//   );
// };

// export default ElementManager;



function ElementManager() {
  return (
    <div id="barra_superior">
      <button type="button" id="inicializar">Inicializar lista enlazada</button>
      <span hidden id="texto">Elija el id del siguiente nodo de la lista a agregar ----</span>
      
      <input type="text" name="nodo" id="nodo" hidden />
      <button type="button" id="agregar_1er_nodo" hidden>Agregar primer nodo</button>
      <button type="button" id="agregar_comienzo" hidden>Agregar al comienzo</button>
      <button type="button" id="agregar_final" hidden>Agregar al final</button>
      <br />
      <span id="texto-selector" hidden>Puede agregar un nodo en algun lugar intermedio de la lista, ¿en donde lo desea agregar?: </span>
      <select name="" id="selector-pares" hidden></select>
      <button type="button" id="agregar_intermedio" hidden>Agregar</button>
    </div>
  );
}

export default ElementManager;

