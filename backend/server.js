
// Import necessary modules
const app = require('./app'); // Express application instance
const path = require('path'); // Node.js module for working with file and directory paths
const connectDatabase = require('./config/database'); // Function to connect to the database

// Connect to the MongoDB database
connectDatabase();

// Start the server
const server = app.listen(process.env.PORT,()=>{
    console.log(`My Server listening to the port: ${process.env.PORT} in  ${process.env.NODE_ENV} `)
})


// Handle unhandled promise rejections
process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled rejection error');
    server.close(()=>{
        process.exit(1);
    })
})

// Handle uncaught exceptions
process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception error');
    server.close(()=>{
        process.exit(1);
    })
})



