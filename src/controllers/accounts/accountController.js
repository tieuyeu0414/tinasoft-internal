const {
    editAccount
} = require("../../models/account");


//controller edit data account
async function editAccountController(req, res) {
    try {
        let id = req.params.id;
        await editAccount(req.body, id, req, res)
            .then(data => {
                res.status(200).json({
                    msg: "edit success"
                });
            })
            .catch(error => {
                res.status(412).json({
                    msg: error.message
                });
            })
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    editAccountController,
}