var passport = require('passport');

module.exports = function(app){
    app.get('/auth/twitter', userLoggedIn, passport.authenticate('twitter'));

    app.get('/auth/twitter/callback', 
        passport.authenticate('twitter', { 
        failureRedirect: '/failureRoute' 
        
        }), function(req, res) {
        req.flash("success", "Welcome to Pin interest clone!");
        res.redirect('/pins');
    });
    

function userLoggedIn(req, res, next){
   var temp = req.session.url;
   req.session.url = null;
   if(req.isAuthenticated()) {
    return  res.redirect(temp);
   }
   next();
}

};