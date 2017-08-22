var express                   = require('express'),
    bodyParser                = require('body-parser'),
    session                   = require('express-session'),
    mongoose                  = require('mongoose'),
   // seedDB                    = require('./seed'),
    Pin                       = require('./models/pins'),
    passport                  = require('passport'),
    User                      = require('./models/user'),
    localStrategy             = require('passport-local'),
    userRoute                 = require('./routes/userRoutes'),
    Like                      = require('./models/like'),
    moment                    = require('moment'),
    methodOverride            = require('method-override'),
    flash                     = require('connect-flash'),
    mongoURL                  = require('./config/config');
    //csrf                    = require('csurf');
    
    
var app = express();
// var csrfProtection = csrf();

mongoose.connect(mongoURL.mongoURL, {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(session({
   secret: "my secret",
   resave: false,
   saveUninitialized: false,
   
}));
// app.use(csrfProtection);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
require('./services/twitter.js');

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
   res.locals.currentUser = req.user;
   res.locals.moment = moment;
   res.locals.session = req.session;
   res.locals.success = req.flash('success');
   res.locals.error   = req.flash("error");
   // res.locals.csrfToke = req.csrfToken();
   next();
});

require('./routes/twitterAuthRoutes')(app);
// seedDB();
app.get('/', function (req, res) {
   res.render("index"); 
});

app.get('/pins', function (req, res) {
 
   req.session.url = req.url;
   Pin.find({}).sort({createdAt: -1}).populate("like").exec( function(err, pins) {
      if(err) {
         console.log('error in pin display');
      } else {
         res.render("pins", {pins: pins}); 
      }
   });
   
   
});
app.post('/user/profile', function (req, res) {
   var pin = {
      image: req.body.image,
      description: req.body.description
   };
   Pin.create(pin, function(err, newPin) {
      if(err) {
         console.log("error creating new pin");
         res.redirect('/user/profile');
      } else {
         newPin.user.id = req.user._id;
         newPin.user.username = req.user.name;
         newPin.save();
         req.flash("success", "Successfully, pin added!");
         res.redirect('/user/profile');
      }
      
   });
});


app.get('/pins/:id', isLoggedIn, function (req, res) {
   Pin.findById(req.params.id, function(err, pin) {
      if(err) {
         console.log("error id");
       return  res.redirect('/pins');
      } else {
         var like = new Like({
            user: req.user._id,
            pin: pin._id,
            hasLike: true
         });
         pin.likeCount++;
         pin.like.push(like);
         like.save();
         pin.save();
         res.redirect('/pins');
      }
   });
});
   
app.post('/pins/add/:id', function (req, res) {

   Pin.findById(req.params.id, function(err, pin) {
      if(err) {
         console.log("error id");
       return  res.redirect('/pins');
      } else {
         console.log(req.user);
         var like = new Like({
            user: req.user._id,
            pin: pin._id,
            hasLike: true
         });
         pin.likeCount++;
         pin.like.push(like);
         like.save();
         pin.save();
         res.json(pin);
      }
   });
});
app.delete('/pins/delete', isLoggedIn, function(req, res) {
   

   Pin.findByIdAndRemove(req.body.pinId, function(err, pin) {
      if(err) {
         res.redirect("back");
      } else {
         pin.like.forEach(function(like) {
            console.log(like);
            Like.findByIdAndRemove(like, function(err) {
               if(err) {
                console.log('error deleting like under pin');
             } 
            });
         });
         req.flash("success","Deleted!");
         res.redirect('/user/profile');
      }
      
   });
});
app.put('/pins/edit', isLoggedIn, function(req, res) {
   if(!req.body.image && !req.body.description) {
      res.redirect("/pins");
   }
   var updatedData = {
      image: req.body.image,
      description: req.body.description
   };
   Pin.findByIdAndUpdate(req.body.pinId, updatedData,function(err) {
      if(err) {
         res.redirect("/user/profile");
      } else {
         req.flash("updated");
         res.redirect('/user/profile');
      }
      
   });
});
app.use(userRoute);


function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
     return next();
  }
  res.redirect("/user/login");
}

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server started.............."); 
});