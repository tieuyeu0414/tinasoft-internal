const Sequelize = require("sequelize");
const db = require('./base/mysql');
const Staff = require("./staff");

const Bonus_salary = db.sequelize.define('bonus_salary', {
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

Staff.hasMany(Bonus_salary, {foreignKey: 'idStaff', sourceKey: 'idStaff'});
Bonus_salary.belongsTo(Staff, {foreignKey: 'idStaff', targetKey: 'idStaff'});

module.exports = Bonus_salary
