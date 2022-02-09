const Sequelize = require("sequelize");
const db = require('./base/mysql');
const Staff = require('./staff')

const Account = db.sequelize.define('account', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idStaff: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [6, 30],
                msg: 'username display must be between 5 and 30 characters in length'
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})

Staff.hasOne(Account, {foreignKey: 'idStaff', sourceKey: 'idStaff'});
Account.belongsTo(Staff, {foreignKey: 'idStaff', targetKey: 'idStaff'});

module.exports = Account
