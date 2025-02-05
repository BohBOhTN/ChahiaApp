import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router, Routes, and Route
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import LoginPage from './components/auth/LoginPage';
import ManagerDashboard from './components/manager/ManagerDashboard';
import StaffDashboard from './components/staff/StaffDashboard';
import Dashboard from './components/Dashboard'; // Import Dashboard

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
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/staff" element={<StaffDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;