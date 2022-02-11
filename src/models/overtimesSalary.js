const OvertimeSalary = require("./../database/overtime_salary");
const { Op } = require("sequelize");

async function getDataOvertimeSalary(req, res){
    let data = []
    try {
        await OvertimeSalary.findAll()
        .then(result => data = result)
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    } catch (e) {
        console.log(e);
    }
    return data
}


async function getDataOvertimeSalaryMonth(req, res){
    let {idStaff, date, total_base_salary} = req.body;
    let data = {
        total_overtime_salary:0
    }
    let total_hour = 0
    //tach date ra chi lay thang va nam de lay du lieu luong theo thang
    const a = date.substr(0, 2)
    const b = date.substr(6)
    const condition = b + "-" + a

    //luong tang ca 1 gio
    const base_salary = parseInt(total_base_salary)
    const overtime_salary = ( base_salary /24/8) *1.5

    await OvertimeSalary.findAll({
        where:{
            [Op.and]: [
                { idStaff: idStaff },
                { date: {
                    [Op.substring]:condition
                } }
            ]
            
        }
    })
    .then(result => {
        const hour= result.map(ele => ele.hour)
        total_hour = hour.reduce(function (previousValue, currentValue) {
            return previousValue + currentValue
        }, 0)

        const salary = total_hour * overtime_salary
        data.total_overtime_salary = salary
    })
    .catch(error => {
        res.status(412).json({msg: error.message});
    });
    return data
}

async function insertOvertimeSalary(data) {
    let {idStaff, name_project, date, hour} = data;
    try {
        await OvertimeSalary.create({
            idStaff,
            name_project,
            date,
            hour
        })
        .then(result => result)
        .catch(error => {
            console.log(error);
        });
    } catch (error) {
        console.log(error);
    }
}

async function deleteOvertimeSalary(id) {
    try {
        await OvertimeSalary.destroy(
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

async function editOvertimeSalary(data, id, req, res) {
    let overtimeSalary =  await OvertimeSalary.findAll(
        {
            where: {
                id: id
            },
        }
    );
    if(overtimeSalary.length == 0) {
        return res.status(200).json({
            errorMessage:`The OvertimeSalary isn't exist!`
        })
    }
    try {
        await OvertimeSalary.update({ 
           idStaff: data.idStaff,
           name_project:data.name_project,
           date:data.date,
           hour: data.hour
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
    getDataOvertimeSalary,
    insertOvertimeSalary,
    deleteOvertimeSalary,
    editOvertimeSalary,
    getDataOvertimeSalaryMonth
}
