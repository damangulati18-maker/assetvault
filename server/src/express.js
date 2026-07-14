const express = require('express');
const connectDB=require("./database");
const cookieParser=require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const app=express();

app .use(cors({
    origin: process.env.CLIENT_URL,
    credentials:true,
    //methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}));

app.use(express.json());
app.use(cookieParser());

const authRouter = require("../routes/authRoutes");
const itemRouter = require("../routes/itemRoutes");

app.use("/",authRouter);
app.use("/",itemRouter);

const PORT = process.env.PORT || 5004;

connectDB()
    .then(()=>{
        console.log("cluster connected");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err)=>{
        console.error("cluster not connected error:"+err);
    });