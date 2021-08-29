const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const controller = require('../controllers/loginAndRegister/login')
const retrieveUserData = require('../workers/loginAndRegister/retrieveUserData')
const writeErrorLog = require('../workers/errors/writeErrorLog')

passport.serializeUser((user,done) => {
    done(null, user.email)
})

passport.deserializeUser(async (email, done) => {
    try {
        const user = await retrieveUserData(email)
        done(null, user)
    } catch (error) {
        done(error, email)
    }
})

passport.use('userAuth',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback: true
}, async (req,email, password, done) => {
    try {
        const user = await controller(email,password)
        return done(null,user)
    } catch (e) {
        if(e.expected){
            console.log(e.message)
            req.flash('loginMessage',e.message)
            return done(null, false, req.flash('loginMessage'))
        }else{
            await writeErrorLog(e.message)
            delete e
            return done(null, false, { message: 'error'})
        }
    }
}));
