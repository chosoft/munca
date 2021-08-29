function verifyUserData(userData){
    return new Promise( async (resolve,reject) => {
        try {
            if(userData.validMail){
                if(userData.active){
                    resolve()
                }else{
                    reject({expected: true, message:'inactiveUser'})
                }
            }else{
                reject({expected:true,message:'invalidMail'})
            }
        } catch (e) {
            reject({expected:false, message:e.message})
        }
    })
}

module.exports = (verifyUserData)