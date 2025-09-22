const jwt = require('jsonwebtoken');
const Admin = require('../feature/admin/admin.model');

const adminMiddleware = async (req,res, next) => {
    //check token
   try {
    if(!req.headers.authorization){
        return res.status(400).json({message: "Authorization header is required"});
    }
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    if(!decoded){
        return res.status(400).json({message: "Invalid token"});
    }
    const admin = await Admin.findById(decoded.adminId);
    if(!admin){
        return res.status(400).json({message: "Admin not found"});
    }
    next();
   } catch (error) {
    res.status(500).json({message: "Internal server error", error: error.message});
   }
}

module.exports = adminMiddleware;