const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
  Id: Number,
  name: String,
  email: String,
  gender: String,
  status: String,
  Created_at: Date,
  Updated_at: Date,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
