const express = require('express');
const router = express.Router()

const controller = require('./../../controllers/modelos/getOneModelo')
const controllerSearch = require('./../../controllers/modelos/searchModel')
const isAuthenticated = require('./../../workers/loginAndRegister/loginAuthenticateFunction')

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

router.post('/',isAuthenticated,async (req,res) => {
    try {
        const searchQuery = req.query.q
        if(searchQuery){
            const searchResults = await controllerSearch(searchQuery)
            res.send(searchResults)
        }else{
            res.send('nullQuery')
        }
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