var mongoose        = require('mongoose');


var likeSchema = new mongoose.Schema({
   user:  {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
 
   },      
   hasLike: {type: Boolean, default: false},
   pin:  {

         type: mongoose.Schema.Types.ObjectId,
         ref: "Pin"
   
   },
   
   

});

module.exports = mongoose.model("Like", likeSchema);