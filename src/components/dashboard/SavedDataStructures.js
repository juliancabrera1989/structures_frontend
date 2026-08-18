// import React from 'react';
// import { Table, Container, Alert } from 'react-bootstrap';

// const SavedDataStructures = ({ dataStructures }) => {
//   if (!dataStructures || dataStructures.length === 0) {
//     return (
//       <Container className="my-4">
//         <Alert variant="dark" className="bg-dark text-light border-secondary text-center shadow-sm">
//           Aún no tenés estructuras guardadas.
//         </Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="my-4">
//       <h4 className="text-light mb-3 text-center">Tus Estructuras Guardadas</h4>
//       <div className="table-responsive">
//         <Table variant="dark" striped bordered hover responsive className="align-middle">
//           <thead>
//             <tr className="text-info">
//               <th>ID</th>
//               <th>Nombre</th>
//               <th>Tipo</th>
//               <th>Fecha Creación</th>
//             </tr>
//           </thead>
//           <tbody>
//             {dataStructures.map((structure, index) => (
//               <tr key={structure.id || index}>
//                 <td>{structure.id}</td>
//                 <td>{structure.name}</td>
//                 <td>{structure.type}</td>
//                 <td>{new Date(structure.dateCreated).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </Container>
//   );
// };

// export default SavedDataStructures;



// import React from 'react';
// import { Table, Container, Alert, Button } from 'react-bootstrap';

// const SavedDataStructures = ({ dataStructures, onLoad, onDelete }) => {
//   if (!dataStructures || dataStructures.length === 0) {
//     return (
//       <Container className="my-4">
//         <Alert variant="dark" className="bg-dark text-light border-secondary text-center shadow-sm">
//           Aún no tenés estructuras guardadas. ¡Creá una nueva en el Visualizador!
//         </Alert>
//       </Container>
//     );
//   }


  
//   return (
//     <Container className="my-4">
//       <h4 className="text-light mb-3 text-center">Tus Estructuras Guardadas</h4>
//       <div className="table-responsive">
//         <Table variant="dark" striped bordered hover responsive className="align-middle">
//           <thead>
//             <tr className="text-info">
//               <th>Nombre</th>
//               <th>Tipo</th>
//               <th>Fecha Creación</th>
//               <th className="text-center">Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {dataStructures.map((structure) => {
//               const id = structure._id || structure.id;
//               return (
//                 <tr key={id}>
//                   <td>{structure.name}</td>
//                   <td>{structure.type}</td>
//                   <td>{new Date(structure.createdAt || structure.dateCreated).toLocaleDateString()}</td>
//                   <td className="text-center">
//                     <Button 
//                       variant="info" 
//                       size="sm" 
//                       className="me-2 fw-bold"
//                       onClick={() => onLoad(id)}
//                     >
//                       Cargar en Visualizador
//                     </Button>
//                     <Button 
//                       variant="outline-danger" 
//                       size="sm" 
//                       onClick={() => onDelete(id)}
//                     >
//                       Eliminar
//                     </Button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </Table>
//       </div>
//     </Container>
//   );
// };

// export default SavedDataStructures;

// import React from 'react';
// import { Table, Container, Alert, Button } from 'react-bootstrap';

// const SavedDataStructures = ({ dataStructures, onLoad, onDelete }) => {
//   if (!dataStructures || dataStructures.length === 0) {
//     return (
//       <Container className="my-4">
//         <Alert variant="dark" className="bg-dark text-light border-secondary text-center shadow-sm">
//           Aún no tenés estructuras guardadas. ¡Creá una nueva en el Visualizador!
//         </Alert>
//       </Container>
//     );
//   }

//   // Helper para redirigir pasando type y data en la URL
//   const handleCargarEnVisualizador = (structure) => {
//     // Tomamos los nodos del objeto structure (ajustá 'nodos' o 'data' según cómo guardás en el backend)
//     const listaNodos = structure.nodes || structure.nodos || structure.data || [];
    
