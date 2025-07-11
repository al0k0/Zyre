import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/footer';
import Home from './Pages/Home';
import Products from './Pages/Products';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Wishlist from './Pages/Wishlist';
import { WishlistProvider } from './context/WishlistContext';
import ProductInfo from './Pages/ProductInfo';
import Cart from './Pages/Cart';
import Order from './Pages/Order';
import  Contact  from './Pages/Contact';
import ForgotPassword from './Pages/ForgotPassword';
import VerifyOtp from './Pages/VerifyOtp';
import ResetPassword from './Pages/ResetPassword';


function App() {
  
  return (
    <WishlistProvider>
      <Router>
        <div className="min-h-screen flex flex-col justify-between"> {/* ✅ Full height container */}
          <Header />

          <main className="flex-grow"> {/* ✅ This will expand to fill remaining space */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/products/:categoryId" element={<Products />} />
              <Route path="/product/:productId" element={<ProductInfo />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<Order />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/verify-otp" element={<VerifyOtp />} />
<Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
          </main>

          <Footer /> {/* ✅ Always sticks at the bottom */}
        </div>
      </Router>
    </WishlistProvider>
  );
}

export default App;
