const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const methodOverride = require('method-override');

app.set('view engine', 'ejs');

// ----------------- MIDDLEWARE -------------- //
//setup for public folder use
app.use(express.static(`${__dirname}/public`));
//body parser
app.use(express.urlencoded({extended: false}));
//method override
app.use(methodOverride('_method'));

// ------------------- ROUTES ---------------- //
app.get('/', (req, res) => {
  res.render('index')
})

// to be separated
//show page -- "0" to be replaced by :id
app.get('/users/0', (req, res) => {
  res.render('users/show')
})

app.get('/books',(req,res)=>{
  res.render('books/index');
})

const book = require('./models/startData');
app.get('/books/0', (req, res) => {
  res.render('books/show', {
    book: book[2]
  })
})

app.get('/books/new',(req,res)=>{
  res.render('books/new')
})
app.get('*', (req, res) => {
  res.send('<h1>404 Page Not Found</h1>')
})

// ------------------ LISTENER --------------- //
app.listen(PORT, () => console.log(`Now listening on Port ${PORT}`));