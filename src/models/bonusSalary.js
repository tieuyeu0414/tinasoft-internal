const BonusSalary = require("./../database/bonus_salary");
const { Op } = require("sequelize");


async function getDataBonusSalary(req, res){
    let data = []
    try {
        await BonusSalary.findAll()
        .then(result => data = result)
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    } catch (e) {
        console.log(e);
    }
    return data
}


async function getDataBonusSalaryMonth(req, res){
    let {idStaff, date} = req.body;
    let data = {
        total_bonus_salary:0
    }
    //tach date ra chi lay thang va nam de lay du lieu luong theo thang
    const a = date.substr(0, 2)
    const b = date.substr(6)
    const condition = b + "-" + a


    await BonusSalary.findAll({
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
        const salary= result.map(ele => ele.salary)
        data.total_bonus_salary = salary[0]
    })
    .catch(error => {
        res.status(412).json({msg: error.message});
    });
    return data
}

async function insertBonusSalary(data) {
    let {idStaff, reason, date, salary} = data;
    try {
        await BonusSalary.create({
            idStaff,
            reason,
            date,
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

async function deleteBonusSalary(id) {
    try {
        await BonusSalary.destroy(
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

async function editBonusSalary(data, id, req, res) {
    let bonusSalary =  await BonusSalary.findAll(
        {
            where: {
                id: id
            },
        }
    );
    if(bonusSalary.length == 0) {
        return res.status(200).json({
            errorMessage:`The BonusSalary isn't exist!`
        })
    }
    try {
        await BonusSalary.update({ 
           idStaff: data.idStaff,
           reason:data.reason,
           date:data.date,
           salary: data.salary
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
    getDataBonusSalary,
    insertBonusSalary,
    deleteBonusSalary,
    editBonusSalary,
    getDataBonusSalaryMonth
}