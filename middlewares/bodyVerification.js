//Middleware to check if the body is empty or not and handle this situation
const bodyVerification = (req,res,next) => {
    const body = req.body;
    if(Object.keys(body).length <= 0){
        res.send('emptyData')
    }else{
        next();
    }
}

module.exports = bodyVerification