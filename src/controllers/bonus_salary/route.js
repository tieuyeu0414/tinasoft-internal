const express = require('express');
const route = express();

const bonusSalaryAPI = require('./bonusSalaryController')

route.get('/', bonusSalaryAPI.getDataBonusSalary)
route.post('/insert', bonusSalaryAPI.insertBonusSalary)
route.delete('/delete/:id', bonusSalaryAPI.deleteBonusSalary)
route.put('/edit/:id', bonusSalaryAPI.editBonusSalary)

module.exports = route;