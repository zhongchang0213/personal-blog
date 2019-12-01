const user = require('../../models/user/user')

const register = async (req, res) => {

    let { userName, password, tel } = req.body;

    if ( userName && password ) {
        let resUser = await user.findOne({ userName });
        if (resUser) {
            res.send({
                status: '0',
                message: '用户名已存在'
            });
        } else {
            let newUser = await user.create({
                userName,
                password,
                tel
            }).catch(err => {
                res.send({
                    status: '2',
                    message: '服务器异常'
                });
            });
            if (newUser) {
                res.send({
                    status: '1',
                    message: '创建用户成功'
                });
            };
        };
    } else {
        res.send({
            status: '0',
            message: '请输入完整注册信息'
        });
    };
};

module.exports = register;
