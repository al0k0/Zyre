const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ Add to Cart
router.post("/cart", async (req, res) => {
  const { userId, product } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const alreadyInCart = user.cart.some(
      (item) => item._id.toString() === product._id.toString()
    );

    if (!alreadyInCart) {
      user.cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        images: product.images,
        quantity: 1,
      });
      await user.save();
    }

    res.status(200).json({ message: "Added to cart", cart: user.cart });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Get Cart
router.get("/cart/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.cart);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Update Quantity in Cart
// ✅ Update Quantity in Cart
router.put("/cart", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = user.cart.find(
      (item) => item._id.toString() === productId.toString()
    );

    if (product) {
      product.quantity = quantity;
      await user.save();
      res.status(200).json({ message: "Quantity updated", cart: user.cart });
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (err) {
    console.error("Error updating quantity:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


// ✅ Remove from Cart
router.delete("/cart/:userId/:productId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter(
      (item) => item._id.toString() !== req.params.productId
    );
    await user.save();

    res.status(200).json({ message: "Removed from cart", cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("cart/:userId/clear", async (req, res) => {
  try {
    await Cart.deleteMany({ userId: req.params.userId });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "Failed to clear cart" });
  }
});

module.exports = router;
