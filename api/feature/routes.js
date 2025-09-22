const express = require('express');
const router = express.Router();

//feature routes import
const adminRoutes = require('./admin/admin.router');
const userRoutes = require('./user/user.router');
const mikrotikRoutes = require('./mikrotik/mikrotik.router');



//admin routes
router.use("/admin", adminRoutes);
//user routes
router.use("/user", userRoutes);
//mikrotik routes
router.use("/mikrotik", mikrotikRoutes);



module.exports = router;