var express                   = require('express'),
    bodyParser                = require('body-parser'),
    session                   = require('express-session'),
    mongoose                  = require('mongoose'),
    passport                  = require('passport'),
    User                      = require('./models/user'),
    localStrategy             = require('passport-local'),
    userRoute                 = require('./routes/userRoutes'),
    moment                    = require('moment'),
    methodOverride            = require('method-override'),
    flash                     = require('connect-flash'),
    pinRoute                  = require('./routes/pinRoutes'),
    mongoURL                  = require('./config/config');

var app = express();
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
   next();
});

require('./routes/twitterAuthRoutes')(app);
app.use(pinRoute);
app.use(userRoute);

app.listen(process.env.PORT, process.env.IP);
