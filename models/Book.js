const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    shelf: String,
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    summary: String,
    PubDate: {
        type: Number,
        min: 1000,
        max: 2050,
    },
    primaryReview: String,
    coverArt: String,
    color: String
})

module.exports = mongoose.model('Book', bookSchema);