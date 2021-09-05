const { getModelos } = require('./../../models/modelos')

function searchModelos(query){
    return new Promise(async (resolve,reject) => {
        try {
            const modelosToCheck = await getModelos()
            if(modelos.length <= 0){
                reject({expected:true, message:'modelosNull'})
            }else{
                const searchFunction = {
                    "lider": searchLider(query)
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

function searchLider(q,modelos){
    return new Promise(async (resolve,reject) => {
        try {
            
        } catch (e) {
            reject({expected:false, message: e.message})
        }
    })
}
module.exports = searchModelos