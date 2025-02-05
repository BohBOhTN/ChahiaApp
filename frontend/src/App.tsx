import React from 'react';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import LoginPage from './components/auth/LoginPage';
import ManagerDashboard from './components/manager/ManagerDashboard';
import StaffDashboard from './components/staff/StaffDashboard';

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Layout>
      {user.role === 'manager' ? <ManagerDashboard /> : <StaffDashboard />}
    </Layout>
  );
}

export default App;