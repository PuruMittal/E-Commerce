const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please enter your name"],
        maxLength : [24, "Name cannot exceed 24 characters"],
        minLenght : [4, "Name should be more than 4 characters"]
    },
    email : {
        type : String,
        required : [true, "Please enter your email"],
        unique : true,
        validate : [validator.isEmail, "Please enter a valid email"]
    },
    password : {
        type : String,
        required : [true, "Please enter your password"],
        minLength : [8, "Password should be atleast 8 characters"],
        select : false //whenever we get all the elements it should not set password with data
    },
    avatar : {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
    },
    role : {
        type : String,
        default : "user",
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date,
})

userSchema.pre('save', async function(next){
    
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//JWT token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id : this._id}, process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRE*60*60*24*1000,
    })
}

//Compare Password
userSchema.methods.comparePassword = async function(enteredPass){
    return await bcrypt.compare(enteredPass, this.password) //this.password is hashed password
}

//Generate Password reset token
userSchema.methods.getResetPasswordToken = function () {
    
    //Generating Token
    const resetToken = crypto.randomBytes(20).toString('hex')

    //Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')
    
    this.resetPasswordExpire = Date.now() + 15*60*1000

    return resetToken;
}

module.exports = mongoose.model("User", userSchema)