const express = require('express');
const route = express();
const auth = require('../login/loginController')

const staffAPI = require('./staffController')
route.get('/', auth.checkRoleAdminController, staffAPI.getDataStaffController);
route.post('/insert', auth.checkRoleAdminController, staffAPI.insertStaffController);
route.put('/edit/:id', auth.checkRoleAdminController, staffAPI.editStaffController,);
route.put('/edit_account/:id', staffAPI.editAccountController);
route.put('/update_status/:id', auth.checkRoleAdminController, staffAPI.updateStatustaffController);


module.exports = route;