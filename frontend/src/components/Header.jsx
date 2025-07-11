import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/authContext';
import { useCart } from '../context/CartContext'; // ✅ Cart context
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa'; // ✅ Cart icon
import SearchModule from './searchModule';
const Header = () => {
  const { wishlist } = useWishlist();
  const { cartItems } = useCart(); // ✅ Cart items
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
   const [isOpen, setIsOpen] = useState(false);

  const closeSearch = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header>
     <nav className="font-serif flex justify-between items-center bg-black text-white p-3 px-6 md:px-12 fixed w-full top-0 z-50">
  <Link to="/" className="text-3xl md:text-4xl tracking-widest">ZYRE</Link>

  {/* Hamburger icon */}
  <div className="md:hidden">
    <button onClick={() => setShowModal(prev => !prev)} className="text-white focus:outline-none">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>

  {/* Desktop Menu */}
  <ul className="hidden md:flex font-body items-center gap-8">
    <li><Link to="/" className="uppercase text-gray-300 hover:text-white transition">Home</Link></li>
    <li><Link to="/shop" className="uppercase text-gray-300 hover:text-white transition">Shop</Link></li>
    <li><Link to="/blog" className="uppercase text-gray-300 hover:text-white transition">Blog</Link></li>
    <li><Link to="/contact" className="uppercase text-gray-300 hover:text-white transition">Contact</Link></li>
  </ul>

  {/* Right Section */}
  <div className="hidden md:flex items-center gap-6 font-body">

 <div className="relative">
            <button onClick={() => setIsOpen(true)} className="">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" className="stroke-current" />
                <line x1="16" y1="16" x2="20" y2="20" className="stroke-current" strokeLinecap="round" />
              </svg>
            </button>
        {isOpen && (
  <div
    className="fixed inset-0 bg-gray-900 bg-opacity-90 z-50 flex items-center justify-center"
    onClick={(e) => {
      if (e.target.id === 'search-wrapper') {
        setIsOpen(false);
      }
    }}
    id="search-wrapper"
  >
    <SearchModule closeSearch={closeSearch} />
  </div>
)}

          </div>

    {/* Wishlist */}
    <Link to={user ? "/wishlist" : "#"} onClick={(e) => { if (!user) { e.preventDefault(); setShowModal(true); }}} className="relative uppercase">
      Wishlist
      <span className="absolute -top-3 -right-4 bg-[#8c907f] text-black text-xs px-2 py-1 rounded-full">
        {wishlist?.length ?? 0}
      </span>
    </Link>

    {/* Cart */}
    <Link to={user ? "/cart" : "#"} onClick={(e) => { if (!user) { e.preventDefault(); setShowModal(true); }}} className="relative">
      <FaShoppingCart size={20} />
    </Link>

    {/* Order */}
    <Link to={user ? "/order" : "#"} onClick={(e) => { if (!user) { e.preventDefault(); setShowModal(true); }}} className="uppercase">
      Order
    </Link>

    {/* User/Profile */}
    {user ? (
      <div className='relative group'>
        <button className='flex items-center gap-2 text-gray-300 hover:text-white'>
          <FaUserCircle size={24} />
          <span className='hidden md:inline'>{user.name}</span>
        </button>
        <div className='absolute right-0 mt-2 w-36 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          <button onClick={handleLogout} className='block w-full text-left px-4 py-2 hover:bg-gray-200'>Logout</button>
        </div>
      </div>
    ) : (
      <Link to='/login' className='uppercase text-gray-300 hover:text-white transition'>Sign In</Link>
    )}
  </div>
</nav>



     {/* Mobile Menu Items */}
{showModal && (
  <div className="md:hidden bg-black text-white px-6 pb-4 space-y-3">
    <Link to="/" className="block uppercase hover:text-gray-300">Home</Link>
    <Link to="/shop" className="block uppercase hover:text-gray-300">Shop</Link>
    <Link to="/blog" className="block uppercase hover:text-gray-300">Blog</Link>
    <Link to="/contact" className="block uppercase hover:text-gray-300">Contact</Link>
    <Link to={user ? "/wishlist" : "/login"} className="block uppercase hover:text-gray-300">Wishlist</Link>
    <Link to={user ? "/cart" : "/login"} className="block uppercase hover:text-gray-300">Cart</Link>
    <Link to={user ? "/order" : "/login"} className="block uppercase hover:text-gray-300">Order</Link>
    {user ? (
      <button onClick={handleLogout} className="block uppercase hover:text-gray-300">Logout</button>
    ) : (
      <Link to="/login" className="block uppercase hover:text-gray-300">Sign In</Link>
    )}
  </div>
)}

    </header>
  );
};

export default Header;
