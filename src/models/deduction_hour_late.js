const DeductionHourLate = require("./../database/deduction_hour_late");
const { Op } = require("sequelize");


async function getDataDeductionHourLate(req, res){
    let data = []
    try {
        await DeductionHourLate.findAll()
        .then(result => data = result)
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    } catch (e) {
        console.log(e);
    }
    return data
}


async function getDataDeductionHourLateMonth(req, res){
    let {idStaff, date} = req.body;
    let data = {
        total_deduction_salary:0
    }
    //tach date ra chi lay thang va nam de lay du lieu luong theo thang
    const a = date.substr(0, 2)
    const b = date.substr(6)
    const condition = b + "-" + a


    await DeductionHourLate.findAll({
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
        const deduction= result.map(ele => ele.deduction_salary * ele.hour_late_work)
        totalDeduction = deduction.reduce(function (previousValue, currentValue) {
            return previousValue + currentValue
        }, 0)

       
        data.total_deduction_salary = totalDeduction
    })
    .catch(error => {
        res.status(412).json({msg: error.message});
    });
    return data
}

async function insertDeductionHourLate(data) {
    let {idStaff, hour_late_work, deduction_salary, date} = data;
    try {
        await DeductionHourLate.create({
            idStaff,
            hour_late_work,
            deduction_salary,
            date
        })
        .then(result => result)
        .catch(error => {
            console.log(error);
        });
    } catch (error) {
        console.log(error);
    }
}

async function deleteDeductionHourLate(id) {
    try {
        await DeductionHourLate.destroy(
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

async function editDeductionHourLate(data, id, req, res) {
    let deductionHourLate =  await DeductionHourLate.findAll(
        {
            where: {
                id: id
            },
        }
    );
    if(deductionHourLate.length == 0) {
        return res.status(200).json({
            errorMessage:`The DeductionHourLate isn't exist!`
        })
    }
    try {
        await DeductionHourLate.update({ 
           idStaff: data.idStaff,
           hour_late_work:data.hour_late_work,
           deduction_salary:data.deduction_salary,
           date: data.date
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
    getDataDeductionHourLate,
    insertDeductionHourLate,
    deleteDeductionHourLate,
    editDeductionHourLate,
    getDataDeductionHourLateMonth
}