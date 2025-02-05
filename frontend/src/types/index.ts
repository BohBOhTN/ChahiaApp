export interface User {
  id: string;
  name: string;
  email: string;
  role: 'manager' | 'staff';
}

export interface Product {
  id: string;
  name: string;
  category: string;
  unitType: 'weight' | 'piece';
  stock: number;
  avgBuyPrice: number;
  sellPrice: number;
}

export interface Client {
  id: string;
  name: string;
  contact: string;
  businessType: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  creditTerms: string;
}

export interface Sale {
  id: string;
  clientId?: string;
  productId: string;
  quantity: number;
  paymentMethod: 'cash' | 'credit';
  total: number;
}

export interface CreditPayment {
  id: string;
  saleId: string;
  clientId: string;
  totalDue: number;
  totalPaid: number;
  status: 'unpaid' | 'partially_paid' | 'paid';
  dueDate: string;
}

// Mock user data (replace with actual API calls)
export const mockUsers = [
  {
    id: '1',
    name: 'John Manager',
    email: 'manager@example.com',
    role: 'manager',
    password: 'manager123' // In real app, this would be hashed
  },
  {
    id: '2',
    name: 'Jane Staff',
    email: 'staff@example.com',
    role: 'staff',
    password: 'staff123' // In real app, this would be hashed
  }
] as const;