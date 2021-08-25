const { config } = require('./envVars.js')

const configSession = {
    name:'sessionId',
    secret:config.secret,
    resave:false,
    saveUninitialized: true,
    maxAge: 900000
}

module.exports = configSession