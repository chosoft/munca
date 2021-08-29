const { config } = require('./envVars.js')

const configSession = {
    name:'sessionId',
    secret:config.secret,
    resave:false,
    saveUninitialized: false,
}

module.exports = configSession