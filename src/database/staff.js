const Sequelize = require("sequelize");
const db = require('./base/mysql');

const Staff = db.sequelize.define('staff', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idStaff: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    fullName: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'New staff',
        validate: {
            len: {
                args: [6, 30],
                msg: 'Name display must be between 5 and 30 characters in length'
            }
        }
    },
    position: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['1', '2', '3'],
        comment: "1:giám đốc - 2:nhân viên chính thức - 3:nhân viên parttime"
    },
    personId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [11],
                msg: 'personId display must be between 11 characters in length'
            }
        }
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [10, 12],
                msg: 'Phone display must be between 10 and 12 characters in length'
            }
        }
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: true
    },
    birthday:{
        type: Sequelize.DATE,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    idManager: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    daysAllowedLeave: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Staff
