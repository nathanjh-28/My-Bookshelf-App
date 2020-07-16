const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');

//MIDDLEWARE
//test for authentication
router.use('/', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/login');
  } else {
    next();
  }
})

//paths begin '/users'
//all paths continue /:userID/books/:bookID

//USER ROUTES

//Add user route
//DELETE: NOW ON AUTHCONTRL
// router.get('/new',(req,res)=>{
//   res.render('users/new', {
//     profiles: require('../public/js/profileIcons')
//   });
// });

//Create New User
//DELETE: NOW ON AUTHCONTRL
// router.post('/',(req,res)=>{
//   let bookArr = [req.body.bookshelf1,
//     req.body.bookshelf2,
//     req.body.bookshelf3,
//     req.body.bookshelf4,];
//     req.body.bookshelves = bookArr;
//     console.log(req.body.bookshelves)
//     db.User.create(req.body,(err,newUser)=>{
//       if(err)return console.log(err);
//       console.log(newUser);
//       res.redirect(`/users/${newUser._id}`)
//     });
// });

//MOVE TO USERCONTRL?
//edit user route
router.get('/profile/edit',(req,res)=>{
  db.User.findById(req.session.currentUser._id, (err,foundUser)=>{
    if(err)return console.log(err);
    res.render('users/edit',{
      user: foundUser,
    })
  })
})

//update user route

/* ------- Solve Edge Case where user renames shelf --------- */

// router.put('/profile',(req,res)=>{let bookArr = [req.body.bookshelf1,
//   req.body.bookshelf2,
//   req.body.bookshelf3,
//   req.body.bookshelf4,];
//   req.body.bookshelves = bookArr;
//   console.log(req.body.bookshelves)
//   db.User.findByIdAndUpdate(req.session.currentUser._id,
//     req.body,
//     {new:true},
//     (err,updatedUser)=>{
//     if(err)return console.log(err);
//     console.log(updatedUser);
//     res.redirect(`/users/profile`)
//   });
// });

//User Show route
router.get('/profile', (req, res) => {
  db.User.findById(req.session.currentUser._id, (err, foundUser) => {
    if (err) return console.log(err);
    res.render('users/show', {
      user: foundUser
    })
  })
})

//Update Route
router.put('/profile', (req, res) => {
  req.body.bookshelves = [
    req.body.bookshelf1,
    req.body.bookshelf2,
    req.body.bookshelf3,
    req.body.bookshelf4,];
  if (req.body.privacy === 'on') {
    req.body.privacy = true;
  } else {
    req.body.privacy = false;
  }
  const {email, favQuote, bookshelves, displayName, privacy} = req.body;
  const updatedUserObj = {
    email,
    favQuote,
    bookshelves,
    displayName,
    privacy,
  }
  console.log(updatedUserObj);
  if (req.body.password) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return console.log(err);
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return console.log(err);
        updatedUserObj.password = hash;
        db.User.findByIdAndUpdate(req.session.currentUser._id,
          { $set: updatedUserObj},
          {new: true},
          (err, updatedUser) => {
            if (err) return console.log(err);
            console.log(updatedUser);
            res.redirect('/users/profile')
        })
      })
    })
  } else {
    db.User.findByIdAndUpdate(req.session.currentUser._id,
      { $set: updatedUserObj},
      {new: true},
      (err, updatedUser) => {
        if (err) return console.log(err);
        console.log(updatedUser);
        res.redirect('/users/profile')
    })
  }
})

//delete user
router.delete('/:userID',(req,res)=>{
  req.session.destroy((err) => {
    if (err) return console.log(err);
    db.User.findByIdAndDelete(req.params.userID,(err,deletedUser)=>{
      if(err) return console.log(err);
      console.log(deletedUser);
      db.Book.deleteMany({_id: deletedUser.books}, (err, deletedBooks) => {
        if (err) return console.log(err);
        console.log(deletedBooks);
        res.redirect('/login');
      })
    })
  })
})


module.exports = router;