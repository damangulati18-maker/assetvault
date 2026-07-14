const mongoose =require("mongoose");

const maintainanceSchema = new mongoose.Schema({
    itemId:{ 
        type: mongoose.Schema.Types.ObjectId, ref: "Item" 
    },
    cost:{
        type:Number
    },
    issue:{
        type:String
    },
    assignedDate:{
        type:Date
    },
    completeDate:{
        type:Date
    }
},{
    timestamps:true,
})

module.exports = mongoose.model("Maintainance",maintainanceSchema);