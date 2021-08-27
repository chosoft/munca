const express = require('express');
const path = require('path');
const helmet = require('helmet')
const compresion = require('compresion');
const session = require('express-session');
const cron = require('node-cron');
const tokensCleaner = require('./workers/mailVerification/cleanerExpiredTokens')
const router = require('./routes/router');
const envConfig = require('./config/envVars');
const sessionConfig = require('./config/sessionVars');
const app = express();

require('./db.js');

app.set('views',path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(compresion())
app.use(helmet())
app.use(session(sessionConfig))

app.disabled('x-powered-by')

router(app)

const server = app.listen(envConfig.port || process.env.PORT, () => {
    console.log(`[SERVER] THE SERVER IS http://localhost:${server.address().port}/`)
})

tokensCleaner()