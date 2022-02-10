const ProjectSalary = require("./../database/project_salary");

async function getDataProjectSalary(req, res){
    let data = []
    try {
        await ProjectSalary.findAll()
        .then(result => data = result)
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    } catch (e) {
        console.log(e);
    }
    return data
}

async function insertProjectSalary(data) {
    let {idStaff, name_project, salary} = data;
    try {
        await ProjectSalary.create({
            idStaff,
            name_project,
            salary
        })
        .then(result => result)
        .catch(error => {
            console.log(error);
        });
    } catch (error) {
        console.log(error);
    }
}

async function deleteProjectSalary(id) {
    try {
        await ProjectSalary.destroy(
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

async function editProjectSalary(data, id, req, res) {
    let ProjectSalary =  await ProjectSalary.findAll(
        {
            where: {
                id: id
            },
        }
    );
    if(ProjectSalary.length == 0) {
        return res.status(200).json({
            errorMessage:`The ProjectSalary isn't exist!`
        })
    }
    try {
        await ProjectSalary.update({ 
           idStaff: data.idStaff,
           name_project:data.name_project,
           salary:data.salary
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
    getDataProjectSalary,
    insertProjectSalary,
    deleteProjectSalary,
    editProjectSalary
}