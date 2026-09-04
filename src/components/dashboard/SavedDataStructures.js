import React from 'react';
import { Table, Container, Alert, Button } from 'react-bootstrap';

const SavedDataStructures = ({ dataStructures, onLoad, onDelete }) => {
  if (!dataStructures || dataStructures.length === 0) {
    return (
      <Container className="my-4">
        <Alert variant="dark" className="bg-dark text-light border-secondary text-center shadow-sm">
          No structures saved yet. ¡Create a new one on Visualizer!
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
      <h4 className="text-light mb-3 text-center">My saved structures</h4>
      <div className="table-responsive">
        <Table variant="dark" striped bordered hover responsive className="align-middle">
          <thead>
            <tr className="text-info">
              <th>Name ID</th>
              <th>Type</th>
              <th>Creation Date</th>
              <th className="text-center">Actions</th>
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
                      Load on Visualizer
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      onClick={() => onDelete(id)}
                    >
                      Delete
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