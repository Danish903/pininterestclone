var express         = require('express'),
    router          = express.Router(),
    Pin             = require('../models/pins'),
    Like            = require('../models/like');
    
router.get('/', function (req, res) {
   res.render("index"); 
});

router.get('/pins', function (req, res) {
 
   req.session.url = req.url;
   Pin.find({}).sort({createdAt: -1}).populate("like").exec( function(err, pins) {
      if(err) {
         console.log('error in pin display');
      } else {
         res.render("pins", {pins: pins}); 
      }
   });
   
   
});
router.post('/user/profile', function (req, res) {
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


router.get('/pins/:id', isLoggedIn, function (req, res) {
   Pin.findById(req.params.id, function(err, pin) {
      if(err) {
         console.log("error id");
       return  res.redirect('/pins');
      } else {
         var like = new Like({
            user: req.user._id,
            pin: pin._id,
            
         });
         pin.hasLike = true;
         pin.likeCount++;
         pin.like.push(like);
         like.save();
         pin.save();
         res.redirect('/pins');
      }
   });
});
router.get('/pins/:id/dislike', isLoggedIn, function (req, res) {
   Pin.findById(req.params.id, function(err, pin) {
      if(err) {
         console.log("error id");
       return  res.redirect('/pins');
      } else {
         // var like = new Like({
         //    user: req.user._id,
         //    pin: pin._id,
         //    hasLike: true
         // });
         pin.hasLike = false;
         pin.likeCount--;
         // pin.like.push(like);
         // like.save();
         pin.save();
         res.redirect('/pins');
      }
   });
});

router.delete('/pins/delete', isLoggedIn, function(req, res) {
   

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
router.put('/pins/edit', isLoggedIn, function(req, res) {
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

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
     return next();
  }
  res.redirect("/user/login");
}

module.exports = router;