const User = require('./userModel');
const jwt = require('jsonwebtoken')


exports.authentic=async(req,res,next)=>{
    const {token} = req.cookies
    if(!token){
        res.status(401).json({
            success:false,
            message:'Login first'
        })
    }
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    req.user =await User.findById(decode.id)
    next()
}

exports.authorizedRoles =(...roles)=>{
    return(req,res,next)=>{
        const userRol = req.body.role
        if(!roles.includes(userRol)){
            return res.status(400).json({
                message:"Role not access"
            })
        }else{
            next()
            }
        }
    }
