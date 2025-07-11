const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: String,
    img: [String]

})
module.exports = mongoose.model("Category", CategorySchema)