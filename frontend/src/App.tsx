import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Router, Routes, Route, and Navigate
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import LoginPage from './components/auth/LoginPage';
import ManagerDashboard from './components/manager/ManagerDashboard';
import StaffDashboard from './components/staff/StaffDashboard';
import Dashboard from './components/Dashboard'; // Import Dashboard
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/manager"
          element={
            <ProtectedRoute user={user} role="manager">
              <Layout>
                <ManagerDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff"
          element={
            <ProtectedRoute user={user} role="staff">
              <Layout>
                <StaffDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;