import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import RedirectToAppropriatePage from './components/Redirect'; 

import NavigationBar from './components/NavigationBar';


import InteractiveTutorial from './views/InteractiveTutorial';
import CommunityAndSupport from './views/CommunityAndSupport';
import ResourceCenter from './views/ResourceCenter';
import StructureOverview from './views/StructureOverview';
import LearningPath from './views/LearningPath';



import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (


    <Router>
      
      <AuthProvider>
      <NavigationBar /> 
        <Routes>
          <Route path="/" element={<RedirectToAppropriatePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
          <Route path="/tutorial" element={<PrivateRoute><InteractiveTutorial /></PrivateRoute>} />
          <Route path="/structures" element={<PrivateRoute><StructureOverview /></PrivateRoute>} />
          <Route path="/resources" element={<PrivateRoute><ResourceCenter /></PrivateRoute>} />
          <Route path="/community" element={<PrivateRoute><CommunityAndSupport /></PrivateRoute>} />
          <Route path="/learning-path" element={<PrivateRoute><LearningPath /></PrivateRoute>} />

        </Routes>
      </AuthProvider>
    </Router>



  );
};

export default App;








