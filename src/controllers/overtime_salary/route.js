const express = require('express');
const route = express();

const overtimeSalaryAPI = require('./overtimeSalaryController')

route.get('/', overtimeSalaryAPI.getDataOvertimeSalary)
route.post('/insert', overtimeSalaryAPI.insertOvertimeSalary)
route.delete('/delete/:id', overtimeSalaryAPI.deleteOvertimeSalary)
route.put('/edit/:id', overtimeSalaryAPI.editOvertimeSalary)

module.exports = route;