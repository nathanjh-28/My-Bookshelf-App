const mongoose = require('mongoose');
const db = require('./models');

const booksForDB = [
  {shelf: 'My Favorites',
    title: 'Blood Meridian',
    author: 'Cormac McCarthy',
    summary: `Blood Meridian is an epic novel of the violence and depravity that attended America's westward expansion, brilliantly subverting the conventions of the Western novel and the mythology of the Wild West. Based on historical events that took place on the Texas-Mexico border in the 1850s, it traces the fortunes of the Kid, a fourteen-year-old Tennesseean who stumbles into a nightmarish world where Indians are being murdered and the market for their scalps is thriving`,
    PubDate: 1985,
    primaryReview: 'This book is great.  Two thumbs up',
    coverArt: '',
    color: '#AF6F49'},
  {shelf: 'My Favorites',
    title: 'House of Leaves',
    author: 'Mark Z. Danielewski',
    summary: `Years ago, when House of Leaves was first being passed around, it was nothing more than a badly bundled heap of paper, parts of which would occasionally surface on the Internet. No one could have anticipated the small but devoted following this terrifying story would soon command. Starting with an odd assortment of marginalized youth—musicians, tattoo artists, programmers, strippers, environmentalists, and adrenaline junkies—the book eventually made its way into the hands of older generations, who not only found themselves in those strangely arranged pages but also discovered a way back into the lives of their estranged children.`,
    PubDate: 2000,
    primaryReview: 'Zach loves this book, highly recommend',
    coverArt: '',
    color: '#F28E24'}, 
  {shelf: 'Study Books',
    title: 'Eloquent Javascript',
    author: 'Marijn Haverbeke',
    summary: `JavaScript is the language of the Web, and it's at the heart of every modern website from the lowliest personal blog to the mighty Google Apps. Though it's simple for beginners to pick up and play with, JavaScript is not a toy—it's a flexible and complex language, capable of much more than the showy tricks most programmers use it for.`,
    PubDate: 2000,
    primaryReview: 'Kenny loves this book, he is a little weird but we will go with it',
    coverArt: '',
    color: '#B92A2A'},
  {shelf: 'Study Books',
    title: 'How to Think Like a Computer Scientist',
    author: 'Peter Wentworth, Jeffrey Elkner, Allen B. Downey, and Chris Meyers',
    summary: `If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.`,
    PubDate: 2016,
    primaryReview: 'This is a great book, this is where I started learning python',
    coverArt: '',
    color: '#AF6F49'},
  {shelf: 'Next Books to Read',
    title: 'The Devils Candy',
    author: 'Julie Salamon',
    summary: `When Brian De Palma agreed to allow Julie Salamon unlimited access to the film production of Tom Wolfe's best-selling book The Bonfire of the Vanities, both director and journalist must have felt like they were on to something big. How could it lose? But instead Salamon got a front-row seat at the Hollywood disaster of the decade. She shadowed the film from its early stages through the last of the eviscerating reviews, and met everyone from the actors to the technicians to the studio executives. They'd all signed on for a blockbuster, but there was a sense of impending doom from the start--heart-of-gold characters replaced Wolfe's satiric creations; affable Tom Hanks was cast as the patrician heel; Melanie Griffith appeared mid-shoot with new, bigger breasts. With a keen eye and ear, Salamon shows us how the best of intentions turned into a legendary Hollywood debacle.
    The Devil's Candy joins John Gregory Dunne's The Studio, Steven Bach's Final Cut, and William Goldman's Adventures in the Screen Trade as a classic for anyone interested in the workings of Hollywood. With a new afterword profiling De Palma ten years after the movie's devastating flop (and this book's best-selling publication), Julie Salamon has created a riveting insider's portrait of an industry where art, talent, ego, and money combine and clash on a monumental scale.`,
    PubDate: 2008,
    primaryReview: `I can't wait to read this book!`,
    coverArt: '',
    color: '#11352C'},
  {shelf: 'Next Books to Read',
    title: 'What I Talk About When I Talk About Running',
    author: 'Haruki Murakami',
    summary: `In 1982, having sold his jazz bar to devote himself to writing, Murakami began running to keep fit. A year later, he'd completed a solo course from Athens to Marathon, and now, after dozens of such races, not to mention triathlons and a dozen critically acclaimed books, he reflects upon the influence the sport has had on his life and--even more important--on his writing. Equal parts training log, travelogue, and reminiscence, this revealing memoir covers his four-month preparation for the 2005 New York City Marathon and takes us to places ranging from Tokyo's Jingu Gaien gardens, where he once shared the course with an Olympian, to the Charles River in Boston among young women who outpace him. Through this marvelous lens of sport emerges a panorama of memories and insights: the eureka moment when he decided to become a writer, his greatest triumphs and disappointments, his passion for vintage LPs, and the experience, after fifty, of seeing his race times improve and then fall back. By turns funny and sobering, playful and philosophical, What I Talk About When I Talk About Running is rich and revelatory, both for fans of this masterful yet guardedly private writer and for the exploding population of athletes who find similar satisfaction in distance running."`,
    PubDate: 2007,
    primaryReview: `I can't wait to read this book too!`,
    coverArt: '',
    color: '#B9C998'},

]
// const bookforDB = {shelf: 'My Favorites',
// title: 'Blood Meridian',
// author: 'Cormac McCarthy',
// summary: `Blood Meridian is an epic novel of the violence and depravity that attended America's westward expansion, brilliantly subverting the conventions of the Western novel and the mythology of the Wild West. Based on historical events that took place on the Texas-Mexico border in the 1850s, it traces the fortunes of the Kid, a fourteen-year-old Tennesseean who stumbles into a nightmarish world where Indians are being murdered and the market for their scalps is thriving`,
// PubDate: 1985,
// primaryReview: 'This book is great.  Two thumbs up',
// coverArt: '',
// color: '#B92A2A'}

db.Book.deleteMany({}, (err, deletedItems) => {
  if (err) console.log(err);
  console.log('Deleted: ', deletedItems);
})

db.User.deleteMany({}, (err, deletedItems) => {
  if (err) console.log(err);
  console.log('Deleted: ', deletedItems);
  db.User.create({
    email: '1@gmail.com',
    password: '$2a$10$EicoEioOaoebSFYpEPFcr.QkdjHkVcalb46VFlQYdBXPVIxk435d.',
    favQuote: "It was the best of times",
    bookshelves: ["Currently Reading", "My Favorites", "Study Books", "Next Books to Read"],
    displayName: 'First User',
    privacy: true,
  }, (err, createdUser) => {
    if (err) return console.log(err);
    console.log("User created: ", createdUser);
      db.Book.create(booksForDB[0], (err, createdBook) => {
        if (err) return console.log(err);
        console.log('Added book: ', createdBook)
        createdUser.books.push(createdBook);
        createdUser.save((err, savedUser) => {
          if (err) return console.log(err);
          console.log('User with new book: ', savedUser)
        })})})})


// db.Book.create(bookforDB, (err, createdBook) => {
//   if (err) return console.log(err);
//   console.log('Added book: ', createdBook)
//   createdUser.books.push(createdBook);
//   createdUser.save((err, savedUser) => {
//     if (err) return console.log(err);
//     console.log('User with new book: ', savedUser)