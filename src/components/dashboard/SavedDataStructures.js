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
                      onClick={() => onLoad(id)}
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