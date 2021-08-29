const loginRouter = require('./loginAndRegister/login')
const registerRouter = require('./loginAndRegister/register')
const mailVerificationRouter = require('./loginAndRegister/mailVerification')
const modelosRouter = require('./modelos/modelos')
const notFound = require('./notFound')
const router = (server) => {
    server.use('/',modelosRouter)
    server.use('/login',loginRouter)
    server.use('/register',registerRouter)
    server.use('/mailverfication', mailVerificationRouter)
    server.use(notFound)
}

module.exports = router