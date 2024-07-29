const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    }
}, {collection: 'LoginDB'});

// Create a model from the schema
const User = mongoose.model('LoginDB', userSchema);

module.exports = User;