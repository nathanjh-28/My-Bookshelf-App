const mongoose = require('mongoose');
const db = require('./models');

db.User.find({}, (err, foundUsers) => {
  if (err) return console.log(err);
  console.log("Users in system: ", foundUsers)
})