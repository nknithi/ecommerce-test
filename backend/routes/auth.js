const express = require('express');
const multer = require('multer');  // Library for handling file uploads
const path = require('path')  // Module for handling and transforming file paths


// Configure multer for file uploads with storage settings
const upload = multer({storage: multer.diskStorage({

            // Destination for storing uploaded files
    destination: function(req, file, cb) {
        cb(null, path.join( __dirname,'..' , 'uploads/user' ) )
    },

            // Filename configuration for uploaded files
    filename: function(req, file, cb ) {
        cb(null, file.originalname)
    }
}) })

// Importing controller functions
const { 
    registerUser,
    loginUser,
    logoutUser,
   
    getUserProfile,
    changePassword,
    updateProfile,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
 } = require('../controllers/authController');
const router = express.Router(); // Create a new Express router

// Import authentication middleware
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate')


// User registration route with avatar upload
router.route('/register').post(upload.single('avatar'), registerUser);

// User login route
router.route('/login').post(loginUser);

// User logout route
router.route('/logout').get(logoutUser);

// Route to change password, accessible only to authenticated users
router.route('/password/change').put(isAuthenticatedUser, changePassword);

// Route to get the authenticated user's profile
router.route('/myprofile').get(isAuthenticatedUser, getUserProfile);

// Route to update user profile with avatar upload, accessible only to authenticated users
router.route('/update').put(isAuthenticatedUser,upload.single('avatar'), updateProfile);

//Admin routes
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'), getAllUsers);

// Routes to get, update, and delete a user by ID, accessible only to admin users
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'), getUser)
                                .put(isAuthenticatedUser,authorizeRoles('admin'), updateUser)
                                .delete(isAuthenticatedUser,authorizeRoles('admin'), deleteUser);

// Export the router to be used in other parts of the application
module.exports = router;