const Staff = require("../../database/staff");
const {
    insertAccount,
    deleteAccount
} = require("../../models/account");
const {
    getDataStaff,
    insertStaff,
    editStaff,
    updateStatusStaff
} = require("../../models/staffs");

//controller get data staff
async function getDataStaffController(req, res) {
    try {
        await getDataStaff(req, res)
            .then(data => {
                res.status(200).json({
                    msg: "get success",
                    data
                });
            })
            .catch(e => {
                console.log(e);
                res.status(412).json({
                    msg: error.message
                });
            })
    } catch (error) {
        console.log(error);
    }
}


//controller insert data staff
async function insertStaffController(req, res) {
    try {
        await insertStaff(req.body)
            .then(data => {
                res.status(200).json({
                    msg: "insert success"
                });
            })
            .catch(e => {
                res.status(412).json({
                    msg: e.message
                });
            })
    } catch (error) {
        console.log(error);
    }
    try {
        await insertAccount(req.body)
            .then(data => {
                res.status(200).json({
                    msg: "insert success"
                });
            })
            .catch(e => {
                res.status(412).json({
                    msg: e.message
                });
            })
    } catch (error) {
        console.log(error);
    }
}


//controller edit data staff
async function editStaffController(req, res) {
    try {
        let id = req.params.id;
        await editStaff(req.body, id, req, res)
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


//controller update status data staff
async function updateStatustaffController(req, res) {
    let id = req.params.id;
    try {
        
        await updateStatusStaff(id, req.body)
            .then(data => {
                res.status(200).json({
                    msg: "update status success"
                });
            })
            .catch(error => {
                res.status(412).json({
                    msg: error.message
                });
            })
        
            await deleteAccount(id)
            .then(data => {
                res.status(200).json({
                    msg: "delete success"
                });
            })
            .catch(e => {
                res.status(412).json({
                    msg: e.message
                });
            })
    } catch (e) {
        console.log(e);
    }

}

module.exports = {
    getDataStaffController,
    insertStaffController,
    editStaffController,
    updateStatustaffController
}