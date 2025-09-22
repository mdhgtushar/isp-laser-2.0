const express = require("express");
const router = express.Router();
const fs = require('fs');



router.get("/", (req, res) => {
    try {
        const html = fs.readFileSync('view/mikrotik.html', 'utf8');
        res.send(html);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
})

module.exports = router;