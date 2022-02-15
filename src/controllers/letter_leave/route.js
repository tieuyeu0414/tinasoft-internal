const express = require('express');
const route = express();
const auth = require('../login/loginController')

const letterLeaveAPI = require('./letterLeaveController')
route.get('/', letterLeaveAPI.getDataLetterLeaveController);
route.post('/insert', letterLeaveAPI.insertLetterLeaveController);
route.put('/edit/:id', auth.checkRoleAdminController, letterLeaveAPI.editLetterLeaveController);
route.get('/letter', letterLeaveAPI.getMonthLetterLeaveController);


module.exports = route;