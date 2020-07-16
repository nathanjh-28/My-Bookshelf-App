const express = require('express');
const router = express.Router();
const db = require('../models')
//search dependencies
require('dotenv').config();
const parseString = require('xml2js').parseString;
const axios = require('axios');

//MIDDLEWARE
//test for authentication
router.use('/', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/login');
  } else {
    next();
  }
})

//SHELVES ROUTES (Book index)
router.get('/shelf/:shelfID', (req, res) => {
  const shelfID = parseInt(req.params.shelfID);
  db.User.findById(req.session.currentUser._id)
  .populate({
    path: 'books'
  })
  .exec((err, foundUser) => {
    if (err) return console.log(err);
    const shelf = foundUser.bookshelves[shelfID];
    let shelvedBooks = [];
    foundUser.books.forEach(book => {
      if (book.shelf.toString() === shelf.toString()) {
        shelvedBooks.push(book);
      }
    })
    res.render('books/index', {
      user: foundUser,
      books: shelvedBooks,
      shelf: req.params.shelfID
    })
  })
})



//BOOK ROUTES
//index route (refactored)
router.get('/', (req, res) => {
  db.User.findById(req.session.currentUser._id)
  .populate({
    path: 'books'
  })
  .exec((err, foundUser) => {
    if (err) return console.log(err);
    res.render('books/shelves', {
      books: foundUser.books,
      user: foundUser,
    })
  })
})


//new route (refactored)
router.get('/new', (req, res) => {
  db.User.findById(req.session.currentUser._id, (err,foundUser)=>{
    if(err)return console.log(err);
    res.render('books/new',{
      query: '',
      user: foundUser,
      foundBooks: []
    });
  })
})

//search route
router.get('/search', (req, res) => {
  const userResults = [];
  let url = `https://www.goodreads.com/search.xml?key=${process.env.GR_KEY}&q=`;
  const query = req.query.query;
  url += query.toString();
  axios.get(url)
  .then(response => {
    parseString(response.data, (err, result) => {
      const apiResults = result.GoodreadsResponse.search[0].results[0].work;
      apiResults.forEach(result => {
        const newBook = {};
        newBook.title = result.best_book[0].title[0];
        newBook.author = result.best_book[0].author[0].name[0];
        newBook.img = result.best_book[0].image_url[0];
        newBook.PubDate = result.original_publication_year[0]._
        userResults.push(newBook);
      })
      console.log(userResults);
      db.User.findById(req.session.currentUser._id, (err,foundUser)=>{
        if(err)return console.log(err);
        res.render('books/new',{
          query: query,
          user: foundUser,
          foundBooks: userResults
        });
      })
    })

  })
  .catch(error => {
    console.log(error);
  })
})
  
//create route (refactored)
router.post('/', (req, res) => {
  db.Book.create(req.body, (err, newBook) => {
    if (err) return console.log(err);
    console.log('Created book: ', newBook);
    db.User.findById(req.session.currentUser._id,(err,foundUser)=>{
      if(err)return console.log(err);
      foundUser.books.push(newBook);
      foundUser.save((err,savedUser)=>{
        if(err)return console.log(user);
        console.log(savedUser);
        res.redirect(`/books/${newBook._id}`);
      })
    })
  })
})

//show route (refactored)
router.get('/:bookID', (req, res) => {
  db.Book.findById(req.params.bookID, (err, foundBook) => {
    if (err) return console.log(err);
    res.render('books/show', {
      book: foundBook,
      userID: req.session.currentUser._id,
    })
  })
})

//edit route (refactored)
router.get('/:bookID/edit',(req,res)=>{
  db.User.findById(req.session.currentUser._id,
    (err,foundUser)=>{
    if(err)return console.log(err);
    db.Book.findById(req.params.bookID, (err, foundBook) => {
      if (err) return console.log(err);
      res.render('books/edit',{
        user: foundUser,
        book: foundBook,
      })
    })
  })
});

//update route (refactored)
router.put('/:bookID',(req,res)=>{
  db.Book.findByIdAndUpdate(
    req.params.bookID,
    req.body,
    {new:true},
    (err, updatedBook) =>{
      if(err) return console.log(err);
      res.redirect(`/books/${req.params.bookID}`);
    });
});

//delete route (refactored)
router.delete('/:bookID',(req,res)=>{
  db.Book.findByIdAndDelete(
    req.params.bookID, (err, deletedBook)=>{
      if(err)return console.log(err);
      console.log(deletedBook);
      db.User.findById(req.session.currentUser._id,(err,foundUser)=>{
        foundUser.books.remove(req.params.bookID)
        foundUser.save((err,savedUser)=>{
          if(err)return console.log(err);
          console.log(savedUser)
          res.redirect(`/books`);
        })
      })
    }
  )
})


module.exports = router;