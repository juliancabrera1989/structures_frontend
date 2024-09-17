// import React, { useState } from 'react';

// const UserProfile = () => {
//     const [editing, setEditing] = useState(false);
//     const [userInfo, setUserInfo] = useState({
//         username: 'JohnDoe',
//         email: 'johndoe@example.com',
//     });

//     const handleEdit = () => {
//         setEditing(!editing);
//     };

//     const handleChange = (e) => {
//         setUserInfo({
//             ...userInfo,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Save the updated user info here
//         setEditing(false);
//     };

//     return (
//         <div>
//             <h2>User Profile</h2>
//             {!editing ? (
//                 <div>
//                     <p>Username: {userInfo.username}</p>
//                     <p>Email: {userInfo.email}</p>
//                     <button onClick={handleEdit}>Edit Profile</button>
//                 </div>
//             ) : (
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <label>Username:</label>
//                         <input 
//                             type="text" 
//                             name="username" 
//                             value={userInfo.username} 
//                             onChange={handleChange} 
//                         />
//                     </div>
//                     <div>
//                         <label>Email:</label>
//                         <input 
//                             type="email" 
//                             name="email" 
//                             value={userInfo.email} 
//                             onChange={handleChange} 
//                         />
//                     </div>
//                     <button type="submit">Save</button>
//                     <button onClick={handleEdit}>Cancel</button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default UserProfile;


import { jwtDecode } from 'jwt-decode';
import React from 'react';


import { Card, Container, Row, Col } from 'react-bootstrap';

// import { useAuth } from '../../context/authContext';

const UserProfile = ({ user }) => {
    console.log(user);
    const decoded = jwtDecode(user);
    console.log(decoded);
    console.log(decoded.username)
    //  const { auth } = useAuth();  // Access token and user from context
    //  console.log(auth);
    

    return (
        // <div>
        //     <h1>User Profile</h1>
        //      <div>
        //             <p><strong>Name:</strong> {auth.user.id}</p>
        //             <p><strong>Email:</strong> {auth.user.email}</p>
        //             {/* Display other profile details */}
        //       </div>
        // </div>
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
                {/* <Button variant="primary" onClick={onEditProfile}>
                  Edit Profile
                </Button> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
};

export default UserProfile;





