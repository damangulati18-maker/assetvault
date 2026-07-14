const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect(process.env.MONGO_URI);//datingapp is the name of database which will be declared in our cluster
};

module.exports=connectDB;