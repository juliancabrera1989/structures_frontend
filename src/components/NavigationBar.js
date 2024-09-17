// // import React, { useContext } from 'react';
// import { NavLink } from 'react-router-dom';
// // import { AuthContext } from '../context/AuthContext.js';

// const Navbar = () => {
// //   const authContext = useContext(AuthContext);

//   return (
//     // <nav>
//     //   <NavLink to="/" end>Home</NavLink>
//     //   {authContext?.user ? (
//     //     <>
//     //       <NavLink to="/dashboard">Dashboard</NavLink>
//     //       <NavLink to="/profile">Profile</NavLink>
//     //       <button onClick={authContext.logout}>Logout</button>
//     //     </>
//     //   ) : (
//     //     <>
//     //       <NavLink to="/login">Login</NavLink>
//     //       <NavLink to="/register">Register</NavLink>
//     //     </>
//     //   )}
//     // </nav>
//   <nav>
//     <NavLink to="/dashboard">Dashboard</NavLink><br/>
//     <NavLink to="/tutorial">Interactive Tutorial</NavLink><br/>
//     <NavLink to="/structures">Structures Overview</NavLink><br/>
//     <NavLink to="/resources">Resource Center</NavLink><br/>
//     <NavLink to="/community">Community & Support</NavLink><br/>
//     <NavLink to="/learning-path">Learning Path</NavLink><br/>
//   </nav>  
//     );
// };

// export default Navbar;




import React from 'react';
import { useAuth } from '../context/authContext';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  const { auth} = useAuth();
  console.log(auth);
  console.log(auth.user);
  console.log(auth.token);
  return (
    // <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
    //   <Container fluid> {/* Ensures full-width */}
    //     <Navbar.Brand as={Link} to="/dashboard">
    //       Data Structures App
    //     </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="ml-auto">
    //         <Nav.Link as={Link} to="/interactive-tutorial">Tutorial</Nav.Link>
    //         <Nav.Link as={Link} to="/resources">Resources</Nav.Link>
    //         <Nav.Link as={Link} to="/community-support">Community & Support</Nav.Link>
    //         {user ? (
    //           <>
    //             <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
    //             <Button variant="outline-light" onClick={onLogout} className="ml-2">
    //               Logout
    //             </Button>
    //           </>
    //         ) : (
    //           <Nav.Link as={Link} to="/login">Login</Nav.Link>
    //         )}
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>


<Navbar bg="dark" variant="dark" expand="lg" sticky="top">
<Container fluid> {/* Ensures full-width */}
  <Navbar.Brand as={Link} to="/dashboard">
    Data Structures App
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">

    {auth.token ? (
        <>
      <Nav.Link as={Link} to="/interactive-tutorial">Tutorial</Nav.Link>
      <Nav.Link as={Link} to="/resources">Resources</Nav.Link>
      <Nav.Link as={Link} to="/community-support">Community & Support</Nav.Link>
      <Nav.Link as={Link} to="/structures">Structurs Overview </Nav.Link>
      <Nav.Link as={Link} to="/learning-path">Learning Path</Nav.Link>
     {/* <NavLink to="/structures">Structures Overview</NavLink><br/>
     <NavLink to="/learning-path">Learning Path</NavLink><br/> */}
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