import React from 'react';
import { useAuth } from '../context/authContext';
import UserProfile from '../components/logged/UserProfile';
import SavedDataStructures from '../components/logged/SavedDataStructures';


const Dashboard = ({ dataStructures }) => {
  const { auth , logout} = useAuth();
  console.log(auth.token);
  console.log(dataStructures);
  return (
    <div>
      <h2>Dashboard</h2>
      <div>Puta madre</div>
      <UserProfile user={auth.token} />
      <SavedDataStructures dataStructures={dataStructures} />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;


