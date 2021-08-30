const express = require('express');
const router = express.Router()

const controller = require('./../../controllers/modelos/getModelos')

const isAuthenticated = require('./../../workers/loginAndRegister/loginAuthenticateFunction')

const writeErrorLog = require('./../../workers/errors/writeErrorLog')


router.get('/',isAuthenticated, async (req,res) => {
    try {
        const modelos = await controller()
        res.render('home',{modelos})
    } catch (e) {
        if(e.expected){
            res.send(e.message)
        }else{
            await writeErrorLog(e.message)
            delete e
            res.render('error')
        }
    }
})

module.exports = router