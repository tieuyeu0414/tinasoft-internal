const LetterLeave = require("../database/letter_leave");
const { Op } = require("sequelize");

//get data letter leave
async function getDataLetterLeave(req, res) {
    let data = []
    try {
        await LetterLeave.findAll({
            attributes: ['startDay', 'endDay', 'reason', 'status', 'reasonRefuse'],
        })
        .then(result => data = result)
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    } catch (e) {
        console.log(e);
    }
    return data
}


//insert data letter leave
async function insertLetterLeave(data) {
    await LetterLeave.create({
        idStaff: data.idStaff,
        startDay: data.startDay,
        endDay: data.endDay,
        reason: data.reason,
        quantity_day: data.quantity_day,
        reasonRefuse : data.reasonRefuse
        // status: data.status
    })
}


//edit data letter leave
async function editLetterLeave(data, id, req, res) {

    let getLetterLeave = await LetterLeave.findByPk(id);
    if (getLetterLeave === null) {
        return res.status(200).json({
            msg: "error"
        });
    } else {
        let dataUpdate = {
            status: !data.status ? getLetterLeave.status : data.status
        };
        await LetterLeave.update({
            ...dataUpdate
        }, {
            where: {
                id: id
            },
            returning: true
        })

    }
}



async function getMonthLetterLeave(req, res){
    let data = []
    try {
        await LetterLeave.findOne({
            attributes: ['startDay', 'endDay', 'reason', 'status', 'reasonRefuse'],
            where: {
                [Op.and]: [
                    {idStaff: 1},
                    {quantity_day: 2},
                    {startDay: {[Op.substring]: '2021-02'}}
                ]
            }
        })
        .then(result => data = result)
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    } catch (e) {
        console.log(e);
    }
    return data
}

module.exports = {
    getDataLetterLeave,
    insertLetterLeave,
    editLetterLeave,
    getMonthLetterLeave
}