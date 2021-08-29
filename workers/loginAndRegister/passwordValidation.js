const bcrypt = require('bcrypt');
const { config } = require('./../../config/envVars')

function validatePassword(password,hash) {
    return new Promise(async (resolve,reject) => {
        try {
            const match = await bcrypt.compare(password,hash)
            if(match){
                resolve()
            }else{
                reject({expected:true, message:'invalidPassword'})
            }
        } catch (e) {
            reject({expected:false, message:e.message})
        }
    })
}

module.exports = validatePassword