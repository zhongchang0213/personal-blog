const user = require('../../models/user/user')

const loginOut = async (req, res) => {
    req.session.destroy(() => {
        res.send({
            status: '1',
            message: '退出登录'
        });
    });
};

module.exports = loginOut;
