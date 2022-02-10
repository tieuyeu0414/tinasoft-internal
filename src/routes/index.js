const express = require('express');
const router = express();

const event = require('./../controllers/event/route')
router.use('/event', event)

const staff = require('../controllers/staffs/route')
router.use('/staff', staff)


module.exports = router;
