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

// --------------- Multer ------------------ //
const multer = require('multer');
const path = require('path');
//Set storage engine:
const storage = multer.diskStorage({
  destination:'./public/uploads/',
  filename: function(req,file,cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
// Init upload
const upload = multer({
  storage: storage,
  limits: {fileSize:1000000},
  fileFilter: function (req,file,cb){
    checkFileType(file,cb)
  }
}).single('profile-img')

//function for checking file type
function checkFileType (file,cb){
  //allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  //check extensions
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //check that mime type is image
  const mimetype = filetypes.test(file.mimetype);
  if(mimetype && extname){
    return cb(null,true);
  }else {
    cb('Error images only!')
  }}

//change profile picture route
//upload route
router.post('/upload',(req,res)=>{
  upload(req,res,(err)=>{
    if(err)console.log(err);
    if(req.file==undefined){
      res.send(`<script>alert('No valid file Selected')</script>`)
    }
    else {
      db.User.findByIdAndUpdate(req.session.currentUser._id,{$set:{'profileImg':req.file.filename}},(err,updatedUser)=>{
        res.redirect('/users/profile')
      })
      console.log(`file uploaded, path is uploads/${req.file.filename}`)
    }
  })
})

//edit user route
router.get('/profile/edit',(req,res)=>{
  db.User.findById(req.session.currentUser._id, (err,foundUser)=>{
    if(err)return console.log(err);
    res.render('users/edit',{
      user: foundUser,
    })
  })
})

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