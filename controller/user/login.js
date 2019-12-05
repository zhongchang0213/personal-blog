const crypto = require('crypto');

const user = require('../../models/user/user')

const login = async (req, res) => {

    let { userName, password } = req.body;

    if ( userName && password ) {
        let userOne = await user.findOne({ userName }).select('_id password avatar status created isSuper');
        if ( userOne ) {
            let loginPassword =  crypto.createHash('sha512').update(password).digest('hex');
            if ( loginPassword === userOne.password ) {
                req.session.user = userOne;
                res.send({
                    status: '1',
                    data: userOne,
                    message: '登录成功'
                });
            } else {
                res.send({
                    status: '0',
                    message: '密码有误'
                });
            };
        } else {
            res.send({
                status: '0',
                message: '账号不存在'
            });
        };
    } else {
        res.send({
            status: '0',
            message: '请输入完整信息'
        });
    };
};

module.exports = login;
