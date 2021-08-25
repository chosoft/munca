const objectValidator = require('./../../workers/loginAndRegister/registerObjectValidation')
const encryptor = require('./../../workers/loginAndRegister/registerObjectEncryptor')
const { registerUser } = require('../../models/users')
const { generateVerificationToken } = require('../../models/conftokens')

function controller(body){
    return new Promise(async (resolve,reject) => {
        try {
            const validatorResult = await objectValidator(body)
            const encryptResult = await encryptor(validatorResult)
            const registerResult =  await registerUser(encryptResult)
            const tokenGenerateResult = await generateVerificationToken(registerResult)
            resolve(tokenGenerateResult)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = controller