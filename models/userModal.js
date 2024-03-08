const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true
  },
  hens:{
    type : Number, 
  },
  ducks:{
    type : Number,
  },
  chicks:{
    type : Number,
  },
  pegion:{
    type : Number,
  }
});

userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10)
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(err => {
      next(err);
    });
});

//add test data

const UserModal = mongoose.model('User', userSchema);

module.exports = UserModal
