const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const crypto = require("crypto");


const router = express.Router();
let otps = {};
// Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashPassword = await bcrypt.hash(password, 8);

        user = new User({ name, email, password: hashPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) return res.status(400).json({ message: "User not found" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      // Fetch the user's cart data
      // await user.populate("cart");  // If you are using a reference for the cart (like Product references)
      
      // Generate JWT Token
      const token = jwt.sign({ userId: user._id }, "your_jwt_secret", { expiresIn: "1h" });
  
      // Send the user and cart data in the response
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        // cart: user.cart,  // Include cart data in the response
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "Email not registered" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otps[email] = otp;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "alok08996@gmail.com", // ✅ yahi email registered hona chahiye
    pass: "movj xnva gwdg eric",         // ✅ App password from Google
  },
  tls: {
    rejectUnauthorized: false,         // ✅ SSL error ke liye
  },
});


  const mailOptions = {
    from: "Zyre Fashion <your-email@gmail.com>",
    to: email,
    subject: "Your Zyre OTP for Password Reset",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("OTP Email Error:", err);
      return res.status(500).json({ message: "Failed to send OTP" });
    }
    console.log("OTP sent:", otp);
    res.status(200).json({ message: "OTP sent to your email" });
  });
});


router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!otps[email]) return res.status(400).json({ message: "No OTP found" });
  if (otps[email] !== otp) return res.status(400).json({ message: "Invalid OTP" });

  res.status(200).json({ message: "OTP verified" });
});

router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const hashedPassword = await bcrypt.hash(newPassword, 8);
  user.password = hashedPassword;
  await user.save();

  delete otps[email]; // Remove used OTP

  res.status(200).json({ message: "Password updated successfully" });
});


module.exports = router;
