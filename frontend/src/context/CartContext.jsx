// CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => { 
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  // ✅ Get userId from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log("✅ Found user in localStorage:", user);
      if (user?.id) setUserId(user.id);
    } else {
      console.warn("⛔ No user found in localStorage");
    }
  }, []);

  // ✅ Fetch cart when userId is available
  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        setCart(res.data);
        console.log("✅ Cart fetched:", res.data);
      } catch (err) {
        console.error("❌ Error fetching cart:", err);
      }
    };

    fetchCart();
  }, [userId]);

  // ✅ Add to Cart
  const addToCart = async (product) => {
    if (!userId) {
      alert("Please login/signup to add items to cart!");
      return;
    }
  
    // Ensure the product has an _id field
    if (!product._id) {
      console.error("Product does not have an _id");
      return;
    }
  
    try {
      const res = await axios.post("http://localhost:5000/api/cart", {
        userId,
        product,
      });
  
      setCart(res.data.cart);
      console.log("✅ Added to cart:", res.data.cart);
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
    }
  };

  // Remove Cart 
  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/cart/${userId}/${productId}`);
      setCart(res.data.cart); // Assuming the backend sends the updated cart
      console.log("🗑️ Removed from cart:", res.data.cart);
    } catch (err) {
      console.error("❌ Error removing from cart:", err);
    }
  };
   
  // Update quantity 
  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/cart`, {
        userId,
        productId,
        quantity,
      });
       setCart(res.data.cart);
      console.log("🔁 Quantity updated:", res.data.cart);
    } catch (err) {
      console.error("❌ Error updating quantity:", err);
    }
  
   };

  // Order Place


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity  }}>
      {children}
    </CartContext.Provider>
  );

};
export const useCart = () => useContext(CartContext);
