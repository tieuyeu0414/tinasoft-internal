const Sequelize = require("sequelize");
const db = require('./base/mysql');
const Staff = require("./staff");

const Deduction_hour_late = db.sequelize.define('deduction_hour_late', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idStaff: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    hour_late_work: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    deduction_salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})

Staff.hasMany(Deduction_hour_late, {foreignKey: 'idStaff', sourceKey: 'idStaff'});
Deduction_hour_late.belongsTo(Staff, {foreignKey: 'idStaff', targetKey: 'idStaff'});

module.exports = Deduction_hour_late
