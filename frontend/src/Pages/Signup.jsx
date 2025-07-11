import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Banner from '../Images/signUpBanner.png'

const Signup = () => {
  const [formData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  const handleChange = (e)=>{
    setFromData({...formData,[e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (!formData.name.trim()) {
      alert("Please enter your full name");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }
  
    if (formData.password.length < 6) {
      alert("Password should be at least 6 characters long");
      return;
    }
  
    if (formData.mobile) {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(formData.mobile)) {
        alert("Mobile number must be 10 digits only");
        return;
      }
    }
  
    try {
      const response = await fetch("https://zyre-1.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("Signup successful");
        navigate("/login");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error("Signup error", error);
      alert("Something went wrong!");
    }
  };
  
  return (
<div className="flex flex-col md:flex-row h-screen">
      {/* Left Side - Image */}
      <div className=" custom-curve flex md:w-1/2 w-full h-64 md:h-auto bg-black  justify-center">
        <img
          src={Banner}
          alt="Signup"
          className="mt-24 mr-24"
        /> 
      </div>
      {/* Right Side - Signup Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <h2 className=" font-serif text-3xl font-bold mb-6 text-gray-800 text-center">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className=" font-body w-full px-4 py-2 border rounded-md focus:ring-2 outline-none focus:ring-gray-300"
            />  
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}  
              onChange={handleChange}
              className="font-body w-full px-4 py-2 border rounded-md focus:ring-2 outline-none focus:ring-gray-300"
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number (Optional)"
              value={formData.mobile}
              onChange={handleChange}
              className="font-body w-full px-4 py-2 border rounded-md focus:ring-2 outline-none focus:ring-gray-300"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="font-body w-full px-4 py-2 border rounded-md focus:ring-2 outline-none focus:ring-gray-300"
            />

            <button
              type="submit"
              className=" font-body uppercase w-full bg-black text-white py-2 rounded-md hover:bg-opacity-75 transition"
            >
              Sign Up
            </button>
          </form>

          {/* Already have account + Forgot Password */}
          <div className="mt-4 text-center">
            <p className="font-body text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="font-serif text-black font-bold">
                Login
              </a>
            </p>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup