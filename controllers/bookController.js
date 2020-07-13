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
const book = require('../models/startData');
router.get('/:id', (req, res) => {
  res.render('books/show', {
    book: book[2]
  })
})

//edit route

//update route


//delete route



module.exports = router;