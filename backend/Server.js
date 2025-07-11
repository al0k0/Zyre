const express = require ("express")
const mongoose = require ("mongoose")
const cors = require ("cors")
const productRoutes = require("./routes/productRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const wishlistRoutes = require("./routes/wishlistRoutes")
const cartRoutes = require("./routes/cartRoutes")
const orderRoutes = require("./routes/orderRoutes")
const contactRoutes = require("./routes/contactRoute")
require("dotenv").config()

const authRoutes = require("./routes/auth")
const app = express()
app.use(express.json())
app.use(cors())
app.use("/api/products", productRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/auth", authRoutes)
app.use("/api", wishlistRoutes)
app.use("/api", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/contacts", contactRoutes)


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));


app.get("/", (req,res) =>{
    res.send("Fashion Store Backend is Running!")
   
})

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`)
)