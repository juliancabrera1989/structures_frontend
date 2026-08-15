// import React from "react";
// import { useParams } from "react-router-dom";
// import { Card, Container } from "react-bootstrap";

// const DocumentationDetail = () => {
//   const { id } = useParams();

//   return (
//     <Container className="mt-5">
//       <Card className="p-4 shadow-sm">
//         <h3>Documentation #{id}</h3>
//         <p>
//           This is where the detailed documentation content will go.
//           You can fetch it from your backend or load from static JSON.
//         </p>
//       </Card>
//     </Container>
//   );
// };

// export default DocumentationDetail;


import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Container, Button, Badge } from "react-bootstrap";
import resourcesData from "../../data/resourcesData.json";

const DocumentationDetail = () => {
  const { id } = useParams();
  const doc = resourcesData.docs.find((item) => item.id === id);

  if (!doc) {
    return (
      <Container className="mt-5 text-light">
        <h3>Documentación no encontrada</h3>
        <Button as={Link} to="/resources" variant="info" className="mt-3">Volver al Resource Center</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5 text-light">
      <Button as={Link} to="/resources" variant="outline-secondary" className="mb-4">
        ← Volver a Recursos
      </Button>
      <Card className="p-4 shadow bg-dark text-light border-secondary">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Badge bg="info" text="dark" className="fs-6">{doc.category}</Badge>
          <Badge bg="secondary">{doc.badge}</Badge>
        </div>
        <h2 className="text-info fw-bold mb-3">{doc.title}</h2>
        <p className="lead text-light mb-4">{doc.summary}</p>
        <hr className="border-secondary" />
        <h5 className="text-warning mb-2">Fundamentación Teórica</h5>
        <p className="text-secondary" style={{ lineHeight: "1.8" }}>{doc.content}</p>
        
        <h5 className="text-warning mt-4 mb-2">Aplicación en la Vida Real</h5>
        <p className="text-light bg-secondary bg-opacity-25 p-3 rounded border border-secondary">
          💡 {doc.realWorldUse}
        </p>
      </Card>
    </Container>
  );
};

export default DocumentationDetail;