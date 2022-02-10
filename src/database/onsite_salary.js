const Sequelize = require("sequelize");
const db = require('./base/mysql');
const Staff = require("./staff");

const Onsite_salary = db.sequelize.define('onsite_salary', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idStaff: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    onsite_place: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
})

Staff.hasMany(Onsite_salary, {foreignKey: 'idStaff', sourceKey: 'idStaff'});
Onsite_salary.belongsTo(Staff, {foreignKey: 'idStaff', targetKey: 'idStaff'});

module.exports = Onsite_salary