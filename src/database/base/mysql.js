const Sequelize = require('sequelize');
const {mysql} = require('../../../config/config');
// require('../staff');
// require('../account');

let host = mysql.host;
let port = mysql.port;
let user = mysql.user;
let password = mysql.password;
let database = mysql.database;
const sequelize = new Sequelize(database, user, password, {
  host: host,
  port: port,
  dialect: "mysql",
  logging: false,
});

 
async function connect(){
    try {
        sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync()
        .then((res) => {
            console.log();(`Đã đồng bộ model.`);
        })
        .catch(err => {
            console.log(err);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connect()

module.exports = {
    sequelize
};