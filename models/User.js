const mongoose = require('mongoose');
const Book = require('./Book');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    favQuote: String,
    bookshelves: [String],
    displayName: {
        type: String,
        maxlength: 12,
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
    profileImg: {
        type: String,
        default: 'default.jpg'
    },
    privacy:{
        type: Boolean,
        default: false,
    }
},{timestamps: true})

module.exports = mongoose.model('User',userSchema);