import React, { useContext } from 'react';
import { useCart } from '../context/CartContext';

const Order = () => {
  const { cart } = useCart();

  return (
    <div className="mt-24 px-6 md:px-20">
      <h2 className="text-3xl font-bold font-serif mb-8 text-gray-800">🧾 Order Summary</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-lg">You haven’t placed any orders yet.</p>
      ) : (
        <div className="grid gap-6">
          {cart.map((item) => (
            <div key={item._id} className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition-shadow duration-300">
              {/* Image */}
              <div className="w-full md:w-32 h-32 overflow-hidden rounded-xl">
                <img
                  src={item.images?.[0]} // Assuming images is an array
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-500">Quantity: <span className="font-medium text-black">{item.quantity}</span></p>
                <p className="text-gray-500">Price: ₹{item.price}</p>
                <p className="text-gray-700 font-medium">Total: ₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
