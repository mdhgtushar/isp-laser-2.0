// connect to mongodb
const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/isplaser');
    console.log('Connected to MongoDB');
}

module.exports = connectDB;