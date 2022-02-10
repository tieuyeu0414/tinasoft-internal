const express = require('express');
const route = express();

const projectAPI = require('./projectSalaryController')

route.get('/', projectAPI.getDataProjectSalary)
route.post('/insert', projectAPI.insertProjectSalary)
route.delete('/delete/:id', projectAPI.deleteProjectSalary)
route.put('/edit/:id', projectAPI.editProjectSalary)

module.exports = route;