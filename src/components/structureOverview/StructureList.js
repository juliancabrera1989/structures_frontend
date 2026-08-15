// import React from 'react';

// const StructureList = ({ structures, onSelect }) => {
//     return (
//         <div>
//             <h2>Available Structures</h2>
//             <ul>
//                 {structures.map((structure, index) => (
//                     <li key={index}>
//                         <button onClick={() => onSelect(structure)}>
//                             {structure.name}
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default StructureList;


import React from 'react';
import { Row, Col, Card, Badge, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import structuresData from '../../data/structuresOverviewData.json';

const StructureList = () => {
  const navigate = useNavigate();

  const handleOpenInVisualizer = (type) => {
    // Redirige directamente al lienzo interactivo pasando el tipo de estructura
    navigate(`/interactive-tutorial?type=${type}`);
  };

  return (
    <Row xs={1} md={2} className="g-4">
      {structuresData.map((item) => (
        <Col key={item.id}>
          <Card className="h-100 bg-dark text-light border-secondary shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center border-secondary bg-dark">
              <h4 className="text-info fw-bold mb-0">{item.name}</h4>
              <Badge bg="info" text="dark">{item.badge}</Badge>
            </Card.Header>
            
            <Card.Body className="d-flex flex-column">
              <Card.Text className="text-secondary mb-3">
                {item.description}
              </Card.Text>

              <h6 className="text-warning mb-2">Complejidad Algorítmica (Big-O)</h6>
              <Table size="sm" bordered responsive variant="dark" className="text-center mb-3 border-secondary">
                <thead>
                  <tr>
                    <th className="text-secondary">Acceso</th>
                    <th className="text-secondary">Búsqueda</th>
                    <th className="text-secondary">Inserción</th>
                    <th className="text-secondary">Borrado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><Badge bg="secondary">{item.complexity.access}</Badge></td>
                    <td><Badge bg="secondary">{item.complexity.search}</Badge></td>
                    <td><Badge bg="success">{item.complexity.insertion}</Badge></td>
                    <td><Badge bg="success">{item.complexity.deletion}</Badge></td>
                  </tr>
                </tbody>
              </Table>

              <div className="mt-auto pt-3 border-top border-secondary">
                <Button 
                  variant="outline-info" 
                  className="w-100 fw-bold"
                  onClick={() => handleOpenInVisualizer(item.type)}
                >
                  Cargar plantilla en el Visualizador 🚀
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StructureList;