import React from 'react';
import SalesInterface from '../sales/SalesInterface';

export default function StaffDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Staff Dashboard</h1>
      <SalesInterface />
    </div>
  );
}