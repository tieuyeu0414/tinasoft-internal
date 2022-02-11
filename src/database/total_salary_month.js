const Sequelize = require("sequelize");
const db = require('./base/mysql');
const Staff = require("./staff");

const Total_salary_month = db.sequelize.define('total_salary_month', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idStaff: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    total_base_salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },   
    total_onsite_salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },  
    total_overtime_salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }, 
    total_Manage_salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }, 
    total_bonus_salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }, 
    total_project_salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }, 
    total_deduction_salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }, 
})

Staff.hasMany(Total_salary_month, {foreignKey: 'idStaff', sourceKey: 'idStaff'});
Total_salary_month.belongsTo(Staff, {foreignKey: 'idStaff', targetKey: 'idStaff'});

module.exports = Total_salary_month
