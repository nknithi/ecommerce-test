// Import necessary modules
const express = require('express');  // Express framework
const app = express();  // Create an instance of Express application
const errorMiddleware = require('./middlewares/error');  // Error handling middleware
const cookieParser = require('cookie-parser')  // Middleware for parsing cookies
const path = require('path')  // Node.js module for working with file and directory paths




const dotenv = require('dotenv'); // Module to load environment variables
dotenv.config({path:path.join(__dirname,"config/config.env")}); // Load environment variables from config file


// Middleware setup
app.use(express.json()); // Middleware to parse JSON bodies of incoming requests
app.use(cookieParser()); // Middleware to parse cookies from incoming requests
app.use('/uploads', express.static(path.join(__dirname,'uploads') ) ) // Serve static files from 'uploads' directory


// Route imports
const products = require('./routes/product') // Route for products
const auth = require('./routes/auth')  // Route for authentication


app.use('/api/v1/',products); // Mount products routes under '/api/v1/products'
app.use('/api/v1/',auth); // Mount authentication routes under '/api/v1/auth'


// Serve frontend in production
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build'))); // Serve static files from 'frontend/build' directory
    app.get('*', (req, res) =>{  // For any other routes, serve the frontend 'index.html'
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

// Error handling middleware
app.use(errorMiddleware) // Mount the custom error handling middleware

module.exports = app; // Export the Express application for use in other modules