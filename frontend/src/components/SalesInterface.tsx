import React from 'react';
import { mockClients, mockProducts } from '../types'; // Ensure correct import

const SalesInterface: React.FC = () => {
  return (
    <div>
      <h1>Sales Interface</h1>
      <ul>
        {mockClients.map(client => (
          <li key={client.id}>{client.name}</li>
        ))}
      </ul>
      <ul>
        {mockProducts.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SalesInterface;
