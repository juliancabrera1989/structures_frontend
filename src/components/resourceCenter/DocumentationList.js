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
                Read full documentation →
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DocumentationList;