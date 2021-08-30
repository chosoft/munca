const express = require('express') 
const router = express.Router()

const isAuthenticated = require('../../workers/loginAndRegister/loginAuthenticateFunction')

const writeErrorLog = require('../../workers/errors/writeErrorLog')

router.get('/', isAuthenticated, async (req,res) => {
    try {
        req.logout()
        res.redirect('/login')
    } catch (e) {
        await writeErrorLog(e.message)
        delete e
        res.redirect('/login')
    }
})

module.exports = router