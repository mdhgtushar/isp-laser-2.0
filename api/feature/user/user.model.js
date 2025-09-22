const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mikrotik_limit: {
        type: Number,
        default: 1
    },
    olt_limit: {
        type: Number,
        default: 1
    } 
})

const User = mongoose.model("User", userSchema);

module.exports = User;