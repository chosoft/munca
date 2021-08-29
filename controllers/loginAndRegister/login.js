const { searchUser } = require('./../../models/users')
const verifyUserData = require('./../../workers/loginAndRegister/userDataVerification')
const passwordValidation = require('./../../workers/loginAndRegister/passwordValidation')
function controller(email,password){
    return new Promise(async (resolve, reject) => {
        try {
            const userData = await searchUser(email)
            await verifyUserData(userData)
            await passwordValidation(password,userData.password)
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })    
}

module.exports = controller