const { timeStamp } = require("console");

const mongoose = requre('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    favQuote: String,
    bookshelves: [String],
    displayName: String,
},{timestamps: true})

module.exports = mongoose.model('User',userSchema);