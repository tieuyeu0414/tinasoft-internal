const Account = require("./../database/account");
const bcrypt = require('bcrypt');

//insert data account
async function insertAccount(data) {
    await Account.create({
        idStaff: data.idStaff,
        username: data.username,
        password: data.password
    })
}


//edit data account
async function editAccount(data, id, req, res) {

    let getAcount = await Account.findByPk(id);
    if (getAcount === null) {
        return res.status(200).json({
            msg: "error"
        });
    } else {
        await bcrypt.hash(data.password, 10).
        then((hash) => {Account.update({
            password: hash
        }, {
            where: {
                id: id
            }
        })
    })
    }
}


//delete data account
async function deleteAccount(id) {
    let getAccount = await Account.findByPk(id);
    await Account.update({
        status: !getAccount.status
    }, {
        where: {
            id: id
        }
    })
}

module.exports = {
    insertAccount,
    editAccount,
    deleteAccount
}