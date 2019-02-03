const constants = require('../constants');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const constants = require('/request.model');
const WORK_FACTOR = 10;
const FIRST_ADMIN_EMAIL = process.env.FIRST_ADMIN_EMAIL;

const schema = new mongoose.Schema({
  role: {
    type: String,
    enum: [constants.ROLE_ADMIN, constants.ROLE_GUEST],
    default: constants.ROLE_GUEST
  },
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    require: [true, 'Email is required'],
    match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,10}$/, 'Formato de email no válido']
  },
  password: {
    type: String,
    require: true,
    minlength: [6, 'Necesita al menos 6 caracteres']
  },
  responsable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  responsable_email: {
    type: String,
    trim: true,
    lowercase: true,
    require: [true, 'Responsable\'s email is required'],
    match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,10}$/, 'Formato de email no válido']
  }
}, { timestamps: true });

schema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}

schema.pre('save', function (next) {
  const user = this;

  if (user.email === FIRST_ADMIN_EMAIL) {
    user.role = constants.ROLE_ADMIN;
  }

  if (user.isModified('password')) {
    bcrypt.genSalt(WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(user.password, salt)
          .then(hash => {
            user.password = hash;
            next();
          });
      })
      .catch(error => next(error));
  } else {
    next();
  }
});

const User = mongoose.model('User', schema);
module.exports = User;