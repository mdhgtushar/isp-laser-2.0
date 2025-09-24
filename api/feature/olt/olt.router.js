const express = require('express');
const router = express.Router();
const { getOlt } = require('./olt.controller');

router.get('/all', getOlt);
router.get('/', getOlt);



module.exports = router;