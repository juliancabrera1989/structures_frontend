// import React from 'react';

// const VisualizationTool = ({ dataStructure }) => {
//     return (
//         <div>
//             <h2>Visualization Tool</h2>
//             {/* Visualization logic goes here */}
//             <div>
//                 {dataStructure && dataStructure.map((element, index) => (
//                     <div key={index}>
//                         <span>{element}</span>
//                         {index < dataStructure.length - 1 && ' -> '}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default VisualizationTool;



import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const VisualizationTool = ({ structure, onAddNode, onRemoveNode }) => {
  return (
    <Container className="mt-4">
      <h4 className="text-center mb-4">Structure Manipulation Tool</h4>
      <Form>
        <Row>
          <Col xs={12} md={8}>
            <Form.Group controlId="addNode">
              <Form.Label>Node Value</Form.Label>
              <Form.Control type="text" placeholder="Enter node value" />
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Button variant="primary" onClick={onAddNode} className="mt-md-4">
              Add Node
            </Button>
          </Col>
        </Row>
        <Button variant="danger" onClick={onRemoveNode} className="mt-3">
          Remove Node
        </Button>
      </Form>
    </Container>
  );
};

export default VisualizationTool;