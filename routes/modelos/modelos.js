const express = require('express');
const router = express.Router()

const isAuthenticated = require('./../../workers/loginAndRegister/loginAuthenticateFunction')


const writeErrorLog = require('./../../workers/errors/writeErrorLog')


router.get('/',isAuthenticated, async (req,res) => {
    try {
        res.send('logged')
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