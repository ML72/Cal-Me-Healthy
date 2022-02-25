const mongoose = require('mongoose');

const db = require('../settings').MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB connected...');
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;