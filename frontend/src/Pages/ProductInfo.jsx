import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductInfo = () => {
  const { productId } = useParams();
  const [info, setInfo] = useState(null);
const [showModal, setShowModal] = useState(false);

  const { addToCart } = useCart()
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()

  const isInWishlist = wishlist?.some(item => item._id === info?._id);
  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await fetch(`https://zyre-1.onrender.com/api/products/product/${productId}`);
        const data = await res.json();
        setInfo(data);
        
        setInfo(data); // or data.product
      } catch (err) {
        console.error('Error fetching product info:', err);
      }
    };
  
    if (productId) {
      getInfo();
    }
  }, [productId]);
  
  if (!info) return <div className="mt-16">Loading product info...</div>;

  return (
     <div className="mt-24 px-6 md:px-20 font-sans">
      <div className="flex flex-col  md:flex-row gap-12 items-start">

        {/* Left: Product Image */}
        <div className="relative group">
          <img
            src={info.images?.[0] || info.images}
            alt={info.name}
            className="w-full max-w-lg rounded-2xl shadow-lg object-cover  duration-300"
          />

          {/* Wishlist Button */}
          <button
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => {
              const userId = localStorage.getItem("userId");
              if (!userId) {
                setShowModal(true);
              } else {
                isInWishlist ? removeFromWishlist(info._id) : addToWishlist(info);
              }
            }}
            title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <i className={isInWishlist ? "fa-solid fa-heart text-zivaa-accent" : "fa-regular fa-heart "}></i>
          </button>
        </div>

        {/* Right: Product Details */}
        <div className="space-y-6 sticky">
          <h1 className="text-4xl font-bold text-gray-800">{info.name}</h1>
          <p className="text-gray-600 text-lg leading-relaxed">{info.description}</p>
          <p className="text-2xl font-semibold ">₹{info.price}</p>

          <button
            onClick={() => {
              const userId = localStorage.getItem("userId");
              if (!userId) {
                setShowModal(true);
              } else {
                addToCart(info);
              }
            }}
            className="bg-zivaa-accent hover:opacity-75 text-white bg-black px-6 py-3 rounded-xl text-lg shadow transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Login Required Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h2 className="text-xl font-bold mb-4 text-black">Login Required</h2>
            <p className="text-gray-600 mb-4">You need to log in to continue.</p>
            <div className="flex justify-center gap-4">
              <Link to="/login" className="bg-black text-white px-4 py-2 rounded-md">
                Login
              </Link>
              <Link to="/signup" className="bg-gray-200 text-black px-4 py-2 rounded-md">
                Sign Up
              </Link>
            </div>
            <button onClick={() => setShowModal(false)} className="mt-4 text-gray-500 hover:underline">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
