const Event = require("./../../models/events")

async function getDataEvent(req, res){
    const data = await Event.getDataEvent()
    .then(data => {
       res.status(200).json({msg: "get data success",
        data
    });
    })
    .catch(e => {
        console.log(e);
        res.status(412).json({msg: error.message});
    })
}

async function insertEvent(req, res) {
    let {title, startDay, endDay, content} = req.body;
    let eventData = {
        title,
        startDay, 
        endDay,
        content
    }
    const data = await Event.insertEvent(eventData)
    .then(data => {
       res.status(200).json({msg: "insert success"
    });
    })
    .catch(e => {
        console.log(e);
        res.status(412).json({msg: error.message});
    })
}


async function deleteEvent(req, res) {
    try {
        let id = req.params.id;
        await Event.deleteEvent(id)
        .then(data => {
            res.status(200).json({msg: "delete success"
            });
        })
        .catch(e => {
            console.log(e);
            res.status(412).json({msg: error.message});
        })
    } catch (e) {
        console.log(e);
    }
}


async function editEvent(req, res) {
    try {
        let id = req.params.id;
        await Event.editEvent(req.body, id, req, res)
            .then(data => {
                res.status(200).json({
                    msg: "edit success"
                });
            })
            .catch(e => {
                res.status(412).json({
                    msg: error.message
                });
            })
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getDataEvent,
    insertEvent,
    deleteEvent,
    editEvent
}