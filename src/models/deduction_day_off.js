const DeductionDayOff = require("./../database/deduction_day_off");
const { Op } = require("sequelize");


async function getDataDeductionDayOff(req, res){
    let data = []
    try {
        await DeductionDayOff.findAll()
        .then(result => data = result)
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    } catch (e) {
        console.log(e);
    }
    return data
}

async function getDataDeductionDayOffMonth(req, res){
    let {idStaff, date} = req.body;
    let data = {
        total_deduction_salary:0
    }
    //tach date ra chi lay thang va nam de lay du lieu luong theo thang
    const a = date.substr(0, 2)
    const b = date.substr(6)
    const condition = b + "-" + a


    await DeductionDayOff.findAll({
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
        const deduction= result.map(ele => ele.deduction_salary * ele.day_off_work)
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

async function insertDeductionDayOff(data) {
    let {idStaff, day_off_work, date, deduction_salary} = data;
    try {
        await DeductionDayOff.create({  
            idStaff,
            day_off_work,
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

async function deleteDeductionDayOff(id) {
    try {
        await DeductionDayOff.destroy(
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

async function editDeductionDayOff(data, id, req, res) {
    let deductionDayOff =  await DeductionDayOff.findAll(
        {
            where: {
                id: id
            },
        }
    );
    if(deductionDayOff.length == 0) {
        return res.status(200).json({
            errorMessage:`The DeductionDayOff isn't exist!`
        })
    }
    try {
        await DeductionDayOff.update({ 
           idStaff: data.idStaff,
           day_off_work:data.day_off_work,
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
    getDataDeductionDayOff,
    insertDeductionDayOff,
    deleteDeductionDayOff,
    editDeductionDayOff,
    getDataDeductionDayOffMonth
}