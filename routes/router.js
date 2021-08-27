const loginRouter = require('./loginAndRegister/login')
const registerRouter = require('./loginAndRegister/register')
const mailVerificationRouter = require('./loginAndRegister/mailVerification')
const notFound = require('./notFound')
const router = (server) => {
    server.use('/login',loginRouter)
    server.use('/register',registerRouter)
    server.use('/mailverfication', mailVerificationRouter)
    server.use(notFound)
}

module.exports = router