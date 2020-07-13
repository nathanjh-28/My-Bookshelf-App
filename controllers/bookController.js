const express = require('express');
const router = express.Router();
const db = require('../models')

//assuming there is only one user, only for dev purposes
let userID = 'str'
db.User.find({}, (err,foundUser)=>{
  if(err) return console.log(err);
  userID = foundUser[0]._id;
  console.log(userID);
})

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
  //hardcoded ID
  db.User.findById(userID,(err,foundUser)=>{
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
router.get('/:id', (req, res) => {
  db.Book.findById(req.params.id, (err, foundBook) => {
    if (err) return console.log(err);
    res.render('books/show', {
      book: foundBook
    })
  })
})

//edit route
router.get('/:id/edit',(req,res)=>{
  db.User.findById(userID,(err,foundUser)=>{
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
router.put('/:id',(req,res)=>{
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
router.delete('/:id',(req,res)=>{
  db.Book.findByIdAndDelete(
    req.params.id, (err, deletedBook)=>{
      if(err)return console.log(err);
      console.log(deletedBook);
      res.redirect('/books');
    }
  )
})


module.exports = router;