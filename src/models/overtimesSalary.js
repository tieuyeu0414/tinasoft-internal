const OvertimeSalary = require("./../database/overtime_salary");

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
    editOvertimeSalary
}
