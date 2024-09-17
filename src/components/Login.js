import React, { useState } from 'react';
// import { useAuth } from '../hooks/useAuth';
import { useAuth } from '../context/authContext';
import { login as loginService } from '../services/authService';


import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await loginService(email, password);
      console.log(data.user);
      if (data.token && data.user) {
        login(data.user, data.token);
      } else {
        throw new Error('Invalid login response');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    // <div>
    //   <h2>Login</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //     />
    //     <button type="submit">Login</button>
    //   </form>
    //   {error && <p style={{ color: 'red' }}>{error}</p>}
    // </div>

    <Container className="mt-5">
    <Row className="justify-content-center">
      <Col xs={12} md={6} lg={4}> {/* Responsive column */}
        <h3 className="text-center mb-4">Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4">
            Login
          </Button>
        </Form>
      </Col>
    </Row>
  </Container>



  );
};

export default Login;