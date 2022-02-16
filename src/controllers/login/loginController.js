const { login, checkLogin, checkRoleAdmin } = require("../../models/login");

async function loginController(req, res){
    await login(req, res ,req.body)
}


async function checkLoginController(req, res, next){
    await checkLogin(req, res , next)
}


async function checkRoleAdminController(req, res, next){
    await checkRoleAdmin(req, res , next)
}

module.exports = {
    loginController,
    checkLoginController,
    checkRoleAdminController
}