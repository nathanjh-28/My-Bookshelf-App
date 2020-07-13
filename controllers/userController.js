const express = require('express');
const router = express.Router();
const db = require('../models')

//index route


//new route

//create route


//show route
router.get('/:id', (req, res) => {
  db.User.findById(req.params.id, (err, foundUser) => {
    if (err) return console.log(err);
    res.render('users/show', {
      user: foundUser
    })

  })
})

//edit route

//update route


//delete route



module.exports = router;