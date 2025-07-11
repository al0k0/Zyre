// WishlistContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

// Create the context
const WishlistContext = createContext();

// Create the provider
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState(null);

  // ✅ Get userId from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log("✅ Found user in localStorage:", user); // debug
      if (user?.id) {
        setUserId(user.id);
      }
    } else {
      console.warn("⛔ No user found in localStorage");
    }
  }, []);

  // ✅ Fetch wishlist when userId is available
  useEffect(() => {
    if (!userId) {
      console.warn("⛔ No userId, skipping wishlist fetch");
      return;
    }

    const fetchWishlist = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/wishlist/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch wishlist");

        const data = await res.json();
        setWishlist(data);
        console.log("✅ Wishlist fetched:", data); // debug
      } catch (err) {
        console.error("❌ Error fetching wishlist:", err);
      }
    };

    fetchWishlist();
  }, [userId]); // depends on userId

  // ✅ Add to wishlist
  const addToWishlist = async (product) => {
    if (!userId) {
      alert("Please login/signup to add items to wishlist!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, product }),
      });

      if (!res.ok) throw new Error("Failed to add to wishlist");

      const data = await res.json();
      setWishlist(data.wishlist);
      console.log("✅ Added to wishlist:", data.wishlist);
    } catch (err) {
      console.error("❌ Error adding to wishlist:", err);
    }
  };

  // ✅ Remove from wishlist
  const removeFromWishlist = async (productId) => {
    if (!userId) {
      console.warn("User not logged in, cannot remove from wishlist");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/wishlist/${userId}/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to remove from wishlist");

      const data = await res.json();
      setWishlist(data.wishlist);
      console.log("✅ Removed from wishlist:", data.wishlist);
    } catch (err) {
      console.error("❌ Error removing from wishlist:", err);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Export the custom hook
export const useWishlist = () => useContext(WishlistContext);
 