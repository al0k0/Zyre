const express = require ("express")
const router = express.Router()
const User = require ("../models/User")

// ✅ 1. Add to Wishlist
router.post("/wishlist", async (req, res) => {
    const { userId, product } = req.body;

    console.log("➡️ userId:", userId);
console.log("➡️ product:", product);

    console.log("➡️ Received product:", product);

    

    try {
        let user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const isAlreadyInWishlist = user.wishlist.some(
            (item) => item._id.toString() === product._id.toString()
            
          );
          
          if (!isAlreadyInWishlist) {
            user.wishlist.push({
              _id: product._id,
              name: product.name,
              price: product.price,
              images: product.images
            });
            await user.save();
          }
          

        res.status(200).json({ message: "Product added to wishlist", wishlist: user.wishlist });
    } catch (error) {
        console.error("❌ Wishlist add error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// ✅ 2. Get Wishlist Items
router.get("/wishlist/:userId", async (req, res)=>{
    try {
        const user = await User.findById(req.params.userId)
        if(!user) return res.status(404).json({message: "User not found"})

            res.status(200).json(user.wishlist)
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})


// ✅ 3. Remove from Wishlist
router.delete("/wishlist/:userId/:productId", async (req, res)=>{
    try {
        let user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.wishlist = user.wishlist.filter(
            (item) => item._id.toString() !== req.params.productId
          );        await user.save()

        res.status(200).json({ message: "Product removed from wishlist", wishlist: user.wishlist})
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})

module.exports = router 