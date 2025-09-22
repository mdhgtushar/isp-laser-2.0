const Admin = require("./admin.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({message: "Request body is required"});
        }

        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const admin = await Admin.findOne({email});
        if(admin){
            return res.status(400).json({message: "Admin already exists"});
        }
        if(password.length < 8){
            return res.status(400).json({message: "Password must be at least 8 characters long"});
        } 
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({name, email, password: hashedPassword});
        await newAdmin.save();
        const token = jwt.sign({adminId: newAdmin._id}, process.env.JWT_SECRET || "secret");
        res.status(201).json({message: "Admin registered successfully", token});
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
        const admin = await Admin.findOne({email});
        if(!admin){
            return res.status(400).json({message: "Admin not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, admin.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid password"});
        }
        const token = jwt.sign({adminId: admin._id}, process.env.JWT_SECRET || "secret");
        res.status(200).json({message: "Login successful", token});
    }
    catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

const updatePassword = async (req, res) => {
    try {
        const {email, password, newPassword} = req.body;
        const admin = await Admin.findOne({email});
        if(!admin){
            return res.status(400).json({message: "Admin not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, admin.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid password"});
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        admin.password = hashedPassword;
        await admin.save();
        res.status(200).json({message: "Password updated successfully"});
    }
    catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

module.exports = {
    register,
    login,
    updatePassword
}