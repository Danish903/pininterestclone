var express             = require('express'),
    User                = require('../models/user'),
    passport            = require('passport'),
    Pin                 = require('../models/pins'),
    router              = express.Router();
    
    
    
router.get('/user/signup', userLoggedIn, function( req, res) {
   // res.render('./user/signup',{csrfToken: req.csrfToken()});
   res.render('./user/signup');
});
router.post('/user/signup', function (req, res) {
   var username = new User({username: req.body.username, name: req.body.yourname});
   
   User.register(username, req.body.password, function(err, user) {
      if(err) {
         console.log(err.message);
         req.flash("error", err.message);
         res.redirect('/user/signup');
      } else {
         passport.authenticate('local')(req, res, function() {
             req.flash("success", "Successfully Signed Up!");
            res.redirect("/user/profile");
         });
      }
   });
 
});
router.get('/user/login', userLoggedIn, function ( req, res) {
   // res.render('./user/login', {csrfToken: req.csrfToken()});
   res.render('./user/login');
});
router.post('/user/login',passport.authenticate('local', {
   successRedirect: '/user/profile',
   failureRedirect: '/user/login',
   failureFlash: true,
   successFlash: "Welcome to Pin interest clone!"
}), function( req, res) {

});
router.get('/user/profile', isLoggedIn, function(req,res){
   req.session.url = null;
   req.session.url = req.url;
   Pin.find().where('user.id').equals(req.user._id).exec(function(err, pin) {
      if(err) {
         console.log("error finding profile");
         res.render("user/profile",{csrfToken: req.csrfToken()} );
      } else {

         // res.render("user/profile", {pins: pin , csrfToken: req.csrfToken()});
         res.render('user/profile',{pins:pin});
      }
      
   });

});
router.get('/user/logout', function(req, res ){
   req.logout();
   req.flash("success", "Your are logged out!");
   res.redirect("/pins");
});
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
     return next();
  }  
  res.redirect('/user/login');
}
function userLoggedIn(req, res, next){
   var temp = req.session.url;
   req.session.url = null;
   if(req.isAuthenticated()) {
    return  res.redirect(temp);
   }
   next();
}

module.exports = router;