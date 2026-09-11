import { jwtDecode } from 'jwt-decode';
import { Card, Container, Row, Col } from 'react-bootstrap';



const UserProfile = ({ user }) => {
    console.log(user);
    const decoded = jwtDecode(user);
    console.log(decoded);
    console.log(decoded.username)
    //  const { auth } = useAuth();  // Access token and user from context
    //  console.log(auth);
    

    return (
        <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}> {/* Adjust based on screen size */}
            <Card className="shadow-sm p-3 mb-5 bg-white rounded">
              <Card.Body>
                <Card.Title>User Profile</Card.Title>
                <Card.Text>
                  {/* PEPE */}
                  <strong>Name:</strong> {decoded.username}
                </Card.Text>
                <Card.Text>
                  {/* PIPI@G.COM */}
                  <strong>Email:</strong> {decoded.email}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
};

export default UserProfile;





