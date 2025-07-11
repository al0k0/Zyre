import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from '../Images/signupBanner.png';
import { useAuth } from "../context/authContext";

const Login = () => {
  const {login} = useAuth()
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({}); // 🔥 Track errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        
      });


      const data = await response.json();

      if (response.ok) {
     login(data.user)
        navigate("/");
      } 
      else {
        setErrors({
          email: data.message || "Invalid email or password",
          password: data.message || "Invalid email or password",
        });
      }
      
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="custom-curve flex md:w-1/2 w-full h-64 md:h-auto bg-black justify-center">
        <img src={Banner} alt="Signup" className="mt-24 mr-24" />
      </div>

      <div className="md:w-1/2 w-full flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <h2 className="font-serif text-3xl font-bold mb-6 text-gray-800 text-center">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
            {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`font-body w-full px-4 py-2 border rounded-md focus:ring-2 outline-none ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-gray-300"
                }`}
              />
     
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`font-body w-full px-4 py-2 border rounded-md focus:ring-2 outline-none ${
                  errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-gray-300"
                }`}
              />
            </div>

            <button
              type="submit"
              className="font-body uppercase w-full bg-black text-white py-2 rounded-md hover:bg-opacity-75 transition"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="font-body text-gray-600">
              Don't have an account?{" "}
              <a href="/signup" className="font-serif text-black font-semibold">
                Signup
              </a>
            </p>
            <p className="font-body text-gray-600 mt-1">
              Forgot password?{" "}
              <a href="/forgot-password" className="font-serif text-black font-bold">
                Reset Here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
