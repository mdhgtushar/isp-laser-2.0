const User = require("./user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    try {
        if(!req.body){
            return res.status(400).json({message: "Request body is required"});
        }
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists"});
        }
        if(password.length < 8){
            return res.status(400).json({message: "Password must be at least 8 characters long"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({name, email, password: hashedPassword});
        await newUser.save(); 
        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET || "secret");
        res.status(201).json({message: "User registered successfully", token});
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

const login = async (req, res) => {
    try {
        if(!req.body){
            return res.status(400).json({message: "Request body is required"});
        }
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid password"});
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET || "secret");
        res.status(200).json({message: "Login successful", token});
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

const updatePassword = async (req, res) => {
    try {
        const {email, password, newPassword} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid password"});
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({message: "Password updated successfully"});
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

const userList = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

module.exports = {
    register,
    login,
    updatePassword,
    userList
}