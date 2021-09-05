const { getModelos } = require('./../../models/modelos')
const modelosDecrypt = require('./../../workers/modelos/modeloObjectDecrypt')
const searchModelos = require('./../../workers/modelos/searchModelos')
function controller(query){
    return new Promise(async (resolve,reject) => {
        try {
            const modelos = await getModelos()
            const cleanModelos = await modelosDecrypt(modelos)
            const foundModelos = await searchModelos(query,cleanModelos)
            resolve(foundModelos)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = controller