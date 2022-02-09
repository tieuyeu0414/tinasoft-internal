const Sequelize = require("sequelize");
const db = require('./base/mysql');
const Staff = require("./staff");

const Deduction_day_off = db.sequelize.define('deduction_day_off', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idStaff: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    day_off_work: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    deduction_salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})

Staff.hasMany(Deduction_day_off, {foreignKey: 'idStaff', sourceKey: 'idStaff'});
Deduction_day_off.belongsTo(Staff, {foreignKey: 'idStaff', targetKey: 'idStaff'});

module.exports = Deduction_day_off
