import React from 'react';
import { Navigate } from 'react-router-dom';
import { User } from '../types';

interface ProtectedRouteProps {
  user: User | null;
  role?: string;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, role, children }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
