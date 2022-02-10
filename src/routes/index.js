const express = require('express');
const router = express();

const staff = require('../controllers/staffs/route')
router.use('/staff', staff)


module.exports = router;
