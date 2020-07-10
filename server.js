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

app.get('*', (req, res) => {
  res.send('<h1>404 Page Not Found</h1>')
})

// ------------------ LISTENER --------------- //
app.listen(PORT, () => console.log(`Now listening on Port ${PORT}`));