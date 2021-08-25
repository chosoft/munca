const express = require('express');
const router = express.Router();


//pendiente para el manejo de errores
router.get('/', async (req,res) => {
    try {
        res.send('here the html')
    } catch (e) {
        res.send('error')
    }
})

router.post('/', async (req,res) => {
    try {
        res.send('here the post bussines logic')
    } catch (e) {
        
    }
})

module.exports = router