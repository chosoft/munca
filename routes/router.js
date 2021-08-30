const loginRouter = require('./loginAndRegister/login')
const registerRouter = require('./loginAndRegister/register')
const mailVerificationRouter = require('./loginAndRegister/mailVerification')
const modelosRouter = require('./modelos/modelos')
const modelosCrudRouter = require('./modelos/modeloscrud')
const logoutRouter = require('./loginAndRegister/logout')
const notFound = require('./notFound')
const router = (server) => {
    server.use('/',modelosRouter)
    server.use('/modelo',modelosCrudRouter)
    server.use('/login',loginRouter)
    server.use('/register',registerRouter)
    server.use('/mailverfication', mailVerificationRouter)
    server.use('/logout',logoutRouter)
    server.use(notFound)
}

module.exports = router