const Sequelize = require("sequelize");
const db = require('./base/mysql');
const Staff = require('./staff')
const bcrypt = require('bcrypt');

const Account = db.sequelize.define('account', {
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
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    },
    instanceMethods: {
        validPassword: (password) => {
            return bcrypt.compareSync(password, this.password);
        }
    }
});

Account.prototype.comparePassword = function (plaintextPassword) {
    return bcrypt.compareSync(plaintextPassword, this.password);
};

Staff.hasOne(Account, {
    foreignKey: 'idStaff',
    sourceKey: 'idStaff'
});
Account.belongsTo(Staff, {
    foreignKey: 'idStaff',
    targetKey: 'idStaff'
});

module.exports = Account