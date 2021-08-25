const mongoose = require('mongoose');
const { Schema,model } = mongoose
const { config } = require('./../config/envVars')
const encryptor = require('simple-encryptor')(config.secret)
const bcrypt = require('bcrypt');

const usersSchema = new Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    telephone:{
        type: String,
        required: true,
    },
    timestamp:{
        type: Date,
        default: Date.now,
    },
    rol:{
        type: String,
        default:'user'
    },
    active:{
        type: Boolean,
        default: false,
    },
    validMail:{
        type:Boolean,
        default: false,
    }
})

const User = model('Usuario',usersSchema)

function registerUser(obj){
    return new Promise(async (resolve, reject) => {
        try {
            const searchUser = await User.find({ email:obj.email })
            if(searchUser.length > 0){
                reject({expected: true,message:'emailInUse'})
            }else{
                const numberToExtractSalt = Date.now() + ""
                const saltRounds = parseInt(numberToExtractSalt.length,numberToExtractSalt.length-3)
                bcrypt.genSalt(saltRounds,(err, salt) => {
                    if(err){
                        reject({expected: false,message: err.message})
                    }
                    bcrypt.hash(obj.password,salt,async (err, hash) => {
                        if(err){
                            reject({expected: false,message: err.message})
                        }
                        obj.password = hash
                        const user = new User(obj)
                        const saveResult = await user.save()
                        resolve(saveResult._id)
                    })
                } )
            }
        } catch (e) {
            reject({expected:false, message:e.message})
        }
    })
}

module.exports = {
    registerUser
}