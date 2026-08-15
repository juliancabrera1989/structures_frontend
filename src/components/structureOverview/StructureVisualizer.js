// import React from 'react';

// const StructureVisualizer = ({ structure }) => {
//     return (
//         <div>
//             <h2>Visualizing {structure.name}</h2>
//             <pre>{JSON.stringify(structure, null, 2)}</pre>
//         </div>
//     );
// };

// export default StructureVisualizer;

// StructureVisualizer.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const StructureVisualizer = ({ structure }) => {
  return (
    <Container className="mt-4">
      <h4 className="text-center mb-4">Data Structure Visualization</h4>
      <Row>
        {structure.nodes.map((node, index) => (
          <Col xs={12} md={6} lg={4} key={index} className="mb-3">
            <Card className="h-100">
              <Card.Body>
                <Card.Text>Node {index + 1}</Card.Text>
                <Card.Text>Value: {node.value}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default StructureVisualizer;