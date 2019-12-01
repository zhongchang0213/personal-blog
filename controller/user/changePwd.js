const crypto = require('crypto');

const user = require('../../models/user/user');

const changePwd = async (req, res) => {
    const { password, _id } = req.session.user;
    const { oldPwd, newPwd } = req.body;
    let cryptoPwd =  crypto.createHash('sha512').update(oldPwd).digest('hex');
    let cryptoNewPwd =  crypto.createHash('sha512').update(newPwd).digest('hex');

    if ( password === cryptoPwd ) {
        if (password === cryptoNewPwd) {
            return res.send({
                status: '0',
                message: '更改密码不能与原密码相同'
            });
        };
        const resUser = await user.updateOne({
            _id
        }, {
            password: cryptoNewPwd
        });
        if (resUser.nModified) {  //修改成功
            req.session.destroy(() => {
                res.send({
                    status: '1',
                    message: '修改成功,请重新登录'
                });
            });
        } else {
            res.send({
                status: '2',
                message: '数据异常请重试'
            });
        };
    } else {
        res.send({
            status: '0',
            message: '密码输入有误'
        });
    };
};

module.exports = changePwd;
