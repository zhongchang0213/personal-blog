const crypto = require('crypto');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w\u4e00-\u9fa5]{2,11}$/
    },
    password: {
        type: String,
        required: true,
        match: /^[\w]{6-18}$/
    },
    isSuper: {
        type: Number,
        default: 0
    },
    tel: {
        type: Number,
        match: '/^1[3-9]\d{9}$/'
    },
    avatar: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: '这个个很懒，什么也没有~'
    }
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    },
    versionKey: false
});

// 创建用户对密码加密
userSchema.pre('save',function(next) {
    this.password = crypto.createHash('sha512').update(this.password).digest('hex');
    next();
});

const user = mongoose.model('user', userSchema);

module.exports = user;
