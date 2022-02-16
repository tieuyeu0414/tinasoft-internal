const express = require('express');
const route = express();
const auth = require('../login/loginController')

const eventAPI = require('./eventController')

route.get('/', eventAPI.getDataEvent)
route.post('/insert', auth.checkRoleAdminController,eventAPI.insertEvent)
route.delete('/delete/:id', auth.checkRoleAdminController,eventAPI.deleteEvent)
route.put('/edit/:id', auth.checkRoleAdminController,eventAPI.editEvent)

module.exports = route;