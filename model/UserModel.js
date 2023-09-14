const mongoose = require('mongoose');

var userschema = new mongoose.Schema({

  name: String, // String is shorthand for {type: String}
  email: String,
  imageurl: String,
  gender: {
    type: String,
    enum : ['M','F']
    
},
status: String,
createdAt: {type: Date, default: Date.now}
})


var UserModel = mongoose.model('User', userschema)

module.exports = UserModel;