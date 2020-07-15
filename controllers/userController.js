const express = require('express');
const router = express.Router();
const db = require('../models')

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


module.exports = router;