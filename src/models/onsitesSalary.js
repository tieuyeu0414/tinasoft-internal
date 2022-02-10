const OnsiteSalary = require("./../database/onsite_salary");

async function getDataOnsiteSalary(req, res){
    let data = []
    try {
        await OnsiteSalary.findAll()
        .then(result => data = result)
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    } catch (e) {
        console.log(e);
    }
    return data
}

async function insertOnsiteSalary(data) {
    let {idStaff, onsite_place, date} = data;
    try {
        await OnsiteSalary.create({
            idStaff,
            onsite_place,
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

async function deleteOnsiteSalary(id) {
    try {
        await OnsiteSalary.destroy(
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

async function editOnsiteSalary(data, id, req, res) {
    let onsiteSalary =  await OnsiteSalary.findAll(
        {
            where: {
                id: id
            },
        }
    );
    if(onsiteSalary.length == 0) {
        return res.status(200).json({
            errorMessage:`The OnsiteSalary isn't exist!`
        })
    }
    try {
        await OnsiteSalary.update({ 
           idStaff: data.idStaff,
           onsite_place:data.onsite_place,
           date:data.date
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
    getDataOnsiteSalary,
    insertOnsiteSalary,
    deleteOnsiteSalary,
    editOnsiteSalary
}