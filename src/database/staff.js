const Sequelize = require("sequelize");
const db = require('./base/mysql');
const bcrypt = require('bcrypt');
const config = require("../../config/config").admin;


const date = new Date()
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
        values: ['1', '2', '3', '4'],
        comment: "1:giám đốc - 2:nhân viên chính thức - 3:nhân viên parttime - 4:admin"
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
            is: /(0[3|5|7|8|9])+([0-9]{8})\b/g,
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
    birthday: {
        type: Sequelize.DATEONLY,
        allowNull: false
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
        defaultValue: 1
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: date
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
            len: {
                args: [6],
                msg: 'error password'
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        // validate: {
        //     is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
        //     len: {
        //         args: [6],
        //         msg: 'error password'
        //     }
        // },
        defaultValue: '123456'
    },
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

Staff.prototype.comparePassword = function (plaintextPassword) {
    return bcrypt.compareSync(plaintextPassword, this.password);
};


Staff.sync()
    .then(() => {
        Staff.findOrCreate({
            where: {
                position: 4
            },
            defaults: {
                email: config.email,
                // password: config.password,
                idStaff: config.role,
                position: 4,
                personId: 11111111111,
                phoneNumber: config.phoneNumber,
                birthday: date,
                idManager: 0

            }
        });
    });

module.exports = Staff