//     const nodosStr = Array.isArray(listaNodos) 
//       ? listaNodos.join(",") 
//       : listaNodos;

//     const tipo = structure.type || structure.tipo || "linkedlist";

//     // Navegación por URL para mantener consistencia con Structure Overview
//     window.location.href = `/interactiveTutorial?type=${encodeURIComponent(tipo)}&data=${encodeURIComponent(nodosStr)}`;
//   };

//   return (
//     <Container className="my-4">
//       <h4 className="text-light mb-3 text-center">Tus Estructuras Guardadas</h4>
//       <div className="table-responsive">
//         <Table variant="dark" striped bordered hover responsive className="align-middle">
//           <thead>
//             <tr className="text-info">
//               <th>Nombre</th>
//               <th>Tipo</th>
//               <th>Fecha Creación</th>
//               <th className="text-center">Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {dataStructures.map((structure) => {
//               const id = structure._id || structure.id;
//               return (
//                 <tr key={id}>
//                   <td>{structure.name}</td>
//                   <td>{structure.type}</td>
//                   <td>{new Date(structure.createdAt || structure.dateCreated).toLocaleDateString()}</td>
//                   <td className="text-center">
//                     <Button 
//                       variant="info" 
//                       size="sm" 
//                       className="me-2 fw-bold"
//                       onClick={() => handleCargarEnVisualizador(structure)}
//                     >
//                       Cargar en Visualizador
//                     </Button>
//                     <Button 
//                       variant="outline-danger" 
//                       size="sm" 
//                       onClick={() => onDelete(id)}
//                     >
//                       Eliminar
//                     </Button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </Table>
//       </div>
//     </Container>
//   );
// };

// export default SavedDataStructures;


import React from 'react';
import { Table, Container, Alert, Button } from 'react-bootstrap';

const SavedDataStructures = ({ dataStructures, onLoad, onDelete }) => {
  if (!dataStructures || dataStructures.length === 0) {
    return (
      <Container className="my-4">
        <Alert variant="dark" className="bg-dark text-light border-secondary text-center shadow-sm">
          Aún no tenés estructuras guardadas. ¡Creá una nueva en el Visualizador!
        </Alert>
      </Container>
    );
  }

  // 1. Manejador para construir la URL con parámetros y navegar
  const handleCargarEnVisualizador = (structure) => {
    // Extraemos la lista de nodos según cómo venga guardada en el objeto
    const rawNodes = structure.nodes || structure.nodos || structure.data || [];
    
    // Si viene como array [10, 20, 30], lo unimos con comas: "10,20,30"
    const nodosStr = Array.isArray(rawNodes) ? rawNodes.join(",") : rawNodes;
    const tipo = structure.type || structure.tipo || "linkedlist";

    // 2. Redirección explícita a la URL del visualizador con Query Params
    window.location.href = `/interactive-tutorial?type=${encodeURIComponent(tipo)}&data=${encodeURIComponent(nodosStr)}`;
  };

  return (
    <Container className="my-4">
      <h4 className="text-light mb-3 text-center">Tus Estructuras Guardadas</h4>
      <div className="table-responsive">
        <Table variant="dark" striped bordered hover responsive className="align-middle">
          <thead>
            <tr className="text-info">
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Fecha Creación</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dataStructures.map((structure) => {
              const id = structure._id || structure.id;
              return (
                <tr key={id}>
                  <td>{structure.name}</td>
                  <td>{structure.type}</td>
                  <td>{new Date(structure.createdAt || structure.dateCreated).toLocaleDateString()}</td>
                  <td className="text-center">
                    <Button 
                      variant="info" 
                      size="sm" 
                      className="me-2 fw-bold"
                      onClick={() => handleCargarEnVisualizador(structure)}
                    >
                      Cargar en Visualizador
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      onClick={() => onDelete(id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default SavedDataStructures;