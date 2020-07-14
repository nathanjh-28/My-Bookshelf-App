const express = require('express');
const router = express.Router();
const db = require('../models')

//paths begin '/books'
// this path now begins with users/{userID}/books
//index route
router.get('/', (req, res) => {
  db.Book.find({}, (err, foundBooks) => {
    if (err) return console.log(err);
    res.render('books/index', {
      books: foundBooks,
      userID: req.params.userID,
    })
  })
})

//new route
router.get('/new', (req, res) => {
  //hardcoded ID
  db.User.findById(
    
    req.params.userID
    
    ,(err,foundUser)=>{
    if(err)return console.log(err);
    res.render('books/new',{
      user: foundUser,
    });
  })
})

//create route
router.post('/', (req, res) => {
  db.Book.create(req.body, (err, newBook) => {
    if (err) return console.log(err);
    console.log('Created book: ', newBook);
    res.redirect(`/books/${newBook._id}`);
  })
})

//show route
router.get('/:bookid', (req, res) => {
  db.Book.findById(req.params.bookid, (err, foundBook) => {
    if (err) return console.log(err);
    res.render('books/show', {
      book: foundBook
    })
  })
})

//edit route
router.get('/:bookid/edit',(req,res)=>{
  db.User.findById(
    
    req.params.userID
    
    ,(err,foundUser)=>{
    if(err)return console.log(err);
    db.Book.findById(req.params.id, (err, foundBook) => {
      if (err) return console.log(err);
    res.render('books/edit',{
      user: foundUser,
      book: foundBook,
    })
  })
})
});


//update route
router.put('/:bookid',(req,res)=>{
  db.Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true},
    (err, updatedBook) =>{
      if(err) return console.log(err);
      res.redirect(`/books/${req.params.id}`);
    });
});

//delete route
router.delete('/:bookid',(req,res)=>{
  db.Book.findByIdAndDelete(
    req.params.id, (err, deletedBook)=>{
      if(err)return console.log(err);
      console.log(deletedBook);
      res.redirect('/books');
    }
  )
})


module.exports = router;