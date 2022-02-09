const Sequelize = require("sequelize");
const db = require('./base/mysql');
const Staff = require("./staff");

const Letter_leave = db.sequelize.define('letter_leave', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idStaff: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    startDay: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    endDay: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    reason: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    status: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['1', '2', '3'],
        comment: "1:đang đợi duyệt - 2:được chấp thuận - 3:bị từ chối",
        defaultValue: 1
    },
})

Staff.hasMany(Letter_leave, {foreignKey: 'idStaff', sourceKey: 'idStaff'});
Letter_leave.belongsTo(Staff, {foreignKey: 'idStaff', targetKey: 'idStaff'});

module.exports = Letter_leave
