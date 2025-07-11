const express = require("express");
const router = express.Router();
const Order = require("../models/order"); // Don't forget to create this model

// ✅ Create a new order
router.post("/", async (req, res) => {
  const { userId, items } = req.body;

  try {
    console.log("👉 Incoming order data:", req.body); // 🔍 Debug the data you're receiving

    const newOrder = new Order({
      userId,
      items,
      createdAt: new Date(),
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("❌ Failed to create order:", err); // 💥 Log the error in terminal
    res.status(500).json({ message: "❌ Failed to create order", error: err });
  }
});


// ✅ Get all orders of a user (for order history)
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to fetch orders", error: err });
  }
});

module.exports = router;
