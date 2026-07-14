const mongoose =require("mongoose");

const itemSchema = new mongoose.Schema({
    
    itemName:{
        type:String,
        required:true
    },
    category:{
        type:String
    },
    brand:{
        type:String
    },
    quantity:{
        type:Number,
        default:1
    },
    purchasePrice:{
        type:Number,
        required:true
    },
    location:{
        type: String,
        enum: ["NORTH STORE","SOUTH STORE", "CENTRAL STORE"],
    }
},{
    timestamps:true,
})

module.exports = mongoose.model("Item",itemSchema);