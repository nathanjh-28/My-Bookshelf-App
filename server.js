const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const methodOverride = require('method-override');

const bookController = require('./controllers/bookController');
const userController = require('./controllers/userController')

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

app.use('/books', bookController);
app.use('/users', userController);

// to be separated
//show page -- "0" to be replaced by :id
// app.get('/users/0', (req, res) => {
//   res.render('users/show')
// })

app.get('*', (req, res) => {
  res.send('<h1>404 Page Not Found</h1>')
})

// ------------------ LISTENER --------------- //
app.listen(PORT, () => console.log(`Now listening on Port ${PORT}`));