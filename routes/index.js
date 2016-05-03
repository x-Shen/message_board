var express = require('express');
var router = express.Router();
//var userModel = require('../models/userModel');
var postModel = require('../models/postModel');
var messageModel = require('../models/postMessageModel');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var userSchema = mongoose.model('user',{
    email:String,
    password:String
});

var User = mongoose.model('user', userSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Message Board' }
  );
});

router.get('/signUp',function(req, res, next){
  res.render('signup',{title:'Sign Up For Message Board',sub_title:'Please Fill the form to Sign Up'});

});

router.post('/saveUser', function(req,res,next){
    var newUser = new user(req.body);
    newUser.save(function(err){
        if(err) throw err;
    })
    res.redirect('/');
});

router.get('/logIn',function(req,res,next){
  res.render('login',{title:'Log In to Message Board',sub_title:'Please Fill the form to Log In'});
});

router.post('/userlogin',function(req,res,next){
    console.log(req.body);
    User.findOne({ email: req.body.email }, function(err, user){
        if (!user){
            res.render('login',{title:'Log In to Message Board',sub_title:'Please Fill the form to Log In'});
        }
        else{
            if(req.body.password === user.password){
                req.session.user = user;
                res.redirect('/');
            }
            else{
                res.render('login',{title:'Log In to Message Board',sub_title:'Please Fill the form to Log In'});
            }
        }
    })
});





module.exports = router;
