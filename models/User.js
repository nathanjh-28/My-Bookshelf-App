const mongoose = require('mongoose');
const Book = require('./Book');

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
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ]
},{timestamps: true})

module.exports = mongoose.model('User',userSchema);