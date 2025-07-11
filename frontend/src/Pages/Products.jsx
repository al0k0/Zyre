import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Products = ({ selectedCategoryId }) => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [showModal, setShowModal] = useState(false); // 🔥 Global Modal State
const {addToCart} = useCart()
  useEffect(() => {
    if (categoryId) {
      fetch(`http://localhost:5000/api/products/${categoryId}`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [categoryId]);
  console.log("Fetched Products:", products);

  return (
    <div className="py-10 mt-16">
      <div className="text-center mb-8">
        <h2 className="text-6xl font-serif font-bold">Latest Collection</h2>
        <p className="text-gray-500 font-body text-lg mt-2">
          Check out our trending products
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center">
        
        {products.map((product) => {
const isInWishlist = (wishlist ?? []).some((item) => item._id === product._id);

          return (
            <div
              key={product._id}
              className="group card my-8 w-80 mr-16 flex flex-col items-center justify-center"
            >
              <div className="relative cursor-pointer w-full h-full overflow-hidden hover:scale-95 duration-300">
                <Link to={`/product/${product._id}`}>
                <img src={product.images} alt="" className="hover:scale-110 duration-300" />
                </Link>
                {/* Wishlist Button */}
                <button
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={() => {
                    const userId = localStorage.getItem("userId");
                    if (!userId) {
                      setShowModal(true); // 🔥 Show modal globally
                    } else {
                      isInWishlist
                        ? removeFromWishlist(product._id)
                        : addToWishlist(product);
                    }
                  }}
                >
                  <i className={isInWishlist ? "fa-solid fa-heart text-black" : "fa-regular fa-heart"}></i>
                </button>
              </div>

              <div className="space-y-2 h-[180px]">
                <h1 className="font-serif text-2xl my-5 h-5">{product.name}</h1>
                <p className="font-body line-clamp-3 text-gray-400 text-lg">
                  {product.description}
                </p>
                <div className="relative w-full">
                  <p className="Price font-body absolute transition-opacity text-lg">
                    Rs. {product.price}
                  </p>
                  <button
                 onClick={() => {
                  const userId = localStorage.getItem("userId");
                  if (!userId) {
                    setShowModal(true);
                  } else {
                    addToCart(product);  // Pass the entire product object
                  }
                }}
                  className="Add-to-cart uppercase font-body text-base">
                    Add to cart
                  </button>
                  
                </div>
              </div>
              
            </div>
            
          );
        })}
      </div>

      {/* 🔥 Global Modal (Covers Full Screen) */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h2 className="text-xl font-bold mb-4 text-black">Login Required</h2>
            <p className="text-gray-600 mb-4">
              You need to log in to add items to your wishlist.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/login" className="bg-black text-white px-4 py-2 rounded-md">
                Login
              </Link>
              <Link to="/signup" className="bg-gray-200 text-black px-4 py-2 rounded-md">
                Sign Up
              </Link>
            </div>
            <button onClick={() => setShowModal(false)} className="mt-4 text-gray-500">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
