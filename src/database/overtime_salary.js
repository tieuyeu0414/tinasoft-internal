const Sequelize = require("sequelize");
const db = require('./base/mysql');
const Staff = require("./staff");

const Overtime_salary = db.sequelize.define('overtime_salary', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idStaff: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name_project: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    hour: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
})

Staff.hasMany(Overtime_salary, {foreignKey: 'idStaff', sourceKey: 'idStaff'});
Overtime_salary.belongsTo(Staff, {foreignKey: 'idStaff', targetKey: 'idStaff'});

module.exports = Overtime_salary
