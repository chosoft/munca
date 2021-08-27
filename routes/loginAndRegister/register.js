const express = require('express')
const router = express.Router()
const bodyVerification = require('./../../middlewares/bodyVerification')
const controller = require('./../../controllers/loginAndRegister/register')
const writeErrorLog = require('./../../workers/errors/writeErrorLog')
//pendiente para el error manager
router.get('/', async (req, res) => {
    try {
        res.send('here the html to register')
    } catch (e) {
        res.send('here the html template error')
    }
})

router.post('/', bodyVerification,async (req, res) => {
    try {
        const body = req.body
        const controllerResult = await controller(body)
        res.send(controllerResult)
    } catch (e) {
        if(e.expected){
            res.send(e.message)
        }else{
            const errorLog = await writeErrorLog(e.message)
            delete e
            res.send('error')
        }
    }
})

module.exports = router