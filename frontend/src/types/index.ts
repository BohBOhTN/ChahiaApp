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
  packageSize?: number; // For pre-packed items (in kg or pieces)
  isPrePacked?: boolean;
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

// Mock clients data
export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Restaurant A',
    contact: '123-456-7890',
    businessType: 'Restaurant'
  },
  {
    id: '2',
    name: 'Hotel B',
    contact: '098-765-4321',
    businessType: 'Hotel'
  },
  {
    id: '3',
    name: 'Catering Service C',
    contact: '555-123-4567',
    businessType: 'Catering'
  }
];

// Mock products data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Whole Chicken',
    category: 'Poultry',
    unitType: 'weight',
    stock: 100,
    avgBuyPrice: 2.5,
    sellPrice: 3.99,
    isPrePacked: false
  },
  {
    id: '2',
    name: 'Pre-packed Chicken Breast',
    category: 'Cuts',
    unitType: 'weight',
    stock: 50,
    avgBuyPrice: 4,
    sellPrice: 5.99,
    isPrePacked: true,
    packageSize: 0.5 // 500g packages
  },
  {
    id: '3',
    name: 'Chicken Wings Pack',
    category: 'Cuts',
    unitType: 'piece',
    stock: 30,
    avgBuyPrice: 6,
    sellPrice: 8.99,
    isPrePacked: true,
    packageSize: 12 // 12 pieces per pack
  },
  {
    id: '4',
    name: 'Fresh Chicken Breast',
    category: 'Cuts',
    unitType: 'weight',
    stock: 75,
    avgBuyPrice: 3.5,
    sellPrice: 4.99,
    isPrePacked: false
  }
];