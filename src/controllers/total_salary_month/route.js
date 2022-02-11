const express = require('express');
const route = express();

const totalSalaryMonthAPI = require('./totalSalaryMonthController')

route.get('/', totalSalaryMonthAPI.getDataTotalSalaryMonth)
route.post('/insert', totalSalaryMonthAPI.insertTotalSalaryMonth)
// route.delete('/delete/:id', totalSalaryMonthAPI.deleteTotalSalaryMonth)
// route.put('/edit/:id', totalSalaryMonthAPI.editTotalSalaryMonth)

module.exports = route;