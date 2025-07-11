const express = require("express")
const router = express.Router()
// const Product = require("./products")
const Category = require("../models/category")

router.get("/", async(req,res)=>{
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (error) {
        res.status(500).json({error: "Something went wrong!"})
        console.log("error");
        
    }
})

// router.get("/", async(req,res)=>{
//     try {
//         const {categoryId} = req.query;
//         const filter = categoryId ? {categoryId}: {}
//         const products = await Product.find(filter).populate("categoryId", "name")
//         res.json(products)
//     } catch (error) {
//         res.status(500).json({error: "Something went wrong!"})
//         console.log("error");
        
//     }
// })

router.post("/", async(req,res)=>{
    try {
        const newCategory = new Category(req.body)
        await newCategory.save() 
        res.json({message: "Category added successfully!"})
    } catch (error) {
        res.status(500).json({error:"Failed to add product!"})
    }
})

// router.post("/", async(req,res)=>{
//     try {
//         const newProduct = new Product(req.body)
//         await newProduct.save() 
//         res.json({message: "Product added successfully!"})
//     } catch (error) {
//         res.status(500).json({error:"Failed to add product!"})
//     }
// })
module.exports = router