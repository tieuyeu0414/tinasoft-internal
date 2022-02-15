const express = require('express');
const route = express();

const login = require('../../models/login')
route.post('/', login.login);


module.exports = route;