const DeductionHourLate = require("./../../models/deduction_hour_late")

async function getDataDeductionHourLate(req, res){
    const data = await DeductionHourLate.getDataDeductionHourLate()
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

async function insertDeductionHourLate(req, res) {
    let {idStaff, hour_late_work, date, deduction_salary} = req.body;
    let deductionHourLateData = {
        idStaff,
        hour_late_work, 
        date,
        deduction_salary
    }
    const data = await DeductionHourLate.insertDeductionHourLate(deductionHourLateData)
    .then(data => {
       res.status(200).json({msg: "insert success"
    });
    })
    .catch(e => {
        console.log(e);
        res.status(412).json({msg: e.message});
    })
}


async function deleteDeductionHourLate(req, res) {
    try {
        let id = req.params.id;
        await DeductionHourLate.deleteDeductionHourLate(id)
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


async function editDeductionHourLate(req, res) {
    try {
        let id = req.params.id;
        await DeductionHourLate.editDeductionHourLate(req.body, id, req, res)
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
    getDataDeductionHourLate,
    insertDeductionHourLate,
    deleteDeductionHourLate,
    editDeductionHourLate
}