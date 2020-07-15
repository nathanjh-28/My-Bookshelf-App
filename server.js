const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const methodOverride = require('method-override');
require('dotenv').config();
const db = require('./models');
const session = require('express-session');

const bookController = require('./controllers/bookController');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

app.set('view engine', 'ejs');

// ----------------- MIDDLEWARE -------------- //
//setup for public folder use
app.use(express.static(`${__dirname}/public`));
//body parser
app.use(express.urlencoded({extended: false}));
//method override
app.use(methodOverride('_method'));

//session creation
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2
  }
}))

// ------------------- ROUTES ---------------- //
app.get('/', (req, res) => {
  res.redirect('/login')
})

app.use('/', authController);
app.use(`/books`, bookController);
app.use('/users', userController);

app.get('*', (req, res) => {
  res.send('<h1>404 Page Not Found</h1>')
})

// ------------------ LISTENER --------------- //
app.listen(PORT, () => console.log(`Now listening on Port ${PORT}`));