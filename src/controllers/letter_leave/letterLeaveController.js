const { getDataLetterLeave, insertLetterLeave, editLetterLeave, getMonthLetterLeave } = require("../../models/letterLeave");

//controller get data letter leave
async function getDataLetterLeaveController(req, res) {
    try {
        await getDataLetterLeave(req, res)
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


//controller insert data letter leave
async function insertLetterLeaveController(req, res) {
    try {
        await insertLetterLeave(req.body)
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


//controller edit data letter leave
async function editLetterLeaveController(req, res) {
    try {
        let id = req.params.id;
        await editLetterLeave(req.body, id, req, res)
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



//controller get data month letter leave
async function getMonthLetterLeaveController(req, res) {
    await getMonthLetterLeave(req, res)
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
}

module.exports = {
    getDataLetterLeaveController,
    insertLetterLeaveController,
    editLetterLeaveController,
    getMonthLetterLeaveController
}