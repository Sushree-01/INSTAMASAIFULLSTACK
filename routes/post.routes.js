const express = require("express");
const { PostModel } = require("../models/post.model");
const { auth } = require("../middleware/auth.middleware");

const postRouter = express.Router();
postRouter.use(auth)

postRouter.get("/",async(res,req)=>{
    try{
        const posts = await PostModel.find({uid:req.body._id})
        
        res.send(posts)
    }catch(err){
        res.json({error:err.message})
    }
})

postRouter.post("/add",async(res,req)=>{
    try{
        const post = new PostModel(req.body)
        await post.save()
        res.status(200).json({msg:"New Post added", post:req.body })
    }catch(err){
        res.json({error:err.message});
        console.log(err);
    }
})

postRouter.patch("/update/:id",async(res,req)=>{
    const userID = req.body.uid
    const {id} = req.params
    try{
        const post = await PostModel.find({_id:id},req.body)
        const noteID = note.uid
        console.log(post)
        if(userID===noteID){
        await PostModel.findByIdAndUpdate({_id:id})
        res.status(200).json({msg:`${note.title} has been updated`})
    }else{
        res.json({msg:"Not Authorized"})
    }
    }catch(err){
        res.json({error:err.message})
    }
})

postRouter.delete("/delete/:id",async(res,req)=>{
    const userID = req.body.uid
    const {id} = req.params
    try{
        const post = await PostModel.find({_id:id})
        const noteID = note.uid
        console.log(post)
        if(userID===noteID){
        await PostModel.findByIdAndDelete({_id:id})
        res.status(200).json({msg:`${note.title} has been deleted`})
    }else{
        res.json({msg:"Not Authorized"})
    }
    }catch(err){
        res.json({error:err.message})
    }
})

module.exports={
    postRouter
}