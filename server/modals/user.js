const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    userName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    organization:{
        type:String
    }
},{
    timestamps:true,
})

module.exports = mongoose.model("User",userSchema); 