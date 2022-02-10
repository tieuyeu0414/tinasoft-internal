const express = require('express');
const route = express();

const onsiteSalaryAPI = require('./onsiteSalaryController')

route.get('/', onsiteSalaryAPI.getDataOnsiteSalary)
route.post('/insert', onsiteSalaryAPI.insertOnsiteSalary)
route.delete('/delete/:id', onsiteSalaryAPI.deleteOnsiteSalary)
route.put('/edit/:id', onsiteSalaryAPI.editOnsiteSalary)

module.exports = route;