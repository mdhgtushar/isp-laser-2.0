const express = require("express");
const router = express.Router();
const fs = require('fs');
const { register, login, updatePassword, userList } = require("./user.controller");
const adminMiddleware = require("../../middleware/adminMiddleware");

//public routes
router.get("/", (req, res) => {
    const html = fs.readFileSync('view/user.html', 'utf8');
    res.send(html);
})

//public routes
router.post("/login", login)
router.post("/updatePassword", updatePassword)

//protected routes
router.post("/register",adminMiddleware, register)
router.get("/list", adminMiddleware, userList)

module.exports = router;