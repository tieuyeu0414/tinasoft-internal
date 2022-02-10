const express = require('express');
const route = express();

const deductionHourLateAPI = require('./deductionHourLateController')

route.get('/', deductionHourLateAPI.getDataDeductionHourLate)
route.post('/insert', deductionHourLateAPI.insertDeductionHourLate)
route.delete('/delete/:id', deductionHourLateAPI.deleteDeductionHourLate)
route.put('/edit/:id', deductionHourLateAPI.editDeductionHourLate)

module.exports = route;