const mongoose = require ("mongoose")

const productSchema = new mongoose.Schema({

    name: String,
    category_id: {type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    subcategory: String,
    price: Number,
    discount_price: Number,
    stock: Number,
    size: [String],
    color: [String],
    images: [String],
    description: String,
    brand: String,
    rating: Number,
    isBestSeller: { type: Boolean, default: false },
       
})


module.exports = mongoose.model("products", productSchema)