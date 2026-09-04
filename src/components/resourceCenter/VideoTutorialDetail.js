import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Container, Ratio, Button } from "react-bootstrap";
import resourcesData from "../../data/resourcesData.json";

const VideoTutorialDetail = () => {
  const { id } = useParams();
  const video = resourcesData.videos.find((item) => item.id === id);

  if (!video) {
    return (
      <Container className="mt-5 text-light">
        <h3>Video no encontrado</h3>
        <Button as={Link} to="/resources" variant="info" className="mt-3">Volver al Resource Center</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5 text-light">
      <Button as={Link} to="/resources" variant="outline-secondary" className="mb-4">
        ← Return to Resources Center
      </Button>
      <Card className="p-4 shadow bg-dark text-light border-secondary">
        <h3 className="text-info fw-bold mb-2">{video.title}</h3>
        <p className="text-secondary mb-4">{video.description}</p>

        <Ratio aspectRatio="16x9">
          <iframe
            src={video.embedUrl}
            title={video.title}
            allowFullScreen
            className="rounded"
          ></iframe>
        </Ratio>
      </Card>
    </Container>
  );
};

export default VideoTutorialDetail;