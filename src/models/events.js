const Event = require("./../database/event");

async function getDataEvent(req, res){
    // res.send('ok')
    let data = []
    try {
        await Event.findAll()
        .then(result => data = result)
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    } catch (e) {
        console.log(e);
    }
    return data
}

async function insertEvent(data) {
    let {title, startDay, endDay, content} = data;
    try {
        await Event.create({
            title: title,
            startDay: startDay,
            endDay: endDay,
            content: content
        })
        .then(result => result)
        .catch(error => {
            console.log(error);
        });
    } catch (error) {
        console.log(error);
    }
}

async function deleteEvent(id) {
    try {
        await Event.destroy(
            {
                where: {
                    id: id
                },
                returning: true
            })
            .then(result => result)
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    } catch (e) {
        console.log(e);
    }
}

async function editEvent(data, id, req, res) {
    let event =  await Event.findAll(
        {
            where: {
                id: id
            },
        }
    );
    if(event.length == 0) {
        return res.status(200).json({
            errorMessage:`The event isn't exist!`
        })
    }
    try {
        await Event.update({ 
           title: data.title,
           startDay:data.startDay,
           endDay:data.endDay,
           content:data.content
         }, {
            where: {
                id: id
            }
        })
        .then(result => result)
        .catch(error => {
                console.log(error);
            });
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getDataEvent,
    insertEvent,
    deleteEvent,
    editEvent
}