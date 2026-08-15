import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { Card, Container, Row, Col } from 'react-bootstrap';

const UserProfile = ({ user }) => {
  if (!user) return null;

  let decoded = {};
  try {
    decoded = jwtDecode(user);
  } catch (e) {
    console.error("Error decoding token", e);
  }

  return (
    <Container className="my-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="bg-dark text-light border-secondary shadow-sm">
            <Card.Body className="p-4">
              <Card.Title className="border-bottom border-secondary pb-2 mb-3 text-info fw-bold">
                Perfil de Usuario
              </Card.Title>
              <Card.Text className="mb-2">
                <strong className="text-secondary">Nombre:</strong> {decoded.username || 'Usuario'}
              </Card.Text>
              <Card.Text className="mb-0">
                <strong className="text-secondary">Email:</strong> {decoded.email || 'No registrado'}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;

