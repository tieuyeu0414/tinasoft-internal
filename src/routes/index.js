const express = require('express');
const router = express();

const event = require('./../controllers/event/route')
router.use('/event', event)



module.exports = router;
