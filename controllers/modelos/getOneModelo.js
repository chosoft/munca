const { getModelo } = require('./../../models/modelos')
const modeloDecrypt = require('./../../workers/modelos/modeloObjectDecrypt')

function controller(nombre){
    return new Promise(async (resolve,reject) => {
        try {
            const modelo = await getModelo(nombre)
            if(modelo){
                const decryptModelo = await modeloDecrypt([modelo])

                resolve(decryptModelo[0])
            }else{
                resolve(modelo)
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = controller