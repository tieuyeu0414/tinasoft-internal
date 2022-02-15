const TotalSalaryMonth = require("./../../models/total_salary_month")
const OnsiteSalary = require("./../../models/onsitesSalary")
const OvertimeSalary = require("./../../models/overtimesSalary")
const BonusSalary = require("./../../models/bonusSalary")
const ProjectSalary = require("./../../models/projectSalary")
const DeductionHourLate = require("./../../models/deduction_hour_late")
const DeductionDayOff = require("./../../models/deduction_day_off")


async function getDataTotalSalaryMonth(req, res){
    const data = await TotalSalaryMonth.getDataTotalSalaryMonth()
    .then(data => {
       res.status(200).json({msg: "get data success",
        data
    });
    })
    .catch(e => {
        console.log(e);
        res.status(412).json({msg: e.message});
    })

}

async function insertTotalSalaryMonth(req, res) {
    let {date, idStaff, total_base_salary, total_Manage_salary} = req.body
    let overtime = await OvertimeSalary.getDataOvertimeSalaryMonth(req, res)
    let bonus = await BonusSalary.getDataBonusSalaryMonth(req, res)
    let project = await ProjectSalary.getDataProjectSalaryMonth(req, res)
    let hourLate = await DeductionHourLate.getDataDeductionHourLateMonth(req, res)
    let dayOff = await DeductionDayOff.getDataDeductionDayOffMonth(req, res)
    let onsite = await OnsiteSalary.getDataOnsiteSalaryMonth(req, res)
    

    const total_overtime_salary = overtime.total_overtime_salary
    const total_bonus_salary = bonus.total_bonus_salary
    const total_project_salary = project.total_project_salary
    const total_deduction_salary_hour_late = hourLate.total_deduction_salary
    const total_deduction_salary_day_off = dayOff.total_deduction_salary
    let total_deduction_salary = total_deduction_salary_hour_late + total_deduction_salary_day_off
    const total_onsite_salary = onsite.total_onsite_salary


    console.log(total_overtime_salary , total_bonus_salary, total_project_salary, total_deduction_salary, total_onsite_salary);
    
    
    let TotalSalaryMonthData = {
        idStaff,
        date,
        total_base_salary,
        total_onsite_salary,
        total_overtime_salary,
        total_Manage_salary,
        total_bonus_salary,
        total_project_salary,
        total_deduction_salary
    }
    const data = await TotalSalaryMonth.insertTotalSalaryMonth(TotalSalaryMonthData)
    .then(data => {
       res.status(200).json({msg: "insert success"
    });
    })
    .catch(e => {
        console.log(e);
        res.status(412).json({msg: e.message});
    })
}


// async function deleteTotalSalaryMonth(req, res) {
//     try {
//         let id = req.params.id;
//         await TotalSalaryMonth.deleteTotalSalaryMonth(id)
//         .then(data => {
//             res.status(200).json({msg: "delete success"
//             });
//         })
//         .catch(e => {
//             console.log(e);
//             res.status(412).json({msg: e.message});
//         })
//     } catch (e) {
//         console.log(e);
//     }
// }


// async function editTotalSalaryMonth(req, res) {
//     try {
//         let id = req.params.id;
//         await TotalSalaryMonth.editTotalSalaryMonth(req.body, id, req, res)
//             .then(data => {
//                 res.status(200).json({
//                     msg: "edit success"
//                 });
//             })
//             .catch(e => {
//                 res.status(412).json({
//                     msg: e.message
//                 });
//             })
//     } catch (e) {
//         console.log(e);
//     }
// }

module.exports = {
    getDataTotalSalaryMonth,
    insertTotalSalaryMonth,
    // deleteTotalSalaryMonth,
    // editTotalSalaryMonth
}