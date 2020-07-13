const express = require('express');
const router = express.Router();
const db = require('../models')

//paths begin '/books'
//index route
router.get('/', (req, res) => {
  db.Book.find({}, (err, foundBooks) => {
    if (err) return console.log(err);
    res.render('books/index', {
      books: foundBooks
    })
  })
})

//new route
router.get('/new', (req, res) => {
  res.render('books/new');
})

//create route


//show route
router.get('/:id', (req, res) => {
  db.Book.findById(req.params.id, (err, foundBook) => {
    if (err) return console.log(err);
    res.render('books/show', {
      book: foundBook
    })
  })
})

//edit route

//update route


//delete route



module.exports = router;