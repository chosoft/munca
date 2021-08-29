const express = require('express')
const router = express.Router()
const controller = require('./../../controllers/loginAndRegister/mailVerification')

const writeErrorLog = require('./../../workers/errors/writeErrorLog')


router.get('/', async (req,res) => {
    try {
        const token = req.query.token
        const emptyToken = (token) ? false : true
        if(emptyToken){
            res.send('emptyToken')
        }else{
            const controllerResult = await controller(token)
            res.send(controllerResult)
        }
    } catch (e) {
        if(e.expected){
            //Change the dot Send to render, in the frontend development
            res.send(e.message)
        }else{
            await writeErrorLog(e.message)
            delete e
            res.send('error')
        }
    }
})

module.exports = router