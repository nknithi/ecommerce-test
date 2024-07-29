const mongoose = require('mongoose');

// Function to connect to the MongoDB database
const connectDatabase = ()=>{

        // Connect to the MongoDB database using the connection string from the environment variable
    mongoose.connect(process.env.MONGODB_URI).then(con=>{

                // Log a message indicating successful connection and the host name
        console.log(`MongoDB is connected to the host: ${con.connection.host} `)
    })
}

// Export the connectDatabase function so it can be used in other parts of the application
module.exports = connectDatabase;