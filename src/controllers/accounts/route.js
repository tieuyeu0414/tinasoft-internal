const express = require('express');
const route = express();

const accountAPI = require('./accountController')
route.put('/edit/:id', accountAPI.editAccountController);


module.exports = route;