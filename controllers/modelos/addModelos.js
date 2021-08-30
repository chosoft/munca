const objectValidation = require('./../../workers/modelos/modeloObjectValidation')
const encryptObject = require('./../../workers/modelos/modeloObjectEncryption')
const { saveModelo } = require('./../../models/modelos')
function controller(obj){
    return new Promise(async (resolve, reject) => {
        try {
            await objectValidation(obj)
            const encryptModelo = await encryptObject(obj)
            await saveModelo(encryptModelo)
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = controller