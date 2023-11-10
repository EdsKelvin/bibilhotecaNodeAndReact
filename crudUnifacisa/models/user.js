const mongoose = require('mongoose')

const user = mongoose.model('User', {
  user_name: String,
  email: String,
  password: String,
  confirmpassword: String
})

module.exports = user