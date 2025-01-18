const express=require('express');
const mongoose=require('mongoose');
const uploadRoutes = require('./routes/uploadRoutes');



const userRoutes = require('./routes/userRoutes');

const app=express()
const PORT=8084
app.use(express.json());

let connection= mongoose.connect("mongodb+srv://sangeethdrive69:gXIGaQ1sK2fgCRRi@cluster0.iojyc.mongodb.net/")

app.get("/ping",(req,res)=>{
    res.send("pong")
})
app.use('/', userRoutes);
app.use('/', uploadRoutes);



app.listen(PORT,async()=>{
try{
    await connection;
    console.log("Successfully connected to MongoDB");
} catch (error){
    console.log(error);
}

    console.log(`Server is running on port ${PORT}`)
})