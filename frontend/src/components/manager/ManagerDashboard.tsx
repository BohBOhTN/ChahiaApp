import React from 'react';
import Dashboard from '../Dashboard';

export default function ManagerDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manager Dashboard</h1>
      <Dashboard />
      {/* Add manager-specific features here */}
    </div>
  );
}