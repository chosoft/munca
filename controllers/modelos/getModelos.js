const { getModelos } = require('./../../models/modelos')
const decryptModelos = require('./../../workers/modelos/modeloObjectDecrypt')
function controller(){
    return new Promise(async (resolve,reject) => {
        try {
            const modelos = await getModelos()
            const cleanModelos = await decryptModelos(modelos)
            resolve(cleanModelos)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = controller