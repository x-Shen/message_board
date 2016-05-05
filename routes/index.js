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
    Post.find(function(err,posts){
        res.render('index', { title: 'Welcome to Message Board',posts });
    });
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
    if (req.session && req.session.user) { // Check if session exists
        // lookup the user in the DB by pulling their email from the session
        User.findOne({ email: req.session.user.email }, function (err, user) {
            if (!user) {
                // if the user isn't found in the DB, reset the session info and
                // redirect the user to the login page
                req.session.reset();
                res.redirect('/logIn');
            } else {
                // expose the user to the template
                res.locals.user = user;

                // render the dashboard page
                res.render('dashboard',{title:'Welcome to dashboard'});
            }
        });
    } else {
        res.redirect('/logIn');
    }

});

router.get('/newPost',function(req,res,next){
    var post = {
        title: '',
        CreatedAt: '',
        id: '',
        user: ''
    };
    var user = req.session.user;
    res.render('postForm', {title: 'New Page!', post, user})
});

router.post('/savePage',function(req,res,next){
    var newPost = Post(req.body);
    newPost.save(function(err){
        if(err) throw err;
    });
    var newMessage = PostMessage(req.body);
    newMessage._post = newPost;
    newMessage.save(function(err){
        if(err) throw err;
    });

    res.redirect('/');

});

router.get('/post/:id', function(req,res,next){
    var message = {
        _post:'',
        message:'',
        user:'',
        createdAt: '',
    };
        PostMessage.find('_post',function(err, messages){
            res.render('post',{title:'view post',messages,message})
        });
});

router.post('/saveMessage',function(req,res){
    console.log(req.body);
    //var id = req.params._post.id;
    var newMessage = PostMessage(req.body);
    newMessage.save(function(err){
        if(err) throw err;
    });
    res.redirect('/post/');
});


module.exports = router;
