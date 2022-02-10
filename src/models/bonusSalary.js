const BonusSalary = require("./../database/bonus_salary");

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
    editBonusSalary
}