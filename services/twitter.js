var passport                    = require('passport'), 
    TwitterStrategy             = require('passport-twitter').Strategy,
    User                        = require('../models/user'),
    twitterkeys                 = require('../config/config');
passport.use(new TwitterStrategy({
            consumerKey: twitterkeys.consumerKey,
            consumerSecret: twitterkeys.consumerSecret,
            callbackURL: "/auth/twitter/callback"
        },
        function(token, tokenSecret, profile, cb) {
            //console.log(profile._json);
            User.findOne({username:profile.id}, function (err, user) {
              if(err) {
                return cb(err);
              }
              if(user) {
                return cb(null,user);
              }
              var newUser = new User();
              newUser.username = profile.id;
              newUser.name = profile.displayName;
              newUser.save(function(err, user) {
                if(err)  {
                  return cb(err);
                }
                return cb(null,user);
              });
            });
         }
));