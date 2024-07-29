// Middleware to handle errors
module.exports = (err, req, res, next) => {
    // Set the status code to the error status code or default to 500 if not set
    err.statusCode = err.statusCode || 500;


    // Handle errors in development environment
    if (process.env.NODE_ENV == 'development') {
        res.status(err.statusCode).json({
            success: false,
            message: err.message, // Error message
            stack: err.stack, // Stack trace for debugging
            error: err // Original error object
        })
    }

    // Handle errors in production environment
    if (process.env.NODE_ENV == 'production') {
        let message = err.message;
        let error = new Error(message);

        // Handle Mongoose validation errors
        if (err.name == "ValidationError") {
            message = Object.values(err.errors).map(value => value.message)
            error = new Error(message)
            err.statusCode = 400
        }

        // Handle Mongoose cast errors (invalid ObjectId)
        if (err.name == 'CastError') {
            message = `Resource not found: ${err.path}`;
            error = new Error(message)
            err.statusCode = 400
        }


        // Handle Mongoose duplicate key errors
        if (err.code == 11000) {
            let message = `Duplicate ${Object.keys(err.keyValue)} error`;
            error = new Error(message)
            err.statusCode = 400
        }

        // Handle invalid JSON Web Token errors
        if (err.name == 'JSONWebTokenError') {
            let message = `JSON Web Token is invalid. Try again`;
            error = new Error(message)
            err.statusCode = 400
        }

        // Handle expired JSON Web Token errors
        if (err.name == 'TokenExpiredError') {
            let message = `JSON Web Token is expired. Try again`;
            error = new Error(message)
            err.statusCode = 400
        }

        // Send a generic error response
        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error',
        })
    }
}