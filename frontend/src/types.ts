export interface User {
  email: string;
  name: string; // Add name property
  role: string;
  password: string;
}

export const mockUsers: User[] = [
  { email: 'manager@example.com', name: 'Manager', role: 'manager', password: 'manager123' },
  { email: 'staff@example.com', name: 'Staff', role: 'staff', password: 'staff123' },
];

// Add mockClients export
export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export const mockClients: Client[] = [
  { id: 1, name: 'Client One', email: 'client1@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Client Two', email: 'client2@example.com', phone: '098-765-4321' },
];

// Add mockProducts export
export interface Product {
  id: number;
  name: string;
  quantity: number;
}

export const mockProducts: Product[] = [
  { id: 1, name: 'Product One', quantity: 100 },
  { id: 2, name: 'Product Two', quantity: 50 },
];
