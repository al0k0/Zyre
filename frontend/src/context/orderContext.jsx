// src/context/OrderContext.jsx
import React, { createContext, useContext } from "react";
import axios from "axios";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const placeOrder = async (userId, cart) => {
    try {
      const res = await axios.post("http://localhost:5000/api/orders", {
        userId,
        items: cart,
      });
      console.log("✅ Order placed:", res.data);
      return res.data;
    } catch (err) {
      console.error("❌ Error placing order:", err);
      throw err;
    }
  };

  const getOrders = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/${userId}`);
      return res.data;
    } catch (err) {
      console.error("❌ Error fetching orders:", err);
      return [];
    }
  };

  return (
    <OrderContext.Provider value={{ placeOrder, getOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
