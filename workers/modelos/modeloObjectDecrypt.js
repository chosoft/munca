const { config } = require('./../../config/envVars')
const encryptor = require('simple-encryptor')(config.secret)

function decryptModeloObjects(modelos){
    return new Promise(async (resolve,reject) => {
        try {
            let decryptModelos = []
            let decryptLideres = []
            let decryptObj
            let decryptLider
            await modelos.forEach(async (modelo) => {
                decryptObj = {
                    nombre: modelo.nombre,
                    colegio: encryptor.decrypt(modelo.colegio),
                    addBy: encryptor.decrypt(modelo.addBy),
                    address:{
                        lat: encryptor.decrypt(modelo.address.lat),
                        lon: encryptor.decrypt(modelo.address.lon),
                        display_name: encryptor.decrypt(modelo.display_name),
                        country: encryptor.decrypt(modelo.country),
                        city: encryptor.decrypt(modelo.city)
                    }
                }
                await modelo.lideres.forEach(lider => {
                    decryptLider = {
                        nombre: encryptor.decrypt(lider.nombre),
                        email: encryptor.decrypt(lider.email),
                        telephone: encryptor.decrypt(lider.telephone),
                    }
                    decryptLideres.push(decryptLider)
                })
                decryptObj.lideres = decryptLideres
                decryptModelos.push(decryptObj)
            })
            resolve(decryptModelos)
        } catch (e) {
            reject({expected:false, message:e.message})
        }
    })
}

module.exports = decryptModeloObjects