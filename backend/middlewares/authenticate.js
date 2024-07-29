const ErrorHandler = require("../utils/errorHandler"); // Custom error handler class
const User = require('../models/userModel') // User model for database operations
const catchAsyncError = require("./catchAsyncError"); // Middleware to catch and handle asynchronous errors
const jwt = require('jsonwebtoken'); // JSON Web Token library for token verification

// Middleware to check if the user is authenticated
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {

    // Extract the token from cookies
    const { token } = req.cookies;

    // If no token is found, return an error
    if (!token) {
        return next(new ErrorHandler('Login first to handle this resource', 401))
    }


    // Verify the token using the JWT secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Find the user associated with the decoded token and attach the user to the request object
    req.user = await User.findById(decoded.id)

    // Proceed to the next middleware or route handler
    next();
})


// Middleware to authorize user roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {

        // Check if the user's role is included in the allowed roles
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed`, 401))
        }

        // Proceed to the next middleware or route handler
        next()
    }
}   