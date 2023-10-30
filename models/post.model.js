const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title:String,
    body:String,
    device:String,
    no_of_comments:Number,
    uid:String
})

const PostModel = mongoose.model("posts",postSchema)

module.exports={
    PostModel
}