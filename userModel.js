const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator')


const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,'Enter validate email']

    },
    password:{
        type:String,
        required:true,
        maxLenght:[6,'char must be 6'],
        select:false
    }
})

userSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.getJwtToken= function(){
    return jwt.sign({id:this.id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME})
}


let userModel = mongoose.model('user',userSchema)

module.exports = userModel;