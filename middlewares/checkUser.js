
const checkUser = async (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.send({
            status: '0',
            message: '请先登录'
        });
    };
};

module.exports = checkUser;
