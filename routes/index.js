var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var Post = require('../models/postModel');
var PostMessage = require('../models/postMessageModel');
var session = require('client-sessions');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Message Board' }
  );
});

router.get('/signUp',function(req, res, next){
  res.render('signup',{title:'Sign Up For Message Board',sub_title:'Please Fill the form to Sign Up'});

});

router.post('/saveUser', function(req,res,next){
    var newUser = new User(req.body);
    newUser.save(function(err){
        if(err) throw err;
    });
    res.redirect('/');
});

router.get('/logIn',function(req,res,next){
  res.render('login',{title:'Log In to Message Board',sub_title:'Please Fill the form to Log In',error:"No error"});
});

router.post('/userlogin',function(req,res,next){
    console.log(req.body);
    User.findOne({ email: req.body.email }, function(err, user){
        if (!user){
            res.render('login',{title:'Log In to Message Board',sub_title:'Please Fill the form to Log In',error:'Username Does Not Exist'});
        }
        else{
            if(req.body.password === user.password){
                req.session.user = user;
                res.redirect('/dashboard');
            }
            else{
                res.render('login',{title:'Log In to Message Board',sub_title:'Please Fill the form to Log In', error:'Wrong Password'});
            }
        }
    })
});

router.get('/dashboard',function(req,res,next){

        res.render("dashboard", {title:'Dashboard'});

});

router.get('/newPost',function(req,res,next){
    var post = {
        title: '',
        CreatedAt: '',
        id: '',
        user: ''
    };
    res.render('postForm', {title: 'New Page!', post})
});

router.post('/savePage',function(req,res,next){
    var newPost = Post(req.body);
    newPost.save(function(err){
        if(err) throw err;
    });
    res.redirect('/');

});



module.exports = router;
