const sendToken = (user, statusCode, res) => {

      // Create JWT Token using the getJwtToken method of the user object
    const token = user.getJwtToken();

        // Configure options for the cookie
    const options = {
        expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRES_TIME  * 24 * 60 * 60 * 1000 
            ),
        httpOnly: true,  // Cookie is accessible only through the HTTP protocol
    } 

        // Set HTTP status code, set cookie named 'token', and send JSON response
    res.status(statusCode) // Set HTTP status code
    .cookie('token', token, options) // Set the 'token' cookie with the JWT token and options
    .json({ // Send JSON response to client
        success: true, // Operation success indicator
        token,  // Send the JWT token in the response
        user // Send the user object in the response
    })


}

module.exports = sendToken; // Export the sendToken function for use in other parts of the application