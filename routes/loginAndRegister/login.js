const express = require('express');
const router = express.Router();
const passport = require('passport');

const writeErrorLog = require('./../../workers/errors/writeErrorLog')
//pendiente para el manejo de errores
router.get('/', async (req,res) => {
    try {
        res.render('login',{error: req.flash('loginError')})
    } catch (e) {
        await writeErrorLog(e.message)
        delete e
        res.render('error')
    }
})

router.post('/', passport.authenticate('userAuth', 
    {
        successRedirect:'/modelos',
        failureRedirect:'/login',
    }
))


module.exports = router