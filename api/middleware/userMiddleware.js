const jwt = require('jsonwebtoken');
const User = require('../feature/user/user.model');

const userMiddleware = async (req,res, next) => {
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
    const user = await User.findById(decoded.userId);
    if(!user){
        return res.status(400).json({message: "User not found"});
    }
    next();
   } catch (error) {
    res.status(500).json({message: "Internal server error", error: error.message});
   }
}

module.exports = userMiddleware;