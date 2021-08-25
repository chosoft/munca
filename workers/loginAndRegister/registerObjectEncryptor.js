const { config } = require('./../../config/envVars');
const encryptor = require('simple-encryptor')(config.secret)

function encryptRegisterObject(obj){
    return new Promise(async (resolve,reject) => {
        try {
            const newObj = {
                username:encryptor.encrypt(obj.username),
                password:obj.password,
                email:obj.email,
                telephone:encryptor.encrypt(obj.telephone)
            }
            resolve(newObj)
        } catch (e) {
            reject({expected:false, message:e.message});
        }
    })
}

module.exports = encryptRegisterObject