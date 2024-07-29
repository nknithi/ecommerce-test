const User = require('../models/userModel');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const users = require('../data/user.json');
const connectDatabase = require('../config/database')

dotenv.config({ path: 'backend/config/config.env' });
connectDatabase();

// Seed Users
const seedUsers = async () => {
    try {
        // Delete existing users
        await User.deleteMany();
        console.log('Users deleted!');

        // Hash passwords before inserting users
        const hashedUsers = users.map(user => ({
            ...user,
            password: bcrypt.hashSync(user.password, 10) // Hash password synchronously
        }));

        // Insert new users with hashed passwords
        await User.insertMany(hashedUsers);
        console.log('All users added!');
    } catch (error) {
        console.error(error.message);
    }
    // Exit the process after seeding
    process.exit();
};

// Call seedUsers function to seed the database
seedUsers();
