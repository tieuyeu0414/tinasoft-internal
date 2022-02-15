const Sequelize = require("sequelize");
const db = require('./base/mysql');
const Staff = require("./staff");

const LetterLeave = db.sequelize.define('letter_leave', {
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
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    endDay: {
        type: Sequelize.DATEONLY,
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
    quantity_day:{
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    }
})

Staff.hasMany(LetterLeave, {foreignKey: 'idStaff', sourceKey: 'idStaff'});
LetterLeave.belongsTo(Staff, {foreignKey: 'idStaff', targetKey: 'idStaff'});

module.exports = LetterLeave
