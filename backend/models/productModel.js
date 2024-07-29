const mongoose = require('mongoose');


// Define the product schema with various fields and their constraints
const productSchema = new mongoose.Schema({
    name: { // Product name
        type: String,
        required: [true, "Please enter product name"], // Name is required
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 characters"] // Maximum length of 100 characters
    },
    price: {  // Product price
        type: Number,
        required: true,  // Price is required
        default: 0.0 // Default value is 0.0
    },
    description: { // Product description
        type: String,
        required: [true, "Please enter product description"] // Description is required
    },
    ratings: { // Product ratings
        type: String,
        default: 0 // Default value is 0
    },
    images: [ // Array of product images
        {
            image: {
                type: String,
                required: true // Image URL is required
            }
        }
    ],
    category: { // Product category
        type: String,
        required: [true, "Please enter product category"], // Category is required
        enum: { // Enum for allowed categories



            values: [
                'Dress',
                'Trouser',
                'Skirt'

            ],
            message: "Please select correct category" // Error message for invalid category
        }
    },
    seller: {
        type: String,
        required: [true, "Please enter product seller"]  // Seller is required
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],  // Stock is required
        maxLength: [20, 'Product stock cannot exceed 20'] // Maximum stock of 20
    },
    numOfReviews: { // Number of reviews
        type: Number,
        default: 0 // Default value is 0
    },
    reviews: [ // Array of reviews
        {
            user: { // User who left the review
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'  // Reference to the User model
            },
            rating: {
                type: String,
                required: true // Rating is required
            },
            comment: {
                type: String,
                required: true  // Comment is required
            }
        }
    ],
    user: { // User who added the product
        type: mongoose.Schema.Types.ObjectId
    }
    ,
    createdAt: { // Date when the product was created
        type: Date,
        default: Date.now() // Default value is the current date and time
    }
})

// Create the Product model using the product schema
let schema = mongoose.model('Product', productSchema)


// Export the Product model to be used in other parts of the application
module.exports = schema