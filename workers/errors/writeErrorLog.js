const fs = require('fs');
const path = require('path')

function writeErrorLog(msg){
    return new Promise(async (resolve,reject) => {
        try {
            const date = new Date()
            fs.writeFile(path.join(__dirname,"./../../.log"),`${msg} * ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}:${date.getHours()}:${date.getMinutes()} \n`,(err) =>{
                resolve('ok')
            });
        }catch(e){
            reject(e)
        }
    })
}

module.exports = writeErrorLog