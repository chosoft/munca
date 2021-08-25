const mongoose = require('mongoose');
const { model,Schema,Types } = mongoose
const { uid } = require('uid')

const tokensSchema = new Schema({
    registerId:{
        type: Types.ObjectId,
        required: true,
    },
    token:{
        type: String,
        required: true,
    },
    confirm:{
        type: Boolean,
        default: false,
    },
    timestamp:{
        type: Date,
        default: Date.now,
    }
})

const Token = model('EmailsToken',tokensSchema)

function generateVerificationToken(registerId){
    return new Promise(async (resolve, reject) => {
        try {
            const objToken = {
                registerId,
                token: uid(registerId.length)
            }
            const token = new Token(objToken)
            const saveResult = await token.save()
            resolve(saveResult.token)
        } catch (e) {
            reject({expected:false,message:e.message});
        }
    })
}

module.exports = {
    generateVerificationToken
}