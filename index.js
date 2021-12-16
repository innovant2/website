const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.connect("mongodb+srv://fedi:010220@taskapp.yje7c.mongodb.net/TaskApp?retryWrites=true&w=majority");
mongoose.connection.on('connected',()=>{
    console.log("BD IS CONNECTED");
});
mongoose.connection.on('erroe',(err)=>{
    console.log("BD NOT CONNECTED",err);
});

const authRoutes = require("./routes/auth.routes");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/auth",authRoutes);

app.get('/test',(req,res)=>{
    res.send("hello");  
});


const port= 8000;
app.listen(port,()=>{
    console.log("server is listening on ",port);
});
