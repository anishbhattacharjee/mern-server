const mongoose = require('mongoose');

var bookschema = new mongoose.Schema({
    

  title: String, // String is shorthand for {type: String}
  author: String,
  publicationYear: Number,
})


var BookModel = mongoose.model('Book', bookschema)


module.exports = BookModel;