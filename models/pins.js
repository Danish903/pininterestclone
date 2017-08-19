var mongoose        = require('mongoose');


var pinSchema = new mongoose.Schema({
   image      : {type: String, required: true},
   description: {type:String, required: true},
   likeCount  :{type:  Number, default: 0},
   user       : {
                  id: {
                     type: mongoose.Schema.Types.ObjectId,
                     ref : "User"
                  },
                  username: String,
   },
   like: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Like"
      }
   ],
   createdAt: {type: Date, default: Date.now}

});

module.exports = mongoose.model("Pin", pinSchema);