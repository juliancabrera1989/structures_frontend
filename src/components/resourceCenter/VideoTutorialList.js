import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import resourcesData from "../../data/resourcesData.json";

const VideoTutorialList = () => {
  return (
    <Row>
      {resourcesData.videos.map((video) => (
        <Col md={6} lg={6} className="mb-4" key={video.id}>
          <Card className="h-100 shadow-sm bg-dark text-light border-secondary">
            <Card.Body className="d-flex flex-column">
              <Card.Title className="text-info fw-bold">{video.title}</Card.Title>
              <Card.Text className="text-secondary flex-grow-1">{video.description}</Card.Text>
              <Button as={Link} to={`/resources/videos/${video.id}`} variant="outline-primary" size="sm" className="mt-2">
                Watch Tutorial Video ▶
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default VideoTutorialList;