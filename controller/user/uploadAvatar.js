const path = require('path');
const fs = require('fs');

const user = require('../../models/user/user');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../static/avatar'));
    },
    filename: function (req, file, cb) {
        let suffix = file.originalname.match(/(\.(jpe?g|png|webp|gif))$/)[0];
        let id = req.session.user._id;
        cb(null, id + suffix);
    }
});
  
let upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024*1024  //一兆限制
    } 
}).single('avatar');

// 删除用户其他格式图片
const deleteAvatar = (id ,type) => {
    ['.jpg', '.jpeg', '.png', '.gif'].forEach(item => {
        if (item === type) return;
        fs.unlink(path.join(__dirname,'../../static/avatar',id + item), () => {});
    });
};

const uploadAvatar = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            res.send({
                status: '0',
                message: '上传失败'
            });
        } else {
            let filename = req.file.filename,
            avatar = path.join('/avatar', filename);

            let result = await user.updateOne({ _id: req.session.user._id}, { avatar });
            if (result.nModified) {  //上传成功
                deleteAvatar(req.session.user._id, filename.match(/(.(jpe?g|png|git|webp))$/)[0]);
                res.send({
                    status: '1',
                    message: '修改成功！'
                });
            } else {
                res.send({
                    status: '0',
                    message: '上传失败'
                });
            };
        };
   });
};

module.exports = uploadAvatar;
