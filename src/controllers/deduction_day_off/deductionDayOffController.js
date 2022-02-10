const DeductionDayOff = require("./../../models/deduction_day_off")

async function getDataDeductionDayOff(req, res){
    const data = await DeductionDayOff.getDataDeductionDayOff()
    .then(data => {
       res.status(200).json({msg: "get data success",
        data
    });
    })
    .catch(e => {
        console.log(e);
        res.status(412).json({msg: e.message});
    })
}

async function insertDeductionDayOff(req, res) {
    let {idStaff, day_off_work, date, deduction_salary} = req.body;
    let deductionDayOffData = {
        idStaff,
        day_off_work, 
        date,
        deduction_salary
    }
    const data = await DeductionDayOff.insertDeductionDayOff(deductionDayOffData)
    .then(data => {
       res.status(200).json({msg: "insert success"
    });
    })
    .catch(e => {
        console.log(e);
        res.status(412).json({msg: e.message});
    })
}


async function deleteDeductionDayOff(req, res) {
    try {
        let id = req.params.id;
        await DeductionDayOff.deleteDeductionDayOff(id)
        .then(data => {
            res.status(200).json({msg: "delete success"
            });
        })
        .catch(e => {
            console.log(e);
            res.status(412).json({msg: e.message});
        })
    } catch (e) {
        console.log(e);
    }
}


async function editDeductionDayOff(req, res) {
    try {
        let id = req.params.id;
        await DeductionDayOff.editDeductionDayOff(req.body, id, req, res)
            .then(data => {
                res.status(200).json({
                    msg: "edit success"
                });
            })
            .catch(e => {
                res.status(412).json({
                    msg: e.message
                });
            })
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getDataDeductionDayOff,
    insertDeductionDayOff,
    deleteDeductionDayOff,
    editDeductionDayOff
}