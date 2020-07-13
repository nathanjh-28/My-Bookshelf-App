const mongoose = require('mongoose');
const db = require('./models');

const booksForDB = [
  {shelf: 'MyFavorites',
    title: 'Blood Meridian',
    author: 'Cormac McCarthy',
    summary: `Blood Meridian is an epic novel of the violence and depravity that attended America's westward expansion, brilliantly subverting the conventions of the Western novel and the mythology of the Wild West. Based on historical events that took place on the Texas-Mexico border in the 1850s, it traces the fortunes of the Kid, a fourteen-year-old Tennesseean who stumbles into a nightmarish world where Indians are being murdered and the market for their scalps is thriving`,
    PubDate: 1985,
    primaryReview: 'This book is great.  Two thumbs up',
    coverArt: '',
    color: 'red'},
  {shelf: 'MyFavorites',
    title: 'House of Leaves',
    author: 'Mark Z. Danielewski',
    summary: `Years ago, when House of Leaves was first being passed around, it was nothing more than a badly bundled heap of paper, parts of which would occasionally surface on the Internet. No one could have anticipated the small but devoted following this terrifying story would soon command. Starting with an odd assortment of marginalized youth—musicians, tattoo artists, programmers, strippers, environmentalists, and adrenaline junkies—the book eventually made its way into the hands of older generations, who not only found themselves in those strangely arranged pages but also discovered a way back into the lives of their estranged children.`,
    PubDate: 2000,
    primaryReview: 'Zach loves this book, highly recommend',
    coverArt: '',
    color: 'red'}, 
  {shelf: 'Study Books',
    title: 'Eloquent Javascript',
    author: 'Marijn Haverbeke',
    summary: `JavaScript is the language of the Web, and it's at the heart of every modern website from the lowliest personal blog to the mighty Google Apps. Though it's simple for beginners to pick up and play with, JavaScript is not a toy—it's a flexible and complex language, capable of much more than the showy tricks most programmers use it for.`,
    PubDate: 2000,
    primaryReview: 'Kenny loves this book, he is a little weird but we will go with it',
    coverArt: '',
    color: 'red'}
]

db.Book.deleteMany({}, (err, deletedItems) => {
  if (err) console.log(err);
  console.log('Deleted: ', deletedItems);
})
booksForDB.forEach(book => {
  db.Book.create(book, (err, createdBook) => {
    if (err) return console.log(err);
    console.log('Added book: ', createdBook)
  })
})
db.User.deleteMany({}, (err, deletedItems) => {
  if (err) console.log(err);
  console.log('Deleted: ', deletedItems);
})
db.User.create({
  username: 'firstUser',
  password: 'password',
  favQuote: "It was the best of times",
  bookshelves: ["Currently Reading", "My Favorites", "Study Books"],
  displayName: ''
}, (err, createdUser) => {
  if (err) return console.log(err);
  console.log("User created: ", createdUser);
})