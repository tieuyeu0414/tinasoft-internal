const Sequelize = require("sequelize");
const db = require('./base/mysql');
const Staff = require("./staff");

const Project_salary = db.sequelize.define('project_salary', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idStaff: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    reason: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})

Staff.hasMany(Project_salary, {foreignKey: 'idStaff', sourceKey: 'idStaff'});
Project_salary.belongsTo(Staff, {foreignKey: 'idStaff', targetKey: 'idStaff'});

module.exports = Project_salary
