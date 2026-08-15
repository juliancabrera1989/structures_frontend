import React from 'react';
import NavigationBar from '../components/NavigationBar';
import Dashboard from '../components/Dashboard';

const DashboardPage = ({ user, dataStructures }) => {
  return (
    <div>
      <NavigationBar />
      <Dashboard />
    </div>
  );
};

export default DashboardPage;