import React from 'react';
import { Card, Button } from 'react-bootstrap';

const SupportContact = () => {
  return (
    <div className="mt-4">
      <h5 className="mb-3">Contact Support</h5>

      <Card className="mb-3 bg-dark text-light border-secondary shadow-sm">
        <Card.Body>
          <Card.Title style={{ color: '#00d8ff' }}>Email Support</Card.Title>
          <Card.Text>If you need help from the team, email us and we will respond.</Card.Text>
          <Button variant="outline-primary" href="mailto:support@example.com">Email Support</Button>
        </Card.Body>
      </Card>

      <Card className="mb-3 bg-dark text-light border-secondary shadow-sm">
        <Card.Body>
          <Card.Title style={{ color: '#00d8ff' }}>Join Community Chat</Card.Title>
          <Card.Text>Real-time help from peers (coming soon).</Card.Text>
          <Button variant="outline-success" disabled>Open Chat</Button>
        </Card.Body>
      </Card>

      <Card className="mb-3 bg-dark text-light border-secondary shadow-sm">
        <Card.Body>
          <Card.Title style={{ color: '#00d8ff' }} >Developer Contact</Card.Title>
          <Card.Text>Reach out on LinkedIn or GitHub for project feedback.</Card.Text>
          <Button variant="link" href="https://github.com/juliancabrera1989" target="_blank" rel="noreferrer">GitHub</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SupportContact;
