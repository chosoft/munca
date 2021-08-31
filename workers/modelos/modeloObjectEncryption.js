const { config } = require('./../../config/envVars')
const encryptor = require('simple-encryptor')(config.secret)

function encryptModelObject(obj){
    return new Promise(async (resolve, reject) => {
        try {
            let encryptObject = {
                nombre: obj.nombre.trim().split(' ').join('-'),
                colegio: encryptor.encrypt(obj.colegio),
                addBy: encryptor.encrypt(obj.addBy),
                address:{
                    lat: encryptor.encrypt(obj.address.lat),
                    lon: encryptor.encrypt(obj.address.lon),
                    display_name: encryptor.encrypt(obj.address.display_name),
                    country: encryptor.encrypt(obj.address.country),
                    city: encryptor.encrypt(obj.address.city)
                }
            }
            let encryptLideres = []
            let liderEncryptObject 
            await obj.lideres.forEach((lider) => {
                liderEncryptObject = {
                    nombre: encryptor.encrypt(lider.nombre),
                    email: encryptor.encrypt(lider.email),
                    telephone: encryptor.encrypt(lider.telephone)
                }
                encryptLideres.push(liderEncryptObject)
            })
            encryptObject.lideres = encryptLideres
            resolve(encryptObject)
        } catch (e) {
            console.log(e)
            reject({expected:false, message:e.message})
        }
    })
}

module.exports = encryptModelObject