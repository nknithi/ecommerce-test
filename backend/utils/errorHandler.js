class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message) // Call the constructor of the Error class with the provided message

        this.statusCode = statusCode; // Assign the statusCode property to the instance
        Error.captureStackTrace(this, this.constructor) // Capture the stack trace for debugging
    }
}

module.exports = ErrorHandler; // Export the ErrorHandler class to be used in other parts of the application