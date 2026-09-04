import React from 'react';
import { useAuth } from '../context/authContext';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  const { auth } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="border-bottom border-secondary shadow-sm">
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to={auth?.token ? "/dashboard" : "/"} className="fw-bold text-info">
          Data Structures App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {auth?.token ? (
              <>
                <Nav.Link as={Link} to="/interactive-tutorial">Visualizer</Nav.Link>
                <Nav.Link as={Link} to="/structures">Structure Overview</Nav.Link>
                <Nav.Link as={Link} to="/community-support">Community and Support</Nav.Link>
                <Nav.Link as={Link} to="/resources">Resources Center</Nav.Link>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;