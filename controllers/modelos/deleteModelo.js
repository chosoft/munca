const { deleteModelo } = require('./../../models/modelos')

function controller(nombreModelo){
    return new Promise( async (resolve,reject) => {
        try {
            await deleteModelo(nombreModelo)
            resolve()
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = controller