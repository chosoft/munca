const express = require('express')
const router = express.Router()

const controller = require('../../controllers/modelos/addModelos')
const controllerDelete = require('../../controllers/modelos/deleteModelo')
const controllerGet = require('./../../controllers/modelos/getModelos')

const isAuthenticated = require('../../workers/loginAndRegister/loginAuthenticateFunction')
const bodyVerification = require('../../middlewares/bodyVerification')
const writeErrorLog = require('../../workers/errors/writeErrorLog')

router.get('/',isAuthenticated, async (req,res) => {
    try {
        const modelos = await controllerGet()
        res.render('home',{modelos})
    } catch (e) {
        if(e.expected){
            res.send(e.message)
        }else{
            console.log(e)
            await writeErrorLog(e.message)
            delete e
            res.send('error')
        }
    }
})

router.post('/', isAuthenticated,bodyVerification, async (req, res) => {
    try {
        let body = req.body
        body.addBy = req.user.email        
        await controller(body)
        res.send('modelRegister')
    } catch (e) {
        if(e.expected){
            res.send(e.message)
        }else{
            await writeErrorLog(e.message)
            delete e
            res.send('error')
        }
    }
})

router.delete('/', isAuthenticated, async(req,res)  => {
    try {
        const modeloToDelete = req.query.name
        if(modeloToDelete){
            await controllerDelete(modeloToDelete)
            res.send('success')
        }else{
            res.send('undefinedModelToDelete')
        }
    } catch (e) {
        if(e.expected){
            res.send(e.message)
        }else{
            await writeErrorLog(e.message)
            delete e
            res.send('error')
        }
    }
})
module.exports = router