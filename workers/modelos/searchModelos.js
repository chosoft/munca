function searchModelos(q,modelos){
    return new Promise(async (resolve,reject) => {
        try {
            const splitQuery = q.split(' ')
            if(modelos.length <= 0){
                reject({expected:true, message:'notResultsFound'})
            }else{
                await modelos.forEach(modelo => {

                })
            }   
        } catch (e) {
            reject({expected:false, message:e.message})
        }
    })
}

function defineScore(query,string) {
    return new Promise(async (resolve,reject) => {
        try {
            query = query.trim().split(' ')
            string = string.replace(/,/g,'').split(' ')
            let puntaje = 0
            await query.forEach(async (q) => {
                await string.forEach(async (word) => {
                    if(q.toLowerCase() === word.toLowerCase()){
                        puntaje++
                    }else{

                    }
                })
            })
            resolve(puntaje)
        } catch (e) {
            reject({expected:false, message:e.message})
        }
    })
}

module.exports = searchModelos