const { searchToken } = require('./../../models/conftokens')
const checkLifetime = require('./checkTokenLifetime')
function checkToken(token){
    return new Promise(async (resolve, reject) => {
        try {
            const searchResult = await searchToken(token)
            await checkLifetime(searchResult)
            resolve(searchResult)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = checkToken