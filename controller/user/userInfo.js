const user = require('../../models/user/user')

const userInfo = async (req, res) => {
  const { _id } = req.session.user;
  let result = await user.findById(_id);
  res.send({
    status: '1',
    data: result,
    message: '用户查询成功'
  })
};

module.exports = userInfo;
