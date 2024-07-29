// Importing products data from JSON file and necessary modules
const products = require('../data/products.json');  // JSON data containing products
const Product = require('../models/productModel');  // Product model for MongoDB
const dotenv = require('dotenv');  // Module to load environment variables
const connectDatabase = require('../config/database') // Function to connect to MongoDB database

// Load environment variables from a specific configuration file
dotenv.config({ path: 'backend/config/config.env' });

// Connect to the MongoDB database using the configured function
connectDatabase();


// Function to seed products into the database
const seedProducts = async () => {
    try {

        // Delete all existing products from the database
        await Product.deleteMany();
        console.log('Products deleted!')

        // Insert all products from the JSON file into the database
        await Product.insertMany(products);
        console.log('All products added!');
    } catch (error) {
        console.log(error.message); // Log any errors that occur during the seeding process
    }
    process.exit(); // Exit the process once seeding is complete
}

seedProducts(); // Execute the seeding function to populate the database with products