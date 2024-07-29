const express = require('express');
const {
    getProducts,  // Controller function to fetch all products
    newProduct, // Controller function to create a new product (admin only)
    getSingleProduct,   // Controller function to fetch a single product by ID
    updateProduct, // Controller function to update a product by ID (admin only)
    deleteProduct,  // Controller function to delete a product by ID (admin only)
    createReview,  // Controller function to create a product review (authenticated users)
    getReviews,   // Controller function to fetch all product reviews (admin only)
    deleteReview,  // Controller function to delete a product review by ID (admin only)
    getAdminProducts  // Controller function to fetch all products (admin only)
} = require('../controllers/productController'); // Import product controller functions

const router = express.Router();  // Create a new Express router
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate'); // Import authentication middleware
const multer = require('multer'); // Library for handling file uploads
const path = require('path') // Module for handling and transforming file paths


// Configure multer for file uploads with storage settings
const upload = multer({
    storage: multer.diskStorage({

        // Destination for storing uploaded product images
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '..', 'uploads/product'))
        },

        // Filename configuration for uploaded product images
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
})

// Route to fetch all products
router.route('/products').get(getProducts);

// Route to fetch a single product by ID
router.route('/product/:id')
    .get(getSingleProduct);

// Route to create a product review (authenticated users)
router.route('/review').put(isAuthenticatedUser, createReview)



//Admin routes
// Route to create a new product (admin only), upload.array is used for multiple file uploads
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), upload.array('images'), newProduct);

// Route to fetch all products (admin only)
router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);

// Route to delete a product by ID (admin only)
router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

// Route to update a product by ID (admin only), upload.array is used for multiple file uploads
router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'), upload.array('images'), updateProduct);

// Route to fetch all product reviews (admin only)
router.route('/admin/reviews').get(isAuthenticatedUser, authorizeRoles('admin'), getReviews)

// Route to delete a product review by ID (admin only)
router.route('/admin/review').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteReview)

// Export the router to be used in other parts of the application
module.exports = router;