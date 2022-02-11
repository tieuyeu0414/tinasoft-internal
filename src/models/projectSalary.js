const ProjectSalary = require("./../database/project_salary");
const { Op } = require("sequelize");


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

async function getDataProjectSalaryMonth(req, res){
    let {idStaff, date} = req.body;
    let data = {
        total_bonus_salary:0
    }
    //tach date ra chi lay thang va nam de lay du lieu luong theo thang
    const a = date.substr(0, 2)
    const b = date.substr(6)
    const condition = b + "-" + a


    await ProjectSalary.findAll({
        where:{
            [Op.and]: [
                { idStaff: idStaff },
                { createdAt: {
                    [Op.substring]:condition
                } }
            ]
        }
    })
    .then(result => {
        const salary= result.map(ele => ele.salary)
        data.total_project_salary = salary[0]
    })
    .catch(error => {
        res.status(412).json({msg: error.message});
    });
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
    editProjectSalary,
    getDataProjectSalaryMonth
}