const User = require('./userModel');
const bcrypt = require('bcrypt')


// registerApi = http://localhost:2500/api/v1/register/
exports.userRegister=async(req,res,next)=>{
    const{name,email,password} = req.body
    const user =await User.create({
        name,
        email,
        password
    })

    const token = user.getJwtToken()

    const options={
        expires: new Date(Date.now()+process.env.COOKIE_EXPIRES_TIMES * 24 * 60 * 60 * 100 ),
        httpOnly:true,
    }

    res.status(200)
    .cookie('token',token,options)
    .json({
        success:true,
        user,
        token
    })
}


//loginApi = http://localhost:2500/api/v1/login/
exports.userLogin=async(req,res,next)=>{

    const{email,password}=req.body

    if(!email || !password){
        return res.status(401).json({
            success:false,
            message:'Login first'
        })
    }

    const user =await User.findOne({email}).select('+password')

    if(!user){
        return res.status(401).json({
            success:false,
            message:'user inValid'
        })
    }

    if(!await bcrypt.compare(password,user.password)){
        res.status(400).json({
            success:false,
            message:'user invalid'
        })
    }

    const token = user.getJwtToken()

    res.status(200).json({
        success:true,
        user,
        token
    })
}