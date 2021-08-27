const cron = require('node-cron')
const writeErrorLog = require('./../errors/writeErrorLog')
const controller = require('./../../controllers/cleaner/checker')
async function cleaner(){
    try {
        const controllerResult = await controller()
        console.log('clean')
    } catch (e) {
        await writeErrorLog(e.message)
        delete e
    }
}

function cleanerInitiator(){
    cron.schedule('* */1 * * *', cleaner)
}

module.exports = cleanerInitiator