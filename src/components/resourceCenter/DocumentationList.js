// import React from "react";
// import { Card, Button, Row, Col } from "react-bootstrap";

// const docs = [
//   { id: 1, title: "Linked Lists Basics", summary: "Learn about nodes and pointers in Linked Lists." },
//   { id: 2, title: "Stacks and Queues", summary: "Understand how stacks and queues work in memory." },
// ];

// const DocumentationList = () => {
//   return (
//     <Row>
//       {docs.map((doc) => (
//         <Col md={6} lg={4} className="mb-4" key={doc.id}>
//           <Card className="h-100 shadow-sm">
//             <Card.Body>
//               <Card.Title>{doc.title}</Card.Title>
//               <Card.Text>{doc.summary}</Card.Text>
//               <Button variant="primary" href={`/resources/docs/${doc.id}`}>
//                 Read More
//               </Button>
//             </Card.Body>
//           </Card>
//         </Col>
//       ))}
//     </Row>
//   );
// };

// export default DocumentationList;


import React from "react";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import resourcesData from "../../data/resourcesData.json";

const DocumentationList = () => {
  return (
    <Row>
      {resourcesData.docs.map((doc) => (
        <Col md={6} lg={6} className="mb-4" key={doc.id}>
          <Card className="h-100 shadow-sm bg-dark text-light border-secondary">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Badge bg="info" text="dark">{doc.category}</Badge>
                <Badge bg="secondary">{doc.badge}</Badge>
              </div>
              <Card.Title className="text-info fw-bold">{doc.title}</Card.Title>
              <Card.Text className="text-secondary flex-grow-1">{doc.summary}</Card.Text>
              <Button as={Link} to={`/resources/docs/${doc.id}`} variant="outline-info" size="sm" className="mt-2">
                Leer Documentación Completa →
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DocumentationList;