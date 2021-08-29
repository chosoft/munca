const  { searchUser } = require('./../../models/users')
function retrieveUserData(email){
    return new Promise( async (resolve, reject) => {
        try {
            const user = await searchUser(email)
            resolve(user)
        } catch (e) {
            reject(e);
        }
    }) 
}

module.exports = retrieveUserData