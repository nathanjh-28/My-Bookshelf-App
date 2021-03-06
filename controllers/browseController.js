const express = require('express');
const router = express.Router();
const db = require('../models')

//File path is /browse

//MIDDLEWARE
//test for authentication
router.use('/', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/login');
  } else {
    next();
  }
})

// Browse user index
router.get('/',(req,res)=>{
    db.User.find({_id:{$nin:req.session.currentUser._id}},(err,foundUsers)=>{
        if(err)console.log(err);
        res.render('browse/index',{
            users: foundUsers,
            userID: req.session.currentUser._id,
        })
    })
});

// Browse User Show page
router.get('/:userID',(req,res)=>{
    db.User.findById(req.params.userID,(err,foundUser)=>{
        if(err)console.log(err);
        res.render('browse/userShow',{
            user: foundUser,
        })
    })
})

// Browse user shelves
router.get('/:userID/shelves',(req,res)=>{
  db.User.findById(req.params.userID)
  .populate({
    path: 'books'
  })
  .exec((err, foundUser) => {
    if (err) return console.log(err);
    res.render('browse/shelves', {
      books: foundUser.books,
      user: foundUser,
    })
  })
})

//Browse user single shelf
router.get('/:userID/shelf/:shelfID',(req,res)=>{
  const shelfID = parseInt(req.params.shelfID);
  db.User.findById(req.params.userID)
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
    res.render('browse/shelf', {
      user: foundUser,
      books: shelvedBooks,
      shelf: shelfID,
    })
  })
})

// Browse book show page
router.get('/:userID/:bookID',(req,res)=>{
  db.Book.findById(req.params.bookID, (err, foundBook) => {
    if (err) return console.log(err);
    res.render('browse/bookshow', {
      book: foundBook,
      userID: req.params.userID,
    })
  })
})

module.exports = router;


