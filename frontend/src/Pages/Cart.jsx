import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useOrder } from '../context/orderContext';
const Cart = () => {
  const navigate = useNavigate()
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { placeOrder } = useOrder();
  const handleQtyChange = (productId, qty) => {
    if (qty >= 1) updateQuantity(productId, qty);
  };
  
  const handlePlaceOrder = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;
  
    if (!userId) {
      alert("User not found. Please login first.");
      return;
    }
  
    try {
      await placeOrder(userId, cart);
      // Optional: clear cart from frontend
      navigate("/order");
    } catch (error) {
      console.error("Order failed", error);
    }
  };
  
  const totalAmount = cart.reduce((total, item)=> total +item.price * item.quantity, 0)

  return (
    
    <div className="mt-20 p-4 md:p-8 flex flex-col md:flex-row gap-6">
   

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
        <div className="flex-1  
        
        -y-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

          {cart.map((item, index) => {
            const { _id, name, price, images, quantity } = item;
 
            return (
              <div key={_id || index} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border rounded p-5">
                <div className="flex items-center gap-4">
                  <img
                    src={images?.[0] || "/placeholder.jpg"}
                    alt={name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{name}</h3>
                    <p className="text-sm text-gray-600">₹{price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
  <div className="flex items-center space-x-2">
    {/* Minus Button */}
    <button
      onClick={() => handleQtyChange(_id, quantity - 1)}
      className="w-10 h-10 flex items-center justify-center text-xl border rounded-full leading-none"
    >
      -
    </button>

    {/* Quantity Display */}
    <div className="px-5 py-1 flex items-center justify-center border text-base font-medium">
      {quantity}
    </div>

    {/* Plus Button */}
    <button
      onClick={() => handleQtyChange(_id, quantity + 1)}
      className="w-10 h-10 flex items-center justify-center text-xl border rounded-full leading-none"
    >
      +
    </button>
  </div>

  {/* Remove Button */}
  <button onClick={() => removeFromCart(_id)} className="text-red-600">
    Remove
  </button>
</div>

              </div>
            );
          })}
        </div>
    

          <div className="w-full  md:w-1/3 border rounded p-4 shadow h-fit">
            <h3 className="font-serif text-2xl mb-4 font-semibold text-[#8c907f]">Price Detail</h3>
            <div className="flex justify-between mb-2 font-body">
              <span >Price ({cart.length} item)</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-body text-lg text-[#8c907f]">Free</span>
            </div>
            <hr className="my-2"/>
            <div className="flex justify-between text-lg ">
              <span className="font-body text-[#8c907f]">Total Amount</span>
              <span className="text-[#8c907f] font-bold fon-body">₹ {totalAmount}</span>
            </div>
            <button
            onClick={handlePlaceOrder}
            className="bg-[#8c907f] text-white font-body text-lg py-2 w-full mt-4 rounded hover:bg-[#686d58] duration-300">
              Place Order
            </button>
          </div>
     
        </>
      )}
    </div>
  );
};

export default Cart;
