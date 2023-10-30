const jwt = require("jsonwebtoken");
require("dotenv").config()


const auth = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        try{
            const decode = jwt.verify(token, process.env.SECRET_KEY)
            if(decode){
                req.body._id = decode.uid
                next()
            }else{
                res.json({msg:"Not Auhtorized"})
            }
        }catch(err){
            res.json({error:err.message})
        }
    }else{
        res.json({msg:"Please Login!!!"})
    }
}


module.exports={auth}