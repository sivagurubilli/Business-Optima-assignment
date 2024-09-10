const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    maxlength: 50,
   
  },
  emailAddress: {
    type: String,
    required: true,
   
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
   
  },
  address: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  city: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    
  },
  state: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
   
  },
  zipCode: {
    type: String,
    required: true,
    trim: true,
   
  },
  country: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
   
  },
  securityQuestion: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  securityAnswer: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  isDeleted:{type:Boolean,default:false},
  createdAt: { type: Date },
  updatedAt: { type: Date }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
