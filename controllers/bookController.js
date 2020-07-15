const express = require('express');
const router = express.Router();
const db = require('../models')


//paths begin '/users'
//all paths continue /:userID/books/:bookID

//USER ROUTES

//Add user route
router.get('/new',(req,res)=>{
  res.render('users/new', {
    profiles: require('../public/js/profileIcons')
  });
});

//Create New User
router.post('/',(req,res)=>{
  let bookArr = [req.body.bookshelf1,
    req.body.bookshelf2,
    req.body.bookshelf3,
    req.body.bookshelf4,];
    req.body.bookshelves = bookArr;
    console.log(req.body.bookshelves)
    db.User.create(req.body,(err,newUser)=>{
      if(err)return console.log(err);
      console.log(newUser);
      res.redirect(`/users/${newUser._id}`)
    });
});

//edit user route
router.get('/:userID/edit',(req,res)=>{
  db.User.findById(req.params.userID,(err,foundUser)=>{
    if(err)return console.log(err);
    res.render('users/edit',{
      user: foundUser,
    })
  })
})

//update user route

/* ------- Solve Edge Case where user renames shelf --------- */

router.put('/:userID',(req,res)=>{let bookArr = [req.body.bookshelf1,
  req.body.bookshelf2,
  req.body.bookshelf3,
  req.body.bookshelf4,];
  req.body.bookshelves = bookArr;
  console.log(req.body.bookshelves)
  db.User.findByIdAndUpdate(req.params.userID,
    req.body,
    {new:true},
    (err,updatedUser)=>{
    if(err)return console.log(err);
    console.log(updatedUser);
    res.redirect(`/users/${updatedUser._id}`)
  });
});

//User Show route
router.get('/:userID', (req, res) => {
  db.User.findById(req.params.userID, (err, foundUser) => {
    if (err) return console.log(err);
    res.render('users/show', {
      user: foundUser
    })
  })
})

//delete user
router.delete('/:userID',(req,res)=>{
  db.User.findByIdAndDelete(req.params.userID,(err,deletedUser)=>{
    if(err) return console.log(err);
    console.log(deletedUser);
    deletedUser.books.forEach(book=>{
      db.Book.findByIdAndDelete(book,(err,deletedBook)=>{
        if(err)return console.log(err);
        console.log(deletedBook);
        res.redirect('/');
      })
    })
  })
})

//SHELVES ROUTES (Book index)
router.get('/:userID/books/shelf/:shelfID', (req, res) => {
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
    res.render('books/index', {
      user: foundUser,
      books: shelvedBooks
    })
  })
})



//BOOK ROUTES
//index route (refactored)
router.get('/:userID/books', (req, res) => {
  db.User.findById(req.params.userID)
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

//Shelves route (TBD)
// router.get('/:userID/books/shelves', (req, res) => {
//   db.Book.find({}, (err, foundBooks) => {
//     if (err) return console.log(err);
//     res.render('books/shelves', {
//       books: foundBooks,
//       userID: req.params.userID,
//     })
//   })
// })

//new route (refactored)
router.get('/:userID/books/new', (req, res) => {
  //hardcoded ID
  db.User.findById(req.params.userID, 
    (err,foundUser)=>{
    if(err)return console.log(err);
    res.render('books/new',{
      user: foundUser,
    });
  })
})

//create route (refactored)
router.post('/:userID/books', (req, res) => {
  db.Book.create(req.body, (err, newBook) => {
    if (err) return console.log(err);
    console.log('Created book: ', newBook);
    db.User.findById(req.params.userID,(err,foundUser)=>{
      if(err)return console.log(err);
      foundUser.books.push(newBook);
      foundUser.save((err,savedUser)=>{
        if(err)return console.log(user);
        console.log(savedUser);
        res.redirect(`/users/${req.params.userID}/books/${newBook._id}`);
      })
    })
  })
})

//show route (refactored)
router.get('/:userID/books/:bookID', (req, res) => {
  db.Book.findById(req.params.bookID, (err, foundBook) => {
    if (err) return console.log(err);
    res.render('books/show', {
      book: foundBook,
      userID: req.params.userID
    })
  })
})

//edit route (refactored)
router.get('/:userID/books/:bookID/edit',(req,res)=>{
  db.User.findById(req.params.userID,
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
router.put('/:userID/books/:bookID',(req,res)=>{
  db.Book.findByIdAndUpdate(
    req.params.bookID,
    req.body,
    {new:true},
    (err, updatedBook) =>{
      if(err) return console.log(err);
      res.redirect(`/users/${req.params.userID}/books/${req.params.bookID}`);
    });
});

//delete route (refactored)
router.delete('/:userID/books/:bookID',(req,res)=>{
  db.Book.findByIdAndDelete(
    req.params.bookID, (err, deletedBook)=>{
      if(err)return console.log(err);
      console.log(deletedBook);
      db.User.findById(req.params.userID,(err,foundUser)=>{
        foundUser.books.remove(req.params.bookID)
        foundUser.save((err,savedUser)=>{
          if(err)return console.log(err);
          console.log(savedUser)
          res.redirect(`/users/${req.params.userID}/books`);
        })
      })
    }
  )
})


module.exports = router;