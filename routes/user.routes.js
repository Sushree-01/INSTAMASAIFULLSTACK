const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
require("dotenv").config()
const userRouter = express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name, email, gender, password, age, city, is_married} = req.body;
    try{
        let userExist = await UserModel.findOne({email})
        bcrypt.hash(password, 5, async(err, hash) => {
            if(err){
                res.status(400).json({error:err.message})
            }else if(userExist){
                    res.status(200).json({msg:"User already exist, please login"})
                }else{
                const user = new UserModel({name, email, gender, age, city, is_married, password:hash})
                await user.save()
                res.status(200).json({msg:"New user registered"})
            }
        })
    }catch(err){
        res.json({error:err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password,(err,result)=>{
                if(result){
                    let token = jwt.sign({userID:user._id,user:user.name}, process.env.SECRET_KEY)
                    res.status(200).json({msg:"Logged In!", token})
                }else{
                    res.status(200).json({msg:"Wrong Credentials"})
                }
            })
        }else{
            res.json({msg:"User does  not exist"})
        }
    }catch(err){
        res.json({error:err.message})
    }
})

module.exports={
    userRouter
}