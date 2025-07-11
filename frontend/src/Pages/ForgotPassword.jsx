import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1 = email, 2 = otp, 3 = new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate= useNavigate()

  // 1️⃣ Send OTP
  const handleSendOtp = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("OTP sent to your email");
        setStep(2);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  // 2️⃣ Verify OTP
  const handleVerifyOtp = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("OTP verified");
        setStep(3);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  // 3️⃣ Reset Password
 const handleResetPassword = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Password reset successfully");

      // Optional: Wait for 2 seconds before redirect
      setTimeout(() => {
        navigate("/login");
        setStep(1);
        setEmail("");
        setOtp("");
        setNewPassword("");
      }, 2000);

    } else {
      setMessage(data.message);
    }
  } catch (err) {
    setMessage("Server error");
  }
};


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

        {message && <p className="text-sm text-red-500 mb-2 text-center">{message}</p>}

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-black text-white py-2 rounded hover:bg-opacity-80"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-black text-white py-2 rounded hover:bg-opacity-80"
            >
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-black text-white py-2 rounded hover:bg-opacity-80"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
