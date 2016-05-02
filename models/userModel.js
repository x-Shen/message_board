/**
 * Created by xinshen on 5/2/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = mongoose.model('user',{
    email:String,
    password:String
});