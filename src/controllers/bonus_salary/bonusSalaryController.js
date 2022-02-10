const BonusSalary = require("./../../models/bonusSalary")

async function getDataBonusSalary(req, res){
    const data = await BonusSalary.getDataBonusSalary()
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

async function insertBonusSalary(req, res) {
    let {idStaff, reason, date, salary} = req.body;
    let BonusSalaryData = {
        idStaff,
        reason, 
        date,
        salary
    }
    const data = await BonusSalary.insertBonusSalary(BonusSalaryData)
    .then(data => {
       res.status(200).json({msg: "insert success"
    });
    })
    .catch(e => {
        console.log(e);
        res.status(412).json({msg: e.message});
    })
}


async function deleteBonusSalary(req, res) {
    try {
        let id = req.params.id;
        await BonusSalary.deleteBonusSalary(id)
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


async function editBonusSalary(req, res) {
    try {
        let id = req.params.id;
        await BonusSalary.editBonusSalary(req.body, id, req, res)
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
    getDataBonusSalary,
    insertBonusSalary,
    deleteBonusSalary,
    editBonusSalary
}