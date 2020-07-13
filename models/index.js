const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/My-Bookshelf-App'

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(()=> console.log('MonogoDB connected successfully'))
    .catch((err)=> console.log(`MongoDB connection error: ${err}`));

module.exports = {
    Book: require('./Book'),
    User: require('./User'),
};