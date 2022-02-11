const TotalSalaryMonth = require("./../database/total_salary_month");

async function getDataTotalSalaryMonth(req, res){
    let data = []
    try {
        await TotalSalaryMonth.findAll()
        .then(result => data = result)
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    } catch (e) {
        console.log(e);
    }
    return data
}

async function insertTotalSalaryMonth(data) {
    let {idStaff, total_base_salary, total_onsite_salary, total_overtime_salary, total_Manage_salary, total_bonus_salary, total_project_salary, total_deduction_salary} = data;
    try {
        await TotalSalaryMonth.create({
            idStaff,
            total_base_salary,
            total_onsite_salary,
            total_overtime_salary,
            total_Manage_salary,
            total_bonus_salary,
            total_project_salary,
            total_deduction_salary
        })
        .then(result => result)
        .catch(error => {
            console.log(error);
        });
    } catch (error) {
        console.log(error);
    }
}

// async function deleteTotalSalaryMonth(id) {
//     try {
//         await TotalSalaryMonth.destroy(
//             {
//                 where: {
//                     id: id
//                 },
//                 returning: true
//             })
//             .then(result => result)
//             .catch(error => {
//                 res.status(412).json({msg: error.message});
//             });
//     } catch (e) {
//         console.log(e);
//     }
// }

// async function editTotalSalaryMonth(data, id, req, res) {
//     let TotalSalaryMonth =  await TotalSalaryMonth.findAll(
//         {
//             where: {
//                 id: id
//             },
//         }
//     );
//     if(TotalSalaryMonth.length == 0) {
//         return res.status(200).json({
//             errorMessage:`The TotalSalaryMonth isn't exist!`
//         })
//     }
//     try {
//         await TotalSalaryMonth.update({ 
//            idStaff: data.idStaff,
//            name_project:data.name_project,
//            salary:data.salary
//          }, {
//             where: {
//                 id: id
//             }
//         })
//         .then(result => result)
//         .catch(error => {
//                 console.log(error);
//             });
//     } catch (error) {
//         console.log(error);
//     }
// }


module.exports = {
    getDataTotalSalaryMonth,
    insertTotalSalaryMonth,
    // deleteTotalSalaryMonth,
    // editTotalSalaryMonth
}