/**
 * Created by xinshen on 5/2/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostMessage = mongoose.model('postmessage',
    {
        _post: {type: Schema.Types.ObjectId, ref: 'post'},
        message: String,
        createdAt: { type: Date, default: Date.now },
        user: Object
    });

module.exports = PostMessage;