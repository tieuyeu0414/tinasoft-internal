const OnsiteSalary = require("./../../models/onsitesSalary")

async function getDataOnsiteSalary(req, res){
    const data = await OnsiteSalary.getDataOnsiteSalary()
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


async function insertOnsiteSalary(req, res) {
    let {idStaff, onsite_place, date} = req.body;
    let onsiteSalaryData = {
        idStaff,
        onsite_place, 
        date
    }
    const data = await OnsiteSalary.insertOnsiteSalary(onsiteSalaryData)
    .then(data => {
       res.status(200).json({msg: "insert success"
    });
    })
    .catch(e => {
        console.log(e);
        res.status(412).json({msg: e.message});
    })
}


async function deleteOnsiteSalary(req, res) {
    try {
        let id = req.params.id;
        await OnsiteSalary.deleteOnsiteSalary(id)
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


async function editOnsiteSalary(req, res) {
    try {
        let id = req.params.id;
        await OnsiteSalary.editOnsiteSalary(req.body, id, req, res)
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
    getDataOnsiteSalary,
    insertOnsiteSalary,
    deleteOnsiteSalary,
    editOnsiteSalary
}