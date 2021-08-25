const loginRouter = require('./loginAndRegister/login')
const registerRouter = require('./loginAndRegister/register')

const router = (server) => {
    server.use('/login',loginRouter)
    server.use('/register',registerRouter)
}

module.exports = router