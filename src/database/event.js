const Sequelize = require("sequelize");
const db = require('./base/mysql');

const Event = db.sequelize.define('event', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
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
    content: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = Event
