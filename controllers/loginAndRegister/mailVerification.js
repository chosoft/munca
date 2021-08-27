const checkToken = require('./../../workers/mailVerification/checkValidToken')
const { editConfirmationField } = require('./../../models/conftokens')
const { editValidMailField } = require('./../../models/users')
function controller(token){
    return new Promise( async (resolve,reject) => {
        try {
            const checkResult = await checkToken(token)
            const editConfirmationFieldResult = await editConfirmationField(checkResult)
            const editValidMailFieldResult = await editValidMailField(editConfirmationFieldResult)
            resolve(editValidMailFieldResult)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = controller