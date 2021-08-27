const { searchTrashTokens,deleteTokens } = require('./../../models/conftokens')
const { deleteNotConfirmMails } = require('./../../models/users')

function controller(){
    return new Promise( async (resolve,reject) => {
        try {
            const trashTokens = await searchTrashTokens()
            await deleteTokens(trashTokens)
            await deleteNotConfirmMails(trashTokens)
            resolve('removedUnconfirmedMails')
        } catch (e) {
            reject(e);
        }
    })    
}

module.exports = controller