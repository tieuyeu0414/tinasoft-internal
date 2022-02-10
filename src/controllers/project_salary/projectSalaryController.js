const ProjectSalary = require("./../../models/projectSalary")

async function getDataProjectSalary(req, res){
    const data = await ProjectSalary.getDataProjectSalary()
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

async function insertProjectSalary(req, res) {
    let {idStaff, name_project, salary} = req.body;
    let ProjectSalaryData = {
        idStaff,
        name_project, 
        salary
    }
    const data = await ProjectSalary.insertProjectSalary(ProjectSalaryData)
    .then(data => {
       res.status(200).json({msg: "insert success"
    });
    })
    .catch(e => {
        console.log(e);
        res.status(412).json({msg: e.message});
    })
}


async function deleteProjectSalary(req, res) {
    try {
        let id = req.params.id;
        await ProjectSalary.deleteProjectSalary(id)
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


async function editProjectSalary(req, res) {
    try {
        let id = req.params.id;
        await ProjectSalary.editProjectSalary(req.body, id, req, res)
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
    getDataProjectSalary,
    insertProjectSalary,
    deleteProjectSalary,
    editProjectSalary
}