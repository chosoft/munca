function checkValidLifetime({timestamp}){
    return  new Promise(async (resolve,reject) => {
        try {
            const mscPerMinute = 1000 * 60
            const actualDate = new Date()
            const registeredDate = new Date(timestamp)
            const interval = actualDate.getTime() - registeredDate.getTime()
            const difference = Math.floor(interval / mscPerMinute)

            if(difference >= 60){
                reject({expected: true,message:'tokenExpired'})
            }else{
                resolve()
            }
        } catch (e) {
            reject({expected:false, message:e.message});
        }
    })
}

module.exports = checkValidLifetime
