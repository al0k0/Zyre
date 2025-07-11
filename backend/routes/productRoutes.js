const express = require("express");
const router = express.Router();
const Products = require("../models/products");

// 1. ✅ Single Product by ID
router.get("/product/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Backend route (example: routes/products.js)
router.get("/search", async (req, res) => {
  const query = req.query.q;
  try {
    const product = await Products.findOne({ name: { $regex: query, $options: "i" } });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// 2. ✅ Products by Category ID (keep this after the above!)
router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await Products.find({ category_id: categoryId });
    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching category products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
});

module.exports = router;