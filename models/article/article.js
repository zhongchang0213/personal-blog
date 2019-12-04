const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    tag: {
        type: Array
    },
    author: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    comment: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comment'
        }
    ],
    pageViews: {
        type: Number,
        default: 0
    },
    isDelete: {
        type: String,
        default: '0'
    }
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    },
    versionKey: false
});

const article = mongoose.model('article', articleSchema);

module.exports = article;
