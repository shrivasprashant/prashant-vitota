const mongoose = require("mongoose");

const categoryShema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: String,
        required: true,
        unique: true
    },

});


const category = mongoose.model("categories", categoryShema);
module.exports = category
