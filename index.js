const express = require('express');
const path = require('path');
const helmet = require('helmet')
const compresion = require('compresion');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const tokensCleaner = require('./workers/mailVerification/cleanerExpiredTokens')
const router = require('./routes/router');
const envConfig = require('./config/envVars');
const sessionConfig = require('./config/sessionVars');
const app = express();

require('./db.js');
require('./auth/passportAuth')
app.set('views',path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(compresion())
app.use(helmet())
app.use(session(sessionConfig))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.disabled('x-powered-by')


router(app)

const server = app.listen(envConfig.port || process.env.PORT, () => {
    console.log(`[SERVER] THE SERVER IS http://localhost:${server.address().port}/`)
})

tokensCleaner()


