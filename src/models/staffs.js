const Staff = require('../database/staff')
const Account = require('../database/account')

//get data staff
async function getDataStaff(req, res) {
    let data = []
    try {
        await Staff.findAll({
            attributes: ['phoneNumber', 'email', 'address', 'birthday', 'personId', 'fullName', 'avatar', 'position'],
            include: [
                {
                    model: Account, attributes:['username']
                }
            ],
        })
        .then(result => data = result)
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    } catch (e) {
        console.log(e);
    }
    return data
}


//insert data staff
async function insertStaff(data) {
    await Staff.create({
        idStaff: data.idStaff,
        email: data.email,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        position: data.position,
        personId: data.personId,
        address: data.address,
        birthday: data.birthday,
        idManager: data.idManager
    })
}


//edit data staff
async function editStaff(data, id, req, res) {

    let getStaff = await Staff.findByPk(id);
    if (getStaff === null) {
        return res.status(200).json({
            msg: "error"
        });
    } else {
        let dataUpdate = {
            idStaff: !data.idStaff ? getStaff.idStaff : data.idStaff,
            email: !data.email ? getStaff.email : data.email,
            fullName: !data.fullName ? getStaff.fullName : data.fullName,
            phoneNumber: !data.phoneNumber ? getStaff.phoneNumber : data.phoneNumber,
            position: !data.position ? getStaff.position : data.position,
            personId: !data.personId ? getStaff.personId : data.personId,
            address: !data.address ? getStaff.address : data.address,
            birthday: !data.birthday ? getStaff.birthday : data.birthday,
            idManager: !data.idManager ? getStaff.idManager : data.idManager,
        };
        await Staff.update({
            ...dataUpdate
        }, {
            where: {
                id: id
            },
            returning: true
        })

    }
}


//update status data staff
async function updateStatusStaff(id, data) {
    let getStaff = await Staff.findByPk(id);
    await Staff.update({
        status: !getStaff.status
    }, {
        where: {
            id: id
        }
    })
}

module.exports = {
    getDataStaff,
    insertStaff,
    editStaff,
    updateStatusStaff
}