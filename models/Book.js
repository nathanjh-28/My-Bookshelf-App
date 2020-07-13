const mongoose = requre('mongoose');

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
    PubDate: Number,
    primaryReview: String,
    coverArt: String,
})

module.exports = mongoose.model('Book', bookSchema);