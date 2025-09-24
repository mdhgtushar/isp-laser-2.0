const express = require('express');
const router = express.Router();

//feature routes import
const adminRoutes = require('./admin/admin.router');
const userRoutes = require('./user/user.router');
const mikrotikRoutes = require('./mikrotik/mikrotik.router');
const oltRoutes = require('./olt/olt.router');



//admin routes
router.use("/admin", adminRoutes);
//user routes
router.use("/user", userRoutes);
//mikrotik routes
router.use("/mikrotik", mikrotikRoutes);
//olt routes
router.use("/olt", oltRoutes);



module.exports = router;