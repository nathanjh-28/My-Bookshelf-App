const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs')

//Login Form Route
router.get('/login', (req, res) => {
  res.render('index');
})

//Register Form Route
router.get('/register', (req,res) => {
  res.render('users/new');
})

//Register Create Route
router.post('/register', (req, res) => {
  db.User.findOne({email: req.body.email}, (err, foundUser) => {
    if (err) return console.log(err);
    //check for existing account
    if (foundUser) return console.log('User already exists');
    //generate Hash Salt
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return console.log(err);
      //hash password
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return console.log(err);
        //destructure New User Data
        req.body.bookshelves = [
          req.body.bookshelf1,
          req.body.bookshelf2,
          req.body.bookshelf3,
          req.body.bookshelf4,];
        const {email, favQuote, bookshelves, displayName, books, profileImg} = req.body;
        //construct New User Object with hashed password
        const newUser = {
          email,
          password: hash,
          favQuote,
          bookshelves,
          displayName,
          books,
          profileImg
        }
        // Create User
        db.User.create(newUser, (err, createdUser) => {
          if (err) return console.log(err);
          res.redirect('/login')
        })
      })
    })
  })
})

module.exports = router;