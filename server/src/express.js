const express = require('express');
const connectDB=require("./database");
const cookieParser=require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const app=express();

app .use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    //methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}));

app.use(express.json());
app.use(cookieParser());

const authRouter = require("../routes/authRoutes");
const itemRouter = require("../routes/itemRoutes");

app.use("/",authRouter);
app.use("/",itemRouter);

connectDB()
    .then(()=>{
        console.log("cluster connected");
        app.listen(5004);
    })
    .catch((err)=>{
        console.error("cluster not connected error:"+err);
    })