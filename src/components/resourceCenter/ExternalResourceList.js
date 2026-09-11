import { ListGroup, Badge } from "react-bootstrap";
import resourcesData from "../../data/resourcesData.json";

const ExternalResourceList = () => {
  return (
    <ListGroup>
      {resourcesData.external.map((res) => (
        <ListGroup.Item
          key={res.id}
          className="d-flex justify-content-between align-items-center bg-dark text-light border-secondary"
        >
          <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-info text-decoration-none fw-semibold">
            {res.title} ↗
          </a>
          <Badge bg="outline-info" className="border border-info text-info">{res.badge}</Badge>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ExternalResourceList;