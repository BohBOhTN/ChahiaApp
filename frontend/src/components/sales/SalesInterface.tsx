import React, { useState } from 'react';
import { Search, ShoppingCart, User, X, Plus, Minus } from 'lucide-react';
import type { Product, Client } from '../../types';
import { mockProducts, mockClients } from '../../types';

interface CartItem {
  product: Product;
  quantity: number;
  weight?: number;
}

export default function SalesInterface() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'credit'>('cash');
  const [tempWeight, setTempWeight] = useState<string>('');
  const [showWeightInput, setShowWeightInput] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (product: Product) => {
    if (product.unitType === 'weight' && !product.isPrePacked) {
      setSelectedProduct(product);
      setShowWeightInput(true);
    } else {
      addToCart(product);
    }
  };

  const addToCart = (product: Product, weight?: number) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return currentCart.map(item =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                weight: weight || item.weight
              }
            : item
        );
      }
      
      return [...currentCart, { 
        product, 
        quantity: 1,
        weight: weight
      }];
    });
    
    setShowWeightInput(false);
    setTempWeight('');
    setSelectedProduct(null);
  };

  const handleWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProduct && tempWeight) {
      const weight = parseFloat(tempWeight);
      if (!isNaN(weight) && weight > 0) {
        addToCart(selectedProduct, weight);
      }
    }
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

  const calculateItemTotal = (item: CartItem) => {
    if (item.product.unitType === 'weight') {
      if (item.product.isPrePacked) {
        return item.product.sellPrice * item.quantity;
      } else {
        return item.product.sellPrice * (item.weight || 0) * item.quantity;
      }
    }
    return item.product.sellPrice * item.quantity;
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
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
              onClick={() => handleProductClick(product)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {product.isPrePacked 
                    ? `${product.packageSize} ${product.unitType === 'weight' ? 'kg/pack' : 'pcs/pack'}`
                    : product.unitType === 'weight' ? 'By Weight' : 'By Piece'}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{product.category}</p>
              <p className="text-lg font-bold text-blue-600">
                {formatPrice(product.sellPrice)}
                {product.unitType === 'weight' && !product.isPrePacked && '/kg'}
              </p>
              <p className="text-sm text-gray-500">
                Stock: {product.stock} {product.unitType === 'weight' ? 'kg' : 'pcs'}
              </p>
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
                  {formatPrice(item.product.sellPrice)}
                  {item.product.unitType === 'weight' && !item.product.isPrePacked && '/kg'} × {item.quantity}
                  {item.weight && ` (${item.weight.toFixed(3)} kg)`}
                </p>
                <p className="text-sm font-medium text-blue-600">
                  {formatPrice(calculateItemTotal(item))}
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
            <span className="font-bold text-lg">{formatPrice(calculateTotal())}</span>
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

      {/* Weight Input Modal */}
      {showWeightInput && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Enter Weight for {selectedProduct.name}</h3>
            <form onSubmit={handleWeightSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={tempWeight}
                  onChange={(e) => setTempWeight(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.000"
                  autoFocus
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowWeightInput(false);
                    setTempWeight('');
                    setSelectedProduct(null);
                  }}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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