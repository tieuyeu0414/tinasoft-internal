const OvertimeSalary = require("./../../models/overtimesSalary")

async function getDataOvertimeSalary(req, res){
    const data = await OvertimeSalary.getDataOvertimeSalary()
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

async function insertOvertimeSalary(req, res) {
    let {idStaff, name_project, date, hour} = req.body;
    let overtimeSalaryData = {
        idStaff,
        name_project, 
        date,
        hour
    }
    const data = await OvertimeSalary.insertOvertimeSalary(overtimeSalaryData)
    .then(data => {
       res.status(200).json({msg: "insert success"
    });
    })
    .catch(e => {
        console.log(e);
        res.status(412).json({msg: e.message});
    })
}


async function deleteOvertimeSalary(req, res) {
    try {
        let id = req.params.id;
        await OvertimeSalary.deleteOvertimeSalary(id)
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


async function editOvertimeSalary(req, res) {
    try {
        let id = req.params.id;
        await OvertimeSalary.editOvertimeSalary(req.body, id, req, res)
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
    getDataOvertimeSalary,
    insertOvertimeSalary,
    deleteOvertimeSalary,
    editOvertimeSalary
}