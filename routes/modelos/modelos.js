const express = require('express');
const router = express.Router()

const controller = require('./../../controllers/modelos/getOneModelo')
const controllerSearch = require('./../../controllers/modelos/searchModel')
const isAuthenticated = require('./../../workers/loginAndRegister/loginAuthenticateFunction')
const bodyVerification = require('./../../middlewares/bodyVerification')

const writeErrorLog = require('./../../workers/errors/writeErrorLog')


router.get('/:nombre',isAuthenticated, async (req,res) => {
    try {
        const nombre = req.params.nombre 
        if(nombre){
            const modelo = await controller(nombre)
            res.render('modelo',{modelo})
        }else{
            res.send('nullName')
        }
    } catch (e) {
        if(e.expected){
            res.send(e.message)
        }else{
            console.error(e)
            await writeErrorLog(e.message)
            delete e
            res.render('error')
        }
    }
})

router.post('/',isAuthenticated, bodyVerification, async (req,res) => {
    try {
        const query = req.body
        const controllerResult = await controllerSearch(body)
    } catch (e) {
        if(e.expected){
            res.send(e.message)
        }else{
            console.error(e)
            await writeErrorLog(e.message)
            delete e
            res.send('error')
        }
    }
})

module.exports = router