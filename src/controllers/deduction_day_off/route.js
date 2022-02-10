const express = require('express');
const route = express();

const deductionDayOffAPI = require('./deductionDayOffController')

route.get('/', deductionDayOffAPI.getDataDeductionDayOff)
route.post('/insert', deductionDayOffAPI.insertDeductionDayOff)
route.delete('/delete/:id', deductionDayOffAPI.deleteDeductionDayOff)
route.put('/edit/:id', deductionDayOffAPI.editDeductionDayOff)

module.exports = route;