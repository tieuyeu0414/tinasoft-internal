const Staff = require('../database/staff')
const jwt = require('jsonwebtoken');



async function login(req, res){
    const {email, password} = req.body;
    let data;
    try {
        if (!email || !password)
            res.send('email and password are required');

        let staff = await Staff.findOne({
            where: {email},
        });
        if (!staff || !staff.comparePassword(password))
            res.send('Wrong email or password');

        await Staff.findOne({
            where: {
                email
            },
        })
        .then(result => {
            data = result;
            var token = jwt.sign({data:data}, 'longlong');

            return res.json({
                message:'success',
                token: token
            })
        })
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    } catch (error) {
        console.log(error);
    }

}

async function checkLogin(req, res, next){
    try {
        let token = req.headers["x-access-token"]
        var equals = jwt.verify(token, 'longlong');
        Staff.findOne({
            where: {
                email: equals.data.email
            }
        })
        .then(data => {
            if(data) {
                req.data = data;
                next();
            } else {
                res.json('NOT PERMISSION');
            }
        })
        
    } catch (error) {
        return res.json('You must login')
    }
}



module.exports = {
    login,
    checkLogin,
}
