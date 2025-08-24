import express from "express";
const app=express();

import mongoose from "mongoose";
mongoose.connect("mongodb+srv://mirishfaq01:EhoUFIEw44wE7Dc7@cluster0.4m3vt6n.mongodb.net/")
.then(()=>{console.log("connected to db")})
.catch((err)=>{
    console.log("db failed",err);
})


app.get("/",(req,res)=>{
    res.send("welcome to root route");})


const PORT=8000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});

//EhoUFIEw44wE7Dc7
//mirishfaq01
//mongodb+srv://mirishfaq01:EhoUFIEw44wE7Dc7@cluster0.4m3vt6n.mongodb.net/