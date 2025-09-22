const express = require("express");
const router = express.Router();
const { register, login, updatePassword } = require("./admin.controller");
const fs = require('fs');

router.get("/", (req, res) => {
    const html = fs.readFileSync('view/admin.html', 'utf8');
    res.send(html);
})
router.post("/register", register)
router.post("/login", login)
router.post("/updatePassword", updatePassword)

module.exports = router;