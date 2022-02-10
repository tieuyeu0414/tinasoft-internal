const DeductionHourLate = require("./../database/deduction_hour_late");

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
    editDeductionHourLate
}