const express = require('express');
const route = express();

const eventAPI = require('./eventController')

route.get('/', eventAPI.getDataEvent)
route.post('/insert', eventAPI.insertEvent)
route.delete('/delete/:id', eventAPI.deleteEvent)
route.put('/edit/:id', eventAPI.editEvent)

module.exports = route;