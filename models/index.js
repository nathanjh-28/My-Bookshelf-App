const mongoose = require('mongoose');

// ------ for use with seed file, seed does not like env ---- //
// const MONGODB_URI = 
//mongoose.connect(MONGODB_URI, {


mongoose.connect(process.env.MONGODB_URI, {
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