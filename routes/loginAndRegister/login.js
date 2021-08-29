const express = require('express');
const router = express.Router();
const passport = require('passport');
//pendiente para el manejo de errores
router.get('/', async (req,res) => {
    try {
        res.send('here the html')
    } catch (e) {
        res.send('error')
    }
})

router.post('/', passport.authenticate('userAuth',{

    failureFlash:true,
}))

module.exports = router