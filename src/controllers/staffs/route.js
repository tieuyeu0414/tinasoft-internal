const express = require('express');
const route = express();

const staffAPI = require('./staffController')
route.get('/', staffAPI.getDataStaffController);
route.post('/insert', staffAPI.insertStaffController);
route.put('/edit/:id', staffAPI.editStaffController);
route.put('/update_status/:id', staffAPI.updateStatustaffController);


module.exports = route;