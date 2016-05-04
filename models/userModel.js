/**
 * Created by xinshen on 5/2/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = mongoose.model('user',{
    email:String,
    password:String
});

module.exports = User;