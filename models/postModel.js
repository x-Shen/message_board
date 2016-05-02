/**
 * Created by xinshen on 5/2/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = mongoose.model('post',
    {
        title: String,
        createdAt: { type: Date, default: Date.now, index: true },
        user: Object
    });

module.exports = Post;
