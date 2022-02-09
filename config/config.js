const mysql = require('./config_mysql');

module.exports = {
    mysql,
    admin: require("./config_default_admin"),
};