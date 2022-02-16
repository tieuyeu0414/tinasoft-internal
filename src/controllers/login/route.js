const express = require('express');
const route = express();

const login = require('./loginController')
route.post('/', login.loginController);


module.exports = route;