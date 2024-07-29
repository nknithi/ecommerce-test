const mongoose = require('mongoose');
const validator = require('validator'); // Library for string validation
const bcrypt = require('bcrypt');  // Library for hashing passwords
const jwt = require('jsonwebtoken');  // Library for generating JSON Web Tokens
const crypto = require('crypto')  // Library for cryptographic functions


// Define the user schema with various fields and their constraints
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']  // Name is required
    },
    email: {
        type: String,
        required: [true, 'Please enter email'], // Email is required
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']  // Validate email format
    },
    password: { // User's password
        type: String,
        required: [true, 'Please enter password'], // Password is required

        select: false
    },
    avatar: { // User's avatar image URL
        type: String
    },
    role: {
        type: String,
        default: 'user'  // Default role is 'user'
    }

})

// Pre-save middleware to hash the password before saving the user document
userSchema.pre('save', async function (next) {

    // If the password is not modified, move to the next middleware
    if (!this.isModified('password')) {
        next();
    }

    // Hash the password with a salt factor of 10
    this.password = await bcrypt.hash(this.password, 10)
})

// Method to generate a JSON Web Token for the user
userSchema.methods.getJwtToken = function () {

    // Sign a JWT with the user's ID and the secret key, and set the token's expiration time
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

// Method to compare the entered password with the hashed password in the database
userSchema.methods.isValidPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
}

// Create the User model using the user schema
let model = mongoose.model('User', userSchema);

// Export the User model to be used in other parts of the application
module.exports = model;