const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstname:{type:String , maxlength : 64},
    lastname : {type:String , maxlength : 64},
    email : {type:String , lowercase:true},
    password : {type : String },
    
},
{timestamps:true}
);


module.exports =mongoose.model("user",UserSchema);