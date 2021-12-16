const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user.model")
const jwt = require("jsonwebtoken");

router.post("/register",async(req,res)=>{ 
    try {
    const existEmail = await User.findOne({email:req.body.email});
    if(existEmail) return res.status(422).json({
        message : "email/password exist",
    });
    console.log(existEmail);
    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(req.body.password,salt); 
    console.log(hashedPassword);
    const newUser = new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:hashedPassword,
    });
    
    const savedUser = await newUser.save();
    
    console.log(savedUser);
    return res.status(201).json(savedUser);
    } catch (err) {
        return res.status(500).json(err); 
    };
});
router.post("/login", async (req,res)=>{
    try {
     const userExist = await User.findOne({email : req.body.email});
    if(!userExist) return res.status(401).json({message : "email/password wrong"});
    const validPassword = await bcrypt.compare(req.body.password,userExist.password);
    if (!validPassword) return res.status(401).json({message: "email/password wrong"});
    const token = jwt.sign({_id:userExist._id},"pidddkdz");
    res.cookie("token",token,{
        httpOnly:true,
    });
    
        return res.status(200).json({token : token , user:userExist});
    } catch (err) {
        return res.status(500).json(err);
    };
});
module.exports = router;