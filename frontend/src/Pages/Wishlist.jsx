import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { Link, useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

   
  return (
    <div className="p-6 ">
      <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p>No items in your wishlist. <Link to="/" className="text-blue-500">Shop Now</Link></p>
      ) : (
        <div className="flex flex-wrap justify-center items-center">
          {wishlist.map((product) => (
            <div key={product._id} className="group card my-8 w-80 mr-16 flex flex-col items-center justify-center">
              <div className="relative cursor-pointer w-full h-full overflow-hidden hover:scale-95 duration-300">
<div>
              <img src={product.images} alt={product.name} className="" />
              <h3 className="mt-2 font-bold">{product.name}</h3>
              <p className="text-gray-500">${product.price}</p>
              </div>
              <button
                className="mt-2 text-white bg-black px-4 py-2 rounded"
                onClick={() => removeFromWishlist(product._id)}  // ✅ Fix applied
              >
                Remove from Wishlist
              </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
