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

function generateVerificationToken({id,email}){
    return new Promise(async (resolve, reject) => {
        try {
            const objToken = {
                registerId:id,
                token: uid(id.length)
            }
            const token = new Token(objToken)
            const saveResult = await token.save()
            resolve({token:saveResult.token,email})
        } catch (e) {
            reject({expected:false,message:e.message});
        }
    })
}
function searchToken(token){
    return new Promise( async (resolve, reject) => {
        try {
            const findToken = await Token.findOne({token}).exec()
            if(findToken){
                resolve(findToken)
            }else{
                reject({expected:true,message:"nonexistentToken"})
            }
        } catch (e) {
            reject({expected:false,message:e.message});
        }
    })
}

function editConfirmationField({_id}){
    return new Promise( async (resolve, reject) => {
        try {
            const updateResult = await Token.findByIdAndUpdate(_id,{ confirm:true })
            resolve(updateResult)
        } catch (e) {
            reject({expected:false,message:e.message});
        }
    })
}

function searchTrashTokens(){
    return new Promise( async (resolve, reject) => {
        try {
            const allTokens = await Token.find()
            const trashTokensIds = []
            const mscPerMinute = 1000 * 60
            let actualDate
            let registeredDate
            let interval
            let difference
            await allTokens.forEach(({timestamp,confirm,_id,registerId}) => {
                actualDate = new Date()
                registeredDate = new Date(timestamp)
                interval = actualDate.getTime() - registeredDate.getTime()
                difference = Math.floor(interval / mscPerMinute)

                if(difference >= 60 && !confirm){
                    trashTokensIds.push({_id,registerId})
                }else{

                }
            })
            resolve(trashTokensIds)
        } catch (e) {
            reject({expected:false,message:e.message});
        }
    })
}

function deleteTokens(tokens){
    return new Promise(async (resolve,reject) => {
        try {
            await tokens.forEach(async ({_id}) => {
                try {
                    await Token.findByIdAndDelete(_id)
                } catch (e) {
                    reject({expected:false,message:e.message});
                }
            })
            resolve()
        } catch (e) {
            reject({expected:false,message:e.message});
        }
    })
}
module.exports = {
    generateVerificationToken,
    searchToken,
    editConfirmationField,
    searchTrashTokens,
    deleteTokens
}