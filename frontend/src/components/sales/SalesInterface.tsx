import React, { useState } from 'react';
import { Search, ShoppingCart, User, X, Plus, Minus } from 'lucide-react';
import type { Product, Client } from '../../types';

// Mock data (replace with actual data from your backend)
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Whole Chicken',
    category: 'Poultry',
    unitType: 'weight',
    stock: 100,
    avgBuyPrice: 120,
    sellPrice: 150,
  },
  {
    id: '2',
    name: 'Chicken Breast',
    category: 'Cuts',
    unitType: 'weight',
    stock: 50,
    avgBuyPrice: 160,
    sellPrice: 200,
  },
  {
    id: '3',
    name: 'Chicken Wings',
    category: 'Cuts',
    unitType: 'weight',
    stock: 30,
    avgBuyPrice: 140,
    sellPrice: 180,
  },
];

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Restaurant A',
    contact: '123-456-7890',
    businessType: 'Restaurant',
  },
  {
    id: '2',
    name: 'Hotel B',
    contact: '098-765-4321',
    businessType: 'Hotel',
  },
];

interface CartItem {
  product: Product;
  quantity: number;
}

export default function SalesInterface() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'credit'>('cash');

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: Product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, change: number) => {
    setCart(currentCart =>
      currentCart.map(item => {
        if (item.product.id === productId) {
          const newQuantity = Math.max(0, item.quantity + change);
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) as CartItem[]
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.product.sellPrice * item.quantity), 0);
  };

  const handleCheckout = () => {
    // Implement checkout logic here
    console.log({
      client: selectedClient,
      items: cart,
      paymentMethod,
      total: calculateTotal(),
    });
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Products Section */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => addToCart(product)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {product.stock} {product.unitType === 'weight' ? 'kg' : 'pcs'}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{product.category}</p>
              <p className="text-lg font-bold text-blue-600">₱{product.sellPrice}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Current Sale
          </h2>
        </div>

        {/* Client Selection */}
        <div className="p-4 border-b border-gray-200">
          {selectedClient ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{selectedClient.name}</p>
                <p className="text-sm text-gray-500">{selectedClient.businessType}</p>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsClientModalOpen(true)}
              className="flex items-center justify-center w-full px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
            >
              <User className="w-4 h-4 mr-2" />
              Select Client
            </button>
          )}
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-auto p-4">
          {cart.map((item) => (
            <div key={item.product.id} className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-500">
                  ₱{item.product.sellPrice} × {item.quantity}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.product.id, -1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between mb-4">
            <div className="space-x-2">
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  paymentMethod === 'cash'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Cash
              </button>
              <button
                onClick={() => setPaymentMethod('credit')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  paymentMethod === 'credit'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Credit
              </button>
            </div>
          </div>

          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-lg">₱{calculateTotal()}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Complete Sale
          </button>
        </div>
      </div>

      {/* Client Selection Modal */}
      {isClientModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Select Client</h3>
              <button
                onClick={() => setIsClientModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {mockClients.map((client) => (
                <div
                  key={client.id}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  onClick={() => {
                    setSelectedClient(client);
                    setIsClientModalOpen(false);
                  }}
                >
                  <p className="font-medium">{client.name}</p>
                  <p className="text-sm text-gray-500">{client.businessType}</p>
                </div>
              ))}
              <button
                className="w-full mt-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                onClick={() => setIsClientModalOpen(false)}
              >
                Quick Sale (No Client)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}