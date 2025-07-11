import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/authContext';
import { CartProvider } from './context/CartContext'; // 👈 Yeh import karo
import './index.css';
import { OrderProvider } from './context/orderContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <WishlistProvider>
        <OrderProvider>
        <CartProvider> 
          <App />
        </CartProvider>
        </OrderProvider>
      </WishlistProvider>
    </AuthProvider>
  </React.StrictMode>
);
