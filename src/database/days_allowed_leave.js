const Sequelize = require("sequelize");
const db = require('./base/mysql');
const Staff = require("./staff");

const Days_allowed_leave = db.sequelize.define('days_allowed_leave', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idStaff: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
})

Staff.hasMany(Days_allowed_leave, {foreignKey: 'idStaff', sourceKey: 'idStaff'});
Days_allowed_leave.belongsTo(Staff, {foreignKey: 'idStaff', targetKey: 'idStaff'});

module.exports = Days_allowed_leave
