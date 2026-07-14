const mongoose =require("mongoose");

const assignSchema = new mongoose.Schema({
    itemId:{ 
        type: mongoose.Schema.Types.ObjectId, ref: "Item" 
    },
    assignedTo:{ 
        type: String
    },
    assignedBy:{
        type: String,
        enum: ["NORTH STORE","SOUTH STORE", "CENTRAL STORE"],
    },
    assignDate:{
        type:Date,
        default:Date.now
    },
    quantity:{
        type:Number,
        required:true
    },
    returnDate:{
        type:Date
    },
    status: {
        type: String,
        enum: ["ACTIVE","RETURNED", "OVERDUE"],
        default: "ACTIVE"
    }
},{
    timestamps:true,
})

module.exports = mongoose.model("Assign",assignSchema);