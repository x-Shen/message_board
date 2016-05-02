var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');
var postModel = require('../models/postModel');
var messageModel = require('../models/postMessageModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Message Board' }
  );
});

router.post('/signUp',function(req, res, next){
  res.render('signup',{title:'Sign Up For Message Board',sub_title:'Please Fill the form to Sign Up'});
  var newUser = new user(req.body);
  newUser.save(function(err){
    if(err) throw err;
    res.redirect('/');
  })
});

router.get('/logIn',function(req,res,next){
  res.render('signup',{title:'Log In to Message Board',sub_title:'Please Fill the form to Log In'});
  res.redirect('/');
});



module.exports = router;
