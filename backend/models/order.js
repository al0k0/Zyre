const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      _id: {
        type: String,
        required: true,
      },
      name: String,
      price: Number,
      quantity: Number,
      images: [String],  // Modified here to be an array of strings
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
